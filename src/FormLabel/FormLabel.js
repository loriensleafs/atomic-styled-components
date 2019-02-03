import React from 'react';
import PropTypes from 'prop-types';
import useFormControl from '../FormControl/useFormControl';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { componentPropType } from '../utils/propTypes';

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

const getBaseStyles = ({
	palette,
	typography: { fontFamlies, fontSizes },
}) => ({
	root: {
		padding: '0px',
		color: palette.text.secondary,
		fontFamily: fontFamlies.ui,
		fontSize: fontSizes[3],
		lineHeight: 1,
		':focused': {
			color: palette.primary[palette.type],
		},
		':disabled': {
			color: palette.text.disabled,
		},
	},
	asterisk: {},
});

const getStyles = combine(getBaseStyles, getErrorStyles);
getStyles.propTypes = {
	// If `true`, the label should be displayed in an error state.
	error: PropTypes.bool,
};

function FormLabel(props) {
	const [mergedProps] = useFormControl(props, [
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
			className,
			error,
			disabled,
			filled,
			focued,
			required,
			...passThru
		},
	] = useStyles(mergedProps, getStyles, {
		whitelist: ['error'],
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
	// If `true`, the label should be displayed in a disabled state.
	disabled: PropTypes.bool,
	// If `true`, the label should use filled classes key.
	filled: PropTypes.bool,
	// If `true`, the label input is focused (used by `FormGroup` components).
	focused: PropTypes.bool,
	// If `true`, the label will indicate that the input is required.\
	required: PropTypes.bool,
	...componentPropType,
	...getStyles.propTypes,
};

FormLabel.defaultProps = {
	as: 'label',
};

export default FormLabel;
