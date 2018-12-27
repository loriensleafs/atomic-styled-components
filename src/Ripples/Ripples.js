import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring/hooks';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';

export const getBaseStyles = {
	rootStyles: {
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
	inkStyles: {
		position: 'absolute',
		display: 'block',
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	},
};

function Ripples(props) {
	const [ripples, setRipples] = useState(props.ripples);
	const { rootStyles, inkStyles } = useStyles([getBaseStyles], props);
	const className = useMemo(() => cn(rootStyles), [rootStyles]);
	const inkClassName = useMemo(() => cn(inkStyles), [inkStyles]);

	useEffect(() => setRipples(() => props.ripples), [props.ripples]);

	const transitions = useTransition({
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
					item.key === ripple.key ? { ...ripple, in: !item.in } : ripple,
				),
			),
		update: item => item.pulsate && { transform: `scale(${item.in ? 1 : 0.8})` },
	});

	return (
		<div className={className}>
			{transitions.map(({ key, props }) => (
				<animated.div key={key} style={props} className={inkClassName} />
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
