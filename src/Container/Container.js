import React, { useContext } from 'react';
import ThemeContext from './../theme/ThemeContext';
import Box from './../Box';

function Container(props) {
	const { theme } = useContext(ThemeContext);
	return (
		<Box $styles={{ maxWidth: theme.maxWidth }} {...props}>
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
