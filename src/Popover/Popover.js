import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Grow from '../Grow';
import Modal from '../Modal';
import Paper from '../Paper';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import useStyles from '../system/useStyles';
import useSize from '../hooks/useSize';
import throttle from '../utils/throttle';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const getTransformOriginValue = transformOrigin =>
	[transformOrigin.horizontal, transformOrigin.vertical]
		.map(n => (typeof n === 'number' ? `${n}px` : n))
		.join(' ');

// Sum the scrollTop between two elements.
const getScrollParent = (parent, child) => {
	let element = child;
	let scrollTop = 0;

	while (element && element !== parent) {
		element = element.parentNode;
		scrollTop += element.scrollTop;
	}
	return scrollTop;
};

const getAnchor = anchor => (typeof anchor === 'function' ? anchor() : anchor);

const baseStyles = {
	position: 'absolute',
	minWidth: '16px',
	minHeight: '16px',
	maxWidth: 'calc(100% - 32px)',
	maxHeight: 'calc(100% - 32px)',
	outline: 'none',
};

const Popover = forwardRef((props, ref) => {
	const {
		action,
		anchorToRef,
		anchorOrigin,
		anchorPosition,
		anchorReference,
		children,
		container: containerProp,
		contentAnchorRef,
		duration,
		ease,
		elevation,
		open,
		marginThreshold,
		onEnter,
		onEntering,
		onEntered,
		onExit,
		onExiting,
		onExited,
		PaperProps,
		role,
		transformOrigin,
		TransitionComponent,
		...passThru
	} = props;
	const popoverRef = ref ? ref : useRef(null);
	const popoverRect = useSize(popoverRef, [
		'left',
		'offsetWidth',
		'offsetHeight',
		'scrollTop',
		'top',
	]);

	// If the container prop is provided use it.
	// If the anchor prop is provided, use it's parent body element.
	// If neither are provided let the Modal take care of the container.
	const container = containerProp
		? containerProp
		: anchor
		? ownerDocument(getAnchor(anchor)).body
		: undefined;

	const handleGetOffsetTop = useCallback((rect, horizontal) => {
		let offset = 0;

		if (typeof horizontal === 'number') {
			offset = horizontal;
		} else if (horizontal === 'center') {
			offset = rect.width / 2;
		} else if (horizontal === 'right') {
			offset = rect.width;
		}
		return offset;
	}, []);

	const handleGetOffsetLeft = useCallback((rect, horizontal) => {
		let offset = 0;

		if (typeof horizontal === 'number') {
			offset = horizontal;
		} else if (horizontal === 'center') {
			offset = rect.width / 2;
		} else if (horizontal === 'right') {
			offset = rect.width;
		}
		return offset;
	}, []);

	const handleResize = useCallback(() => {}, [ref]);

	const getAnchorOffset = useCallback(() => {}, [anchor]);

	const getContentAnchorOffset = useCallback(() => {
		let contentAnchorOffset = 0;

		if (
			popoverRef.current &&
			contentAnchorRef.current &&
			anchorReference === 'anchorToRef' &&
			anchorToRef.current
		) {
			if (popoverRef.current.contains(contentAnchorRef.current)) {
				const scrollTop = getScrollParent(
					popoverRef.current,
					contentAnchorRef.current,
				);
				contentAnchorOffset =
					contentAnchorRef.current.offsetTop +
						contentAnchorRef.clientHeight / 2 -
						scrollTop || 0;
			}
		}

		return contentAnchorOffset;
	}, [contentAnchorRef.current]);

	const getPositioningStyles = useCallback(element => {}, [ref.current]);

	const setPositioningStyles = useCallback(element => {}, [ref.current]);

	useEffect(() => {
		if (action) {
			action({
				updatePosition: handleResize,
			});
		}
	}, []);

	useEffect(() => {}, [paperRect]);

	return (
		<Modal
			className={className}
			container={container}
			open={open}
			BackdropProps={{ invisible: true }}
			{...passThru}
		>
			<TransitionComponent
				appear
				duration={duration}
				ease={ease}
				onEnter={onEnter}
				onEntering={onEntering}
				onEntered={onEntered}
				onExit={onExit}
				onExiting={onExiting}
				onExited={onExited}
				role={role}
				show={open}
			>
				<Paper elevation={elevation} ref={paperRef} {...PaperProps}>
					{children}
				</Paper>
			</TransitionComponent>
		</Modal>
	);
});

Popover.displayName = 'Popover';

Popover.propTypes = {
	/**
	 * This is callback property. It's called by the component on mount.
	 * This is useful when you want to trigger an action programmatically.
	 * It currently only supports updatePosition() action.
	 *
	 * @param {object} actions This object contains all possible actions
	 * that can be triggered programmatically.
	 */
	action: PropTypes.func,
	/**
	 * This is the DOM element, or a function that returns the DOM element,
	 * that may be used to set the position of the popover.
	 */
	anchor: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	/**
	 * This is the point on the anchor where the popover's
	 * `anchorEl` will attach to. This is not used when the
	 * anchorReference is 'anchorPosition'.
	 *
	 * Options:
	 * vertical: [top, center, bottom];
	 * horizontal: [left, center, right].
	 */
	anchorOrigin: PropTypes.shape({
		horizontal: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.oneOf(['left', 'center', 'right']),
		]).isRequired,
		vertical: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.oneOf(['top', 'center', 'bottom']),
		]).isRequired,
	}),
	/**
	 * This is the position that may be used
	 * to set the position of the popover.
	 * The coordinates are relative to
	 * the application's client area.
	 */
	anchorPosition: PropTypes.shape({
		left: PropTypes.number.isRequired,
		top: PropTypes.number.isRequired,
	}),
	/*
	 * This determines which anchor prop to refer to to set
	 * the position of the popover.
	 */
	anchorReference: PropTypes.oneOf(['anchorEl', 'anchorPosition', 'none']),
	// The content of the component.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object.isRequired,
	/**
	 * A node, component instance, or function that returns either.
	 * The `container` will passed to the Modal component.
	 * By default, it uses the body of the anchorEl's top-level document object,
	 * so it's simply `document.body` most of the time.
	 */
	container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	// The elevation of the popover.
	elevation: PropTypes.number,
	/**
	 * This function is called in order to retrieve the content anchor element.
	 * It's the opposite of the `anchorEl` property.
	 * The content anchor element should be an element inside the popover.
	 * It's used to correctly scroll and set the position of the popover.
	 * The positioning strategy tries to make the content anchor element just
	 * above the
	 * anchor element.
	 */
	duration: PropTypes.shape({
		// The duration type the animation should use to transition in.
		enter: PropTypes.string,
		// The duration type the animation should use to transition out.
		exit: PropTypes.string,
	}),
	// The easing type the animation should use.
	ease: PropTypes.string,
	getContentAnchorEl: PropTypes.func,
	// Specifies how close to the edge of the window the popover can appear.
	marginThreshold: PropTypes.number,
	// `classes` property applied to the [`Modal`](/api/modal/) element.
	ModalClasses: PropTypes.object,
	/**
	 * Callback fired when the component requests to be closed.
	 *
	 * @param {object} event The event source of the callback.
	 * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`
	 */
	onClose: PropTypes.func,
	onEnter: PropTypes.func,
	// Callback that is triggered while the animation is entering.
	onEntering: PropTypes.func,
	// Callback that is triggered at the start of the animation.
	onEntered: PropTypes.func,
	// Callback that is trigged when exit animation starts.
	onExit: PropTypes.func,
	// Callback that is triggered while the animation is exiting.
	onExiting: PropTypes.func,
	// Callback that is triggered at the end of the animation.
	onExited: PropTypes.func,
	// If `true`, the popover is visible.
	open: PropTypes.bool.isRequired,
	// Properties applied to the [`Paper`](/api/paper/) element.
	PaperProps: PropTypes.object,
	role: PropTypes.string,
	/**
	 * This is the point on the popover which
	 * will attach to the anchor's origin.
	 *
	 * Options:
	 * vertical: [top, center, bottom, x(px)];
	 * horizontal: [left, center, right, x(px)].
	 */
	transformOrigin: PropTypes.shape({
		horizontal: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.oneOf(['left', 'center', 'right']),
		]).isRequired,
		vertical: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.oneOf(['top', 'center', 'bottom']),
		]).isRequired,
	}),
	// The component used for the transition.
	TransitionComponent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	// Properties applied to the `Transition` element.
	TransitionProps: PropTypes.object,
};

Popover.defaultProps = {
	anchorReference: 'anchor',
	anchorOrigin: {
		vertical: 'top',
		horizontal: 'left',
	},
	duration: {
		enter: 'entering',
		exit: 'leaving',
	},
	ease: 'inOut',
	elevation: 8,
	marginThreshold: 16,
	transformOrigin: {
		vertical: 'top',
		horizontal: 'left',
	},
	TransitionComponent: Grow,
};
