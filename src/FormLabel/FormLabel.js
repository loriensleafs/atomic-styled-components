import React from 'react';
import PropTypes from 'prop-types';
import useFormControl from './../FormControl/useFormControl';
import useStyles from './../system/useStyles';
import combine from './../utils/combine';
import { componentPropType } from './../utils/propTypes';

function getErrorStyles(props) {
	const {
		hasError,
		theme: { palette },
	} = props;

	return (
		hasError &
		{
			root: {
				color: palette.error.main,
			},
			asterisk: {
				color: palette.error.main,
			},
		}
	);
}

function getBaseStyles(props) {
	const {
		palette,
		typography: { fontFamlies, fontSizes },
	} = props.theme;

	return {
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
	};
}

const getStyles = combine(getBaseStyles, getErrorStyles);
getStyles.propTypes = {
	// If `true`, the label should be displayed in an error state.
	hasError: PropTypes.bool,
};

function FormLabel(props) {
	const [mergedProps] = useFormControl(props, [
		'hasError',
		'isDisabled',
		'isFilled',
		'isFocused',
		'isRequired',
	]);
	const [
		{ classes },
		{
			as: Component,
			children,
			className,
			hasError,
			isDisabled,
			isFilled,
			isFocued,
			isRequired,
			...passThru
		},
	] = useStyles(mergedProps, getStyles, {
		whitelist: ['hasError'],
	});

	return (
		<Component className={classes.root} {...passThru}>
			{children}
			{isRequired && (
				<span className={classes.asterisk}>{'\u2009*'}</span>
			)}
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
	isDisabled: PropTypes.bool,
	// If `true`, the label should use filled classes key.
	isFilled: PropTypes.bool,
	/**
	 * If `true`, the input of this label is focused (used by `FormGroup`
	 * components).
	 */
	isFocused: PropTypes.bool,
	// If `true`, the label will indicate that the input is required.\
	isRequired: PropTypes.bool,
	...componentPropType,
	...getStyles.propTypes,
};

FormLabel.defaultProps = {
	as: 'label',
};

export default FormLabel;
