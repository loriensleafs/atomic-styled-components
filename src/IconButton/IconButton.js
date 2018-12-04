import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';
import ButtonBase from './../ButtonBase';
import merge from './../utils/pureRecursiveMerge';
import { space } from 'styled-system';
import { fade } from './../utils/colorHelpers';

export const getColorStyles = props => {
	let next = {};

	if (props.disabled) {
		next = merge(next, {
			rootStyles: {
				color: props.theme.palette.action.disabled,
			},
		});
	} else if (props.color === 'inherit') {
		next = merge(next, {
			rootStyles: {
				color: 'inherit',
			},
		});
	} else if (props.color === 'primary' || props.color === 'secondary') {
		next = merge(next, {
			rootStyles: {
				color: props.theme.palette[props.color].main,
				':hover': {
					backgroundColor: fade(
						props.theme.palette[props.color].main,
						props.theme.palette.action.hoverOpacity,
					),
				},
			},
		});
	}

	return next;
};

export const getBaseStyles = props => ({
	rootStyles: {
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
		position: 'relative',
		width: '100%',
		display: 'flex',
		alignItems: 'inherit',
		justifyContent: 'inherit',
	},
});

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

	const { rootStyles, labelStyles } = useStyles([getBaseStyles, getColorStyles], {
		...props,
		theme,
	});
	const labelClassName = useMemo(() => cn(labelStyles), [labelStyles]);

	return (
		<ButtonBase
			styles={{ rootStyles }}
			className={className}
			centerRipple
			focusRipple
			disabled={disabled}
			{...passThru}>
			<span className={labelClassName}>{children}</span>
		</ButtonBase>
	);
}

IconButton.displayName = 'IconButton';

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
