import React from 'react';
import PropTypes from 'prop-types';
import SelectionControl from './../SelectionControl';
import useInput from '../hooks/useInput';
import useStyles from './../system/useStyles';
import combine from './../utils/combine';
import { fade } from './../utils/colorHelpers';
import { stylesPropType } from './../utils/propTypes';

const getDisabledStyles = ({ disabled, theme: { palette } }) =>
	disabled && {
		bar: {
			backgroundColor: fade(
				palette.common[palette.type === 'light' ? 'black' : 'white'],
				palette.type === 'light' ? 0.12 : 0.1,
			),
		},
		button: {
			pointerEvents: 'none',
		},
		icon: {
			color: palette.grey[palette.type === 'light' ? 'main' : 'dark'],
		},
	};

const getCheckedStyles = ({ checked, color, theme: { elevation, palette } }) =>
	checked && {
		bar: {
			backgroundColor: fade(
				color === 'primary' || color === 'secondary'
					? palette[color].main
					: palette.common[
							palette.type === 'light' ? 'black' : 'white'
					  ],
				0.5,
			),
		},
		button: {
			transform: 'translate3d(14px, 0px, 0px)',
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
		},
		icon: {
			color:
				color === 'primary' || color === 'secondary'
					? palette[color].main
					: palette.type === 'light'
					? palette.common.white
					: palette.grey.main,
			boxShadow: elevation[2],
		},
	};

const getBaseStyles = ({ theme: { elevation, getTransition, palette } }) => ({
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
		backgroundColor: fade(
			palette.common[palette.type === 'light' ? 'black' : 'white'],
			palette.type === 'light' ? 0.38 : 0.3,
		),
		borderRadius: `${14 / 2}px`,
		transition: getTransition(['background-color'], {
			duration: 'shortest',
		}),
	},
	button: {
		zIndex: 1,
		height: '48px',
		width: '48px',
		padding: '0px',
		color: 'currentColor',
		transform: 'translate3d(0px, 0px, 0px)',
		transition: getTransition(['background-color', 'transform'], {
			duration: 'shortest',
		}),
	},
	icon: {
		width: '20px',
		height: '20px',
		borderRadius: '50%',
		color:
			palette.type === 'light' ? palette.common.white : palette.grey.main,
		backgroundColor: 'currentColor',
		boxShadow: elevation[1],
		transition: getTransition(['background-color', 'box-shadow'], {
			duration: 'shortest',
		}),
	},
});

const getStyles = combine(getBaseStyles, getCheckedStyles, getDisabledStyles);
getStyles.propTypes = {
	// If `true`, the component is checked.
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	// If `true`, the switch will be disabled.
	disabled: PropTypes.bool,
	// The color of the component.  Supports theme colors that make sense.
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
};

function Switch(props) {
	const [checked, handleChange] = useInput(props);
	const [
		{ styles, classes },
		{ icon, inputProps, onChange, type, ...passThru },
	] = useStyles({ ...props, checked }, getStyles, {
		whitelist: ['disabled'],
	});
	const IconComponent = icon ? icon : 'span';

	return (
		<span className={classes.root}>
			<SelectionControl
				checked={props.checked}
				inputProps={inputProps}
				icon={<IconComponent className={classes.icon} />}
				onChange={handleChange}
				styles={{ root: styles.button }}
				type={type}
				{...passThru}
			/>
			<span className={classes.bar} />
		</span>
	);
}

Switch.displayName = 'Switch';

Switch.propTypes = {
	// The icon to display when the component is checked.
	checkedIcon: PropTypes.node,
	classes: PropTypes.object,
	className: PropTypes.string,
	defaultChecked: PropTypes.bool,
	// If `true`, the ripple effect will be disabled.
	disableRipple: PropTypes.bool,
	// The icon to display when the component is unchecked.
	icon: PropTypes.node,
	id: PropTypes.string,
	// Attributes applied to the `input` element.
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
	...stylesPropType,
	// The input component property `type`.
	type: PropTypes.string,
	// The value of the component.
	value: PropTypes.string,
	...getStyles.propTypes,
	...stylesPropType,
};

Switch.defaultProps = {
	color: 'secondary',
	type: 'checkbox',
};

export default Switch;
