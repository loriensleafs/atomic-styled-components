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

/**
 * The amount of time between checking if an element has focus.
 */
const CHECK_DURATION = 50;

/**
 * Maximum amount of times to check if an element has focus.
 */
const MAX_CHECKS = 5;

/**
 * Gets the current active element of the document.
 * @param   {element} ref - Element to get the current ownerDocument of.
 * @returns {element} The active element of the current owner document.
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
 * @param   {object} event The event object.
 * @returns {bool}   If true a focus key was pressed, otherwise false.
 */
const isFocusKey = event => FOCUS_KEYS.includes(event.keyCode);

/**
 * The focus state of an element.
 * @param  {object}       ref - Mutable reference to the input HTML element.
 * @param  {element}      ref.current - Current input HTML element.
 * @return {object}       API - The API of the hook.
 * @return {function}     API.handleBlur - Handler for blur events.
 * @return {function}     API.handleFocus - Handler for focus events.
 * @return {function}     API.handleMouseDown - Handler for mouse down events.
 * @return {boolean|null} API.previous - The previous state value of
 * API.visible.
 * @return {function}     API.set - Manually set the focus's visibility state.
 * @return {boolean}      API.visible - True if the element has focus, else false.
 */
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

	/**
	 * Schedule check to see if a ref has been focused.
	 * @param {element} ref - The element to check the focus of.
	 * @param {number}  timesChecked - How many times the ref has been checked.
	 */
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

	/**
	 * Memoized callback for focus events.
	 */
	const handleFocus = useCallback(() => checkFocusVisible(ref.current), [
		focusVisible,
	]);

	/**
	 * A memoized callback for blur events.
	 */
	const handleBlur = useCallback(() => {
		if (focusVisible) {
			setFocusVisible(false);
		}
	}, [focusVisible]);

	/**
	 * Memoized callback for mouse down events.
	 */
	const handleMouseDown = useCallback(() => {
		if (focusVisible) {
			setFocusVisible(false);
		}
	}, [focusVisible]);

	useEffect(() => {
		ownerWindow(ref.current).addEventListener('keyup', handleKeyUp);
		return () =>
			ownerWindow(ref.current).removeEventListener('keyup', handleKeyUp);
	}, []);

	return {
		handleBlur,
		handleFocus,
		handleMouseDown,
		previous: prevFocusVisible,
		set: setFocusVisible,
		visible: focusVisible,
	};
}
