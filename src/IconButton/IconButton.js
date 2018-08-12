import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deep-extend';
import { classify, themify } from './../styled';
import ButtonBase from './../ButtonBase';
import { fade } from './../utils/colorHelpers';

/**
 * Maps props to styles
 * IconButton component color styles
 */
export const getColorStyles = (props) => {
	const { colors } = props.theme;

	return {};
};

/**
 * IconButton component root styles
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
 * IconButton Label component styles
 */
const labelStyles = {
	width: '100%',
	display: 'flex',
	alignItems: 'inherit',
	justifyContent: 'inherit',
};

/**
 * IconButton component
 */
const IconButton = (props) => {
	const { children, className, color, disabled, styles = {}, themes, ...passThru } = props;

	return (
		<ButtonBase
			styles={merge(getRootStyles(props), styles)}
			className={className}
			centerRipple
			focusRipple
			disabled={disabled}
			{...passThru}
		>
			<span className={classify(labelStyles)}>{children}</span>
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
};

export default themify(IconButton);
