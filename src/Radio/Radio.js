import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import ThemeContext from './../theme/ThemeContext';
import SelectionControl from './../SelectionControl';
import RadioButtonUncheckedIcon from './../svgIcons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from './../svgIcons/RadioButtonChecked';
import cn from './../styles/className';
import merge from 'deep-extend';
import { isFunc, isNil } from './../utils/helpers';

function Radio(props) {
	const { theme } = useContext(ThemeContext);
	const [isChecked, setChecked] = useState(isNil(props.checked) ? false : props.checked);
	const checked = isNil(props.checked) ? isChecked : props.checked;
	const { className, styles, ...passThru } = props;

	return (
		<SelectionControl
			type="radio"
			icon={<RadioButtonUncheckedIcon />}
			checkedIcon={<RadioButtonCheckedIcon />}
			{...passThru}
		/>
	);
}

Radio.propTypes = {
	/**
	 * If `true`, the component is checked.
	 */
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	/**
	 * The icon to display when the component is checked.
	 */
	checkedIcon: PropTypes.node,
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
	/**
	 * If `true`, the switch will be disabled.
	 */
	disabled: PropTypes.bool,
	/**
	 * If `true`, the ripple effect will be disabled.
	 */
	disableRipple: PropTypes.bool,
	/**
	 * The icon to display when the component is unchecked.
	 */
	icon: PropTypes.node,
	/**
	 * The id of the `input` element.
	 */
	id: PropTypes.string,
	/**
	 * Attributes applied to the `input` element.
	 */
	inputProps: PropTypes.object,
	/**
	 * Use that property to pass a ref callback to the native input component.
	 */
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value`.
	 * @param {boolean} checked The `checked` value of the switch
	 */
	onChange: PropTypes.func,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * The input component property `type`.
	 */
	type: PropTypes.string,
	/**
	 * The value of the component.
	 */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

Radio.defaultProps = {
	color: 'secondary',
};

export default Radio;
