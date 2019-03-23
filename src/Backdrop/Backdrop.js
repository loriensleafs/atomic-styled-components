import PropTypes from 'prop-types';
import React from 'react';
import Fade from '../Fade';
import useStyles from '../system/useStyles';
import { stylesPropType } from '../utils/propTypes';

const getStyles = ({ invisible }) => ({
	position: 'fixed',
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	backgroundColor: invisible ? 'transparent' : 'rgba(0,0,0,0.5)',
	// Removes the grey highlight.
	WebkitTapHighlightColor: 'transparent',
	// Disable scroll capabilities
	touchAction: 'none',
	transform: 'translate3d(0,0,0)',
});
getStyles.propTypes = {
	// If `true`, the backdrop is invisible.
	// It can be used when rendering a popover or a custom select component.
	invisible: PropTypes.bool,
	// If `true`, the backdrop is open.
	open: PropTypes.bool.isRequired,
};

function Backdrop(props) {
	const {
		classes,
		props: { open, ...passThru },
	} = useStyles(props, getStyles, {
		whitelist: ['open'],
	});

	return (
		<Fade
			appear
			aria-hidden="true"
			ease="sharp"
			duration={{
				enter: 'shorter',
				exit: 'shortest',
			}}
			show={open}
		>
			<div className={classes} {...passThru} />
		</Fade>
	);
}

Backdrop.displayName = 'Backdrop';

Backdrop.propTypes = {
	className: PropTypes.string,
	...stylesPropType,
	...getStyles.propTypes,
	...stylesPropType,
};

Backdrop.defaultProps = {
	invisible: false,
};

export default Backdrop;
