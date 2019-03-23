import PropTypes from 'prop-types';
import React from 'react';
import useInput from '../hooks/useInput';
import SelectionControl from '../SelectionControl';
import RadioButtonCheckedIcon from '../svgIcons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '../svgIcons/RadioButtonUnchecked';
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
	// If `true`, the radio will be disabled.
	disabled: PropTypes.bool,
	// The color of the component.  Supports theme colors that make sense.
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
};

function Radio(props) {
	const [checked, handleChange] = useInput(props);
	const {
		props: {
			checkedIcon,
			icon,
			indeterminate,
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
			checkedIcon={checkedIcon}
			icon={icon}
			inputProps={{ 'data-indeterminate': indeterminate, ...inputProps }}
			onChange={handleChange}
			styles={{ root: styles }}
			type={type}
			{...passThru}
		/>
	);
}

Radio.displayName = 'Radio';

Radio.propTypes = {
	// The icon to display when the component is checked.
	checkedIcon: PropTypes.node,
	classes: PropTypes.object,
	// If `true`, the ripple effect will be disabled.
	disableRipple: PropTypes.bool,
	// The icon to display when the component is unchecked.
	icon: PropTypes.node,
	// The id of the `input` element.
	id: PropTypes.string,
	// Attributes applied to the `input` element.
	inputProps: PropTypes.object,
	// Use that property to pass a ref callback to the native input component.
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value`.
	 * @param {boolean} checked The `checked` value of the switch
	 */
	onChange: PropTypes.func,
	// The input component property `type`.
	type: PropTypes.string,
	// The value of the component.
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
	...getStyles.propTypes,
	...stylesPropType,
};

Radio.defaultProps = {
	checkedIcon: <RadioButtonCheckedIcon />,
	color: 'secondary',
	icon: <RadioButtonUncheckedIcon />,
	type: 'radio',
};

export default Radio;
