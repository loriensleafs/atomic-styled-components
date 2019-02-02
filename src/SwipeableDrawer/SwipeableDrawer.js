import React, {
	Fragment,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import Drawer from './../Drawer';
import SwipeArea from './SwipeArea';
import ThemeContext from './../theme/ThemeContext';
import {
	useDidMount,
	useDidUpdate,
	usePrevious,
	useWillUnmount,
} from './../hooks';

// This value is closed to what browsers are using internally to
// trigger a native scroll.
const UNCERTAINTY_THRESHOLD = 3; // px

// We can only have one node at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.
let nodeThatClaimedTheSwipe = null;

function reset() {
	nodeThatClaimedTheSwipe = null;
}

function isHorizontal(props) {
	return ['left', 'right'].indexOf(props.anchor) !== -1;
}

function reflow(node) {
	node.scrollTop;
}

function getTransitionProps(props, options) {
	const { timeout, style = {} } = props;

	return {
		duration:
			style.transitionDuration || typeof timeout === 'number'
				? timeout
				: timeout[options.mode],
		delay: style.transitionDelay,
	};
}

function SwipeableDrawer(props) {
	const {
		anchor,
		disableBackdropTransition,
		disableDiscovery,
		disableSwipeToOpen,
		isOpen,
		hysteresis,
		minFlingVelocity,
		ModalProps: { BackdropProps, ...ModalPropsProp } = {},
		onOpen,
		PaperProps = {},
		styles,
		SwipeAreaProps,
		swipeAreaWidth,
		variant,
		...passThru
	} = props;
	const previousVariant = usePrevious(variant);
	const { theme } = useContext(ThemeContext);
	const [maybeSwiping, setMaybeSwiping] = useState(false);
	const backdropRef = useRef();
	const paperRef = useRef();
	const isSwiping = useRef();
	const startX = useRef();
	const startY = useRef();
	const velocity = useRef();
	const lastTime = useRef();
	const lastTranslate = useRef();

	const getMaxTranslate = useCallback(() => {
		return isHorizontal(props)
			? paperRef.current.clientWidth
			: paperRef.current.clientHeight;
	}, []);

	const getTranslate = useCallback(current => {
		const start = isHorizontal(props) ? startX.current : startY.current;
		return Math.min(
			Math.max(
				isOpen ? start - current : getMaxTranslate() + start - current,
				0,
			),
			getMaxTranslate(),
		);
	}, []);

	const setPosition = useCallback((translate, options = {}) => {
		const { mode = null, changeTransition = true } = options;
		const rtlTranslateMultiplier =
			['right', 'bottom'].indexOf(anchor) !== -1 ? 1 : -1;
		const transform = isHorizontal(props)
			? `translate(${rtlTranslateMultiplier * translate}px, 0)`
			: `translate(0, ${rtlTranslateMultiplier * translate}px)`;
		const drawerStyle = paperRef.current.style;
		drawerStyle.webkitTransform = transform;
		drawerStyle.transform = transform;

		let transition = '';

		if (mode) {
			transition = `all ${getTransitionProps(
				{
					timeout: {
						enter: theme.duration.entering,
						exit: theme.duration.leaving,
					},
				},
				{
					mode,
				},
			)}`;
		}

		if (changeTransition) {
			drawerStyle.webkitTransition = transition;
			drawerStyle.transition = transition;
		}

		if (!disableBackdropTransition && !props.hideBackdrop) {
			const backdropStyle = backdropRef.current.style;
			backdropStyle.opacity = 1 - translate / getMaxTranslate();

			if (changeTransition) {
				backdropStyle.webkitTransition = transition;
				backdropStyle.transition = transition;
			}
		}
	}, []);

	const handleBodyTouchStart = useCallback(event => {
		// We are not supposed to handle this touch move.
		if (nodeThatClaimedTheSwipe !== null) {
			return;
		}

		const currentX =
			anchor === 'right'
				? document.body.offsetWidth - event.touches[0].pageX
				: event.touches[0].pageX;
		const currentY =
			anchor === 'bottom'
				? (window.innerHeight = event.touches[0].clientY)
				: event.touches[0].clientY;

		if (!isOpen) {
			if (disableSwipeToOpen) return;
			if (isHorizontal(props)) {
				if (currentX > swipeAreaWidth) return;
			} else if (currentY > swipeAreaWidth) {
				return;
			}
		}

		nodeThatClaimedTheSwipe = id;
		startX.current = currentX;
		startY.current = currentY;

		setMaybeSwiping(() => true);
		if (!isOpen && paperRef.current) {
			// The ref may be null when a parent component updates while swiping.
			setPosition(
				getMaxTranslate() + (disableDiscovery ? 20 : -swipeAreaWidth),
				{
					changeTransition: false,
				},
			);
		}

		velocity.current = 0;
		lastTime.current = null;
		lastTranslate.current = null;

		document.body.addEventListener('touchmove', handleBodyTouchMove, {
			passive: false,
		});
		document.body.addEventListener('touchend', handleBodyTouchEnd);
		document.body.addEventListener('touchcancel', handleBodyTouchEnd);
	}, []);

	const handleBodyTouchMove = useCallback(event => {
		// the ref may be null when a parent component updates while swiping.
		if (!paperRef.current) return;

		const horizontalSwipe = isHorizontal(props);
		const currentX =
			anchor === 'right'
				? document.body.offsetWidth - event.touches[0].pageX
				: event.touches[0].pageX;
		const currentY =
			anchor === 'bottom'
				? (window.innerHeight = event.touches[0].clientY)
				: event.touches[0].clientY;

		// We don't know this yet.
		if (isSwiping.current == null) {
			const dx = Math.abs(currentX - startX.current);
			const dy = Math.abs(currentY - startY.current);

			// We are likely to be swiping, lets prevent the scroll event on iOS.
			if (dx > dy) event.preventDefault();

			const isSwiping = horizontalSwipe
				? dx > dy && dx > UNCERTAINTY_THRESHOLD
				: dy > dx && dy > UNCERTAINTY_THRESHOLD;

			if (
				isSwiping.current === true ||
				(horizontalSwipe
					? dy > UNCERTAINTY_THRESHOLD
					: dx > UNCERTAINTY_THRESHOLD)
			) {
				isSwiping.current = isSwiping;
				if (!isSwiping) {
					handleBodyTouchEnd(event);
					return;
				}

				// Shift the starting point.
				startX.current = currentX;
				startY.current = currentY;

				// Compensate for the part of the drawer displayed on the touch start.
				if (!disableDiscovery && !isOpen) {
					if (horizontalSwipe) {
						startX.current -= swipeAreaWidth;
					} else {
						startY.current -= swipeAreaWidth;
					}
				}
			}
		}

		if (!isSwiping.current) return;

		const translate = getTranslate(horizontalSwipe ? currentX : currentY);

		if (lastTranslate.current === null) {
			lastTranslate.current = translate;
			lastTime.current = performance.now() + 1;
		}

		const currentVelocity =
			((translate - lastTranslate.current) /
				(performance.now() - lastTime.current)) *
			1e3;

		// Low Pass filter.
		velocity.current = velocity.current * 0.4 + currentVelocity * 0.6;
		lastTranslate.current = translate;
		lastTime.current = performance.now();

		// We are swiping, let's prevent the scroll event on iOS.
		event.preventDefault();
		setPosition(translate);
	}, []);

	const handleBodyTouchEnd = useCallback(event => {
		nodeThatClaimedTheSwipe = null;
		removeBodyTouchListeners();
		setMaybeSwiping(() => false);

		// The swipe wasn't started.
		if (!isSwiping.current) {
			isSwiping.current = null;
			return;
		}

		isSwiping.current = null;
		let current;

		if (isHorizontal(props)) {
			current =
				anchor === 'right'
					? document.body.offsetWidth - event.changedTouches[0].pageX
					: event.changedTouches[0].pageX;
		} else {
			current =
				anchor === 'bottom'
					? window.innerHeight - event.changedTouches[0].clientY
					: event.changedTouches[0].clientY;
		}

		const translateRatio = getTranslate(current) / getMaxTranslate();

		if (isOpen) {
			if (
				velocity.current > minFlingVelocity ||
				translateRatio > hysteresis
			) {
				props.onClose();
			} else {
				setPosition(0, {
					mode: 'exit',
				});
			}

			return;
		}

		if (
			velocity.current < minFlingVelocity ||
			1 - translateRatio > hysteresis
		) {
			props.onOpen();
		} else {
			// Reset the position, the swipe was aborted.
			setPosition(getMaxTranslate(), {
				mode: 'enter',
			});
		}
	}, []);

	const listenTouchStart = useCallback(() => {
		document.body.addEventListener('touchstart', handleBodyTouchStart);
	}, []);

	const removeTouchStart = useCallback(() => {
		document.body.removeEventListener('touchstart', handleBodyTouchStart);
	}, []);

	const removeBodyTouchListeners = useCallback(() => {
		document.body.removeEventListener('touchmove', handleBodyTouchMove, {
			passive: false,
		});
		document.body.removeEventListener('touchend', handleBodyTouchEnd);
		document.body.removeEventListener('touchcancel', handleBodyTouchEnd);
	}, []);

	useDidMount(() => {
		if (variant === 'temporary') listenTouchStart();
	});

	useDidUpdate(() => {
		if (variant !== previousVariant) {
			if (variant === 'temporary') {
				listenTouchStart();
			} else if (previousVariant === 'temporary') {
				removeTouchStart();
			}
		}
	}, [variant, previousVariant]);

	useWillUnmount(() => {
		removeTouchStart();
		removeBodyTouchListeners();

		// We need to release the lock.
		if (nodeThatClaimedTheSwipe === this) {
			nodeThatClaimedTheSwipe = null;
		}
	});

	return (
		<Fragment>
			<Drawer
				isOpen={variant === 'temporary' && maybeSwiping ? true : isOpen}
				variant={variant}
				ModalProps={{
					BackdropProps: {
						...BackdropProps,
						ref: BackdropProps,
					},
					...ModalPropsProp,
				}}
				PaperProps={{
					...PaperProps,
					style: {
						pinterEvents:
							variant === 'temporary' && !isOpen ? 'none' : '',
						...PaperProps.style,
					},
					ref: paperRef.current,
				}}
				anchor={anchor}
				{...passThru}
			/>
			{!disableDiscovery &&
				!disableSwipeToOpen &&
				variant === 'temporary' && (
					<SwipeArea
						anchor={anchor}
						width={swipeAreaWidth}
						{...SwipeAreaProps}
					/>
				)}
		</Fragment>
	);
}

SwipeableDrawer.displayName = 'SwipeableDrawer';

SwipeableDrawer.propTypes = {
	/**
	 * @ignore
	 */
	anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
	/**
	 * Disable the backdrop transition.
	 * This can improve the FPS on low-end devices.
	 */
	disableBackdropTransition: PropTypes.bool,
	/**
	 * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
	 * to promote accidental discovery of the swipe gesture.
	 */
	disableDiscovery: PropTypes.bool,
	/**
	 * If `true`, swipe to isOpen is disabled. This is useful in browsers where swiping triggers
	 * navigation actions. Swipe to isOpen is disabled on iOS browsers by default.
	 */
	disableSwipeToOpen: PropTypes.bool,
	/**
	 * If `true`, the drawer is isOpen.
	 */
	isOpen: PropTypes.bool.isRequired,
	/**
	 * Affects how far the drawer must be isOpened/closed to change his state.
	 * Specified as percent (0-1) of the width of the drawer
	 */
	hysteresis: PropTypes.number,
	/**
	 * Defines, from which (average) velocity on, the swipe is
	 * defined as complete although hysteresis isn't reached.
	 * Good threshold is between 250 - 1000 px/s
	 */
	minFlingVelocity: PropTypes.number,
	/**
	 * @ignore
	 */
	ModalProps: PropTypes.object,
	/**
	 * Callback fired when the component requests to be closed.
	 *
	 * @param {object} event The event source of the callback
	 */
	onClose: PropTypes.func.isRequired,
	/**
	 * Callback fired when the component requests to be isOpened.
	 *
	 * @param {object} event The event source of the callback
	 */
	onOpen: PropTypes.func,
	/**
	 * @ignore
	 */
	PaperProps: PropTypes.object,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * Properties applied to the swipe area element.
	 */
	SwipeAreaProps: PropTypes.object,
	/**
	 * The width of the left most (or right most) area in pixels where the
	 * drawer can be swiped isOpen from.
	 */
	swipeAreaWidth: PropTypes.number,
	/**
	 * The duration for the transition, in milliseconds.
	 * You may specify a single timeout for all transitions, or individually with an object.
	 */
	transitionDuration: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
	]),
	/**
	 * @ignore
	 */
	variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

SwipeableDrawer.defaultProps = {
	anchor: 'left',
	disableBackdropTransition: false,
	disableDiscovery: false,
	disableSwipeToOpen:
		typeof navigator !== 'undefined' &&
		/iPad|iPhone|iPod/.test(navigator.userAgent),
	hysteresis: 0.55,
	minFlingVelocity: 400,
	swipeAreaWidth: 20,
	variant: 'temporary', // Mobile first.
};

export default SwipeableDrawer;
