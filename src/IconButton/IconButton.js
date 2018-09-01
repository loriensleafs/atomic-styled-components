import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deep-extend';
import { space as spaceSystem } from 'styled-system';
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
			root: {
				color: 'inherit',
			},
		});
	} else if (props.color === 'primary' || props.color === 'secondary') {
		next = merge({}, next, {
			root: {
				color: colors[props.color].main,
				':hover': {
					backgroundColor: fade(colors[props.color].main, colors.action.hoverOpacity),
				},
			},
		});
	}

	return next;
};

/**
  * Gets styles for all components/elements
  * @param {object} props
  */
export const styles = (props) => {
	const { colors, duration, easing } = props.theme;

	return merge(
		{
			root: {
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
				...spaceSystem(props),
			},
			label: {
				width: '100%',
				display: 'flex',
				alignItems: 'inherit',
				justifyContent: 'inherit',
			},
		},
		getColorStyles(props),
		props.$styles,
	);
};

/**
 * Creates a styled IconButton component
 * @param {object} props
 */
const IconButton = (props) => {
	const {
		children,
		className,
		color,
		disabled,
		m,
		ml,
		mr,
		mt,
		mb,
		mx,
		my,
		p,
		pl,
		pr,
		pt,
		pb,
		px,
		py,
		$styles,
		theme,
		...passThru
	} = props;

	const { root: rootStyles, label: labelStyles } = styles(props);

	return (
		<ButtonBase
			$styles={{ root: rootStyles }}
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
	$styles: PropTypes.object,
	theme: PropTypes.object,
	...spaceSystem.propTypes,
};

IconButton.defaultProps = {
	color: 'default',
	disabled: false,
	$styles: {
		root: {},
		label: {},
	},
};

export default themify(IconButton);
