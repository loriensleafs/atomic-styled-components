import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import SelectionControl from './../SelectionControl';
import useDidUpdate from './../hooks/useDidUpdate';
import useStyles from './../system/useStyles';
import combine from './../utils/combine';
import { animated, useSpring } from 'react-spring/hooks';
import { isNil } from './../utils/helpers';
import { fade } from './../utils/colorHelpers';
import { stylesPropType } from './../utils/propTypes';

function getDisabledStyles(props) {
	if (props.disabled) {
		return {
			bar: {
				backgroundColor:
					props.theme.palette.type === 'light'
						? props.theme.palette.common.black
						: props.theme.palette.common.white,
				opacity: props.theme.palette.type === 'light' ? 0.12 : 0.1,
			},
			button: {
				pointerEvents: 'none',
			},
			iconChecked: {
				color:
					props.theme.palette.type === 'light'
						? props.theme.palette.grey.main
						: props.theme.palette.grey.dark,
			},
			iconUnchecked: {
				color:
					props.theme.palette.type === 'light'
						? props.theme.palette.grey.main
						: props.theme.palette.grey.dark,
			},
		};
	}
	return null;
}

function getCheckedStyles(props) {
	if (props.checked) {
		const backgroundColor =
			props.color === 'primary' || props.color === 'secondary'
				? props.theme.palette[props.color].main
				: props.theme.palette.type === 'light'
				? props.theme.palette.common.black
				: props.theme.palette.common.white;

		return {
			bar: {
				backgroundColor,
				opacity: 0.5,
			},
			button: {
				color: backgroundColor,
				':hover': {
					backgroundColor: fade(
						backgroundColor,
						props.theme.palette.action.hoverOpacity,
					),
				},
			},
		};
	}
	return null;
}

function getBaseStyles(props) {
	const backgroundColor =
		props.theme.palette.type === 'light'
			? props.theme.palette.common.black
			: props.theme.palette.common.white;

	return {
		root: {
			position: 'relative',
			display: 'inline-flex',
			width: '62px',
			flexShrink: 0,
			// For correct alignment with text
			verticalAlign: 'middle',
		},
		bar: {
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
		button: {
			zIndex: 1,
			color: 'currentColor',
			padding: '0px',
			height: '48px',
			width: '48px',
			transition: props.theme.getTransition(
				'background-color',
				'shortest',
				'in',
			),
			':hover': {
				backgroundColor: fade(
					backgroundColor,
					props.theme.palette.action.hoverOpacity,
				),
			},
		},
		icon: {
			width: '20px',
			height: '20px',
			backgroundColor: 'currentColor',
			borderRadius: '50%',
		},
		iconUnchecked: {
			color: props.theme.palette.common.white,
			boxShadow: props.theme.elevation[1],
		},
		iconChecked: {
			color:
				props.color === 'primary' || props.color === 'secondary'
					? props.theme.palette[props.color].main
					: props.theme.palette.type === 'light'
					? props.theme.palette.common.white
					: props.theme.palette.grey.main,
			boxShadow: props.theme.elevation[2],
		},
		selectControlUnchecked: {
			transform: 'translate3d(0px, 0px, 0px)',
		},
		selectControlChecked: {
			transform: 'translate3d(14px, 0px, 0px)',
		},
	};
}

const getStyles = combine(getBaseStyles, getCheckedStyles, getDisabledStyles);
getStyles.propTypes = {
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
};

function Switch(props) {
	const [checked, setChecked] = useState(props.checked || false);
	const [
		{ className, icon, onChange, ...passThru },
		styles,
		classes,
	] = useStyles({ ...props, checked }, getStyles);
	const iconTransition = useSpring({
		...(checked ? styles.iconChecked : styles.iconUnchecked),
		from: checked ? styles.iconUnchecked : styles.iconChecked,
		config: { tension: 1200, friction: 40 },
	});
	const selectControlTransition = useSpring({
		...(checked
			? styles.selectControlChecked
			: styles.selectControlUnchecked),
		from: checked
			? styles.selectControlUnchecked
			: styles.selectControlChecked,
		config: { tension: 1200, friction: 40 },
	});

	const handleChange = useCallback(event => {
		if (isNil(props.checked)) setChecked(event.target.checked);
		if (onChange) onChange(event, event.target.checked);
	}, []);

	useDidUpdate(() => !isNil(props.checked) && setChecked(props.checked), [
		props.checked,
	]);

	return (
		<span className={classes.root}>
			<span className={classes.bar} />
			<animated.div
				className={classes.selectControl}
				style={selectControlTransition}
			>
				<SelectionControl
					onChange={handleChange}
					type="checkbox"
					icon={
						<animated.div
							className={classes.icon}
							style={iconTransition}
						/>
					}
					styles={{ buttonStyles: styles.button }}
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
	...stylesPropType,
	/**
	 * The input component property `type`.
	 */
	type: PropTypes.string,
	/**
	 * The value of the component.
	 */
	value: PropTypes.string,
	...getStyles.propTypes,
};

Switch.defaultProps = {
	color: 'secondary',
};

export default Switch;
