import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Modal from './../Modal';
import Fade from './../Fade';
import Paper from './../Paper';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { duration } from './../theme/createMotion';

export const getScrollStyles = props => {
	if (props.scroll === 'paper') {
		return {
			containerStyles: {
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
			containerStyles: {
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
		containerStyles: {
			height: '100%',
			width: '100%',
		},
		paperStyles: {
			width: '100%',
			maxWidth: '100%',
			height: '100%',
			maxHeight: '100%',
			margin: '0px',
			borderRadius: '0px',
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

export const getBaseStyles = props => ({
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
});

function Dialog(props) {
	const {
		BackdropProps,
		children,
		className,
		disableBackdropClick,
		disableEscapeKeyDown,
		fullScreen,
		fullWidth,
		maxWidth,
		onBackdropClick,
		onClose,
		onEscapeKeyDown,
		onEnd,
		onStart,
		open,
		PaperProps,
		scroll,
		styles,
		TransitionComponent,
		TransitionProps,
		...passThru
	} = props;
	const { rootStyles, paperStyles, containerStyles } = useStyles(
		[
			getBaseStyles,
			getScrollStyles,
			getMaxWidthStyles,
			getFullWidthStyles,
			getFullScreenStyles,
		],
		props,
	);
	const containerClassName = useMemo(() => cn(containerStyles), [containerStyles]);

	const handleBackdropClick = useCallback(event => {
		if (event.target !== event.currentTarget) return;
		if (onBackdropClick) onBackdropClick(event);
		if (!disableBackdropClick && onClose) onClose(event, 'backdropClick');
	}, []);

	return (
		<Modal
			BackdropProps={BackdropProps}
			className={className}
			disableBackdropClick={disableBackdropClick}
			disableEscapeKeyDown={disableEscapeKeyDown}
			onBackdropClick={handleBackdropClick}
			onEscapeKeyDown={onEscapeKeyDown}
			onClose={onClose}
			open={open}
			role="dialog"
			styles={rootStyles}
			{...passThru}>
			<TransitionComponent className={cn(containerStyles)} in={open} {...TransitionProps}>
				<div className={containerClassName} role="document">
					<Paper elevation={24} styles={paperStyles} {...PaperProps}>
						{children}
					</Paper>
				</div>
			</TransitionComponent>
		</Modal>
	);
}

Dialog.displayName = 'Dialog';

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
};

export default Dialog;
