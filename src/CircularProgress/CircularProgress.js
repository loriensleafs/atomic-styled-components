import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { clamp } from './../utils/helpers';

const SIZE = 44;

function getRelativeValue(val, min, max) {
	return (clamp(val, min, max) - min) / (max - min);
}

function easeOut(t) {
	t = getRelativeValue(t, 0, 1);
	t = (t -= 1) * t * t + 1;
	return t;
}

function easeIn(t) {
	return t * t;
}

const getIndeterminateStyles = props =>
	props.variant === 'indeterminate' && {
		rootStyles: {
			animationName: {
				'100%': {
					transform: 'rotate(360deg)',
				},
			},
			animationDuration: '1.4s',
			animationIterationCount: 'infinite',
			animationTimingFunction: 'linear',
		},
		circleStyles: {
			animationName: {
				'0%': {
					strokeDasharray: '1px, 200px',
					strokeDashoffset: '0px',
				},
				'50%': {
					strokeDasharray: '100px, 200px',
					strokeDashoffset: '-15px',
				},
				'100%': {
					strokeDasharray: '100px, 200px',
					strokeDashoffset: '-120px',
				},
			},
			animationDuration: '1.4s',
			animationIterationCount: 'infinite',
			animationTimingFunction: 'ease-in-out',
			strokeDasharray: '80px, 200px',
			strokeDashoffset: '0px',
		},
	};

const getStaticStyles = props =>
	props.variant === 'static' && {
		rootStyles: {
			transition: `transform ${
				props.theme.duration.standard
			}ms cubic-bezier(${props.theme.easing.inOut.join()})`,
		},
		circleStyles: {
			transition: `stroke-dashoffset ${
				props.theme.duration.standard
			}ms cubic-bezier(${props.theme.easing.inOut.join()})`,
		},
	};

const getDisabledStyles = props =>
	props.disableShrink && {
		circleStyles: {
			animation: 'none',
		},
	};

const getColorStyles = props =>
	(props.color === 'primary' || props.color === 'secondary') && {
		rootStyles: {
			color: props.theme.palette[props.color].main,
		},
	};

const getBaseStyles = props => ({
	rootStyles: {
		display: 'inline-block',
		lineHeight: 1,
	},
	circleStyles: {
		stroke: 'currentColor',
	},
	svgStyles: {},
});

function CircularProgress(props) {
	const {
		className: classNameProp,
		color,
		disableShrink,
		size,
		style,
		styles,
		thickness,
		value,
		variant,
		...passThru
	} = props;
	const { rootStyles, circleStyles, svgStyles } = useStyles(
		[
			getBaseStyles,
			getColorStyles,
			getDisabledStyles,
			getStaticStyles,
			getIndeterminateStyles,
		],
		{
			color,
			disableShrink,
			size,
			styles,
			thickness,
			variant,
		},
	);
	const className = useMemo(() => cn(classNameProp, rootStyles), [
		classNameProp,
		rootStyles,
	]);
	const circleClassName = useMemo(() => cn(circleStyles), [circleStyles]);
	const svgClassName = useMemo(() => cn(svgStyles), [svgStyles]);
	const circleStyle = {};
	const rootProps = {};
	const rootStyle = {};

	if (variant === 'determinate' || variant === 'static') {
		const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
		circleStyle.strokeDasharray = circumference.toFixed(3);
		rootProps['aria-valuenow'] = Math.round(value);

		if (variant === 'static') {
			circleStyle.strokeDashoffset = `${(
				((100 - value) / 100) *
				circumference
			).toFixed(3)}px`;
			rootStyle.transform = 'rotate(-90deg)';
		} else {
			circleStyle.strokeDashoffset = `${(
				easeIn((100 - value) / 100) * circumference
			).toFixed(3)}px`;
			rootStyle.transform = `rotate(${(easeOut(value / 70) * 270).toFixed(
				3,
			)}deg)`;
		}
	}

	return (
		<div
			className={className}
			style={{ width: size, height: size, ...rootStyle, ...style }}
			role="progressbar"
			{...rootProps}
			{...passThru}
		>
			<svg
				className={svgClassName}
				viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
			>
				<circle
					className={circleClassName}
					style={circleStyle}
					cx={SIZE}
					cy={SIZE}
					r={(SIZE - thickness) / 2}
					fill="none"
					strokeWidth={thickness}
				/>
			</svg>
		</div>
	);
}

CircularProgress.displayName = 'CircularProgress';

CircularProgress.propTypes = {
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf(['primary', 'secondary', 'inherit']),
	/**
	 * If `true`, the shrink animation is disabled.
	 * This only works if variant is `indeterminate`.
	 */
	disableShrink: PropTypes.bool,
	/**
	 * The size of the circle.
	 */
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/**
	 * @ignore
	 */
	style: PropTypes.object,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * The thickness of the circle.
	 */
	thickness: PropTypes.number,
	/**
	 * The value of the progress indicator for the determinate and static variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number,
	/**
	 * The variant to use.
	 * Use indeterminate when there is no progress value.
	 */
	variant: PropTypes.oneOf(['determinate', 'indeterminate', 'static']),
};

CircularProgress.defaultProps = {
	color: 'primary',
	disableShrink: false,
	size: 40,
	thickness: 3.6,
	value: 0,
	variant: 'indeterminate',
};

export default CircularProgress;
