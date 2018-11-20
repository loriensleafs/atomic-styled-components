import React, { cloneElement, isValidElement, useMemo } from 'react';
import Transition from 'react-transition-group/Transition';
import getTransitionProps from './../utils/getTransitionProps';
import { duration, transition } from './../theme/createMotion';

const transitionStyles = {
	entering: {
		opacity: 1,
	},
	entered: {
		opacity: 1,
	},
};

const makeHandler = (timeout, style, mode, cb) => node => {
	if (mode === 'enter') node.scrollTop;
	node.style.transition = transition('opacity', getTransitionProps(timeout, style, mode));
	if (cb) cb(node);
};

const Fade = React.memo(function Fade(props) {
	const { children, onEnter, onExit, style, timeout, ...passThru } = props;
	const handleEnter = useMemo(() => makeHandler(timeout, style, 'enter', onEnter), [
		timeout,
		style,
		onEnter,
	]);
	const handleExit = useMemo(() => makeHandler(timeout, style, 'exit', onExit), [
		timeout,
		style,
		onExit,
	]);

	return (
		<Transition
			appear
			timeout={timeout}
			onEnter={handleEnter}
			onExit={handleExit}
			{...passThru}>
			{(state, childProps) =>
				cloneElement(children, {
					style: {
						opacity: 0,
						willChange: 'opacity',
						...transitionStyles[state],
						...style,
						...(isValidElement(children) ? children.props.style : {}),
					},
					...childProps,
				})
			}
		</Transition>
	);
});

Fade.propTypes = {};

Fade.defaultProps = {
	timeout: {
		enter: duration.entering,
		exit: duration.leaving,
	},
};

export default Fade;
