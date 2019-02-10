import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import warning from 'warning';
import Grow from '../Grow';
import Modal from '../Modal';
import Paper from '../Paper';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import useStyles from '../system/useStyles';
import useSize from '../hooks/useSize';
import throttle from '../utils/throttle';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const RECT_PROPS = ['left', 'offsetWidth', 'offsetHeight', 'top'];

const getOffsetTop = (height, vertical) => {
	if (typeof vertical === 'number') {
		return vertical;
	} else if (vertical === 'center') {
		return height / 2;
	} else if (vertical === 'bottom') {
		return height;
	}
	return 0;
};

const getOffsetLeft = (width, horizontal) => {
	if (typeof horizontal === 'number') {
		return horizontal;
	} else if (horizontal === 'center') {
		return width / 2;
	} else if (horizontal === 'right') {
		return width;
	}
	return 0;
};

const getOriginValue = ({ horizontal, vertical }) =>
	[horizontal, vertical]
		.map(n => (typeof n === 'number' ? `${n}px` : n))
		.join(' ');

// Sum the scrollTop between two elements.
const sumScrollTop = (parent, child) => {
	let element = child;
	let scrollTop = 0;

	while (element && element !== parent) {
		element = element.parentNode;
		scrollTop += element.scrollTop;
	}
	return scrollTop;
};

const getContainer = (container, anchor) =>
	container
		? container
		: anchor
		? ownerDocument(getAnchor(anchor)).body
		: undefined;

const getAnchor = anchor => (typeof anchor === 'function' ? anchor() : anchor);

const baseStyles = {
	position: 'absolute',
	minWidth: '16px',
	minHeight: '16px',
	maxWidth: 'calc(100% - 32px)',
	maxHeight: 'calc(100% - 32px)',
	overflowY: 'auto',
	overflowX: 'hidden',
	outline: 'none',
};

function usePopoverPosition(popover, anchor, marginThreshold) {
	const { top, left, offsetWidth: width, offsetHeight: height } = useSize(
		popover.el,
		RECT_PROPS,
	);
	const positionByNone = anchor.strategy === 'none';
	const positionByAnchor = anchor.strategy === 'anchorEl';

	const getAnchorAttachOffset = useCallback(() => {
		if (
			popover.el &&
			popover.anchorAttachEl &&
			positionByAnchor &&
			popover.el.contains(popover.anchorAttachEl)
		) {
			const { offsetTop, clientHeight } = popover.anchorAttachEl;
			return (
				offsetTop +
				clientHeight / 2 -
				sumScrollTop(popover.el, popover.anchorAttachEl)
			);
		}
		return 0;
	}, []);

	const getAnchorOffset = useCallback(anchorAttachOffset => {
		const el = anchor.el || ownerDocument(popover.el).body;
		const rect = el.getBoundingClientRect();
		const vertical =
			anchorAttachOffset === 0 ? anchor.origin.vertical : 'center';
		return {
			top: rect.top + getOffsetTop(rect.height, vertical),
			left:
				rect.left + getOffsetLeft(rect.width, anchor.origin.horizontal),
		};
	}, []);

	const position = useMemo(() => {
		if (popover.el && popover.contentAnchorEl) {
			const anchorAttachOffset = getAnchorAttachOffset();
			const popoverOrigin = {
				horizontal: getOffsetLeft(width, popover.origin.horizontal),
				vertical:
					getOffsetTop(height, popover.origin.vertical) +
					anchorAttachOffset,
			};

			if (positionByNone) {
				return {
					top: null,
					left: null,
					origin: getOriginValue(popoverOrigin),
				};
			}

			// Offset of anchoring element.
			const anchorOffset = getAnchorOffset(anchorAttachOffset);

			// Calculate anchor positioning.
			let anchorTop = anchorOffset.top - popoverOrigin.vertical;
			let anchorLeft = anchorOffset.left - popoverOrigin.horizontal;
			const anchorBottom = anchorTop + height;
			const anchorRight = anchorLeft + width;

			// Use the parent window of the anchorEl if provided.
			const containerWindow = ownerWindow(anchor.el);

			// Window thresholds require taking margin into account.
			const heightThreshold =
				containerWindow.innerHeight - marginThreshold;
			const widthThreshold = containerWindow.innerWidth - marginThreshold;

			// Check if the vertical axis needs to shift.
			if (anchorTop < marginThreshold) {
				const diff = anchorTop - marginThreshold;
				top -= diff;
				popoverOrigin.vertical += diff;
			} else if (anchorBottom > heightThreshold) {
				const diff = anchorBottom - heightThreshold;
				top -= diff;
				popoverOrigin.vertical += diff;
			}

			warning(
				height < heightThreshold || !height || !heightThreshold,
				`The popover component is too tall. Some part of it can not be seen on the screen (${height -
					heightThreshold}px).
				Please consider adding a 'max-height' to improve the user-experience.`,
			);

			// Check if the horizontal axis needs to shift.
			if (anchorLeft < marginThreshold) {
				const diff = left - marginThreshold;
				anchorLeft -= diff;
				popoverOrigin.horizontal += diff;
			} else if (anchorRight > widthThreshold) {
				const diff = anchorRight - widthThreshold;
				left -= diff;
				popoverOrigin.horizontal += diff;
			}

			return {
				top: `${anchorTop}px`,
				left: `${anchorLeft}px`,
				origin: getOriginValue(popoverOrigin),
			};
		}
	}, [top, left, width, height]);

	return position;
}

const Popover = forwardRef((props, ref) => {
	const [
		{ styles },
		{
			action,
			anchorRef,
			anchorOrigin,
			anchorPosition,
			anchorStrategy,
			children,
			container,
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
			popoverAnchorAttachRef,
			popoverOrigin,
			role,
			TransitionComponent,
			...passThru
		},
	] = useStyles(props, null, { baseStyles });
	// If the container prop is provided use it.
	// If the anchor prop is provided, use it's parent body element.
	// If neither are provided let the Modal take care of the container.
	const containerRef = getContainer(container, anchorRef);
	const popoverRef = ref ? ref : useRef(null);
	const position = usePopoverPosition(
		{
			el: popoverRef.current,
			anchorAttachEl: popoverAnchorAttachRef,
			origin: popoverOrigin,
		},
		{
			el: anchorRef,
			origin: anchorOrigin,
			position: anchorPosition,
			anchorStrategy: anchorStrategy,
		},
		marginThreshold,
	);

	useEffect(() => {
		if (action) {
			action({ updatePosition: handleResize });
		}
	}, []);

	useEffect(() => {
		const popoverEl = popoverRef.current;
		if (popoverEl) {
			if (position.top !== null) {
				popoverEl.style.top = position.top;
			}
			if (position.left !== null) {
				popoverEl.style.left = position.left;
			}
			popoverEl.style.transformOrigin = position.origin;
		}
	}, [position]);

	return (
		<Modal
			container={containerRef}
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
				<Paper
					elevation={elevation}
					ref={popoverRef}
					styles={styles}
					{...PaperProps}
				>
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
	anchorRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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
	anchorStrategy: PropTypes.oneOf(['anchorEl', 'anchorPosition', 'none']),
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
	popoverAnchorAttachRef: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.func,
	]),
	/**
	 * This is the point on the popover which
	 * will attach to the anchor's origin.
	 *
	 * Options:
	 * vertical: [top, center, bottom, x(px)];
	 * horizontal: [left, center, right, x(px)].
	 */
	popoverOrigin: PropTypes.shape({
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
	anchorStrategy: 'anchorEl',
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
	popoverOrigin: {
		vertical: 'top',
		horizontal: 'left',
	},
	TransitionComponent: Grow,
};
