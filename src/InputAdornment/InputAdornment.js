import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Typography';
import useFormControlManager from '../FormControl/useFormControlManager';
import combine from '../utils/combine';
import { getSpacing, useStyles } from '../system';
import { stylesPropType, componentPropType } from '../utils/propTypes';

const getPositionStyles = ({ position }) =>
	(position === 'start' && getSpacing({ mr: 2 })) ||
	(position === 'end' && getSpacing({ ml: 2 }));

const getVariantStyles = ({ variant }) =>
	variant === 'filled' && getSpacing({ mt: 3 });

const getDisabledPointerEventsStyles = ({ disabledPointerEvents }) =>
	disabledPointerEvents && {
		pointerEvents: 'none',
	};

const baseStyles = {
	height: '0.01em', // Fixes IE 11 flexbox alignment.  Will remove eventually.
	maxHeight: '2em',
	display: 'flex',
	alignItems: 'center',
};

const getStyles = combine(
	getPositionStyles,
	getVariantStyles,
	getDisabledPointerEventsStyles,
);
getStyles.propTypes = {
	/**
	 * Disable pointer events on the root.
	 * This allows for the content of the adornment to focus the input on click.
	 */
	disablePointerEvents: PropTypes.bool,
	// The position this adornment should appear relative to the `Input`.
	position: PropTypes.oneOf(['start', 'end']),
	/**
	 * The variant to use.
	 * Note: If you are using the `TextField` component or the `FormControl`
	 * component you do not have to set this manually.
	 */
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

function InputAdornment(props) {
	const mergedProps = useFormControlManager(props, ['variant']);
	const [
		{ classes },
		{ as: Component, children, disableTypography, ...passThru },
	] = useStyles(mergedProps, getStyles, { baseStyles });

	return (
		<Component className={classes} {...passThru}>
			{typeof children === 'string' && !disableTypography ? (
				<Typography color="text.secondary">{children}</Typography>
			) : (
				children
			)}
		</Component>
	);
}

InputAdornment.displayName = 'InputAdornment';

InputAdornment.propTypes = {
	// The content of the component, normally an `IconButton` or string.
	children: PropTypes.node.isRequired,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	// If children is a string then disable wrapping in a Typography component.

	disableTypography: PropTypes.bool,
	// The position this adornment should appear relative to the `Input`.

	position: PropTypes.oneOf(['start', 'end']),
	...getStyles.propTypes,
	...componentPropType,
	...stylesPropType,
};

InputAdornment.defaultProps = {
	as: 'div',
	disablePointerEvents: false,
	disableTypography: false,
};

export default InputAdornment;
