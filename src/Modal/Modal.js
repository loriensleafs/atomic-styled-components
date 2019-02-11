import React, {
	cloneElement,
	isValidElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop';
import isWindow from 'dom-helpers/query/isWindow';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import css from 'dom-helpers/style';
import keycode from 'keycode';
import useModals from './useModals';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import useStyles from '../system/useStyles';
import { useMounted, usePrevious, useWillUnmount } from '../hooks';
import { isFn } from '../utils/helpers';

const getContainer = container =>
	isFn(container)
		? container()
		: container && container.current
		? container.current
		: container || ownerDocument().body;

const getHasTransition = ({ children }) =>
	children
		? React.Children.toArray(children).some(
				child =>
					isValidElement(child) && child.props.show !== undefined,
		  )
		: false;

const getStyles = ({ exited }) => ({
	zIndex: 1300,
	position: 'fixed',
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	visibility: exited ? 'hidden' : 'visible',
});
getStyles.propTypes = {
	exited: PropTypes.bool,
};

function Modal(props) {
	// Renders the modalRef into the DOM via createPortal.
	const portalRef = useRef(getContainer(containerProp));
	// Rendered into portalRef via createPortal.
	const modalRef = useRef(null);
	// The component children, rendered in modalRef.
	const dialogRef = useRef(null);
	// States
	const [exited, setExited] = useState(!props.open);
	const [isTopModal, addModal, removeModal] = useModals(
		modalRef.current,
		portalRef.current,
	);
	const exiting = useRef(false);
	const mounted = useMounted();
	const lastFocus = useRef();
	const hasTransition = getHasTransition(props);
	const [
		{ classes },
		{
			BackdropComponent,
			BackdropProps,
			children,
			className,
			closeAfterTransition,
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
			open,
			...passThru
		},
	] = useStyles({ ...props, exited }, getStyles);
	const prevOpen = usePrevious(open);

	const handleBackdropClick = useCallback(event => {
		if (event.target === event.currentTarget) {
			if (onBackdropClick) {
				onBackdropClick(event);
			}
			if (!disableBackdropClick && onClose) {
				onClose(event, 'backdropClick');
			}
		}
	}, []);

	const handleDocumentKeyDown = useCallback(event => {
		if (
			keycode(event) === 'esc' &&
			isTopModal.current &&
			!event.defaultPrevented
		) {
			if (onEscapeKeyDown) {
				onEscapeKeyDown(event);
			}
			if (!disableEscapeKeyDown && onClose) {
				onClose(event, 'escapeKeyDown');
			}
		}
	}, []);

	const handleFocus = useCallback(() => {
		const container = portalRef.current;
		const dialog = dialogRef.current;

		if (dialog && mounted && isTopModal.current && !disableEnforceFocus) {
			const { activeElement } = ownerDocument(container);

			if (!dialog.contains(activeElement)) {
				dialog.focus();
			}
		}
	}, []);

	const handleClose = useCallback(reason => {
		const container = portalRef.current;
		const doc = ownerDocument(container);

		if (!(hasTransition && closeAfterTransition) || reason === 'unmount') {
			removeModal();
		}

		doc.removeEventListener('keydown', handleDocumentKeyDown);
		doc.removeEventListener('focus', handleFocus);

		container.style.overflow = 'auto';
		if (!disableRestoreFocus && lastFocus.current) {
			if (lastFocus.current.focus) {
				lastFocus.current.focus();
			}
			lastFocus.current = null;
		}
	}, []);

	useEffect(() => {
		const container = portalRef.current;
		const dialog = dialogRef.current;
		const modal = modalRef.current;
		const doc = ownerDocument(container);

		if (!prevOpen && open) {
			addModal();
			setExited(false);
			lastFocus.current = doc.activeElement;

			doc.addEventListener('keydown', handleDocumentKeyDown);
			doc.addEventListener('focus', handleFocus, true);

			if (container && modal) {
				modal.scrollTop = 0;

				if (isTopModal.current) {
					modal.removeAttribute('aria-hidden');
				}
				if (dialog && !dialog.contains(doc.activeElement)) {
					if (
						(!disableAutoFocus || !dialog) &&
						!dialog.hasAttribute('tabIndex')
					) {
						dialog.setAttribute('tabIndex', -1);
						dialog.focus();
					}

					lastFocus.current = doc.activeElement;
					dialog.focus();
				}
			}
		} else if (!open) {
			if (!isTopModal.current && modal) {
				modal.setAttribute('aria-hidden', true);
			}
			if (prevOpen) {
				if (!hasTransition) {
					setExited(true);
				}
				if (hasTransition) {
					exiting.current = true;
				}
				handleClose();
			}
		}
	}, [exited, open]);

	useEffect(
		() => () => {
			if (open || (hasTransition && !exited)) {
				handleClose('unmount');
			}
		},
		[],
	);

	if (!keepMounted && !open && (!hasTransition || exited)) {
		return null;
	}

	const childProps = {};
	if (hasTransition) {
		childProps.onExited = () => {
			if (!open && exiting.current) {
				exiting.current = false;
				setExited(true);
			}
		};
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
			{hideBackdrop ? null : (
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

	if (disablePortal) {
		return ModalComponent;
	}

	return createPortal(ModalComponent, portalRef.current);
}

Modal.displayName = 'Modal';

Modal.propTypes = {
	// A backdrop component. This property enables custom backdrop rendering.
	BackdropComponent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	// Properties applied to the [`Backdrop`](/api/backdrop/) element.
	BackdropProps: PropTypes.object,
	// A single child content element.
	children: PropTypes.element,
	classes: PropTypes.object,
	className: PropTypes.string,
	/**
	 * When true the Modal waits for a nested Transition to finish before
	 * closing.
	 */
	closeAfterTransition: PropTypes.bool,
	/**
	 * A node, component instance, or function that returns either.
	 * The `container` will have the portal children appended to it.
	 */
	container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	/**
	 * If `true`, the modal will not automatically shift focus to itself when
	 * it opens, and
	 * replace it to the last focused element when it closes.
	 * This also works correctly with any modal children that have the
	 * `disableAutoFocus` prop.
	 *
	 * Generally this should never be set to `true` as it makes the modal less
	 * accessible to assistive technologies, like screen readers.
	 */
	disableAutoFocus: PropTypes.bool,
	//  If `true`, clicking the backdrop will not fire any callback.
	disableBackdropClick: PropTypes.bool,
	/**
	 * If `true`, the modal will not prevent focus from leaving the modal while
	 * open.
	 *
	 * Generally this should never be set to `true` as it makes the modal less
	 * accessible to assistive technologies, like screen readers.
	 */
	disableEnforceFocus: PropTypes.bool,
	// If `true`, hitting escape will not fire any callback.
	disableEscapeKeyDown: PropTypes.bool,
	/**
	 * Disable the portal behavior.
	 * The children stay within it's parent DOM hierarchy.
	 */
	disablePortal: PropTypes.bool,
	/**
	 * If `true`, the modal will not restore focus to previously focused
	 * element once modal is hidden.
	 */
	disableRestoreFocus: PropTypes.bool,
	// If `true`, the backdrop is not rendered.
	hideBackdrop: PropTypes.bool,
	/**
	 * Always keep the children in the DOM.
	 * This property can be useful in SEO situation or
	 * when you want to maximize the responsiveness of the Modal.
	 */
	// If `true`, the modal is open.
	open: PropTypes.bool.isRequired,
	keepMounted: PropTypes.bool,
	// Callback fired when the backdrop is clicked.
	onBackdropClick: PropTypes.func,
	/**
	 * Callback fired when the component requests to be closed.
	 * The `reason` parameter can optionally be used to control the response to
	 * `onClose`.
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
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Modal.defaultProps = {
	BackdropComponent: Backdrop,
	closeAfterTransition: false,
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
