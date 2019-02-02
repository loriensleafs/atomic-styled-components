import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import merge from 'just-extend';
import cn from './../system/className';
import { animated, useTransition } from 'react-spring/hooks';
import { isFn } from './../utils/helpers';

function getStyles(props) {
	const { className, styles: stylesProp } = props;
	const styles = merge(
		{
			root: {
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
				willChange: 'transform',
			},
			ink: {
				position: 'absolute',
				display: 'block',
				borderRadius: '50%',
				backgroundColor: 'currentColor',
			},
		},
		isFn(stylesProp) ? stylesProp(props) : stylesProp || {},
	);

	return {
		classes: {
			root: cn(className, styles.root),
			ink: cn(styles.ink),
		},
		styles,
	};
}

function Ripples({ children, ...props }) {
	const { classes } = useMemo(() => getStyles(props), [
		props.className,
		props.styles,
	]);
	const [refMap] = useState(() => new WeakMap());
	const [cancelMap] = useState(() => new WeakMap());
	const [items, setItems] = useState([]);
	const transitions = useTransition({
		items,
		native: true,
		keys: item => item.key,
		from: { opacity: 0, transform: 'scale(0)' },
		enter: () => next =>
			requestAnimationFrame(async () =>
				next(
					{
						opacity: 0.4,
						transform: 'scale(1)',
					},
					true,
				),
			),
		leave: item => async (next, cancel) => {
			cancelMap.set(item, cancel);
			await next({ opacity: 0 }, true);
		},
		onRest: item =>
			item.pulsate &&
			setItems(state => state.map(i => ({ ...i, in: !state.in }))),
		config: {
			tension: 120,
			friction: 26,
		},
	});

	useEffect(
		() =>
			void children(({ type = 'add', ripple }) =>
				setItems(state =>
					type === 'add' ? [...state, ripple] : state.slice(1),
				),
			),
		[],
	);

	return (
		<div className={classes.root}>
			{transitions.map(({ item, props }) => {
				const { key, in: inProp, pulsate, ...style } = item;
				return (
					<animated.div
						className={classes.ink}
						key={key}
						ref={ref => ref && refMap.set(item, ref)}
						style={{ ...style, ...props }}
					/>
				);
			})}
		</div>
	);
}

Ripples.displayName = 'Ripples';

export default Ripples;
