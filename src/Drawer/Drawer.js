import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import Modal from './../Modal';
import Paper from './../Paper';
import Slide from './../Slide';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';

const oppositeDirection = {
	left: 'right',
	right: 'left',
	top: 'down',
	bottom: 'up',
};

const getPositionStyles = props => {
	switch (props.anchor) {
		case 'top':
			return {
				rootStyles: {},
				paperStyles: {
					rootStyles: {
						top: '0px',
						right: '0px',
						bottom: 'auto',
						left: '0px',
						height: 'auto',
						maxHeight: '100%',
						...(props.variant !== 'temporary' && {
							borderBottom: `1px solid ${props.theme.palette.divider}`,
						}),
					},
				},
			};

		case 'right':
			return {
				rootStyles: {},
				paperStyles: {
					rootStyles: {
						right: '0px',
						left: 'auto',
						...(props.variant !== 'temporary' && {
							borderLeft: `1px solid ${props.theme.palette.divider}`,
						}),
					},
				},
			};

		case 'bottom':
			return {
				rootStyles: {},
				paperStyles: {
					rootStyles: {
						top: 'auto',
						right: '0px',
						bottom: '0px',
						left: '0px',
						height: 'auto',
						maxHeight: '100%',
						...(props.variant !== 'temporary' && {
							borderTop: `1px solid ${props.theme.palette.divider}`,
						}),
					},
				},
			};

		case 'left':
			return {
				rootStyles: {},
				paperStyles: {
					rootStyles: {
						right: 'auto',
						left: '0px',
						...(props.variant !== 'temporary' && {
							borderRight: `1px solid ${props.theme.palette.divider}`,
						}),
					},
				},
			};

		default:
			return {};
	}
};

const getBaseStyles = props => ({
	modalStyles: {},
	paperStyles: {
		rootStyles: {
			zIndex: 1200,
			position: 'fixed',
			top: '0px',
			height: '100%',
			display: 'flex',
			flex: '1 0 auto',
			flexDirection: 'column',
			overflowY: 'auto',
			outline: 'none',
			WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
		},
	},
	rootStyles: (props.variant === 'permanent' || props.variant === 'persistent') && {
		flex: '0 0 auto',
	},
});

function Drawer(props) {
	const {
		anchor,
		BackdropProps = {},
		children,
		className: classNameProp,
		elevation,
		ModalProps,
		onClose,
		open,
		PaperProps,
		SlideProps,
		styles,
		variant,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const { modalStyles, paperStyles, rootStyles } = useStyles([getBaseStyles, getPositionStyles], {
		anchor,
		styles,
		theme,
		variant,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	const DrawerBase = (
		<Paper
			elevation={variant === 'temporary' ? elevation : 0}
			square
			styles={paperStyles}
			{...passThru}>
			{children}
		</Paper>
	);

	if (variant === 'permanent') {
		return (
			<div className={className} {...passThru}>
				{DrawerBase}
			</div>
		);
	}

	const SlidingDrawer = (
		<Slide in={open} direction={oppositeDirection[anchor]} {...SlideProps}>
			{DrawerBase}
		</Slide>
	);

	if (variant === 'persistent') {
		return (
			<div className={className} {...passThru}>
				{SlidingDrawer}
			</div>
		);
	}

	// variant === temporary
	return (
		<Modal
			className={className}
			onClose={onClose}
			open={open}
			styles={modalStyles}
			{...passThru}
			{...ModalProps}>
			{SlidingDrawer}
		</Modal>
	);
}

Drawer.displayName = 'Drawer';

Drawer.propTypes = {
	/**
	 * Side from which the drawer will appear.
	 */
	anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
	/**
	 * The contents of the drawer.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The elevation of the drawer.
	 */
	elevation: PropTypes.number,
	/**
	 * Properties applied to the [`Modal`](/api/modal/) element.
	 */
	ModalProps: PropTypes.object,
	/**
	 * Callback fired when the component requests to be closed.
	 *
	 * @param {object} event The event source of the callback
	 */
	onClose: PropTypes.func,
	/**
	 * If `true`, the drawer is open.
	 */
	open: PropTypes.bool,
	/**
	 * Properties applied to the [`Paper`](/api/paper/) element.
	 */
	PaperProps: PropTypes.object,
	/**
	 * Properties applied to the [`Slide`](/api/slide/) element.
	 */
	SlideProps: PropTypes.object,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * The variant to use.
	 */
	variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

Drawer.defaultProps = {
	anchor: 'left',
	elevation: 16,
	open: false,
	variant: 'temporary', // Mobile first.
};

export default Drawer;
