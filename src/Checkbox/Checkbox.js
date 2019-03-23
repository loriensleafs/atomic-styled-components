import PropTypes from 'prop-types';
import React from 'react';
import useInput from '../hooks/useInput';
import SelectionControl from '../SelectionControl';
import CheckBoxIcon from '../svgIcons/CheckBox';
import CheckboxOutlineBlankIcon from '../svgIcons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '../svgIcons/IndeterminateCheckBox';
import useStyles from '../system/useStyles';
import { fade } from '../utils/colorHelpers';
import combine from '../utils/combine';
import { stylesPropType } from '../utils/propTypes';

const getDisabledStyles = ({ disabled, theme: { palette } }) =>
	disabled && {
		color: palette.action.disabled,
		pointerEvents: 'none',
	};

const getCheckedStyles = ({ checked, color, theme: { palette } }) =>
	checked && {
		color:
			color === 'primary' || color === 'secondary'
				? palette[color].main
				: palette.text.secondary,
		':hover': {
			backgroundColor: fade(
				color === 'primary' || color === 'secondary'
					? palette[color].main
					: palette.type === 'light'
					? palette.common.black
					: palette.common.white,
				palette.action.hoverOpacity,
			),
		},
	};

const getBaseStyles = ({ theme: { getTransition, palette } }) => ({
	color: palette.text.secondary,
	transition: getTransition('background-color', {
		duration: 'shortest',
	}),
});

const getStyles = combine(getBaseStyles, getCheckedStyles, getDisabledStyles);
getStyles.propTypes = {
	// If `true`, the component is checked.
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	// If `true`, the checkbox will be disabled.
	disabled: PropTypes.bool,
	// The color of the component.  Supports theme colors that make sense.
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
};

function Checkbox(props) {
	const [checked, handleChange] = useInput(props);
	const {
		props: {
			checkedIcon,
			icon,
			indeterminate,
			indeterminateIcon,
			inputProps,
			onChange,
			type,
			...passThru
		},
		styles,
	} = useStyles({ ...props, checked }, getStyles, {
		whitelist: ['disabled'],
	});

	return (
		<SelectionControl
			checked={props.checked}
			checkedIcon={indeterminate ? indeterminateIcon : checkedIcon}
			inputProps={{ 'data-indeterminate': indeterminate, ...inputProps }}
			icon={indeterminate ? indeterminateIcon : icon}
			onChange={handleChange}
			styles={{ root: styles }}
			type={type}
			{...passThru}
		/>
	);
}

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
	// The icon to display when the component is checked.
	checkedIcon: PropTypes.node,
	classes: PropTypes.object,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	className: PropTypes.string,
	// If `true`, the ripple effect will be disabled.
	disableRipple: PropTypes.bool,
	// The icon to display when the component is unchecked.
	icon: PropTypes.node,
	// The id of the `input` element.
	id: PropTypes.string,
	/**
	 * If `true`, the component appears indeterminate.
	 * This does not set the native input element to indeterminate due
	 * to inconsistent behavior across browsers.
	 * However, we set a `data-indeterminate` attribute on the input.
	 */
	indeterminate: PropTypes.bool,
	// The icon to display when the component is indeterminate.
	indeterminateIcon: PropTypes.node,
	// Properties applied to the `input` element.
	inputProps: PropTypes.object,
	// Use that property to pass a ref callback to the native input component.
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.checked`.
	 * @param {boolean} checked The `checked` value of the switch
	 */
	onChange: PropTypes.func,
	// The input component property `type`.
	type: PropTypes.string,
	// The value of the component.
	value: PropTypes.string,
	...getStyles.propTypes,
	...stylesPropType,
};

Checkbox.defaultProps = {
	checkedIcon: <CheckBoxIcon />,
	color: 'secondary',
	icon: <CheckboxOutlineBlankIcon />,
	indeterminate: false,
	indeterminateIcon: <IndeterminateCheckBoxIcon />,
	type: 'checkbox',
};

export default Checkbox;
