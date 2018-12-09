import React, { isValidElement, useRef, useReducer, useEffect, useCallback, useState } from 'react';
import { Spring, animated, useSpring } from 'react-spring';
import EventListener from 'react-event-listener';
import debounce from 'debounce';
import useDidMount from './../hooks/useDidMount';
import useDidUpdate from './../hooks/useDidUpdate';
import usePrevious from './../hooks/usePrevious';
import useWillUnmount from './../hooks/useWillUnmount';
import ownerWindow from './../utils/ownerWindow';

const GUTTER = 24;

function getRect(ref) {
	const rect = ref.current.getBoundingClientRect();
	const computedStyle = ownerWindow(ref.current).getComputedStyle(ref.current);
	const transform =
		computedStyle.getPropertyValue('-webkit-transform') ||
		computedStyle.getPropertyValue('transform');
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

	return { offsetX, offsetY, rect };
}

function slideFromReducer(state, action) {
	const { offsetX, offsetY, rect } = getRect(action.ref);

	switch (action.direction) {
		case 'left':
			return `translateX(${window.innerWidth + -(rect.left - offsetX)}px)`;
		case 'right':
			return `translateX(-${rect.left + rect.width + GUTTER - offsetX}px)`;
		case 'up':
			return `translateY(${window.innerHeight + -(rect.top - offsetY)}px)`;
		default:
			// Down
			return `translateY(-${rect.top + rect.height + GUTTER - offsetY}px)`;
	}
}

function Slide(props) {
	const { children, direction, in: inProp, onEnd, onStart, ...passThru } = props;
	const ref = useRef();
	const slideTo = `translate${direction === 'left' || direction === 'right' ? 'X' : 'Y'}(0px)`;
	const [slideFrom, dispatch] = useReducer(slideFromReducer, slideTo);
	const handleStart = useCallback(() => onStart && onStart(), []);
	const handleEnd = useCallback(() => onEnd && onEnd(), []);

	const handleResize = useCallback(
		debounce(() => {
			if (props.in || direction === 'down' || direction === 'right') {
				return;
			}
			dispatch({ ref, direction });
		}, 166),
		[],
	); // Corresponds to 10 frames at 60 Hz.

	useDidMount(() => {
		window.addEventListener('resize', handleResize);
		dispatch({ ref, direction });
	});

	useDidUpdate(() => dispatch({ ref, direction }), [inProp]);

	useWillUnmount(() => window.removeEventListener('resize', handleResize));

	return (
		<Spring
			from={{ transform: inProp ? slideFrom : slideTo }}
			to={{ transform: inProp ? slideTo : slideFrom }}
			onStart={handleStart}
			onRest={handleEnd}>
			{style =>
				React.cloneElement(children, {
					style,
					ref,
					...passThru,
				})
			}
		</Spring>
	);
}

Slide.displayName = 'Slide';

Slide.propTypes = {};

Slide.defaultProps = {
	direction: 'down',
};

export default Slide;
