import PropTypes from 'prop-types';
import React, { forwardRef, useCallback } from 'react';
import Fade from '../Fade';
import Modal from '../Modal';
import Paper from '../Paper';
import { getSpacing, useStyles } from '../system';
import combine from '../utils/combine';
import { stylesPropType } from '../utils/propTypes';

const getFullWidthStyles = ({ fullWidth }) =>
	fullWidth && {
		paper: {
			width: '100%',
		},
	};

const getFullScreenStyles = ({ fullScreen }) =>
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
	};

const getScrollStyles = ({ fullScreen, scroll }) => {
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
};

const getMaxWidthStyles = ({
	fullScreen,
	maxWidth,
	theme: { breakpoints: bps, getMq },
}) => {
	const getBp = bp => getMq(bps[bp] + 48 * 2, true);

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
};

const getBaseStyles = () => ({
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
});

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
	const {
		classes,
		props: {
			children,
			className,
			disableBackdropClick,
			duration,
			ease,
			onEnter,
			onEntering,
			onEntered,
			onExit,
			onExiting,
			onExited,
			open,
			onBackdropClick,
			onEscapeKeyDown,
			onClose,
			PaperComponent,
			PaperProps,
			TransitionComponent,
			TransitionProps,
			...passThru
		},
		styles,
	} = useStyles(props, getStyles, { nested: true });

	const handleBackdropClick = useCallback(event => {
		if (event.target !== event.currentTarget) {
			return;
		}
		if (onBackdropClick) {
			onBackdropClick(event);
		}
		if (!disableBackdropClick && onClose) {
			onClose(event, 'backdropClick');
		}
	}, []);

	return (
		<Modal
			className={className}
			closeAfterTransition
			disableBackdropClick={disableBackdropClick}
			onBackdropClick={handleBackdropClick}
			onEscapeKeyDown={onEscapeKeyDown}
			onClose={onClose}
			open={open}
			role="dialog"
			styles={styles.root}
			{...passThru}
		>
			<TransitionComponent
				id="dialog"
				appear
				className={classes.container}
				duration={duration}
				ease={ease}
				onEnter={onEnter}
				onEntering={onEntering}
				onEntered={onEntered}
				onExit={onExit}
				onExiting={onExiting}
				onExited={onExited}
				role="document"
				show={open}
				{...TransitionProps}
			>
				<PaperComponent
					elevation={23}
					ref={ref}
					styles={styles.paper}
					{...PaperProps}
				>
					{children}
				</PaperComponent>
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
	duration: PropTypes.shape({
		// The duration type the animation should use to transition in.
		enter: PropTypes.string,
		// The duration type the animation should use to transition out.
		exit: PropTypes.string,
	}),
	// The easing type the animation should use.
	ease: PropTypes.string,
	// If `true`, the Dialog is open.
	open: PropTypes.bool.isRequired,
	// Callback fired when the backdrop is clicked.
	onBackdropClick: PropTypes.func,
	// Callback fired when the component requests to be closed.
	// @param {object} event The event source of the callback
	onClose: PropTypes.func,
	// Callback that is triggered when enter animation starts.
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
	// Properties applied to the [`Paper`](/api/paper/) element.
	PaperProps: PropTypes.object,
	...stylesPropType,
	// Transition component.
	TransitionComponent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	// Properties applied to the `Transition` element.
	TransitionProps: PropTypes.object,
	...getStyles.propTypes,
	...stylesPropType,
};

Dialog.defaultProps = {
	disableBackdropClick: false,
	disableEscapeKeyDown: false,
	duration: {
		enter: 'shorter',
		exit: 'shortest',
	},
	fullScreen: false,
	fullWidth: false,
	maxWidth: 'sm',
	PaperComponent: Paper,
	scroll: 'paper',
	TransitionComponent: Fade,
};

export default Dialog;
