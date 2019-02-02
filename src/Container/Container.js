import React, { useContext } from 'react';
import ThemeContext from './../theme/ThemeContext';
import Box from './../Box';

function Container(props) {
	const {
		theme: { maxWidth },
	} = useContext(ThemeContext);
	return (
		<Box styles={{ maxWidth }} {...props}>
			{props.children}
		</Box>
	);
}

Container.displayName = 'Container';

Container.defaultProps = {
	mx: 'auto',
	px: 3,
};

export default Container;
