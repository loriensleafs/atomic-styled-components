/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useRef, useEffect, useCallback } from 'react';
import keycode from 'keycode';
import useDidMount from './../hooks/useDidMount';
import useDidUpdate from './../hooks/useDidUpdate';
import ownerDocument from './../utils/ownerDocument';

const MAX_CHECK_TIMES = 5;

const FOCUS_VISIBLE_CHECK_TIME = 50;

const FOCUS_KEYS = ['tab', 'enter', 'space', 'esc', 'up', 'down', 'left', 'right'];

function isFocusKey(event) {
	return FOCUS_KEYS.indexOf(keycode(event)) > -1;
}

function findActiveElement(doc) {
	let activeElement = doc.activeElement;
	while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
		activeElement = activeElement.shadowRoot.activeElement;
	}
	return activeElement;
}

function useFocusVisible() {
	const [focusVisible, setFocusVisible] = useState(false);
	const focusKeyPressed = useRef(false);
	const checkFocusTimer = useRef();
	const keyUpTimer = useRef();

	function handleKeyUp(event) {
		if (isFocusKey(event)) {
			console.log('isFocusKeyUp');
			focusKeyPressed.current = true;
			clearTimeout(keyUpTimer.current);
			keyUpTimer.current = setTimeout(() => {
				focusKeyPressed.current = false;
			}, 1e3);
		}
	}

	function checkFocusVisibility(ref, cb, attempts) {
		checkFocusTimer.current = setTimeout(() => {
			const doc = ownerDocument(ref);
			const activeElement = findActiveElement(doc);

			if (focusKeyPressed.current && (activeElement === ref || ref.contains(activeElement))) {
				console.log('checkFocusVisibility => key pressed');
				if (cb) cb(event);
				setFocusVisible(() => true);
			} else if (attempts < MAX_CHECK_TIMES) {
				console.log('checkFocusVisibility attempt => ' + attempts);
				checkFocusVisibility(ref, cb, attempts + 1);
			}
		}, FOCUS_VISIBLE_CHECK_TIME);
	}

	const focusVisibilityHandler = (disabled, cb) => event => {
		if (!disabled) {
			event.persist();
			checkFocusVisibility(event.currentTarget, cb, 1);
		}
	};

	useDidMount(() => {
		document.addEventListener('keyup', handleKeyUp);
		return () => {
			window.removeEventListener('keyup', handleKeyUp);
			clearTimeout(keyUpTimer.current);
			console.log('cleared checkKeyUp timeout');
		};
	});

	return {
		focusVisible,
		focusVisibilityHandler,
		checkFocusTimer,
		setFocusVisible,
	};
}

export default useFocusVisible;
