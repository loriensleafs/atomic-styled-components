import React, {
	cloneElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Backdrop from './../Backdrop';
import isWindow from 'dom-helpers/query/isWindow';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import css from 'dom-helpers/style';
import keycode from 'keycode';
import useModals from './useModals';
import ownerDocument from './../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import useStyles from './../system/useStyles';
import { useIsMounted, usePrevious } from './../hooks';
import { isFn } from './../utils/helpers';

function getContainer(container) {
	container = isFn(container)
		? container()
		: container && container.current
		? container.current
		: container;
	return container || ownerDocument().body;
}

function getHasTransition({ children }) {
	return children ? children.props.hasOwnProperty('show') : false;
}

function getStyles(props) {
	const { hasExited } = props;

	return {
		zIndex: 1300,
		position: 'fixed',
		right: 0,
		bottom: 0,
		top: 0,
		left: 0,
		visibility: hasExited ? 'hidden' : 'visible',
	};
}
getStyles.propTypes = {
	hasExited: PropTypes.bool,
};

function Modal(props) {
	// The container createPortal uses to render the modalRef into the DOM.
	const containerRef = useRef(getContainer(props.container));
	// Wraps Backdrop & dialogRef.  Rendered into containerRef via createPortal.
	const modalRef = useRef(null);
	// Rendered in modalRef.  Sibling of Backdrop.  Is props.children.
	const dialogRef = useRef(null);
	const [isTop, addModal, removeModal] = useModals(modalRef, containerRef);
	const [hasExited, setHasExited] = useState(!props.open);
	const isExiting = useRef(false);
	const isMounted = useIsMounted();
	const lastFocus = useRef(null);
	const [
		{ classes },
		{
			BackdropComponent,
			BackdropProps,
			children,
			className,
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
			...passThru
		},
	] = useStyles({ ...props, hasExited }, getStyles);
	const prevOpen = usePrevious(open);
	const hasTransition = getHasTransition(props);

	const handleBackdropClick = useCallback(event => {
		if (event.target !== event.currentTarget) return;

		if (onBackdropClick) {
			onBackdropClick(event);
		}
		if (!disableBackdropClick && onClose) {
			onClose(event, 'backdropClick');
		}
	}, []);

	const handleDocumentKeyDown = useCallback(event => {
		if (isTop && keycode(event) === 'esc' && !event.defaultPrevented) {
			if (onEscapeKeyDown) {
				onEscapeKeyDown(event);
			}
			if (!disableEscapeKeyDown && onClose) {
				onClose(event, 'escapeKeyDown');
			}
		}
	}, []);

	const handleFocus = useCallback(event => {
		const dialog = dialogRef.current;

		if (isTop && isMounted && dialog && !disableEnforceFocus) {
			const { activeElement } = ownerDocument(containerRef.current);

			if (!dialog.contains(activeElement)) {
				dialog.focus();
			}
		}
	}, []);

	const handleClose = useCallback(() => {
		const doc = ownerDocument(containerRef.current);

		removeModal();
		doc.removeEventListener('keydown', handleDocumentKeyDown);
		doc.removeEventListener('focus', handleFocus, true);

		if (!disableRestoreFocus && lastFocus.current) {
			if (lastFocus.current.focus) lastFocus.current.focus();
			lastFocus.current = null;
		}
	}, []);

	useEffect(
		() => {
			const dialog = dialogRef.current;
			const modal = modalRef.current;
			const doc = ownerDocument(containerRef.current);
			const { activeElement } = doc;

			if (isTop && modal) modal.setAttribute('aria-hidden', true);
			if (!isTop && modal) modal.removeAttribute('aria-hidden');

			if (!prevOpen && open) {
				addModal();
				doc.addEventListener('keydown', handleDocumentKeyDown);
				doc.addEventListener('focus', handleFocus, true);

				if (
					dialog &&
					!disableAutoFocus &&
					!dialog.contain(activeElement)
				) {
					lastFocus.current = activeElement;
					dialog.setAttribute('tabIndex', -1);
					dialog.focus();
				}
			} else if (prevOpen && !open) {
				handleClose();
			}

			return () =>
				(open || (hasTransition && !hasExited)) && handleClose();
		},
		[hasExited, isTop, open, prevOpen],
	);

	// Essentially unmounts the Modal.
	if (!keepMounted && !open && (!hasTransition || hasExited)) {
		return null;
	}

	// Set child props.
	const childProps = {};
	if (hasTransition) {
		childProps.onEnd = () =>
			!open && !hasExited && setHasExited(() => true);
	}
	// For accessibility.
	// Adding document role && tabIndex=0 enables focus, keyboard and
	// form controls in this node's context.
	if (children.props.role === undefined) {
		childProps.role = children.props.role || 'document';
	}
	// For accessibility.
	// Setting tabIndex to 0 in conjunction with document role
	// allows screen readers to tab into the children contents
	// and start reading right away.
	if (children.props.tabIndex === undefined) {
		childProps.tabIndex = children.props.tabIndex || '-1';
	}

	const ModalComponent = (
		<div ref={modalRef} className={classes} {...passThru}>
			{!hideBackdrop && (
				<BackdropComponent
					open={open}
					onClick={handleBackdropClick}
					{...BackdropProps}
				/>
			)}
			{cloneElement(children, {
				...childProps,
				ref: dialogRef.current,
				onClick: handleBackdropClick,
			})}
		</div>
	);

	return createPortal(ModalComponent, containerRef.current);
}

Modal.displayName = 'Modal';

Modal.propTypes = {
	/**
	 * A backdrop component. This property enables custom backdrop rendering.
	 */
	BackdropComponent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
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
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
};

export default Modal;
