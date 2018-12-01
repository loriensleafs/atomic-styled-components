import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { borderColor, borderRadius, borders } from 'styled-system';

const getStyles = props => ({
	...borderColor(props),
	...borderRadius(props),
	...borders(props),
	...(isFunc(props.styles) ? props.styles(props) : props.styles || {}),
});

const useStyles = props => useMemo(() => getStyles(props), [props]);

const Border = props => {
	const theme = useContext(ThemeContext);
	const className = useMemo(() => cn(props.className, useStyles({ ...props, theme })), [
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
