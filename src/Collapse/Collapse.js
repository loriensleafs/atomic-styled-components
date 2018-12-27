import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from './../theme/className';
import { animated as a, useSpring } from 'react-spring/hooks';

function Collapse(props) {
	const {
		children,
		collapseTo,
		component: componentProp,
		in: inProp,
		onEnd,
		onStart,
		onEntering,
		onExiting,
		style = {},
	} = props;
	const [expandTo, setExpandTo] = useState('auto');
	const ref = useRef(null);
	const className = useMemo(() => cn({ overflow: 'hidden' }), []);
	const Component = a[componentProp];
	const transition = useSpring({
		native: true,
		height: inProp ? expandTo : collapseTo,
		onStart: () => onStart && onStart(),
		onFrame: val =>
			inProp
				? onEntering && onEntering(val)
				: onExiting && onExiting(val),
		onRest: () => onEnd && onEnd(),
	});

	useEffect(() => setExpandTo(() => ref.current.scrollHeight), [inProp]);

	return (
		<Component
			children={children}
			className={className}
			ref={ref}
			style={{ ...style, ...transition }}
		/>
	);
}

Collapse.displayName = 'Collapse';

Collapse.propTypes = {
	/**
	 * The content node to be collapsed.
	 */
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * The height of the container when collapsed.
	 */
	collapsedTo: PropTypes.number,
	/**
	 * If `true`, the component will transition in.
	 */
	in: PropTypes.bool,
	/**
	 * Callback that is triggered at the end of the animation.
	 */
	onEnd: PropTypes.func,
	/**
	 * Callback that is triggered at the start of the animation.
	 */
	onStart: PropTypes.func,
	/**
	 * Inline styles that will be applied to the animated wrapper
	 * component.
	 */
	style: PropTypes.object,
};

Collapse.defaultProps = {
	collapseTo: 0,
	component: 'div',
};

export default Collapse;
