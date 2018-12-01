import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';
import { borderColor, borderRadius, borders } from 'styled-system';

const Border = props => {
	const theme = useContext(ThemeContext);
	const styles = useStyles(
		{ ...props, theme },
		[props, theme],
		[borderColor, borderRadius, borders],
	);
	const className = useMemo(() => cn(props.className, styles), [props.className, styles]);
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
