import React from 'react';
import PropTypes from 'prop-types';
import Modal from './../Modal';
import Paper from './../Paper';
import Slide from './../Slide';
import useStyles from './../system/useStyles';
import combine from './../utils/combine';
import { capitalize, isEq } from './../utils/helpers';
import { stylesPropType } from './../utils/propTypes';

const oppositeDirection = {
	left: 'right',
	right: 'left',
	top: 'down',
	bottom: 'up',
};

function getPositionStyles(props) {
	const {
		anchor,
		variant,
		theme: { palette },
	} = props;
	const getBorderStyle = side =>
		!isEq(variant, 'temporary') && {
			[`border${capitalize(oppositeDirection[side])}`]: `1px solid ${
				palette.divider
			}`,
		};

	switch (anchor) {
		case 'top':
			return {
				top: '0px',
				right: '0px',
				bottom: 'auto',
				left: '0px',
				height: 'auto',
				maxHeight: '100%',
				...getBorderStyle('top'),
			};

		case 'right':
			return {
				right: '0px',
				left: 'auto',
				...getBorderStyle('right'),
			};

		case 'bottom':
			return {
				top: 'auto',
				right: '0px',
				bottom: '0px',
				left: '0px',
				height: 'auto',
				maxHeight: '100%',
				...getBorderStyle('bottom'),
			};

		default:
			// 'left'
			return {
				right: 'auto',
				left: '0px',
				...getBorderStyle('left'),
			};
	}
}

function getVariantStyles(props) {
	const { variant } = props;

	switch (variant) {
		case 'permanent':
			return {
				paper: {
					zIndex: 1200,
					position: 'fixed',
					top: '0px',
					height: '100%',
					overflowY: 'auto',
					outline: 'none', // Add iOS momentum scrolling.
				},
				root: {
					flex: '0 0 auto',
				},
			};

		case 'persistent':
			return {
				root: {
					flex: '0 0 auto',
				},
			};

		default:
			return null;
	}
}

function getBaseStyles(props) {
	const { variant } = props;

	return {
		modal: {},
		paper: {
			...{
				position: 'relative',
				height: '100%',
				display: 'flex',
				flex: '1 0 auto',
				flexDirection: 'column',
			},
			...(isEq(variant, 'persistant') || isEq(variant, 'temporary')
				? { height: '100%' }
				: getPositionStyles(props)),
		},
		root: {},
		slide: {
			...{
				zIndex: 1200,
				position: 'fixed',
				top: '0px',
				height: '100%',
				overflowY: 'auto',
				outline: 'none', // Add iOS momentum scrolling.
			},
			...getPositionStyles(props),
		},
	};
}

const getStyles = combine(getBaseStyles, getVariantStyles);
getStyles.propTypes = {
	variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

function Drawer(props) {
	const [
		{
			anchor,
			BackdropProps = {},
			children,
			className,
			containerRef,
			elevation,
			ModalProps,
			onClose,
			open,
			PaperProps,
			SlideProps,
			variant,
			...passThru
		},
		styles,
		classes,
	] = useStyles(props, getStyles, { whitelist: ['variant'] });

	const DrawerBase = (
		<Paper
			elevation={variant === 'temporary' ? elevation : 0}
			radius="square"
			styles={styles.paper}
			{...passThru}
		>
			{children}
		</Paper>
	);

	const SlidingDrawer = (
		<Slide
			className={classes.slide}
			direction={oppositeDirection[anchor]}
			enter="short"
			exit="shorter"
			ease="sharp"
			in={open}
			{...SlideProps}
		>
			{DrawerBase}
		</Slide>
	);

	switch (variant) {
		case 'permanent':
			return (
				<div className={classes.root} {...passThru}>
					{DrawerBase}
				</div>
			);

		case 'persistent':
			return (
				<div className={classes.root} {...passThru}>
					{SlidingDrawer}
				</div>
			);

		default:
			// 'temporary'
			return (
				<Modal
					className={classes.root}
					onClose={onClose}
					open={open}
					styles={styles.modal}
					{...passThru}
					{...ModalProps}
				>
					{SlidingDrawer}
				</Modal>
			);
	}
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
	containerRef: PropTypes.any,
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
	...stylesPropType,
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
