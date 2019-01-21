import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from './../Modal';
import Fade from './../Fade';
import Paper from './../Paper';
import combine from './../utils/combine';
import { getSpacing, useStyles } from '../system';
import {
	easingPropType,
	durationPropType,
	stylesPropType,
} from './../utils/propTypes';

function getFullWidthStyles({ fullWidth }) {
	return (
		fullWidth && {
			paper: {
				width: '100%',
			},
		}
	);
}

function getFullScreenStyles({ fullScreen }) {
	return (
		fullScreen && {
			container: {
				width: '100%',
			},
			paper: {
				width: '100%',
				maxWidth: '100%',
				height: '100%',
				maxHeight: 'none',
				margin: '0px',
				borderRadius: '0px',
			},
		}
	);
}

function getScrollStyles({ fullScreen, scroll }) {
	switch (scroll) {
		case 'body':
			return {
				container: {
					overflowY: 'auto',
					overflowX: 'hidden',
				},
				paper: {
					margin: fullScreen ? '0px' : '48px auto',
				},
			};
		case 'paper':
			return {
				container: {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
				paper: {
					flex: '0 1 auto',
					maxHeight: 'calc(100% - 96px)',
				},
			};
	}
}

function getMaxWidthStyles(props) {
	const {
		fullScreen,
		maxWidth,
		theme: { breakpoints: bps, getMq },
	} = props;

	function getBp(bp) {
		return getMq(bps[bp] + 48 * 2, true);
	}

	switch (maxWidth) {
		case 'xs':
			return {
				paper: {
					maxWidth: `${bps[0]}px`,
					[`${getBp(0)}`]: getSpacing({ m: fullScreen ? 0 : 4.5 }),
				},
			};
		case 'sm':
			return {
				paper: {
					maxWidth: `${bps[1]}px`,
					[`${getBp(1)}`]: getSpacing({ m: fullScreen ? 0 : 4.5 }),
				},
			};
		case 'md':
			return {
				paper: {
					maxWidth: `${bps[2]}px`,
					[`${getBp(2)}`]: getSpacing({ m: fullScreen ? 0 : 4.5 }),
				},
			};
		case 'lg':
			return {
				paper: {
					maxWidth: `${bps[3]}px`,
					[`${getBp(3)}`]: getSpacing({ m: fullScreen ? 0 : 4.5 }),
				},
			};
		case 'xl':
			return {
				paper: {
					maxWidth: `${bps[4]}px`,
					[`${getBp(4)}`]: getSpacing({ m: fullScreen ? 0 : 4.5 }),
				},
			};
	}
}

function getBaseStyles() {
	return {
		container: {
			height: '100%',
			outline: 'none',
		},
		paper: {
			position: 'relative',
			display: 'flex',
			flexDirection: 'column',
			overflowY: 'auto',
			...getSpacing({ m: 4.5 }),
		},
		root: {},
	};
}

const getStyles = combine(
	getBaseStyles,
	getMaxWidthStyles,
	getScrollStyles,
	getFullScreenStyles,
	getFullWidthStyles,
);
getStyles.propTypes = {
	// If `true`, the dialog will be full-screen
	fullScreen: PropTypes.bool,
	// If `true`, the dialog stretches to `maxWidth`.
	fullWidth: PropTypes.bool,
	/**
	 * Determine the max width of the dialog.
	 * The dialog width grows with the size of the screen, this property is
	 * useful on desktop when you might need different width sizes across your
	 * application.
	 * Set to `false` to disable `maxWidth`.
	 */
	maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
	// Determine the container for scrolling the dialog.
	scroll: PropTypes.oneOf(['body', 'paper']),
};

const Dialog = forwardRef((props, ref) => {
	const [
		{ styles, classes },
		{
			children,
			className,
			disableBackdropClick,
			onBackdropClick,
			onClose,
			onEnd,
			onStart,
			open,
			PaperProps,
			TransitionComponent,
			TransitionProps,
			...passThru
		},
	] = useStyles(props, getStyles);

	const handleBackdropClick = useCallback(event => {
		if (event.target !== event.currentTarget) return;
		if (onBackdropClick) onBackdropClick(event);
		if (!disableBackdropClick && onClose) onClose(event, 'backdropClick');
	}, []);

	return (
		<Modal
			className={className}
			disableBackdropClick={disableBackdropClick}
			onBackdropClick={handleBackdropClick}
			onClose={onClose}
			open={open}
			role="dialog"
			styles={styles.root}
			{...passThru}
		>
			<TransitionComponent
				className={classes.container}
				onEnd={onEnd}
				onStart={onStart}
				role="document"
				show={open}
				{...TransitionProps}
			>
				<Paper
					elevation={23}
					ref={ref}
					styles={styles.paper}
					{...PaperProps}
				>
					{children}
				</Paper>
			</TransitionComponent>
		</Modal>
	);
});

Dialog.displayName = 'Dialog';

Dialog.propTypes = {
	BackdropProps: PropTypes.object,
	//  Dialog children, usually the included sub-components.
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	// If `true`, clicking the backdrop will not fire the `onClose` callback.
	disableBackdropClick: PropTypes.bool,
	// If `true`, hitting escape will not fire the `onClose` callback.
	disableEscapeKeyDown: PropTypes.bool,
	// Callback fired when the backdrop is clicked.
	onBackdropClick: PropTypes.func,
	// Callback fired when the component requests to be closed.
	// @param {object} event The event source of the callback
	onClose: PropTypes.func,
	// Callback fired before the dialog enters.
	onEnter: PropTypes.func,
	// Callback fired when the dialog has entered.
	onEntered: PropTypes.func,
	// Callback fired when the dialog is entering.
	onEntering: PropTypes.func,
	// Callback fired when the escape key is pressed,
	// `disableKeyboard` is false and the modal is in focus.
	onEscapeKeyDown: PropTypes.func,
	// Callback fired before the dialog exits.
	onExit: PropTypes.func,
	// Callback fired when the dialog has exited.
	onExited: PropTypes.func,
	// Callback fired when the dialog is exiting.
	onExiting: PropTypes.func,
	// If `true`, the Dialog is open.
	open: PropTypes.bool.isRequired,
	// Properties applied to the [`Paper`](/api/paper/) element.
	PaperProps: PropTypes.object,
	...stylesPropType,
	// Transition component.
	TransitionComponent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	// The duration for the transition.
	transitionDuration: durationPropType,
	// The easing for the transition.
	transitionEase: easingPropType,
	// Properties applied to the `Transition` element.
	TransitionProps: PropTypes.object,
	...getStyles.propTypes,
	...stylesPropType,
};

Dialog.defaultProps = {
	disableBackdropClick: false,
	disableEscapeKeyDown: false,
	fullScreen: false,
	fullWidth: false,
	maxWidth: 'sm',
	scroll: 'paper',
	TransitionComponent: Fade,
};

export default Dialog;
