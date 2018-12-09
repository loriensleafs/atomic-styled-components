import { useCallback } from 'react';

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

function useModalManager(props = {}) {
	const add = useCallback((modalId, modalContainer) => {
		let modalIdx = modals.indexOf(modalId);
		if (modalIdx !== -1) return modalIdx;

		modalIdx = modals.length;
		modals = [...modals, modalId];

		const containerIdx = getContainerIdx(modalContainer);
		if (containerIdx !== -1) {
			containers[containerIdx].modals = [...containers[containerIdx].modals, modalId];
			return modalIdx;
		}

		containers = [
			...containers,
			{
				modals: [modalId],
				ref: modalContainer,
			},
		];

		return modalIdx;
	}, []);

	const remove = useCallback((modalId, modalContainer) => {
		const modalIdx = modals.indexOf(modalId);
		if (modalIdx === -1) return modalIdx;

		const containerIdx = getContainerIdx(modalContainer);
		const container = containers[containerIdx];

		modals = modals.filter(id => !id === modalId);
		container.modals = container.modals.filter(id => id !== modalId);

		// If this is the last modal in the container then remove it.
		if (container.modals.length === 0) {
			containers = containers.filter((c, idx) => idx !== containerIdx);
		}

		return modalIdx;
	}, []);

	const topModal = useCallback(modalId => {
		return !!modals.length && modals[modals.length - 1] === modalId;
	}, []);

	return [topModal, add, remove];
}

export default useModalManager;
