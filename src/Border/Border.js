import React, { useContext } from 'react';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { borderRadius, borderColor, borders } from 'styled-system';

const Border = props => {
	const theme = useContext(ThemeContext);
	const styleProps = { ...props, ...{ theme: theme } };
	const className = cn({
		...borderRadius(styleProps),
		...borderColor(styleProps),
		...borders(styleProps),
	});

	return <div className={className} />;
};

Border.displayName = 'Border';

Border.propTypes = {
	...borderRadius.propTypes,
	...borderColor.propTypes,
	...borders.propTypes,
};

export default Border;
