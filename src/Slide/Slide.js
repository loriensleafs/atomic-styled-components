import React, { isValidElement, useRef, useReducer, useEffect, useCallback, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import EventListener from 'react-event-listener';
import debounce from 'debounce';
import useDidMount from './../hooks/useDidMount';
import useDidUpdate from './../hooks/useDidUpdate';
import usePrevious from './../hooks/usePrevious';
import useWillUnmount from './../hooks/useWillUnmount';
import ownerWindow from './../utils/ownerWindow';

const GUTTER = 24;

const SLIDE_TO = 'translateY(0)';

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

function slideToReducer(state, action) {
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
	const { className, children, direction } = props;
	const ref = useRef();
	const [mounted, setMounted] = useState(false);
	const [slideTo, updateSlideTo] = useReducer(slideToReducer, SLIDE_TO);
	const prevSlideTo = useRef(slideTo || SLIDE_TO);
	const prevDirection = usePrevious(direction);
	const [slideTransition] = useSpring({
		transform: mounted || props.in ? 'translateY(0px)' : slideTo,
		from: {
			transform: 'translateY(0px)',
		},
	});

	const handleResize = useCallback(
		debounce(() => {
			if (props.in || direction === 'down' || direction === 'right') {
				return;
			}
			updateSlideTo({ ref, direction, in: props.in });
		}, 166),
		[],
	); // Corresponds to 10 frames at 60 Hz.

	useDidMount(() => {
		updateSlideTo({ ref, direction });
		setMounted(() => false);
	});

	useDidUpdate(
		() => {
			if (!props.in) updateSlideTo({ ref, direction });
		},
		[props.in, mounted],
	);

	return (
		<animated.div className={className} style={slideTransition} ref={ref}>
			{children}
		</animated.div>
	);
}

Slide.displayName = 'Slide';

Slide.propTypes = {};

Slide.defaultProps = {
	direction: 'down',
};

export default Slide;
