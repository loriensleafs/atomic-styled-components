import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Modal from './../Modal';
import Paper from './../Paper';
import Slide from './../Slide';
import useStyles from './../system/useStyles';
import { capitalize as toCap } from './../utils/helpers';
import { stylesPropType } from './../utils/propTypes';

const oppDir = {
	left: 'right',
	right: 'left',
	top: 'down',
	bottom: 'up',
};

function getPositionStyles(props) {
	const {
		anchor,
		variant,
		theme: { palette: divider },
	} = props;
	const isTemp = variant === 'temporary';
	const getBorder = side =>
		!isTemp && { [`border${toCap(oppDir[side])}`]: `1px solid ${divider}` };

	switch (anchor) {
		case 'top':
			return {
				top: '0px',
				right: '0px',
				bottom: 'auto',
				left: '0px',
				height: 'auto',
				maxHeight: '100%',
				...getBorder('top'),
			};
		case 'right':
			return {
				right: '0px',
				left: 'auto',
				...getBorder('right'),
			};
		case 'bottom':
			return {
				top: 'auto',
				right: '0px',
				bottom: '0px',
				left: '0px',
				height: 'auto',
				maxHeight: '100%',
				...getBorder('bottom'),
			};
		default:
			// 'left'
			return {
				right: 'auto',
				left: '0px',
				...getBorder('left'),
			};
	}
}

function getStyles(props) {
	const isPersistent = props.variant === 'persistent';
	const isPermanent = props.variant === 'persistent';

	return {
		modal: {},
		paper: {
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
			...getPositionStyles(props),
		},
		root: isPermanent || isPersistent ? { flex: '0 0 auto' } : {},
	};
}
getStyles.propTypes = {
	variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

const DrawerBase = forwardRef((props, ref) => {
	const { children, elevation, variant, ...passThru } = props;

	return (
		<Paper
			elevation={variant === 'temporary' ? elevation : 0}
			radius="square"
			ref={ref}
			{...passThru}
		>
			{children}
		</Paper>
	);
});

function SlidingDrawer(props) {
	const isTemporary = props.variant === 'temporary';
	const { anchor, children, ...passThru } = props;

	return (
		<Slide
			as={DrawerBase}
			appear={isTemporary}
			direction={oppDir[anchor]}
			duration={{
				enter: 'short',
				exit: 'shorter',
			}}
			ease="sharp"
			{...passThru}
		>
			{children}
		</Slide>
	);
}

function Drawer(props) {
	const [
		{ styles, classes },
		{
			anchor,
			BackdropProps = {},
			children,
			className,
			elevation,
			isOpen,
			ModalProps,
			onClose,
			PaperProps,
			SlideProps,
			variant,
			...passThru
		},
	] = useStyles(props, getStyles, { whitelist: ['variant'] });
	const isTemporary = variant === 'temporary';
	const isPermanent = variant === 'permanent';

	const DrawerComponent = isPermanent ? (
		<DrawerBase
			elevation={elevation}
			styles={styles.paper}
			variant={variant}
			{...PaperProps}
			{...passThru}
		>
			{children}
		</DrawerBase>
	) : (
		<SlidingDrawer
			anchor={anchor}
			elevation={elevation}
			show={isOpen}
			styles={styles.paper}
			variant={variant}
			{...SlideProps}
			{...passThru}
		>
			{children}
		</SlidingDrawer>
	);

	return isTemporary ? (
		<Modal
			className={classes.root}
			onClose={onClose}
			isOpen={isOpen}
			styles={styles.modal}
			{...passThru}
			{...ModalProps}
		>
			{DrawerComponent}
		</Modal>
	) : (
		<div className={classes.root} {...passThru}>
			{DrawerComponent}
		</div>
	);
}

Drawer.displayName = 'Drawer';

Drawer.propTypes = {
	// Side from which the drawer will appear.
	anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
	// Contents of the drawer.
	children: PropTypes.node,
	className: PropTypes.string,
	// Elevation of the drawer.
	elevation: PropTypes.number,
	// If `true`, the drawer is open.
	isOpen: PropTypes.bool,
	// Properties applied to the [`Modal`](/api/modal/) element.
	ModalProps: PropTypes.object,
	// Callback fired when the component requests to be closed.
	// @param {object} event The event source of the callback
	onClose: PropTypes.func,
	// Properties applied to the [`Paper`](/api/paper/) element.
	PaperProps: PropTypes.object,
	// Properties applied to the [`Slide`](/api/slide/) element.
	SlideProps: PropTypes.object,
	// The variant to use.
	variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
	...stylesPropType,
};

Drawer.defaultProps = {
	anchor: 'left',
	elevation: 16,
	isOpen: false,
	variant: 'temporary', // Mobile first.
};

export default Drawer;
