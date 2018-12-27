import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from './../theme/className';
import { animated as a, useSpring } from 'react-spring/hooks';

function Rotate(props) {
	const {
		children,
		className: classNameProp,
		component: componentProp,
		deg,
		onEnd,
		onStart,
		onUpdate,
		style = {},
	} = props;
	const className = useMemo(() => cn(classNameProp, { display: 'inherit' }), [
		classNameProp,
	]);
	const Component = a[componentProp];
	const transition = useSpring({
		native: true,
		transform: `rotate(${deg}deg)`,
		onStart: () => onStart && onStart(),
		onFrame: val => onUpdate && onUpdate(val),
		onRest: () => onEnd && onEnd(),
	});

	return (
		<Component
			children={children}
			className={className}
			style={{ ...style, ...transition }}
		/>
	);
}

Rotate.displayName = 'Rotate';

Rotate.propTypes = {
	/**
	 * A single child content element.
	 */
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	className: PropTypes.string,
	/**
	 * The tag type the animated wrapper component should be.
	 */
	component: PropTypes.string,
	/**
	 * The degree to animate to.
	 */
	deg: PropTypes.number,
	/**
	 * Callback that is triggered at the end of the animation.
	 */
	onEnd: PropTypes.func,
	/**
	 * Callback that is triggered at the start of the animation.
	 */
	onStart: PropTypes.func,
	/**
	 * Callback that is triggered while the animation is entering.
	 */
	onUpdate: PropTypes.func,
	/**
	 * Inline styles that will be applied to the animated wrapper
	 * component.
	 */
	style: PropTypes.object,
};

Rotate.defaultProps = {
	component: 'div',
	deg: 0,
};

export default Rotate;
