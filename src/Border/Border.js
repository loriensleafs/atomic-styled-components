import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { borderColor, borderRadius, borders } from 'styled-system';

const getStyles = props => ({
	...borderColor(styleProps),
	...borderRadius(styleProps),
	...borders(styleProps),
	...(isFunc(props.styles) ? props.styles(props) : props.styles || {}),
});

const Border = props => {
	const theme = useContext(ThemeContext);
	const className = useMemo(() => cn(props.className, getStyles({ ...props, theme })), [
		props,
		theme,
	]);
	return <div className={className} />;
};

Border.displayName = 'Border';

Border.propTypes = {
	...borderColor.propTypes,
	...borderRadius.propTypes,
	...borders.propTypes,
	...{
		styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	},
};

export default Border;
