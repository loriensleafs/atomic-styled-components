import React from 'react';
import PropTypes from 'prop-types';
import { classify, themify } from './../themify';
import merge from 'deep-extend';
import SwitchBase from './../SwitchBase';

/**
  * Maps props to color styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.color='secondary']
  */
export const getColorStyles = ({ color, theme }) =>
	color === 'primary' || color === 'secondary'
		? {
				iconButton: {
					color: theme.colors[color].main,
				},
				bar: {
					backgroundColor: theme.colors[color].main,
				},
			}
		: {};

/**
  * Maps props to disabled state styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.disabled=false]
  */
export const getDisabledStyles = ({ disabled, theme }) =>
	disabled
		? {
				iconButton: {
					color:
						theme.colors.type === 'light'
							? theme.colors.gray.main
							: theme.colors.gray.dark,
				},
				icon: {
					boxShadow: theme.elevation[1],
				},
				bar: {
					backgroundColor:
						theme.colors.type === 'light'
							? theme.colors.common.black
							: theme.colors.common.white,
				},
			}
		: {};

/**
  * Maps props to checked state styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.checked]
  */
export const getCheckedStyles = ({ checked, theme }) =>
	checked
		? {
				iconButton: {
					transform: 'translate3d(14px, 0px, 0px)',
				},
				icon: {
					boxShadow: theme.elevation[2],
				},
				bar: {
					opacity: 0.5,
				},
			}
		: {};

/**
  * Gets styles for all components/elements
  * @param {object} props
  */
const styles = (props) =>
	merge(
		{
			root: {
				position: 'relative',
				width: '62px',
				display: 'inline-flex',
				flexShrink: 0,
				// For correct alignment with text
				verticalAlign: 'middle',
			},
			icon: {
				width: '20px',
				height: '20px',
				boxShadow: props.theme.elevation[1],
				backgroundColor: 'currentColor',
				borderRadius: '50%',
			},
			iconChecked: {
				boxShadow: props.theme.elevation[2],
			},
			iconButton: {
				zIndex: 1,
				color:
					props.theme.colors.type === 'light'
						? props.theme.colors.gray.light
						: props.theme.colors.gray.main,
				transition: `transform ${props.theme.duration.shortest} ${props.theme.easing
					.easeInOut}`,
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
				borderRadius: `${14 / 2}px`,
				backgroundColor:
					props.theme.colors.type === 'light'
						? props.theme.colors.common.black
						: props.theme.colors.common.white,
				opacity: props.theme.colors.type === 'light' ? 0.38 : 0.3,
				transition: `opacity ${props.theme.duration.shortest}ms ${props.theme.easing
					.easeInOut}`,
			},
		},
		getColorStyles(props),
		getCheckedStyles(props),
		getDisabledStyles(props),
		props.$styles,
	);

/**
 * Creates a styled Switch component
 * @param {object} props
 */
const Switch = (props) => {
	const { className, color, $styles, theme, ...passThru } = props;
	const {
		root: rootStyles,
		icon: iconStyles,
		iconChecked: iconCheckedStyles,
		iconButton: iconButtonStyles,
		bar: barStyles,
	} = styles(props);

	return (
		<span className={classify(rootStyles, className)}>
			<SwitchBase
				type="checkbox"
				icon={<span className={classify(iconStyles)} />}
				$styles={{ root: iconButtonStyles }}
				checkedIcon={
					<span className={classify(merge({}, iconStyles, iconCheckedStyles))} />
				}
				{...passThru}
			/>
			<span className={classify(barStyles)} />
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
	$styles: PropTypes.object,
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
