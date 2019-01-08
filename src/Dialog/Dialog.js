import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from './../Modal';
import Fade from './../Fade';
import Paper from './../Paper';
import combine from './../utils/combine';
import { getSizing, getSpacing, useStyles } from '../system';
import { stylesPropType } from './../utils/propTypes';

function getScrollStyles({ scroll }) {
	switch (scroll) {
		case 'body':
			return {
				containerStyles: {
					overflowY: 'auto',
					overflowX: 'hidden',
				},
				paperStyles: {
					margin: '48px auto',
				},
			};

		default:
			// 'paper'
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
	}
}

function getSizeStyles(props) {
	const { fullScreen, fullWidth, maxWidth } = props;
	const w = fullWidth ? 1 : null;
	const container = getSizing({
		h: fullScreen ? 1 : null,
		w: fullScreen ? 1 : null,
	});
	const paper = {
		...getSizing({
			w: fullScreen ? 1 : null,
			wMax: fullScreen ? 1 : null,
			h: fullScreen ? 1 : null,
			hMax: fullScreen ? 1 : null,
		}),
		margin: '0px',
		borderRadius: '0px',
	};

	switch (maxWidth) {
		case 'xs':
			return {
				container,
				paper: {
					...paper,
					...getSizing({ w, wMax: 360 }),
					...getSpacing({ m: 5.5 }),
				},
			};
		case 'sm':
			return {
				container,
				paper: {
					...paper,
					...getSizing({ w, wMax: 360 }),
					...getSpacing({ m: 5.5 }),
				},
			};
		case 'md':
			return {
				container,
				paper: {
					...paper,
					...getSizing({ w, wMax: 360 }),
					...getSpacing({ m: 5.5 }),
				},
			};
		case 'lg':
			return {
				container,
				paper: {
					...paper,
					...getSizing({ w, wMax: 360 }),
					...getSpacing({ m: 5.5 }),
				},
			};
		default:
			return {
				container,
				paper,
			};
	}
}

const getStyles = combine(getScrollStyles, getSizeStyles);
getStyles.propTypes = {
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
	 * Determine the container for scrolling the dialog.
	 */
	scroll: PropTypes.oneOf(['body', 'paper']),
};

const baseStyles = {
	container: {
		height: '100%',
		outline: 'none',
	},
	paper: {
		position: 'relative',
		margin: '48px',
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'auto',
	},
	root: {},
};

function Dialog(props) {
	const [
		{ styles, classes },
		{
			BackdropProps,
			children,
			className,
			disableBackdropClick,
			disableEscapeKeyDown,
			onBackdropClick,
			onClose,
			onEscapeKeyDown,
			onEnd,
			onStart,
			open,
			PaperProps,
			TransitionComponent,
			TransitionProps,
			...passThru
		},
	] = useStyles(props, getStyles, { baseStyles });

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
			styles={styles.root}
			{...passThru}
		>
			<TransitionComponent
				className={classes.container}
				in={open}
				{...TransitionProps}
			>
				<div className={classes.container} role="document">
					<Paper elevation={24} styles={styles.paper} {...PaperProps}>
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
	...stylesPropType,
	/**
	 * Transition component.
	 */
	TransitionComponent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
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
	...getScrollStyles.propTypes,
	...getSizeStyles.propTypes,
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
