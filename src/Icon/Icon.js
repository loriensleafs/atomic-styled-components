import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';
import { space } from './../styles';

export const getColorStyles = props => {
	if (props.disabled) {
		return {
			rootStyles: {
				color: props.theme.palette.action.disabled,
			},
		};
	} else if (props.color === 'inherit') {
		return {
			rootStyles: {
				color: 'inherit',
			},
		};
	} else if (
		props.color === 'primary' ||
		props.color === 'secondary' ||
		props.color === 'error'
	) {
		return {
			rootStyles: {
				color: props.theme.palette[props.color].main,
			},
		};
	} else if (props.color === 'active') {
		return {
			rootStyles: {
				color: props.theme.palette.action.active,
			},
		};
	}
};

export const getBaseStyles = props => ({
	rootStyles: {
		userSelect: 'none',
		fontSize: '24px',
		width: '1em',
		height: '1em',
		overflow: 'hidden',
		flexShrink: 0,
		...space(props),
	},
});

function Icon(props) {
	const {
		children,
		className: classNameProp,
		color,
		disabled,
		fontSize,
		m,
		mb,
		ml,
		mr,
		mt,
		mx,
		my,
		p,
		pb,
		pl,
		pr,
		pt,
		py,
		px,
		styles,
		...passThru
	} = props;
	const { rootStyles } = useStyles([getBaseStyles, getColorStyles, space], {
		color,
		disabled,
		fontSize,
		m,
		mb,
		ml,
		mr,
		mt,
		mx,
		my,
		p,
		pb,
		pl,
		pr,
		pt,
		py,
		px,
		styles,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return (
		<span className={className} aria-hidden="true" disabled={disabled} {...passThru}>
			{children}
		</span>
	);
}

Icon.displayName = 'Icon';

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
};

export default Icon;
