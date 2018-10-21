import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { styled } from 'styletron-react';
import { classify, themify } from './../themify';
import merge from 'deep-extend';
import SelectionControl from './../SelectionControl';
import { debug } from 'util';

/**
  * Maps props to disabled state styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.disabled=false]
  */
export const getDisabledStyles = ({ disabled, theme }) =>
	disabled
		? {
				bar: {
					backgroundColor:
						theme.palette.type === 'light'
							? theme.palette.common.black
							: theme.palette.common.white,
				},
				icon: {
					boxShadow: theme.elevation[1],
				},
			}
		: {};

const switchIconTransition = {
	transform: ({ theme }) => ({
		duration: theme.duration.shortest,
		ease: theme.easing.inOut,
	}),
};

const AnimatedSwitchIcon = posed.span({
	init: {
		width: '20px',
		height: '20px',
		backgroundColor: 'currentColor',
		borderRadius: '50%',
	},
	unchecked: {
		color: ({ theme }) => theme.palette.common.white,
		boxShadow: ({ theme }) => theme.elevation[1],
		transform: 'translate3d(0px, 0px, 0px)',
		transition: switchIconTransition,
	},
	checked: {
		color: ({ color, theme }) => theme.palette[color].main,
		boxShadow: ({ theme }) => theme.elevation[2],
		transform: 'translate3d(14px, 0px, 0px)',
		transition: switchIconTransition,
	},
});

// const switchBarTransition = {
// 	opacity: ({ theme }) => ({
// 		duration: theme.duration.shortest,
// 		easing: theme.easing.inOut,
// 	}),
// };

// const SwitchBar = posed.span({
// 	init: {
// 		position: 'absolute',
// 		top: '50%',
// 		left: '50%',
// 		width: '34px',
// 		height: '14px',
// 		transform: 'translate3d(0, -50%, 0 )',
// 		marginLeft: '-17px',
// 		display: 'block',
// 		borderRadius: `${14 / 2}px`,
// 	},
// 	unchecked: {
// 		backgroundColor: ({ theme }) =>
// 			theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
// 		opacity: ({ theme }) => (theme.palette.type === 'light' ? 0.38 : 0.3),
// 		transition: switchBarTransition,
// 	},
// 	checked: {
// 		backgroundColor: ({ color, theme }) => theme.palette[color].main,
// 		opacity: 0.5,
// 		transition: switchBarTransition,
// 	},
// });

const SwitchIcon = ({ checked, color, theme }) => (
	<AnimatedSwitchIcon color={color} theme={theme} pose={checked ? 'checked' : 'unchecked'} />
);

/**
  * Gets styles for all components/elements
  * @param {object} props
  */
const styles = (props) =>
	merge(
		{
			root: {
				position: 'relative',
				display: 'inline-flex',
				width: '62px',
				flexShrink: 0,
				// For correct alignment with text
				verticalAlign: 'middle',
			},
			selectionControl: {
				':after': {
					content: '" "',
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: '34px',
					height: '14px',
					marginTop: '-7px',
					marginLeft: '-17px',
					display: 'block',
					backgroundColor: props.checked
						? props.theme.palette[props.color].main
						: props.theme.palette.type === 'light'
							? props.theme.palette.common.black
							: props.theme.palette.common.white,
					borderRadius: `${14 / 2}px`,
					opacity: props.checked
						? 0.5
						: props.theme.palette.type === 'light' ? 0.38 : 0.3,
					transition: `opacity ${props.theme.duration
						.shortest}ms cubic-bezier(${props.theme.easing.inOut.join()})`,
				},
			},
			icon: {
				width: '20px',
				height: '20px',
				boxShadow: props.theme.elevation[1],
				backgroundColor: 'currentColor',
				borderRadius: '50%',
				transition: `transform ${props.theme.duration
					.shortest} cubic-bezier(${props.theme.easing.inOut.join()})`,
			},
			iconButton: {
				zIndex: 1,
				padding: '0px',
				height: '48px',
				width: '48px',
			},
		},
		//getDisabledStyles(props),
		props.$styles,
	);

/**
 * Creates a styled Switch component
 * @param {object} props
 */
const Switch = (props) => {
	const { className, icon, $styles, theme, ...passThru } = props;
	const {
		root: rootStyles,
		bar: barStyles,
		icon: iconStyles,
		iconButton: iconButtonStyles,
	} = styles(props);

	return (
		<span className={classify(rootStyles, className)}>
			<SelectionControl
				type="checkbox"
				icon={icon ? icon : SwitchIcon}
				$styles={styles}
				{...passThru}
			/>
		</span>
	);
};

Switch.propTypes = {
	/**
   * If `true`, the component is checked.
   */
	checked: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ]),
	/**
   * The icon to display when the component is checked.
   */
	checkedIcon: PropTypes.node,
	className: PropTypes.string,
	/**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
	color: PropTypes.oneOf([ 'primary', 'secondary', 'default' ]),
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
	inputRef: PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]),
	/**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.checked`.
   * @param {boolean} checked The `checked` value of the switch
   */
	onChange: PropTypes.func,
	$styles: PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]),
	theme: PropTypes.object,
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

export default themify(Switch);
