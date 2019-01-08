import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from './../Modal';
import Paper from './../Paper';
import Slide from './../Slide';
import useDidMount from './../hooks/useDidMount';
import useStyles from './../system/useStyles';
import combine from './../utils/combine';
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
	const isTemporary = props.variant === 'temporary';
	const isPersistent = props.variant === 'persistent';

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
			...(isPersistent || isTemporary
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
		{ styles, classes },
		{
			anchor,
			BackdropProps = {},
			children,
			className,
			elevation,
			ModalProps,
			onClose,
			open,
			PaperProps,
			SlideProps,
			variant,
			...passThru
		},
	] = useStyles(props, getStyles, { whitelist: ['variant'] });
	const mounted = useRef(false);
	const isTemporary = variant === 'temporary';

	const DrawerBase = (
		<Paper
			elevation={isTemporary ? elevation : 0}
			radius="square"
			styles={styles.paper}
			{...passThru}
			{...PaperProps}
		>
			{children}
		</Paper>
	);

	const SlidingDrawer = (
		<Slide
			appear={mounted.current}
			className={classes.slide}
			direction={oppDir[anchor]}
			ease="sharp"
			duration={{
				enter: 'short',
				exit: 'shorter',
			}}
			show={open}
			{...SlideProps}
		>
			{DrawerBase}
		</Slide>
	);

	useDidMount(() => {
		mounted.current = true;
	});

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
	// Side from which the drawer will appear.
	anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
	// Contents of the drawer.
	children: PropTypes.node,
	className: PropTypes.string,
	// Elevation of the drawer.
	elevation: PropTypes.number,
	// Properties applied to the [`Modal`](/api/modal/) element.
	ModalProps: PropTypes.object,
	// Callback fired when the component requests to be closed.
	// @param {object} event The event source of the callback
	onClose: PropTypes.func,
	// If `true`, the drawer is open.
	open: PropTypes.bool,
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
	open: false,
	variant: 'temporary', // Mobile first.
};

export default Drawer;
