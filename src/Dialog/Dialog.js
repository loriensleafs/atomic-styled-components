import React from 'react';
import PropTypes from 'prop-types';
import { isFunc } from './../utils/helpers';
import Modal from './../Modal';
import Fade from './../Fade';
import { duration } from './../theme/createMotion';
import Paper from './../Paper';
import cn from './../theme/className';
import merge from './../utils/pureRecursiveMerge';

export const getScrollStyles = props => {
	if (props.scroll === 'paper') {
		return {
			rootStyles: {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			},
			paperStyles: {
				flex: '0 1 auto',
				maxHeight: 'calc(100% - 96px)',
			},
		};
	} else if (props.scroll === 'body') {
		return {
			rootStyles: {
				overflowY: 'auto',
				overflowX: 'hidden',
			},
			paperStyles: {
				margin: '48px auto',
			},
		};
	}
	return {};
};

export const getFullWidthStyles = props =>
	props.fullWidth && {
		paperStyles: { width: '100%' },
	};

export const getFullScreenStyles = props =>
	props.fullScreen && {
		paperStyles: {
			width: '100%',
			maxWidth: '100%',
			height: '100%',
			maxHeight: '100%',
			margin: '0px',
			borderRadius: '0px',
		},
		containerStyles: {
			height: '100%',
			width: '100%',
		},
	};

export const getMaxWidthStyles = props => {
	switch (props.maxWidth) {
		case 'xs':
			return {
				paperStyles: {
					maxWidth: '360px',
					margin: '48px',
				},
			};
		case 'sm':
			return {
				paperStyles: {
					maxWidth: '360px',
					margin: '48px',
				},
			};
		case 'md':
			return {
				paperStyles: {
					maxWidth: '360px',
					margin: '48px',
				},
			};
		case 'lg':
			return {
				paperStyles: {
					maxWidth: '360px',
					margin: '48px',
				},
			};
		default:
			return {};
	}
};

export const getStyles = props =>
	merge(
		{
			rootStyles: {},
			containerStyles: {
				height: '100%',
				outline: 'none',
			},
			paperStyles: {
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				margin: '48px',
				overflowY: 'auto',
			},
		},
		getScrollStyles(props),
		getMaxWidthStyles(props),
		getFullWidthStyles(props),
		getFullScreenStyles(props),
		isFunc(props.styles) ? props.styles(props) : props.styles,
	);

const Dialog = React.memo(function Dialog(props) {
	const {
		BackdropProps,
		children,
		classes,
		className,
		disableBackdropClick,
		disableEscapeKeyDown,
		fullScreen,
		fullWidth,
		maxWidth,
		onBackdropClick,
		onClose,
		onEnter,
		onEntered,
		onEntering,
		onEscapeKeyDown,
		onExit,
		onExited,
		onExiting,
		open,
		PaperProps,
		scroll,
		styles,
		TransitionComponent,
		transitionDuration,
		TransitionProps,
		...passThru
	} = props;
	const { rootStyles, paperStyles, containerStyles } = getStyles(props);

	function handleBackdropClick(event) {
		if (event.target !== event.currentTarget) return;
		if (props.onBackdropClick) props.onBackdropClick(event);
		if (!props.disableBackdropClick && props.onClose) {
			props.onClose(event, 'backdropClick');
		}
	}

	return (
		<Modal
			className={className}
			styles={rootStyles}
			disableBackdropClick={disableBackdropClick}
			disableEscapeKeyDown={disableEscapeKeyDown}
			onBackdropClick={onBackdropClick}
			onEscapeKeyDown={onEscapeKeyDown}
			onClose={onClose}
			open={open}
			role="dialog"
			{...passThru}>
			<TransitionComponent
				appear
				in={open}
				timeout={transitionDuration}
				onEnter={onEnter}
				onEntering={onEntering}
				onEntered={onEntered}
				onExit={onExit}
				onExiting={onExiting}
				onExited={onExited}
				{...TransitionProps}>
				<div className={cn(containerStyles)} role="document">
					<Paper elevation={24} styles={paperStyles} {...PaperProps}>
						{children}
					</Paper>
				</div>
			</TransitionComponent>
		</Modal>
	);
});

Dialog.propTypes = {
	/**
	 * @ignore
	 */
	BackdropProps: PropTypes.object,
	/**
	 * Dialog children, usually the included sub-components.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * If `true`, clicking the backdrop will not fire the `onClose` callback.
	 */
	disableBackdropClick: PropTypes.bool,
	/**
	 * If `true`, hitting escape will not fire the `onClose` callback.
	 */
	disableEscapeKeyDown: PropTypes.bool,
	/**
	 * If `true`, the dialog will be full-screen
	 */
	fullScreen: PropTypes.bool,
	/**
	 * If `true`, the dialog stretches to `maxWidth`.
	 */
	fullWidth: PropTypes.bool,
	/**
	 * Determine the max width of the dialog.
	 * The dialog width grows with the size of the screen, this property is useful
	 * on the desktop where you might need some coherent different width size across your
	 * application. Set to `false` to disable `maxWidth`.
	 */
	maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', false]),
	/**
	 * Callback fired when the backdrop is clicked.
	 */
	onBackdropClick: PropTypes.func,
	/**
	 * Callback fired when the component requests to be closed.
	 *
	 * @param {object} event The event source of the callback
	 */
	onClose: PropTypes.func,
	/**
	 * Callback fired before the dialog enters.
	 */
	onEnter: PropTypes.func,
	/**
	 * Callback fired when the dialog has entered.
	 */
	onEntered: PropTypes.func,
	/**
	 * Callback fired when the dialog is entering.
	 */
	onEntering: PropTypes.func,
	/**
	 * Callback fired when the escape key is pressed,
	 * `disableKeyboard` is false and the modal is in focus.
	 */
	onEscapeKeyDown: PropTypes.func,
	/**
	 * Callback fired before the dialog exits.
	 */
	onExit: PropTypes.func,
	/**
	 * Callback fired when the dialog has exited.
	 */
	onExited: PropTypes.func,
	/**
	 * Callback fired when the dialog is exiting.
	 */
	onExiting: PropTypes.func,
	/**
	 * If `true`, the Dialog is open.
	 */
	open: PropTypes.bool.isRequired,
	/**
	 * Properties applied to the [`Paper`](/api/paper/) element.
	 */
	PaperProps: PropTypes.object,
	/**
	 * Determine the container for scrolling the dialog.
	 */
	scroll: PropTypes.oneOf(['body', 'paper']),
	/**
	 * Transition component.
	 */
	TransitionComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
	/**
	 * The duration for the transition, in milliseconds.
	 * You may specify a single timeout for all transitions, or individually with an object.
	 */
	transitionDuration: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
	]),
	/**
	 * Properties applied to the `Transition` element.
	 */
	TransitionProps: PropTypes.object,
};

Dialog.defaultProps = {
	disableBackdropClick: false,
	disableEscapeKeyDown: false,
	fullScreen: false,
	fullWidth: false,
	maxWidth: 'sm',
	scroll: 'paper',
	styles: {},
	TransitionComponent: Fade,
	transitionDuration: { enter: duration.entering, exit: duration.leaving },
};

export default Dialog;
