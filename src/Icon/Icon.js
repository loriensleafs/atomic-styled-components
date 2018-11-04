import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import merge from './../utils/pureRecursiveMerge';
import cn from './../styles/className';
import { space } from 'styled-system';
import { isFunc } from './../utils/helpers';

export const getColorStyles = ({ color, theme: { palette } }) => {
	switch (color) {
		case 'inherit':
			return {
				color: 'inherit',
			};
		case 'primary':
			return {
				color: palette.primary.main,
			};
		case 'secondary':
			return {
				color: palette.secondary.main,
			};
		case 'active':
			return {
				color: palette.action.active,
			};
		case 'error':
			return {
				color: palette.error.main,
			};
		case 'disabled':
			return {
				color: palette.action.disabled,
			};
		default:
			return {};
	}
};

export const getStyles = props =>
	merge(
		{
			userSelect: 'none',
			fontSize: '24px',
			width: '1em',
			height: '1em',
			overflow: 'hidden',
			flexShrink: 0,
		},
		getColorStyles(props),
		space(props),
		isFunc(props.styles) ? props.styles(props) : props.styles,
	);

const Icon = props => {
	const { theme } = useContext(ThemeContext);
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
		styles,
		...passThru
	} = props;

	return (
		<span
			className={cn(getStyles({ ...props, ...{ theme } }), className)}
			aria-hidden="true"
			{...passThru}>
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
	color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'action', 'error', 'disabled']),
	/**
	 * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
	 */
	fontSize: PropTypes.oneOf(['inherit', 'default']),
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	...space.propTypes,
};

Icon.defaultProps = {
	color: 'inherit',
	fontSize: 'default',
	styles: {},
};

Icon.displayName = 'Icon';

export default Icon;
