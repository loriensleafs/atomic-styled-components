import { useCallback, useEffect, useRef, useState } from 'react';
import ownerWindow from '../utils/ownerWindow';
import ownerDocument from '../utils/ownerDocument';
import usePrevious from '../hooks/usePrevious';

/**
 * The keys that might change document.activeElement.
 */
const FOCUS_KEYS = [
	9, // 'Tab',
	13, // 'Enter',
	27, // 'Escape',
	32, // ' ',
	36, // 'Home',
	35, // 'End',
	37, // 'ArrowLeft',
	38, // 'ArrowUp',
	39, // 'ArrowRight',
	40, // 'ArrowDown',
];

const CHECK_DURATION = 50;

const MAX_CHECKS = 5;

/**
 * Gets the current active element of the document.
 * @param {HTMLElement} ref
 * @returns {HTMLElement}
 */
const findActiveElement = ref => {
	let { activeElement } = ownerDocument(ref);
	while (
		activeElement &&
		activeElement.shadowRoot &&
		activeElement.shadowRoot.activeElement
	) {
		activeElement = activeElement.shadowRoot.activeElement;
	}
	return activeElement;
};

/**
 * Checks if a focus key has been pressed.
 * @param {Object} event The event object.
 * @returns {bool} If true a focus key was pressed, otherwise false.
 */
const isFocusKey = event => FOCUS_KEYS.includes(event.keyCode);

export default function useFocus(ref) {
	const [focusVisible, setFocusVisible] = useState(false);
	const prevFocusVisible = usePrevious(focusVisible);
	const focusKeyPressed = useRef(false);
	const focusTimer = useRef(-1);
	const keyUpTimer = useRef(-1);

	const handleKeyUp = event => {
		if (isFocusKey(event)) {
			focusKeyPressed.current = true;

			// Assume user is using a keyboard during a window frame of 500ms.
			clearTimeout(keyUpTimer.current);
			keyUpTimer.current = setTimeout(() => {
				focusKeyPressed.current = true;
			}, 500);
		}
	};

	const checkFocusVisible = (ref, timesChecked = 1) => {
		focusTimer.current = setTimeout(() => {
			const activeElement = findActiveElement(ref);

			if (
				focusKeyPressed.current &&
				(activeElement === ref || ref.contains(activeElement))
			) {
				setFocusVisible(true);
			} else if (timesChecked < MAX_CHECKS) {
				checkFocusVisible(ref, timesChecked + 1);
			}
		}, CHECK_DURATION);
	};

	const focusHandler = useCallback(() => checkFocusVisible(ref.current), [
		focusVisible,
	]);

	const blurHandler = useCallback(
		() => focusVisible && setFocusVisible(false),
		[focusVisible],
	);

	const mouseDownHandler = useCallback(
		() => focusVisible && setFocusVisible(false),
		[focusVisible],
	);

	useEffect(() => {
		ownerWindow(ref.current).addEventListener('keyup', handleKeyUp);
		return () =>
			ownerWindow(ref.current).removeEventListener('keyup', handleKeyUp);
	}, []);

	return {
		blurHandler,
		focusHandler,
		mouseDownHandler,
		set: setFocusVisible,
		visible: focusVisible,
		previous: prevFocusVisible,
	};
}
