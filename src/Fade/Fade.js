import React from 'react';
import { animated, useSpring } from 'react-spring';

function Fade(props) {
	const [transition] = useSpring({
		opacity: props.in ? 1 : 0,
		from: {
			opacity: props.in ? 0 : 1,
		},
	});

	return <animated.div style={transition}>{props.children}</animated.div>;
}

Fade.displayName = 'Fade';

Fade.propTypes = {};

export default Fade;
