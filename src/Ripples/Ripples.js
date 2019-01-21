import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import merge from './../utils/merge';
import cn from './../system/className';
import { animated, useTransition } from 'react-spring/hooks';
import { isFn } from './../utils/helpers';

const baseStyles = {
	root: {
		contain: 'strict',
		zIndex: 0,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'block',
		overflow: 'hidden',
		borderRadius: 'inherit',
		pointerEvents: 'none',
		backfaceVisibility: 'hidden',
		perspective: 1000,
		willChange: 'transform',
	},
	ink: {
		position: 'absolute',
		display: 'block',
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	},
};

function Ripples(props) {
	const { className, styles: stylesProp = {} } = props;
	const [ripples, setRipples] = useState(props.ripples);
	const classes = useMemo(
		() => {
			const styles = merge(
				baseStyles,
				isFn(stylesProp) ? stylesProp(props) : stylesProp,
			);
			return {
				root: cn(className, styles.root),
				ink: cn(styles.ink),
			};
		},
		[className, stylesProp],
	);

	useEffect(() => setRipples(() => props.ripples), [props.ripples]);

	const transitions = useTransition({
		native: true,
		items: ripples,
		keys: item => item.id,
		from: ({ key, ...style }) => ({
			...style,
			opacity: 0,
			transform: 'scale(0)',
		}),
		enter: { opacity: 0.3, transform: 'scale(1)' },
		leave: { opacity: 0, transform: 'scale(1)' },
		onRest: item =>
			item.pulsate &&
			setRipples(() =>
				ripples.map(ripple =>
					item.key === ripple.key
						? { ...ripple, in: !item.in }
						: ripple,
				),
			),
		update: item =>
			item.pulsate && { transform: `scale(${item.in ? 1 : 0.8})` },
	});

	return (
		<div className={classes.root}>
			{transitions.map(({ key, props }) => (
				<animated.div key={key} style={props} className={classes.ink} />
			))}
		</div>
	);
}

Ripples.displayName = 'Ripples';

Ripples.propTypes = {
	ripples: PropTypes.array,
};

Ripples.defaultProps = {
	ripples: [],
};

export default Ripples;
