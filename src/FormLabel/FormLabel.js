import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import useFormControl from '../FormControl/useFormControl';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const getBaseStyles = props => ({
	root: {
		padding: '0px',
		color: props.theme.palette.text.secondary,
		fontFamily: props.theme.typography.fontFamilies.ui,
		fontSize: props.theme.typography.fontSizes[3],
		lineHeight: 1,
	},
	asterisk: {},
});

const getDisabledStyles = ({ disabled, theme: { palette } }) =>
	disabled && {
		root: {
			color: palette.text.disabled,
		},
	};

const getErrorStyles = ({ disabled, error, theme: { palette } }) =>
	!disabled &&
	error && {
		root: {
			color: palette.error.main,
		},
		asterisk: {
			color: palette.error.main,
		},
	};

const getFocusedStyles = ({ disabled, focused, theme: { palette } }) =>
	!disabled &&
	focused && {
		root: {
			color: palette.primary[palette.type === 'light' ? 'dark' : 'light'],
		},
	};

const getStyles = combine(
	getBaseStyles,
	getDisabledStyles,
	getFocusedStyles,
	getErrorStyles,
);
getStyles.propTypes = {
	// If `true`, the label should be displayed in a disabled state.
	disabled: PropTypes.bool,
	// If `true`, the label should be displayed in an error state.
	error: PropTypes.bool,
	// If `true`, the label should use filled classes key.
	filled: PropTypes.bool,
	// If `true`, the label input is focused (used by `FormGroup` components).
	focused: PropTypes.bool,
	// If `true`, the label will indicate that the input is required.\
	required: PropTypes.bool,
};

const FormLabel = forwardRef((props, ref) => {
	const { formControlEnabled, ...fc } = useFormControl(props, [
		'error',
		'disabled',
		'filled',
		'focused',
		'required',
	]);
	const {
		classes,
		props: { as: Component, children, filled, required, ...passThru },
	} = useStyles({ ...props, ...fc }, getStyles, {
		nested: true,
	});

	return (
		<Component className={classes.root} ref={ref} {...passThru}>
			{children}
			{fc.required && (
				<span className={classes.asterisk}>{'\u2009*'}</span>
			)}
		</Component>
	);
});

FormLabel.displayName = 'FormLabel';

FormLabel.propTypes = {
	// The content of the component.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object,
	className: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

FormLabel.defaultProps = {
	as: 'label',
};

export default FormLabel;
