import React, { isValidElement, useContext, useEffect, useRef, useState } from 'react';
import Transition from 'react-transition-group/Transition';
import EventListener from 'react-event-listener';
import debounce from 'debounce';
import getTransitionProps from './../utils/getTransitionProps';
import ownerWindow from './../utils/ownerWindow';
import { duration, easing, transition } from './../theme/createMotion';
import { usePrevious, useDidMount, useWillUnmount, useDidUpdate } from './../hooks';

const GUTTER = 24;

function getTranslationValue(direction, node) {
	const rect = node.getBoundingClientRect();
	const computedStyle = ownerWindow(node).getComputedStyle(node);
	const transform = computedStyle.getPropertyValue('transform');
	let offsetX = 0;
	let offsetY = 0;

	if (transform && transform !== 'none' && typeof transform === 'string') {
		const transformValues = transform
			.split('(')[1]
			.split(')')[0]
			.split(',');
		offsetX = parseInt(transformValues[4], 10);
		offsetY = parseInt(transformValues[5], 10);
	}

	switch (direction) {
		case 'left':
			return `translateX(100vw) translateX(-${rect.left - offsetX}px)`;
		case 'right':
			return `translateX(-${rect.left + rect.width + GUTTER - offsetX}px)`;
		case 'up':
			return `translateY(100vh) translateY(-${rect.top - offsetY}px)`;
		default:
			// Down
			return `translateY(-${rect.top + rect.height + GUTTER - offsetY}px)`;
	}
}

export function setTranslateValue(direction, node) {
	const transform = getTranslationValue(direction, node);
	if (transform) node.style.transform = transform;
}

function updatePosition(direction, node) {
	if (node) {
		node.style.visibility = 'inherit';
		setTranslateValue(direction, node);
	}
}

const Slide = React.memo(function Slide(props) {
	const prevDirection = usePrevious(props.direction);
	const [mounted, setMounted] = useState(true);
	const { current: transitionRef } = useRef(null);
	const {
		children,
		direction,
		in: inProp,
		onEnter,
		onEntering,
		onExit,
		onExited,
		style,
		timeout,
		...passThru
	} = props;
	const handleResize = debounce(() => {
		if ((!inProp || direction !== 'down' || direction !== 'right') && transitionRef) {
			setTranslateValue(direction, transitionRef);
		}
	}, 166);

	function handleEnter(node) {
		setTranslateValue(direction, node);
		node.scrollTop;
		if (onEnter) onEnter(node);
	}

	function handleEntering(node) {
		node.style.transition = transition('transform', {
			...getTransitionProps(timeout, style, 'enter'),
			easing: easing.out,
		});
		node.style.transform = 'translate(0,0)';
		if (onEntering) onEntering(node);
	}

	function handleExit(node) {
		node.style.transition = transition('transform', {
			...getTransitionProps(timeout, style, 'exit'),
			easing: easing.sharp,
		});
		setTranslateValue(direction, node);
		if (onExit) onExit(node);
	}

	function handleExited(node) {
		node.style.transition = '';
		if (onExited) onExited(node);
	}

	useDidMount(() => {
		setMounted(true);
		if (!inProp) updatePosition();
	});

	useDidUpdate(() => !inProp && updatePosition(), [inProp]);

	useWillUnmount(() => {
		handleResize.clear();
		setMounted(false);
	});

	let transitionStyle = {};

	if (!inProp && !mounted) transitionStyle.visibility = 'hidden';

	transitionStyle = {
		...transitionStyle,
		...style,
		...(isValidElement(children) ? children.props.style : {}),
	};

	return (
		<EventListener target="window" onResize={handleResize}>
			<Transition
				timeout={timeout}
				onEnter={handleEnter}
				onEntering={handleEntering}
				onExit={handleExit}
				onExited={handleExited}
				in={inProp}
				appear
				style={transitionStyle}
				ref={transitionRef}
				{...passThru}>
				{children}
			</Transition>
		</EventListener>
	);
});

Slide.propTypes = {};

Slide.defaultProps = {
	direction: 'down',
	timeout: {
		enter: duration.entering,
		exit: duration.leaving,
	},
};

export default Slide;
