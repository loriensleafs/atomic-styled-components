import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Paper from '../Paper';
import Slide from '../Slide';
import useStyles from '../system/useStyles';
import { capitalize as toCap } from '../utils/helpers';
import { stylesPropType } from '../utils/propTypes';

const oppDir = {
	left: 'right',
	right: 'left',
	top: 'down',
	bottom: 'up',
};

const getPositionStyles = ({
	anchor,
	variant,
	theme: { palette: divider },
}) => {
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
};

const getStyles = props => ({
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
	root:
		props.variant === 'persistent' || props.variant === 'persistent'
			? { flex: '0 0 auto' }
			: {},
});
getStyles.propTypes = {
	variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

const DrawerBase = forwardRef(
	({ children, elevation, variant, ...passThru }, ref) => (
		<Paper
			elevation={variant === 'temporary' ? elevation : 0}
			radius="square"
			ref={ref}
			{...passThru}
		>
			{children}
		</Paper>
	),
);

const SlidingDrawer = ({ anchor, children, variant, ...passThru }) => (
	<Slide
		as={DrawerBase}
		appear={variant === 'temporary'}
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

function Drawer(props) {
	const [
		{ styles, classes },
		{
			anchor,
			BackdropProps = {},
			children,
			className,
			elevation,
			open,
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
			show={open}
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
			open={open}
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
	open: PropTypes.bool,
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
	open: false,
	variant: 'temporary', // Mobile first.
};

export default Drawer;
