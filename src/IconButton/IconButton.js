import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import merge from './../utils/pureRecursiveMerge';
import cn from './../theme/className';
import ButtonBase from './../ButtonBase';
import { space } from 'styled-system';
import { isFunc } from './../utils/helpers';
import { fade } from './../utils/colorHelpers';

export const getColorStyles = ({ color, disabled, theme: { palette } }) => {
	let next = {};

	if (disabled) {
		next = merge(next, {
			buttonStyles: {
				color: palette.action.disabled,
			},
		});
	} else if (color === 'inherit') {
		next = merge(next, {
			buttonStyles: {
				color: 'inherit',
			},
		});
	} else if (color === 'primary' || color === 'secondary') {
		next = merge(next, {
			buttonStyles: {
				color: palette[color].main,
				':hover': {
					backgroundColor: fade(palette[color].main, palette.action.hoverOpacity),
				},
			},
		});
	}

	return next;
};

export const getStyles = props =>
	merge(
		{
			buttonStyles: {
				position: 'relative',
				textAlign: 'center',
				flex: '0 0 auto',
				fontSize: '24px',
				width: '48px',
				height: '48px',
				padding: 0,
				borderRadius: '50%',
				color: props.theme.palette.action.active,
				transition: `background-color ${
					props.theme.duration.shortest
				}ms cubic-bezier(${props.theme.easing.in.join()})`,
				':hover': {
					backgroundColor: fade(
						props.theme.palette.action.active,
						props.theme.palette.action.hoverOpacity,
					),
					'@media (hover: none)': {
						backgroundColor: 'transparent',
					},
					':disabled': {
						backgroundColor: 'transparent',
					},
				},
				':disabled': {
					color: props.theme.palette.action.disabled,
				},
				...space(props),
			},
			labelStyles: {
				width: '100%',
				display: 'flex',
				alignItems: 'inherit',
				justifyContent: 'inherit',
			},
		},
		getColorStyles(props),
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

function IconButton(props) {
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
		styles,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);

	const { buttonStyles, labelStyles } = useMemo(() => getStyles({ ...props, ...{ theme } }), [
		props,
		theme,
	]);

	return (
		<ButtonBase
			styles={{ buttonStyles }}
			className={className}
			centerRipple
			focusRipple
			disabled={disabled}
			{...passThru}>
			<span className={cn(labelStyles)}>{children}</span>
		</ButtonBase>
	);
}

IconButton.propTypes = {
	/**
	 * The icon element.
	 */
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme palette that make sense for this component.
	 */
	color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
	/**
	 * If `true`, the button will be disabled.
	 */
	disabled: PropTypes.bool,
	/**
	 * If `true`, the ripple will be disabled.
	 */
	disableRipple: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	...space.propTypes,
};

IconButton.defaultProps = {
	color: 'default',
	disabled: false,
};

export default IconButton;
