import React from 'react';
import PropTypes from 'prop-types';
import merge from './../utils/pureRecursiveMerge';
import { space as spaceSystem } from 'styled-system';
import ButtonBase from './../ButtonBase';
import { classify, themify } from './../theme';
import { fade } from './../utils/colorHelpers';

/**
  * Maps props to color styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.color='default']
  */
export const getColorStyles = (props) => {
	const { palette } = props.theme;
	let next = {};

	if (props.color === 'inherit') {
		next = merge(next, {
			root: {
				color: 'inherit',
			},
		});
	} else if (props.color === 'primary' || props.color === 'secondary') {
		next = merge(next, {
			root: {
				color: palette[props.color].main,
				':hover': {
					backgroundColor: fade(palette[props.color].main, palette.action.hoverOpacity),
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
	const { palette, duration, easing } = props.theme;

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
				color: palette.action.active,
				transition: `background-color ${duration.shortest}ms cubic-bezier(${easing.in.join()})`,
				':hover': {
					backgroundColor: fade(palette.action.active, palette.action.hoverOpacity),
					'@media (hover: none)': {
						backgroundColor: 'transparent',
					},
					':disabled': {
						backgroundColor: 'transparent',
					},
				},
				':disabled': {
					color: palette.action.disabled,
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
		typeof props.$styles === 'function' ? props.$styles(props) : props.$styles,
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
	 * The color of the component. It supports those theme palette that make sense for this component.
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
	$styles: PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]),
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
