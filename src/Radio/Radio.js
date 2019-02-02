import React, { forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import SelectionControl from './../SelectionControl';
import RadioButtonUncheckedIcon from './../svgIcons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from './../svgIcons/RadioButtonChecked';
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
	const isBrandColor = color === 'primary' || color === 'secondary';
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
					color: isBrandColor ? `${color}.main` : 'text.secondary',
				}),
				':hover': {
					backgroundColor: fade(
						isBrandColor
							? palette[color].main
							: palette.type === 'light'
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
	//  If `true`, the component is checked.
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	/**
	 * The color of the component. It supports those theme colors that make
	 * sense for this component.
	 */
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
};

const Radio = forwardRef((props, ref) => {
	const [checked, setChecked] = useState(props.checked || false);
	const [
		{ styles },
		{ checkedIcon, icon, indeterminate, inputProps, onChange, ...passThru },
	] = useStyles({ ...props, checked }, getStyles, { whitelist: ['checked'] });

	const handleChange = useCallback((event, isChecked) => {
		if (isNil(props.checked)) setChecked(() => isChecked);
		if (onChange) onChange(event, isChecked);
	}, []);

	useDidUpdate(
		() => !isNil(props.checked) && setChecked(() => props.checked),
		[props.checked, checked],
	);

	return (
		<SelectionControl
			checkedIcon={checkedIcon}
			icon={icon}
			inputProps={{ 'data-indeterminate': indeterminate, ...inputProps }}
			onChange={handleChange}
			ref={ref}
			styles={{ buttonStyles: styles }}
			type="radio"
			{...passThru}
		/>
	);
});

Radio.displayName = 'Radio';

Radio.propTypes = {
	// If `true`, the component is checked.
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	// The icon to display when the component is checked.
	checkedIcon: PropTypes.node,
	// If `true`, the switch will be disabled.
	disabled: PropTypes.bool,
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
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	// The input component property `type`.
	type: PropTypes.string,
	// The value of the component.
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
};

Radio.defaultProps = {
	checkedIcon: <RadioButtonCheckedIcon />,
	color: 'secondary',
	icon: <RadioButtonUncheckedIcon />,
};

export default Radio;
