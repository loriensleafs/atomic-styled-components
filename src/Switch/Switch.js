import React, { useState, useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useDidUpdate from './../hooks/useDidUpdate';
import useStyles from './../hooks/useStyles';
import ThemeContext from './../theme/ThemeContext';
import SelectionControl from './../SelectionControl';
import cn from './../theme/className';
import { animated, useSpring } from 'react-spring';
import { isNil } from './../utils/helpers';
import { fade } from './../utils/colorHelpers';

export const getDisabledStyles = props =>
	props.disabled && {
		barStyles: {
			backgroundColor:
				props.theme.palette.type === 'light'
					? props.theme.palette.common.black
					: props.theme.palette.common.white,
			opacity: props.theme.palette.type === 'light' ? 0.12 : 0.1,
		},
		buttonStyles: {
			rootStyles: {
				pointerEvents: 'none',
			},
		},
		iconCheckedStyles: {
			color:
				props.theme.palette.type === 'light'
					? props.theme.palette.grey.main
					: props.theme.palette.grey.dark,
		},
		iconUncheckedStyles: {
			color:
				props.theme.palette.type === 'light'
					? props.theme.palette.grey.main
					: props.theme.palette.grey.dark,
		},
	};

export const getCheckedStyles = props => {
	if (props.checked) {
		const backgroundColor =
			props.color === 'primary' || props.color === 'secondary'
				? props.theme.palette[props.color].main
				: props.theme.palette.type === 'light'
					? props.theme.palette.common.black
					: props.theme.palette.common.white;

		return {
			barStyles: {
				backgroundColor,
				opacity: 0.5,
			},
			buttonStyles: {
				rootStyles: {
					color: backgroundColor,
					':hover': {
						backgroundColor: fade(
							backgroundColor,
							props.theme.palette.action.hoverOpacity,
						),
					},
				},
			},
		};
	}
	return null;
};

const getBaseStyles = props => {
	const backgroundColor =
		props.theme.palette.type === 'light'
			? props.theme.palette.common.black
			: props.theme.palette.common.white;

	return {
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
			backgroundColor,
			borderRadius: `${14 / 2}px`,
			opacity: props.theme.palette.type === 'light' ? 0.38 : 0.3,
		},
		buttonStyles: {
			rootStyles: {
				zIndex: 1,
				color: 'currentColor',
				padding: '0px',
				height: '48px',
				width: '48px',
				transition: `background-color ${
					props.theme.duration.shortest
				}ms cubic-bezier(${props.theme.easing.in.join()})`,
				':hover': {
					backgroundColor: fade(backgroundColor, props.theme.palette.action.hoverOpacity),
				},
			},
		},
		iconStyles: {
			width: '20px',
			height: '20px',
			backgroundColor: 'currentColor',
			borderRadius: '50%',
		},
		iconUncheckedStyles: {
			color: props.theme.palette.common.white,
			boxShadow: props.theme.elevation[1],
		},
		iconCheckedStyles: {
			color:
				props.color === 'primary' || props.color === 'secondary'
					? props.theme.palette[props.color].main
					: props.theme.palette.type === 'light'
						? props.theme.palette.common.white
						: props.theme.palette.grey.main,
			boxShadow: props.theme.elevation[2],
		},
		selectControlUncheckedStyles: {
			transform: 'translate3d(0px, 0px, 0px)',
		},
		selectControlCheckedStyles: {
			transform: 'translate3d(14px, 0px, 0px)',
		},
	};
};

function Switch(props) {
	const { className: classNameProp, color, icon, onChange, styles, ...passThru } = props;
	const { theme } = useContext(ThemeContext);
	const [checked, setChecked] = useState(props.checked || false);
	const {
		barStyles,
		buttonStyles,
		iconStyles,
		iconUncheckedStyles,
		iconCheckedStyles,
		rootStyles,
		selectControlStyles,
		selectControlUncheckedStyles,
		selectControlCheckedStyles,
	} = useStyles([getBaseStyles, getCheckedStyles, getDisabledStyles], {
		...props,
		checked,
		theme,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);
	const barClassName = useMemo(() => cn(barStyles), [barStyles]);
	const iconClassName = useMemo(() => cn(iconStyles), [iconStyles]);
	const selectControlClassName = useMemo(() => cn(selectControlStyles), [selectControlStyles]);
	const [iconTransition] = useSpring({
		...(checked ? iconCheckedStyles : iconUncheckedStyles),
		from: checked ? iconUncheckedStyles : iconCheckedStyles,
		config: { tension: 1200, friction: 40 },
	});
	const [selectControlTransition] = useSpring({
		...(checked ? selectControlCheckedStyles : selectControlUncheckedStyles),
		from: checked ? selectControlUncheckedStyles : selectControlCheckedStyles,
		config: { tension: 1200, friction: 40 },
	});

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
		<span className={className}>
			<span className={barClassName} />
			<animated.div className={selectControlClassName} style={selectControlTransition}>
				<SelectionControl
					onChange={handleChange}
					type="checkbox"
					icon={<animated.div className={iconClassName} style={iconTransition} />}
					styles={{ buttonStyles }}
					{...passThru}
				/>
			</animated.div>
		</span>
	);
}

Switch.displayName = 'Switch';

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
};

export default Switch;
