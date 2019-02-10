import React from 'react';
import PropTypes from 'prop-types';
import useFormControlManager from '../FormControl/useFormControlManager';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const getDisabledStyles = ({ disabled, theme: { palette } }) =>
	disabled && {
		color: palette.text.disabled,
	};

const getErrorStyles = ({ error, theme: { palette } }) =>
	error &
	{
		root: {
			color: palette.error.main,
		},
		asterisk: {
			color: palette.error.main,
		},
	};

const getFocusedStyles = ({ focused, theme: { palette } }) =>
	focused && {
		color: palette.primary[palette.type === 'light' ? 'dark' : 'light'],
	};

const getBaseStyles = props => ({
	root: {
		padding: '0px',
		color: props.theme.palette.text.secondary,
		fontFamily: props.theme.typography.fontFamlies.ui,
		fontSize: props.theme.typography.fontSizes[3],
		lineHeight: 1,
		...getFocusedStyles(props),
		...getDisabledStyles(props),
	},
	asterisk: {},
});

const getStyles = combine(getBaseStyles, getErrorStyles);
getStyles.propTypes = {
	// If `true`, the label should be displayed in a disabled state.
	disabled: PropTypes.bool,
	// If `true`, the label should be displayed in an error state.
	error: PropTypes.bool,
	// If `true`, the label input is focused (used by `FormGroup` components).
	focused: PropTypes.bool,
};

function FormLabel(props) {
	const [mergedProps] = useFormControlManager(props, [
		'error',
		'disabled',
		'filled',
		'focused',
		'required',
	]);
	const [
		{ classes },
		{
			as: Component,
			children,
			disabled,
			error,
			filled,
			focued,
			required,
			...passThru
		},
	] = useStyles(mergedProps, getStyles, {
		whitelist: ['disabled', 'error', 'focused'],
	});

	return (
		<Component className={classes.root} {...passThru}>
			{children}
			{required && <span className={classes.asterisk}>{'\u2009*'}</span>}
		</Component>
	);
}

FormLabel.displayName = 'FormLabel';

FormLabel.propTypes = {
	// The content of the component.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	// If `true`, the label should use filled classes key.
	filled: PropTypes.bool,
	// If `true`, the label will indicate that the input is required.\
	required: PropTypes.bool,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

FormLabel.defaultProps = {
	as: 'label',
};

export default FormLabel;
