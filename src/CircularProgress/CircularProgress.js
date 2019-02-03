import React from 'react';
import PropTypes from 'prop-types';
import combine from '../utils/combine';
import { getColors, useStyles } from '../system';
import { clamp } from '../utils/helpers';
import { stylesPropType } from '../utils/propTypes';

const SIZE = 44;

const getRelativeValue = (val, min, max) =>
	(clamp(val, min, max) - min) / (max - min);

const easeOut = t => {
	t = getRelativeValue(t, 0, 1);
	t = (t -= 1) * t * t + 1;
	return t;
};

const easeIn = t => t * t;

const getVariantStyles = ({
	disableShrink,
	theme: { getTransition },
	variant,
}) => {
	switch (variant) {
		case 'static':
			return {
				root: {
					transition: getTransition('transform'),
				},
				circle: {
					transition: getTransition('stroke-dashoffset'),
				},
			};

		case 'indeterminate':
			return {
				root: {
					animationName: {
						'100%': {
							transform: 'rotate(360deg)',
						},
					},
					animationDuration: '1.4s',
					animationIterationCount: 'infinite',
					animationTimingFunction: 'linear',
				},
				circle: disableShrink
					? {
							animation: 'none',
					  }
					: {
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
	}
};

const getColorStyles = ({ color }) => {
	switch (color) {
		case 'primary':
		case 'secondary':
			return {
				root: getColors({
					color: `${color}.main`,
				}),
			};

		default:
			return {
				root: {
					color: 'inherit',
				},
			};
	}
};

const getStyles = combine(getColorStyles, getVariantStyles);
getStyles.propTypes = {
	/**
	 * The color of the component. It supports those theme colors that make
	 * sense for this component.
	 */
	color: PropTypes.oneOf(['primary', 'secondary', 'inherit']),
	/**
	 * If `true`, the shrink animation is disabled.
	 * This only works if variant is `indeterminate`.
	 */
	disableShrink: PropTypes.bool,
};

const baseStyles = {
	root: {
		display: 'inline-block',
		lineHeight: 1,
	},
	circle: {
		stroke: 'currentColor',
	},
	svg: {},
};

function CircularProgress(props) {
	const [
		{ classes },
		{ className, size, style, thickness, value, variant, ...passThru },
	] = useStyles(props, getStyles, { baseStyles });
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
			className={classes.root}
			style={{ width: size, height: size, ...rootStyle, ...style }}
			role="progressbar"
			{...rootProps}
			{...passThru}
		>
			<svg
				className={classes.svg}
				viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
			>
				<circle
					className={classes.circle}
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
	className: PropTypes.string,
	// The size of the circle.
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	style: PropTypes.object,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	// The thickness of the circle.
	thickness: PropTypes.number,
	/**
	 * The value of the progress indicator for the determinate and static
	 * variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number,
	/**
	 * The variant to use.
	 * Use indeterminate when there is no progress value.
	 */
	variant: PropTypes.oneOf(['determinate', 'indeterminate', 'static']),
	...stylesPropType,
	...getStyles.propTypes,
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
