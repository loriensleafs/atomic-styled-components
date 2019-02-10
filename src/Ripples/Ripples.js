import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../system/useStyles';
import { animated, useTransition } from 'react-spring';

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
	const [{ classes }, { children }] = useStyles(props, undefined, {
		baseStyles,
	});
	const [refMap] = useState(() => new WeakMap());
	const [cancelMap] = useState(() => new WeakMap());
	const [items, setItems] = useState([]);
	const transitions = useTransition(items, item => item.key, {
		config: { tension: 120, friction: 26 },
		from: { opacity: 0, transform: 'scale(0)' },
		enter: item => async next =>
			next({ opacity: 0.4, transform: 'scale(1)' }),
		leave: item => async (next, cancel) => {
			cancelMap.set(item, cancel);
			await next({ opacity: 0 }, true);
		},
		onRest: item =>
			item.pulsate &&
			setItems(state => state.map(i => ({ ...i, in: !state.in }))),
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
			{transitions.map(({ item, props }) => (
				<animated.div
					className={classes.ink}
					key={item.key}
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
