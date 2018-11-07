import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import ThemeContext from './../theme/ThemeContext';
import SelectionControl from './../SelectionControl';
import cn from './../theme/className';
import merge from 'deep-extend';
import { isFunc, isNil } from './../utils/helpers';

export const getDisabledStyles = ({ disabled, theme: { elevation, palette } }) =>
	disabled && {
		barStyles: {
			backgroundColor: palette.type === 'light' ? palette.common.black : palette.common.white,
			opacity: palette.type === 'light' ? 0.12 : 0.1,
		},
	};

const getCheckedStyles = ({ checked, color, theme: { palette } }) =>
	checked && {
		barStyles: {
			backgroundColor:
				color === 'primary' || color === 'secondary'
					? palette[color].main
					: palette.type === 'light'
						? palette.common.black
						: palette.common.white,
			opacity: 0.5,
		},
	};

const getStyles = props =>
	merge(
		{
			rootStyles: {
				position: 'relative',
				display: 'inline-flex',
				width: '62px',
				flexShrink: 0,
				// For correct alignment with text
				verticalAlign: 'middle',
			},
			barStyles: {
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '34px',
				height: '14px',
				marginTop: '-7px',
				marginLeft: '-17px',
				display: 'block',
				backgroundColor:
					props.theme.palette.type === 'light'
						? props.theme.palette.common.black
						: props.theme.palette.common.white,
				borderRadius: `${14 / 2}px`,
				opacity: props.theme.palette.type === 'light' ? 0.38 : 0.3,
				transition: `opacity ${
					props.theme.duration.shortest
				}ms cubic-bezier(${props.theme.easing.inOut.join()}), background-color ${
					props.theme.duration.shortest
				}ms cubic-bezier(${props.theme.easing.inOut.join()})`,
			},
			iconStyles: {
				width: '20px',
				height: '20px',
				backgroundColor: 'currentColor',
				borderRadius: '50%',
				transition: `box-shadow ${
					props.theme.duration.shortest
				}ms cubic-bezier(${props.theme.easing.inOut.join()}), background-color ${
					props.theme.duration.shortest
				}ms cubic-bezier(${props.theme.easing.inOut.join()})`,
			},
			iconButtonStyles: {
				rootStyles: {
					zIndex: 1,
					padding: '0px',
					height: '48px',
					width: '48px',
				},
			},
		},
		getCheckedStyles(props),
		getDisabledStyles(props),
		isFunc(props.styles) ? props.styles(props) : props.styles,
	);

const transition = {
	transform: ({ theme }) => ({
		duration: theme.duration.shortest,
		ease: theme.easing.inOut,
	}),
};

const AnimatedIcon = posed.span({
	disabled: {
		boxShadow: ({ theme }) => theme.elevation[1],
		color: ({ theme: { palette } }) =>
			palette.type === 'light' ? palette.grey.main : palette.grey.dark,
	},
	unchecked: {
		boxShadow: ({ theme }) => theme.elevation[1],
		color: ({ theme }) => theme.palette.common.white,
		transition: transition,
	},
	checked: {
		boxShadow: ({ theme }) => theme.elevation[2],
		color: ({ color, theme }) =>
			color === 'primary' || color === 'secondary'
				? theme.palette[color].main
				: theme.palette.common.white,
		transition: transition,
	},
});

const AnimatedSwitch = posed.span({
	disabled: {
		transform: 'translate3d(0px, 0px, 0px)',
	},
	unchecked: {
		transform: 'translate3d(0px, 0px, 0px)',
		transition: transition,
	},
	checked: {
		transform: 'translate3d(14px, 0px, 0px)',
		transition: transition,
	},
});

function Switch(props) {
	const { theme } = useContext(ThemeContext);
	const [isChecked, setChecked] = useState(isNil(props.checked) ? false : props.checked);
	const checked = isNil(props.checked) ? isChecked : props.checked;
	const { className, icon, styles, ...passThru } = props;
	const { rootStyles, barStyles, iconStyles, iconButtonStyles } = getStyles({
		...props,
		...{ checked, theme },
	});

	return (
		<span className={cn(rootStyles, className)}>
			<span className={cn(barStyles)} />
			<AnimatedSwitch
				theme={theme}
				pose={props.disabled ? 'disabled' : checked ? 'checked' : 'unchecked'}>
				<SelectionControl
					onChange={event => {
						if (isNil(props.checked)) setChecked(!isChecked);
						if (props.onChange) props.onChange(event);
					}}
					type="checkbox"
					icon={
						<AnimatedIcon
							className={cn(iconStyles)}
							color={props.color}
							theme={theme}
							pose={props.disabled ? 'disabled' : checked ? 'checked' : 'unchecked'}
						/>
					}
					styles={{ iconButtonStyles }}
					{...passThru}
				/>
			</AnimatedSwitch>
		</span>
	);
}

Switch.propTypes = {
	/**
	 * If `true`, the component is checked.
	 */
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	/**
	 * The icon to display when the component is checked.
	 */
	checkedIcon: PropTypes.node,
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
	defaultChecked: PropTypes.bool,
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
	// icon: PropTypes.node,
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

Switch.defaultProps = {
	color: 'secondary',
	styles: {},
};

export default Switch;
