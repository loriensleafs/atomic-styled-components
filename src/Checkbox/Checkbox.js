import React from 'react';
import PropTypes from 'prop-types';
import SelectionControl from './../SelectionControl';
import CheckBoxIcon from './../svgIcons/CheckBox';
import CheckboxOutlineBlankIcon from './../svgIcons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from './../svgIcons/IndeterminateCheckBox';

const Checkbox = props => (
	<SelectionControl
		type="checkbox"
		className={props.className}
		checkedIcon={props.indeterminate ? props.indeterminateIcon : props.checkedIcon}
		inputProps={{ 'data-indeterminate': props.indeterminate, ...props.inputProps }}
		icon={props.indeterminate ? props.indeterminateIcon : props.icon}
		{...props}
	/>
);

Checkbox.propTypes = {
	/**
	 * If `true`, the component is checked.
	 */
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	/**
	 * The icon to display when the component is checked.
	 */
	checkedIcon: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	className: PropTypes.string,
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
	 * If `true`, the component appears indeterminate.
	 * This does not set the native input element to indeterminate due
	 * to inconsistent behavior across browsers.
	 * However, we set a `data-indeterminate` attribute on the input.
	 */
	indeterminate: PropTypes.bool,
	/**
	 * The icon to display when the component is indeterminate.
	 */
	indeterminateIcon: PropTypes.node,
	/**
	 * Properties applied to the `input` element.
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
	 * You can pull out the new value by accessing `event.target.checked`.
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
	value: PropTypes.string,
};

Checkbox.defaultProps = {
	checkedIcon: <CheckBoxIcon />,
	color: 'secondary',
	icon: <CheckboxOutlineBlankIcon />,
	indeterminate: false,
	indeterminateIcon: <IndeterminateCheckBoxIcon />,
};

export default Checkbox;
