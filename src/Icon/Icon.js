import React from 'react';
import PropTypes from 'prop-types';
import merge from './../utils/pureRecursiveMerge';
import { space as spaceSystem } from 'styled-system';
import { classify, themify } from './../themify';

/**
  * Maps props to color styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.color='default']
  */
export const getColorStyles = (props) => {
	const { colors } = props.theme;

	switch (props.color) {
		case 'inherit':
			return {
				color: 'inherit',
			};
		case 'primary':
			return {
				color: colors.primary.main,
			};
		case 'secondary':
			return {
				color: colors.secondary.main,
			};
		case 'active':
			return {
				color: colors.action.active,
			};
		case 'error':
			return {
				color: colors.error.main,
			};
		case 'disabled':
			return {
				color: colors.action.disabled,
			};
		default:
			return {};
	}
};

/**
  * Maps props to root styles
  * @param {object} props
  * @param {object} props.theme
  */
export const styles = (props) => {
	const {} = props.theme;

	return merge(
		{
			...{
				userSelect: 'none',
				fontSize: '24px',
				width: '1em',
				height: '1em',
				overflow: 'hidden',
				flexShrink: 0,
			},
			...getColorStyles(props),
			...spaceSystem(props),
		},
		props.$style,
	);
};

/**
 * Creates a styled Icon component
 * @param {object} props
 */
const Icon = (props) => {
	const {
		children,
		className,
		color,
		fontSize,
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

	return (
		<span className={classify(styles(props).root, className)} aria-hidden="true" {...passThru}>
			{children}
		</span>
	);
};

Icon.propTypes = {
	/**
	 * The name of the icon font ligature.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf([ 'inherit', 'primary', 'secondary', 'action', 'error', 'disabled' ]),
	/**
	 * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
	 */
	fontSize: PropTypes.oneOf([ 'inherit', 'default' ]),
	$styles: PropTypes.object,
	theme: PropTypes.object,
	...spaceSystem.propTypes,
};

Icon.defaultProps = {
	color: 'inherit',
	fontSize: 'default',
	$styles: { root: {} },
};

Icon.displayName = 'Icon';

export default themify(Icon);
