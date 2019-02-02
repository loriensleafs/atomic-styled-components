import React, { forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import SelectionControl from './../SelectionControl';
import CheckBoxIcon from './../svgIcons/CheckBox';
import CheckboxOutlineBlankIcon from './../svgIcons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from './../svgIcons/IndeterminateCheckBox';
import useDidUpdate from './../hooks/useDidUpdate';
import combine from './../utils/combine';
import { getColor, useStyles } from './../system';
import { isNil } from './../utils/helpers';
import { fade } from './../utils/colorHelpers';

function getColorStyles(props) {
	const {
		checked,
		color,
		disabled = false,
		theme: { palette },
	} = props;
	const isBrand = color === 'primary' || color === 'secondary';
	const isLight = palette.type === 'light';
	const state = disabled ? 'disabled' : checked ? 'checked' : null;

	switch (state) {
		case 'disabled':
			return {
				...getColor({
					color: 'action.disabled',
				}),
				pointerEvents: 'none',
			};

		case 'checked':
			return {
				...getColor({
					color: isBrand ? `${color}.main` : 'text.secondary',
				}),
				':hover': {
					backgroundColor: fade(
						isBrand
							? palette[color].main
							: isLight
							? palette.common.black
							: palette.common.white,
						palette.action.hoverOpacity,
					),
				},
			};

		default:
			// Default colors.
			return getColor({
				color: 'text.secondary',
			});
	}
}

function getBaseStyles(props) {
	const { getTransition } = props.theme;

	return {
		transition: getTransition('background-color', {
			duration: 'shortest',
			easing: 'in',
		}),
	};
}

const getStyles = combine(getBaseStyles, getColorStyles);
getStyles.propTypes = {
	// If `true`, the component is checked.
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	/**
	 * The color of the component. It supports those theme colors that make
	 * sense for this component.
	 */
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
};

const Checkbox = forwardRef((props, ref) => {
	const [checked, setChecked] = useState(props.checked || false);
	const [
		{ styles },
		{
			checkedIcon,
			icon,
			indeterminate,
			indeterminateIcon,
			inputProps,
			onChange,
			...passThru
		},
	] = useStyles({ ...props, checked }, getStyles, { whitelist: ['checked'] });

	const handleChange = useCallback((event, isChecked) => {
		if (isNil(props.checked)) {
			setChecked(() => isChecked);
		}
		if (onChange) {
			onChange(event, isChecked);
		}
	}, []);

	useDidUpdate(() => {
		if (!isNil(props.checked)) {
			setChecked(() => props.checked);
		}
	}, [props.checked, checked]);

	return (
		<SelectionControl
			checkedIcon={indeterminate ? indeterminateIcon : checkedIcon}
			inputProps={{
				'data-indeterminate': indeterminate,
				...inputProps,
			}}
			icon={indeterminate ? indeterminateIcon : icon}
			onChange={handleChange}
			ref={ref}
			styles={{ buttonStyles: styles }}
			type="checkbox"
			{...passThru}
		/>
	);
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
	// If `true`, the component is checked.
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	// The icon to display when the component is checked.
	checkedIcon: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme colors that make
	 * sense for this component.
	 */
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
	// If `true`, the switch will be disabled.
	disabled: PropTypes.bool,
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
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	// The input component property `type`.
	type: PropTypes.string,
	// The value of the component.
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
