import React, { useContext, useMemo } from 'react';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { borderRadius, borderColor, borders } from 'styled-system';

const Border = props => {
	const theme = useContext(ThemeContext);
	const className = useMemo(
		() => {
			const styleProps = { ...props, theme };
			return cn({
				...borderRadius(styleProps),
				...borderColor(styleProps),
				...borders(styleProps),
			});
		},
		[prop, theme],
	);

	return <div className={className} />;
};

Border.displayName = 'Border';

Border.propTypes = {
	...borderRadius.propTypes,
	...borderColor.propTypes,
	...borders.propTypes,
};

export default Border;
