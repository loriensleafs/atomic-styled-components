import { useCallback, useEffect, useRef } from 'react';

let modals = [];
let containers = [];

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

function useModalManager(modal, container) {
	const isTopModal = useRef(false);

	const checkIsTopModal = useCallback(
		() => !!modals.length && modals[modals.length - 1] === modal,
		[],
	);

	const addModal = useCallback(() => {
		let modalIdx = modals.indexOf(modal);
		if (modalIdx !== -1) return;

		modalIdx = modals.length;
		modals = [...modals, modal];

		const containerIdx = getContainerIdx(container);
		if (containerIdx !== -1) {
			containers[containerIdx].modals = [
				...containers[containerIdx].modals,
				modal,
			];
			return modalIdx;
		}

		containers = [
			...containers,
			{
				modals: [modal],
				ref: container,
			},
		];

		if (checkIsTopModal()) {
			isTopModal.current = true;
		}
	}, []);

	const removeModal = useCallback(() => {
		const modalIdx = modals.indexOf(modal);
		if (modalIdx === -1) return;

		const containerIdx = getContainerIdx(container);

		modals = modals.filter(m => !m === modal);
		containers[containerIdx].modals = containers[
			containerIdx
		].modals.filter(m => m !== modal);

		// If this is the last modal in the container then remove it.
		if (containers[containerIdx].modals.length === 0) {
			containers = containers.filter((c, idx) => idx !== containerIdx);
		}

		return;
	}, []);

	useEffect(() => {
		if (isTopModal.current !== checkIsTopModal()) {
			isTopModal.current = !isTopModal.current;
		}
	}, [modals]);

	return [isTopModal, addModal, removeModal];
}

export default useModalManager;
