import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import useStyles from '../system/useStyles';

const baseStyles = {
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
};

function Ripples(props) {
	const {
		classes,
		props: { children },
	} = useStyles(props, null, {
		baseStyles,
		nested: true,
	});
	const [refMap] = useState(() => new WeakMap());
	const [cancelMap] = useState(() => new WeakMap());
	const [items, setItems] = useState([]);
	const transitions = useTransition(items, item => item.key, {
		from: { opacity: 0, transform: 'scale(0)' },
		enter: () => async next =>
			await next({ opacity: 0.4, transform: 'scale(1)' }),
		leave: item => async (next, cancel) => {
			cancelMap.set(item, cancel);
			await next({ opacity: 0 });
		},
		update: item => async next =>
			item.pulsate &&
			(await next({ transform: `scale(${item.in ? 1 : 0.8})` })),
		onRest: item => {
			if (item.pulsate) {
				setItems(state =>
					state.map(i =>
						item.key === i.key ? { ...i, in: !i.in } : i,
					),
				);
			}
		},
		config: { tension: 120, friction: 26 },
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
			{transitions.map(({ key, item, props }) => (
				<animated.div
					className={classes.ink}
					key={key}
					ref={ref => ref && refMap.set(item, ref)}
					style={{
						...{
							top: item.top,
							left: item.left,
							width: item.width,
							height: item.height,
						},
						...props,
					}}
				/>
			))}
		</div>
	);
}

Ripples.displayName = 'Ripples';

export default Ripples;
