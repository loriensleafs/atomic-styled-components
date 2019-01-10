import { useCallback } from 'react';

/**
 * Elements that should not recieve the 'aria-hidden' attribute.
 * @private
 */
const BLACKLIST = ['template', 'script', 'style'];

/**
 * Retains a pool of the current modals in order.
 * @private
 */
let modals = [];

/**
 * Retains a pool of the current containers with rendered modal(s).
 * @private
 */
let containers = [];

/**
 * Gets the index of the passed container node.
 * @param {HTMLElement} node - Container node.
 * @returns {Boolean}
 * @private
 */
function getContainerIdx(node) {
	let idx = -1;
	containers.some((container, index) => {
		if (container.ref === node) {
			idx = index;
			return true;
		}
		return false;
	});
	return idx;
}

/**
 * Checks if the node can have the 'aria-hidden' attribute applied to it.
 * @param {HTMLElement} node
 * @returns {Boolean}
 * @private
 */
function isHidable(node) {
	return (
		node.nodeType === 1 &&
		BLACKLIST.indexOf(node.tagName.toLowerCase()) === -1
	);
}

/**
 * Updates the 'aria-hidden' attribute for all child nodes of the
 * container node except for the top level modal node.
 * @param {HTMLElement} container
 * @param {HTMLElement} modalRef
 * @param {Boolean} show
 * @private
 */
function ariaHiddenSiblings(container, modalRef, show) {
	[].forEach.call(container.children, siblingModalNode => {
		if (siblingModalNode !== modalRef && isHidable(siblingModalNode)) {
			ariaHidden(siblingModalNode, show);
		}
	});
}

/**
 * Updates the 'aria-hidden' attribute for a node based on if it should
 * be shown or not.
 * @param {HTMLElement} modalNode
 * @param {Boolean} show
 * @private
 */
function ariaHidden(modalNode, show) {
	if (show) {
		modalNode.setAttribute('aria-hidden', true);
	} else {
		modalNode.removeAttribute('aria-hidden');
	}
}

/**
 * Manages the state of containers as a single container node may have more than
 * one Modal component rendering into it.
 * @param {Object} props
 * @returns {Array}
 * @public
 */
function useModalManager() {
	/**
	 * Adds a modal and container node for the manager to track.
	 * @param {String} modalId
	 * @param {HTMLElement} modalContainer
	 */
	const add = useCallback((modalId, modalRef, modalContainer) => {
		let modalIdx = modals.indexOf(modalId);
		if (modalIdx !== -1) return modalIdx;

		modalIdx = modals.length;
		modals = [...modals, modalId];

		if (modalRef) {
			ariaHidden(modalRef, false);
		}

		ariaHiddenSiblings(modalContainer, modalRef, true);

		const containerIdx = getContainerIdx(modalContainer);
		if (containerIdx !== -1) {
			containers[containerIdx].modals = [
				...containers[containerIdx].modals,
				modalId,
			];
			return modalIdx;
		}

		containers = [
			...containers,
			{
				modals: [
					{
						id: modalId,
						ref: modalRef,
					},
				],
				ref: modalContainer,
			},
		];

		return modalIdx;
	}, []);

	/**
	 * Removes a modal from manager state.
	 * @param {String} modalId
	 * @param {HTMLElement} modalContainer
	 */
	const remove = useCallback((modalId, modalRef, modalContainer) => {
		const modalIdx = modals.indexOf(modalId);
		if (modalIdx === -1) return modalIdx;

		const containerIdx = getContainerIdx(modalContainer);
		const container = containers[containerIdx];

		modals = modals.filter(id => !id === modalId);
		container.modals = container.modals.filter(({ id }) => id !== modalId);

		// If this is the last modal in the container then remove it.
		if (container.modals.length === 0) {
			if (modalRef) {
				ariaHidden(modalRef, true);
			}

			ariaHiddenSiblings(modalContainer, modalRef, true);

			containers = containers.filter((c, idx) => idx !== containerIdx);
		}

		return modalIdx;
	}, []);

	/**
	 * Checks to see if the modal is the top modal with in a specific container.
	 * @param {String} modalId
	 */
	const topModal = useCallback(modalId => {
		return !!modals.length && modals[modals.length - 1] === modalId;
	}, []);

	return [topModal, add, remove];
}

export default useModalManager;
