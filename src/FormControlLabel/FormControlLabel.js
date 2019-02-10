import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Typography';
import useFormControlManager from '../FormControl/useFormControlManager';
import combine from '../utils/combine';
import { getSpacing, useStyles } from '../system';
import { stylesPropType } from '../utils/propTypes';

const getDisabledStyles = ({ disabled, theme: { palette } }) =>
	disabled && {
		root: {
			cursor: 'default',
		},
		label: {
			color: createPalette.text.disabled,
		},
	};

const getPlacementStyles = ({ labelPlacement }) => {
	switch (labelPlacement) {
		case 'start':
			return {
				...getSpacing({ ml: 3, mr: -3 }),
				flexDirection: 'row-reverse',
			};
		case 'top':
			return {
				...getSpacing({ ml: 3 }),
				flexDirection: 'column-reverse',
			};
		case 'bottom':
			return {
				...getSpacing({ ml: 3 }),
				flexDirection: 'column',
			};
		default:
			return {};
	}
};

const getBaseStyles = props => ({
	root: {
		...getSpacing({ ml: -3, mr: 3 }),
		display: 'inline-flex',
		alignItems: 'center',
		verticalAlign: 'middle',
		cursor: 'pointer',
		WebkitTapHighlightColor: 'transparent',
	},
	label: getPlacementStyles(props),
});

const getStyles = combine(getBaseStyles, getDisabledStyles);
getStyles.PropTypes = {
	// If `true`, the control will be disabled.
	disabled: PropTypes.bool,
	// The position of the label.
	labelPlacement: PropTypes.oneOf(['end', 'start', 'top', 'bottom']),
};

function FormControlLabel(props) {
	const fcProps = useFormControlManager(
		{ ...props, ...(props.control.props || {}) },
		['disabled'],
	);
	const [
		{ classes },
		{
			checked,
			control,
			disabled,
			inputRef,
			label,
			name,
			onChange,
			value,
			...passThru
		},
	] = useStyles(fcProps, getStyles, {
		whitelist: ['disabled'],
	});

	const controlProps = [
		'checked',
		'name',
		'onChange',
		'value',
		'inputRef',
	].reduce(
		(acc, key) =>
			typeof control.props[key] === 'undefined' &&
			typeof mergedProps[key] !== 'undefined'
				? { ...acc, [key]: mergedProps[key] }
				: acc,
		{ disabled },
	);

	return (
		<label className={classes.root} {...passThru}>
			{React.cloneElement(control, controlProps)}
			<Typography as="span" className={classes.label}>
				{label}
			</Typography>
		</label>
	);
}

FormControlLabel.displayName = 'FormControlLabel';

FormControlLabel.propTypes = {
	// If `true`, the component appears selected.
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	// A control element. It can be be a `Radio`, a `Switch` or a `Checkbox`.
	control: PropTypes.element,
	// Use that property to pass a ref callback to the native input component.
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	// The text to be used in an enclosing label element.
	label: PropTypes.node,
	name: PropTypes.string,
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.checked`.
	 * @param {boolean} checked The `checked` value of the switch
	 */
	onChange: PropTypes.func,
	// The value of the component.
	value: PropTypes.string,
	...getStyles.propTypes,
	...stylesPropType,
};

FormControlLabel.defaultProps = {
	labelPlacement: 'end',
};

export default FormControlLabel;
