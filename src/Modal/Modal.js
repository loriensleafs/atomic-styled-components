import React, { cloneElement, useCallback, useMemo, useRef, useState } from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import isWindow from 'dom-helpers/query/isWindow';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import css from 'dom-helpers/style';
import nanoid from 'nanoid';
import keycode from 'keycode';
import useDidMount from './../hooks/useDidMount';
import useDidUpdate from './../hooks/useDidUpdate';
import usePrevious from './../hooks/usePrevious';
import useWillUnmount from './../hooks/useWillUnmount';
import useStyles from './../hooks/useStyles';
import useModalManager from './useModalManager';
import Backdrop from './../Backdrop';
import cn from './../theme/className';
import ownerDocument from './../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import { isFunc } from './../utils/helpers';

function getContainer(container, defaultContainer) {
	return isFunc(container)
		? findDOMNode(container()) || defaultContainer
		: findDOMNode(container) || defaultContainer;
}

function getHasTransition(props) {
	if (props.children) {
		const children = React.Children.toArray(props.children);
		return children.some(
			child =>
				React.isValidElement(child) &&
				(child.type.displayName === 'Slide' || child.type.displayName === 'Fade'),
		);
	}
	return false;
}

function isBody(node) {
	return node && node.tagName.toLowerCase() === 'body';
}

function hasVerticalScrollbar(node) {
	const doc = ownerDocument(node);
	const win = ownerWindow(doc);

	if (!isWindow(doc) && isBody(node)) {
		return node.scrollHeight > node.clientHeight;
	}

	// Take into account potential non zero margin on the body.
	const style = win.getComputedStyle(doc.body);
	const marginLeft = parseInt(style.getPropertyValue('margin-left'), 10);
	const marginRight = parseInt(style.getPropertyValue('margin-right'), 10);

	return marginLeft + doc.body.clientWidth + marginRight < win.innerWidth;
}

function getPaddingRight(node) {
	return parseInt(css(node, 'paddingRight') || 0, 10);
}

function getContainerStyle(node) {
	return {
		overflow: 'hidden',
		paddingRight: hasVerticalScrollbar(node)
			? `${getPaddingRight(node) + scrollbarSize()}px`
			: node.style.paddingRight,
	};
}

const getBaseStyles = props => ({
	rootStyles: {
		zIndex: 1000,
		position: 'fixed',
		right: 0,
		bottom: 0,
		top: 0,
		left: 0,
		visibility: props.exited ? 'hidden' : 'visible',
	},
});

function Modal(props) {
	const {
		BackdropComponent,
		BackdropProps,
		children,
		className: classNameProp,
		container: containerProp,
		disableAutoFocus,
		disableBackdropClick,
		disableEnforceFocus,
		disableEscapeKeyDown,
		disablePortal,
		disableRestoreFocus,
		hideBackdrop,
		keepMounted,
		onBackdropClick,
		onClose,
		onEscapeKeyDown,
		onRendered,
		open,
		styles,
		...passThru
	} = props;
	const [exited, setExited] = useState(!open);
	const exiting = useRef(false);
	const prevOpen = usePrevious(open);
	const mounted = useRef(false);
	const overflowing = useRef();
	const lastFocus = useRef();
	/**
	 * The DOM element the modal container element is rendered into.
	 * This DOM element is outside of the actual React app.
	 * If container prop is passed this will be the portalRef, otherwise
	 * the document's body node will be used.
	 */
	const portalRef = useRef(null);
	/**
	 * The actual modal DOM element.
	 * This element wraps the Backdrop and Dialog components & is what
	 * the mounted/unmounted states are actually applied to.
	 */
	const modalRef = useRef(null);
	/**
	 * The DOM element inside of the modal DOM element.
	 * This DOM element is what gets visually styled && transitioned in/out.
	 */
	const dialogRef = useRef(null);
	// Persistant modal id for modal manager.
	const { current: id } = useRef(nanoid());
	const [topModal, add, remove] = useModalManager();
	const { rootStyles } = useStyles([getBaseStyles], { exited, open, styles }, [
		exited,
		open,
		styles,
	]);
	const className = useMemo(() => cn(classNameProp, rootStyles), [
		classNameProp,
		rootStyles,
		exited,
		open,
	]);
	const hasTransition = getHasTransition(props);
	let containerStyle;

	const handleBackdropClick = useCallback(event => {
		if (event.target !== event.currentTarget) return;
		if (onBackdropClick) onBackdropClick(event);
		if (!disableBackdropClick && onClose) onClose(event, 'backdropClick');
	}, []);

	const handleDocumentKeyDown = useCallback(event => {
		if (keycode(event) !== 'esc' || !topModal(id) || event.defaultPrevented) {
			return;
		}
		if (onEscapeKeyDown) onEscapeKeyDown(event);
		if (!disableEscapeKeyDown && onClose) onClose(event, 'escapeKeyDown');
	}, []);

	const handleFocus = useCallback(event => {
		// Modal might already be mounted.
		if (!topModal(id) || disableEnforceFocus || !mounted.current || !dialogRef.current) {
			return;
		}

		const activeElement = ownerDocument(portalRef.current).activeElement;

		if (!dialogRef.current.contains(activeElement)) {
			dialogRef.current.focus();
		}
	}, []);

	const autoFocus = useCallback(() => {
		// We might render an empty child.
		if (disableAutoFocus || !dialogRef.current) return;

		const activeElement = ownerDocument(portalRef.current).activeElement;

		if (!dialogRef.current.contains(activeElement)) {
			if (!dialogRef.current.hasAttribute('tabIndex')) {
				dialogRef.current.setAttribute('tabIndex', -1);
			}

			lastFocus.current = activeElement;
			dialogRef.current.focus();
		}
	}, []);

	const restoreLastFocus = useCallback(() => {
		if (disableRestoreFocus || !lastFocus.current) return;
		// Not all elements in IE 11 have focus method, silence the issue.
		if (lastFocus.current.focus) lastFocus.current.focus();
		lastFocus.current = null;
	}, []);

	const handleOpen = useCallback(() => {
		const doc = ownerDocument(portalRef.current);
		const container = getContainer(containerProp, doc.body);

		add(id, container);
		doc.addEventListener('keydown', handleDocumentKeyDown);
		doc.addEventListener('focus', handleFocus, true);

		if (dialogRef.current) {
			autoFocus();

			if (containerStyle == null) {
				containerStyle = useMemo(() => getContainerStyle(), []);
				Object.keys(containerStyle).forEach(property => {
					container.style[property] = containerStyle.current[property];
				});
			}

			if (modalRef.current) {
				modalRef.current.scrollTop = 0;
			}
		}
	}, []);

	const handleClose = useCallback(() => {
		const doc = ownerDocument(portalRef.current);
		const container = getContainer(containerProp, doc.body);

		remove(id, container);
		doc.removeEventListener('keydown', handleDocumentKeyDown);
		doc.removeEventListener('focus', handleFocus);

		restoreLastFocus();
	}, []);

	useDidMount(() => {
		mounted.current = true;
		if (open) handleOpen();
	});

	const handleExit = useCallback(() => {
		if (!open && exiting.current) {
			exiting.current = false;
			setExited(() => true);
		}
	}, []);

	useDidUpdate(
		() => {
			if (prevOpen && !open) {
				if (!hasTransition) setExited(() => true);
				if (hasTransition) exiting.current = true;
				handleClose();
			} else if (!prevOpen && open) {
				setExited(() => false);
				lastFocus.current = ownerDocument(portalRef.current).activeElement;
				handleOpen();
			}
		},
		[exited, open],
	);

	useWillUnmount(() => {
		mounted.current = false;
		if (open || (hasTransition && !exited)) {
			handleClose();
		}
	});

	if (!keepMounted && !open && (!hasTransition || exited)) return null;

	const childProps = {};

	if (hasTransition) {
		childProps.onEnd = handleExit;
	}

	if (children.props.role === undefined) {
		childProps.role = children.props.role || 'document';
	}

	if (children.props.tabIndex === undefined) {
		childProps.tabIndex = children.props.tabIndex || '-1';
	}

	const ModalComponent = (
		<div ref={modalRef} className={className} {...passThru}>
			{hideBackdrop ? null : (
				<BackdropComponent open={open} onClick={handleBackdropClick} {...BackdropProps} />
			)}
			{cloneElement(children, {
				...childProps,
				...{ ref: dialogRef.current },
			})}
		</div>
	);

	if (disablePortal) return ModalComponent;

	portalRef.current = findDOMNode(getContainer(containerProp, ownerDocument().body));

	return createPortal(ModalComponent, portalRef.current);
}

Modal.displayName = 'Modal';

Modal.propTypes = {
	/**
	 * A backdrop component. This property enables custom backdrop rendering.
	 */
	BackdropComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
	/**
	 * Properties applied to the [`Backdrop`](/api/backdrop/) element.
	 */
	BackdropProps: PropTypes.object,
	/**
	 * A single child content element.
	 */
	children: PropTypes.element,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * A node, component instance, or function that returns either.
	 * The `container` will have the portal children appended to it.
	 */
	container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	/**
	 * If `true`, the modal will not automatically shift focus to itself when it opens, and
	 * replace it to the last focused element when it closes.
	 * This also works correctly with any modal children that have the `disableAutoFocus` prop.
	 *
	 * Generally this should never be set to `true` as it makes the modal less
	 * accessible to assistive technologies, like screen readers.
	 */
	disableAutoFocus: PropTypes.bool,
	/**
	 * If `true`, clicking the backdrop will not fire any callback.
	 */
	disableBackdropClick: PropTypes.bool,
	/**
	 * If `true`, the modal will not prevent focus from leaving the modal while open.
	 *
	 * Generally this should never be set to `true` as it makes the modal less
	 * accessible to assistive technologies, like screen readers.
	 */
	disableEnforceFocus: PropTypes.bool,
	/**
	 * If `true`, hitting escape will not fire any callback.
	 */
	disableEscapeKeyDown: PropTypes.bool,
	/**
	 * Disable the portal behavior.
	 * The children stay within it's parent DOM hierarchy.
	 */
	disablePortal: PropTypes.bool,
	/**
	 * If `true`, the modal will not restore focus to previously focused element once
	 * modal is hidden.
	 */
	disableRestoreFocus: PropTypes.bool,
	/**
	 * If `true`, the backdrop is not rendered.
	 */
	hideBackdrop: PropTypes.bool,
	/**
	 * Always keep the children in the DOM.
	 * This property can be useful in SEO situation or
	 * when you want to maximize the responsiveness of the Modal.
	 */
	keepMounted: PropTypes.bool,
	/**
	 * A modal manager used to track and manage the state of open
	 * Modals. This enables customizing how modals interact within a container.
	 */
	//manager: PropTypes.object,
	/**
	 * Callback fired when the backdrop is clicked.
	 */
	onBackdropClick: PropTypes.func,
	/**
	 * Callback fired when the component requests to be closed.
	 * The `reason` parameter can optionally be used to control the response to `onClose`.
	 *
	 * @param {object} event The event source of the callback
	 * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`
	 */
	onClose: PropTypes.func,
	/**
	 * Callback fired when the escape key is pressed,
	 * `disableEscapeKeyDown` is false and the modal is in focus.
	 */
	onEscapeKeyDown: PropTypes.func,
	/**
	 * Callback fired once the children has been mounted into the `container`.
	 * It signals that the `open={true}` property took effect.
	 */
	onRendered: PropTypes.func,
	/**
	 * If `true`, the modal is open.
	 */
	open: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
	BackdropComponent: Backdrop,
	disableAutoFocus: false,
	disableBackdropClick: false,
	disableEnforceFocus: false,
	disableEscapeKeyDown: false,
	disablePortal: false,
	disableRestoreFocus: false,
	hideBackdrop: false,
	keepMounted: true,
};

export default Modal;
