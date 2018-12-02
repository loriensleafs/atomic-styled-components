import React, { cloneElement, useCallback, useMemo, useRef } from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import keycode from 'keycode';
import useDidMount from './../hooks/useDidMount';
import useDidUpdate from './../hooks/useDidUpdate';
import usePrevious from './../hooks/usePrevious';
import useWillUnmount from './../hooks/useWillUnmount';
import useModals from './useModals';
import Backdrop from './../Backdrop';
import cn from './../theme/className';
import merge from './../utils/pureRecursiveMerge';
import ownerDocument from './../utils/ownerDocument';
import { isFunc, isNil } from './../utils/helpers';

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
			visibility: !props.open ? 'hidden' : 'visible',
		},
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

const useStyles = props => useMemo(() => getStyles(props), [props]);

function Modal(props) {
	const {
		BackdropComponent,
		BackdropProps,
		children,
		className: classNameProp,
		container,
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
	const prevOpen = usePrevious(open);
	const dialogRef = useRef(null);
	const modalRef = useRef(null);
	const portalRef = useRef(null);
	const lastFocus = useRef(null);
	const id = useRef(nanoid());
	const [topModal, mounted, addModal, mountModal, removeModal] = useModals(props.container);
	const className = useMemo(() => cn(useStyles(props)), [props]);

	const autoFocus = useCallback(() => {
		// Rendered empty child.
		if (disableAutoFocus || isNil(dialogRef.current)) return;
		const { activeElement } = ownerDocument(portalRef.current);

		if (dialogRef.current && !dialogRef.current.contains(activeElement)) {
			dialogRef.current.setAttribute('tabIndex', -1);
		}

		lastFocus.current = activeElement;

		if (dialogRef.current) {
			dialogRef.current.focus();
		}
	}, []);

	const enforceFocus = useCallback(() => {
		if (!topModal(id.current) || disableEnforceFocus || !mounted || !dialogRef.current) {
			return;
		}

		const { activeElement } = ownerDocument(portalRef.current);

		if (dialogRef.current && !dialogRef.current.contains(activeElement)) {
			dialogRef.current.focus();
		}
	}, []);

	const restoreLastFocus = useCallback(() => {
		if (disableRestoreFocus || !lastFocus.current) return;
		// IE 11 doesn't have focus method, so we need to check.
		if (lastFocus.current.focus) lastFocus.current.focus();
		lastFocus.current = null;
	}, []);

	const handleDocumentKeyDown = useCallback(event => {
		if (keycode(event) !== 'esc' || !topModal(id.current) || event.defaultPrevented) {
			return;
		}
		if (onEscapeKeyDown) onEscapeKeyDown(event);
		if (!disableEscapeKeyDown && onClose) onClose(event, 'escapeKeyDown');
	}, []);

	const handleOpened = useCallback(() => {
		autoFocus();
		mountModal(id.current);
		if (modalRef.current) {
			modalRef.current.scrollTop = 0;
		}
	}, []);

	const handleBackdropClick = useCallback(event => {
		if (event.target !== event.currentTarget) return;
		if (onBackdropClick) onBackdropClick(event);
		if (!disableBackdropClick && onClose) onClose(event, 'backdropClick');
	}, []);

	const handleOpen = useCallback(() => {
		const doc = ownerDocument(portalRef.current);
		const container = getContainer(container, doc.body);

		addModal(id.current, modalRef.current, portalRef.current, container);
		doc.addEventListener('keydown', handleDocumentKeyDown);
		doc.addEventListener('focus', enforceFocus, true);

		if (dialogRef.current) {
			handleOpened();
		}
	}, []);

	const handleClose = useCallback(() => {
		removeModal(id.current, portalRef.current, modalRef.current);

		const doc = ownerDocument(portalRef.current);
		doc.removeEventListener('keydown', handleDocumentKeyDown);
		doc.removeEventListener('focus', enforceFocus, true);

		restoreLastFocus();
	}, []);

	useDidMount(() => {
		if (open) {
			handleOpen();
		} else {
			// ariaHidden(modalRef.current, true);
		}
	});

	useDidUpdate(
		() => {
			if (prevOpen && !open) {
				handleClose();
			} else if (!prevOpen && open) {
				lastFocus.current = ownerDocument(portalRef.current).activeElement;
				handleOpen();
			}
		},
		[open],
	);

	useWillUnmount(() => open && handleClose());

	if (!keepMounted && !open) {
		return null;
	}

	let childProps = {};

	if (children.props.role === undefined) {
		childProps.tabIndex = children.props.tabIndex || -1;
	}

	const ModalComponent = (
		<div ref={modalRef} className={className} {...passThru}>
			{hideBackdrop ? null : (
				<BackdropComponent open={open} onClick={handleBackdropClick} {...BackdropProps} />
			)}
			{cloneElement(children, { ...childProps, ...{ ref: dialogRef.current } })}
		</div>
	);

	if (disablePortal) return ModalComponent;

	portalRef.current = findDOMNode(getContainer(container, getOwnerDocument().body));

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
