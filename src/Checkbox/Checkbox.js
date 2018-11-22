import React, { useContext, useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import SelectionControl from './../SelectionControl';
import CheckBoxIcon from './../svgIcons/CheckBox';
import CheckboxOutlineBlankIcon from './../svgIcons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from './../svgIcons/IndeterminateCheckBox';
import useDidUpdate from './../hooks/useDidUpdate';
import merge from 'deep-extend';
import ThemeContext from '../theme/ThemeContext';
import { isFunc, isNil } from './../utils/helpers';
import { fade } from './../utils/colorHelpers';

const getDisabledStyles = props =>
	props.disabled && {
		iconButtonStyles: {
			buttonStyles: {
				color: props.theme.palette.action.disabled,
				pointerEvents: 'none',
			},
		},
	};

const getCheckedStyles = props =>
	props.checked && {
		iconButtonStyles: {
			buttonStyles: {
				color:
					props.color === 'primary' || props.color === 'secondary'
						? props.theme.palette[props.color].main
						: props.theme.palette.text.secondary,
				':hover': {
					backgroundColor: fade(
						props.color === 'primary' || props.color === 'secondary'
							? props.theme.palette[props.color].main
							: props.theme.palette.type === 'light'
								? props.theme.palette.common.black
								: props.theme.palette.common.white,
						props.theme.palette.action.hoverOpacity,
					),
				},
			},
		},
	};

const getStyles = props =>
	merge(
		{
			iconButtonStyles: {
				buttonStyles: {
					color: props.theme.palette.text.secondary,
					transition: `background-color ${
						props.theme.duration.shortest
					}ms cubic-bezier(${props.theme.easing.in.join()})`,
				},
			},
		},
		getCheckedStyles(props),
		getDisabledStyles(props),
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

function Checkbox(props) {
	const {
		checkedIcon,
		className,
		color,
		icon,
		indeterminate,
		indeterminateIcon,
		inputProps,
		onChange,
		styles,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const [checked, setChecked] = useState(props.checked || false);
	const { iconButtonStyles } = useMemo(() => getStyles({ ...props, checked, theme }), [
		checked,
		props,
		theme,
	]);

	const handleChange = useCallback(event => {
		if (isNil(props.checked)) {
			setChecked(event.target.checked);
		}
		if (onChange) {
			onChange(event, event.target.checked);
		}
	}, []);

	useDidUpdate(() => !isNil(props.checked) && setChecked(props.checked), [props.checked]);

	return (
		<SelectionControl
			className={className}
			checkedIcon={indeterminate ? indeterminateIcon : checkedIcon}
			inputProps={{ 'data-indeterminate': indeterminate, ...inputProps }}
			icon={indeterminate ? indeterminateIcon : icon}
			onChange={handleChange}
			styles={{ iconButtonStyles }}
			type="checkbox"
			{...passThru}
		/>
	);
}

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
