import React, { cloneElement, useState, useLayoutEffect, useEffect, useRef } from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Backdrop from './../Backdrop';
import keycode from 'keycode';
import cn from './../theme/className';
import merge from './../utils/pureRecursiveMerge';
import ownerDocument from './../utils/ownerDocument';
import ModalManager from './ModalManager';
import { ariaHidden } from './manageAriaHidden';
import { isFunc } from './../utils/helpers';
import { usePrevious, useDidMount, useWillUnmount, useDidUpdate } from './../hooks';

function getContainer(container, defaultContainer) {
	container = isFunc(container) ? container() : container;
	return findDOMNode(container) || defaultContainer;
}

const getOwnerDocument = el => ownerDocument(findDOMNode(el));

const getHasTransition = props => props.children && props.children.props.hasOwnProperty('in');

const getStyles = props =>
	merge(
		{
			position: 'fixed',
			zIndex: 1000,
			right: 0,
			bottom: 0,
			top: 0,
			left: 0,
			visibility: props.exited ? 'hidden' : 'visible',
		},
		isFunc(props.styles) ? props.styles(props) : props.styles,
	);

const Modal = React.memo(function Modal(props) {
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
		manager,
		onBackdropClick,
		onClose,
		onEscapeKeyDown,
		onRendered,
		open,
		styles,
		...passThru
	} = props;
	const hasTransition = children && children.props.hasOwnProperty('in');
	const modalRef = useRef(null);
	const dialogRef = useRef(null);
	const [mounted, setMounted] = useState(false);
	const [exited, setExited] = useState(!open);
	const prevOpen = usePrevious(props.open);
	const className = cn(classNameProp, getStyles({ ...props, ...{ exited } }));
	const childProps = {};
	let portalMount;
	let portalRef;
	let lastFocus;
	let activeElement;
	let container;
	let doc;

	function handleDocumentKeyDown(event) {
		if (keycode(event) !== 'esc' || event.defaultPrevented) return;
		if (onEscapeKeyDown) onEscapeKeyDown(event);
		if (!disableEscapeKeyDown && onClose) onClose(event, 'escapeKeyDown');
	}

	function enforceFocus() {
		if (props.disableEnforceFocus || !mounted || !dialogRef.current) {
			return;
		}

		const activeElement = ownerDocument(portalRef).activeElement;

		if (!dialogRef.current.contains(activeElement)) {
			dialogRef.current.focus();
		}
	}

	function autoFocus() {
		if (disableAutoFocus || !dialogRef.current) return;
		const activeElement = ownerDocument(portalRef).activeElement;

		if (!dialogRef.current.contains(activeElement)) {
			if (!dialogRef.current.hasAttribute('tabIndex')) {
				dialogRef.current.setAttribute('tabIndex', -1);
			}
		}
		lastFocus = activeElement;
		dialogRef.current.focus();
	}

	function restoreLastFocus() {
		if (props.disableRestoreFocus || !lastFocus) return;
		if (lastFocus.focus) lastFocus.focus();
		lastFocus = null;
	}

	// function isTopModal() {
	// 	return props.manager.isTopModal(this);
	// }

	function handleOpen() {
		const doc = ownerDocument(portalRef);
		const container = getContainer(props.container, doc.body);

		//props.manager.add(this, container);
		doc.addEventListener('keydown', handleDocumentKeyDown);
		doc.addEventListener('focus', enforceFocus, true);
		if (dialogRef.current) {
			autoFocus();
			modalRef.current.scrollTop = 0;
		}
	}

	function handleRendered() {
		if (props.onRendered) props.onRendered();
		if (props.open) {
			handleOpen();
		}
		//else {
		//		ariaHidden(modalRef, true);
		//	}
	}

	function handleClose() {
		props.manager.remove(this);
		const doc = ownerDocument(createPortal);
		doc.removeEventListener('keydown', handleDocumentKeyDown);
		doc.removeEventListener('focus', enforceFocus, true);
		restoreLastFocus();
	}

	function handleExited() {
		setExited(true);
	}

	function handleBackdropClick(event) {
		if (event.target !== event.currentTarget) return;
		if (props.onBackdropClick) props.onBackdropClick(event);
		if (!props.disableEscapeKeyDown && props.onClose) {
			props.onClose(event, 'escapeKeyDown');
		}
	}

	useDidMount(() => {
		setMounted(true);
		if (open) handleOpen();
	});

	useDidUpdate(
		() => {
			doc = ownerDocument(portalRef);
			container = getContainer(containerProp, doc.body);
			activeElement = doc.activeElement;
			if (prevOpen && !open) {
				handleClose();
			} else if (!prevOpen && open) {
				if (!getHasTransition(props)) {
					setExited(true);
				} else {
					setExited(false);
				}
				lastFocus = ownerDocument(portalRef).activeElement;
				handleOpen();
			}
		},
		[open, prevOpen, containerProp, portalRef],
	);

	useWillUnmount(() => {
		setMounted(false);
		if (open || (hasTransition && !exited)) {
			handleClose();
		}
	});

	useLayoutEffect(() => {
		if (onRendered) onRendered();
		handleRendered();
	});

	if (hasTransition) {
		childProps.onExited = () => {
			handleExited();
			if (children.props.onExited) children.props.onExited();
		};
	}

	if (children.props.role === undefined) {
		childProps.role = children.role || 'document';
	}

	if (children.props.tabIndex === undefined) {
		childProps.tabIndex = children.props.tabIndex || '-1';
	}

	if (!keepMounted && !open && (!hasTransition || exited)) {
		return null;
	}

	const ModalComponent = (
		<div ref={modalRef} className={className} {...passThru}>
			{hideBackdrop ? null : (
				<BackdropComponent open={open} onClick={handleBackdropClick} {...BackdropProps} />
			)}
			{cloneElement(children, { ...childProps, ...{ ref: dialogRef } })}
		</div>
	);

	if (disablePortal) return ModalComponent;

	portalMount = getContainer(containerProp, getOwnerDocument().body);
	portalRef = findDOMNode(portalMount);
	return createPortal(ModalComponent, portalMount);
});

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
	keepMounted: false,
	// Modals don't open on the server so this won't conflict with concurrent requests.
	manager: new ModalManager(),
};

export default Modal;
