import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Spring, useSpring } from 'react-spring';

function Fade(props) {
	const { children, in: inProp, onEnd, onStart, ...passThru } = props;

	const handleStart = useCallback(() => onStart && onStart(), []);

	const handleEnd = useCallback(() => onEnd && onEnd(inProp), []);

	return (
		<Spring
			from={{ opacity: inProp ? 0 : 1 }}
			to={{ opacity: inProp ? 1 : 0 }}
			onStart={handleStart}
			onRest={handleEnd}>
			{style =>
				React.cloneElement(children, {
					style,
					...passThru,
				})
			}
		</Spring>
	);
}

Fade.displayName = 'Fade';

Fade.propTypes = {
	/**
	 * A single child content element.
	 */
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
};

export default Fade;
