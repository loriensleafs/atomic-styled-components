import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './../system/useStyles';
import Fade from './../Fade';
import { stylesPropType } from './../utils/propTypes';

function getStyles(props) {
	const { invisible } = props;

	return {
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
	};
}
getStyles.propTypes = {
	/**
	 * If `true`, the backdrop is invisible.
	 * It can be used when rendering a popover or a custom select component.
	 */
	invisible: PropTypes.bool,
	/**
	 * If `true`, the backdrop is open.
	 */
	open: PropTypes.bool.isRequired,
};

function Backdrop(props) {
	const [
		{ className: cn = '', open, ...passThru },
		styles,
		classes,
	] = useStyles(props, getStyles, { whitelist: ['open'] });

	return (
		<Fade
			aria-hidden="true"
			className={cn.concat(classes)}
			enter="short"
			exit="shorter"
			ease="sharp"
			in={open}
			{...passThru}
		/>
	);
}

Backdrop.displayName = 'Backdrop';

Backdrop.propTypes = {
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	...stylesPropType,
	...getStyles.propTypes,
};

Backdrop.defaultProps = {
	invisible: false,
};

export default Backdrop;
