import { useCallback, useEffect, useRef, useState } from 'react';
import useDidUpdate from '../hooks/useDidUpdate';
import { is } from './../utils/helpers';

const containers = new Map();

/**
 * Manages the state of containers as a single container node may have more than
 * one Modal component rendering into it.
 */
function useModals(modalRef, containerRef) {
	const [isTopModal, setIsTopModal] = useState(false);
	const [modals, setModals] = useState(null);

	// Adds a modal and container node for the manager to track.
	const add = useCallback(() => {
		if (!containers.has(containerRef.current)) {
			containers.set(containerRef.current, {
				modals: new Set(),
			});
		}

		const container = containers.get(containerRef.current);

		if (!container.modals.has(modalRef)) {
			container.modals.add(modalRef);
		}
		setIsTopModal(() => true);
		setModals(() => [...container.modals]);
	}, []);

	const remove = useCallback(() => {
		if (!containers.has(containerRef.current)) return false;
		const container = containers.get(containerRef.current);

		if (container.modals.has(modalRef)) {
			container.modals.delete(modalRef);
			setModals(() => [...container.modals]);
		}

		if (container.modals.size === 0) {
			containers.delete(containerRef.current);
		}
	}, []);

	// Checks to see if the modal is the top modal with in a specific container.
	const getTopModal = useCallback(() => {
		if (!containers.has(containerRef.current)) return null;
		const container = containers.get(containerRef.current);

		return container.modals && container.modals.size > 0
			? [...container.modals].pop()
			: null;
	}, []);

	useDidUpdate(
		() => {
			const modal = modalRef.current;
			const topModal = getTopModal();
			const isTop =
				is(modal) &&
				is(topModal) &&
				is(topModal.current) &&
				modal === topModal.current;

			setIsTopModal(isTop);
		},
		[modalRef.current, modals],
	);

	return [isTopModal, add, remove];
}

export default useModals;
