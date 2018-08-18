import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deep-extend';
import ButtonBase from './../ButtonBase';
import { classify, themify } from './../themify';
import { fade } from './../utils/colorHelpers';

/**
  * Maps props to color styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.color='default']
  */
export const getColorStyles = (props) => {
	const { colors } = props.theme;
	let next = {};

	if (props.color === 'inherit') {
		next = merge({}, next, {
			color: 'inherit',
		});
	} else if (props.color === 'primary' || props.color === 'secondary') {
		next = merge({}, next, {
			color: colors[props.color].main,
			':hover': {
				backgroundColor: fade(colors[props.color].main, colors.action.hoverOpacity),
			},
		});
	}

	return next;
};

/**
  * Maps props to root styles
  * @param {object} props
  * @param {object} props.theme
  */
export const getRootStyles = (props) => {
	const { colors, duration, easing } = props.theme;

	return merge({
		position: 'relative',
		textAlign: 'center',
		flex: '0 0 auto',
		fontSize: '24px',
		width: '48px',
		height: '48px',
		padding: 0,
		borderRadius: '50%',
		color: colors.action.active,
		transition: `background-color ${duration.shortest}ms ${easing.easeIn}`,
		':hover': {
			backgroundColor: fade(colors.action.active, colors.action.hoverOpacity),
			'@media (hover: none)': {
				backgroundColor: 'transparent',
			},
			':disabled': {
				backgroundColor: 'transparent',
			},
		},
		':disabled': {
			color: colors.action.disabled,
		},
	});
};

/**
  * Gets styles for all components/elements
  * @param {object} props
  */
const getStyles = (props) => ({
	root: getRootStyles(props),
	label: {
		width: '100%',
		display: 'flex',
		alignItems: 'inherit',
		justifyContent: 'inherit',
	},
});

/**
 * Creates a styled IconButton component
 * @param {object} props
 */
const IconButton = (props) => {
	const { children, className, color, disabled, styles: stylesProp, themes, ...passThru } = props;

	const styles = getStyles(props);

	return (
		<ButtonBase
			styles={merge({}, styles, stylesProp)}
			className={className}
			centerRipple
			focusRipple
			disabled={disabled}
			{...passThru}
		>
			<span className={classify(merge({}, styles.label, stylesProp.label))}>{children}</span>
		</ButtonBase>
	);
};

IconButton.propTypes = {
	/**
	 * The icon element.
	 */
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf([ 'default', 'inherit', 'primary', 'secondary' ]),
	/**
	 * If `true`, the button will be disabled.
	 */
	disabled: PropTypes.bool,
	/**
	 * If `true`, the ripple will be disabled.
	 */
	disableRipple: PropTypes.bool,
	styles: PropTypes.object,
};

IconButton.defaultProps = {
	color: 'default',
	disabled: false,
	styles: {
		root: {},
		label: {},
	},
};

export default themify(IconButton);
