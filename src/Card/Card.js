import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import merge from './../utils/pureRecursiveMerge';
import Paper from './../Paper';
import { space } from 'styled-system';
import {
	bgColor,
	textColor,
	height,
	maxHeight,
	maxWidth,
	minHeight,
	minWidth,
	width,
} from './../styles';
import { isFunc } from './../utils/helpers';

const getStyles = props =>
	merge(
		{
			overflow: 'hidden',
		},
		bgColor(props),
		textColor(props),
		height(props),
		maxHeight(props),
		maxWidth(props),
		minHeight(props),
		minWidth(props),
		space(props),
		width(props),
		isFunc(props.styles) ? props.styles(props) : props.styles,
	);

const useStyles = props => useMemo(() => getStyles(props), [props]);

function Card(props) {
	const { theme } = useContext(ThemeContext);
	const { bg, raised, styles: stylesProp, ...passThru } = props;
	const styles = useStyles({ ...props, theme });

	return <Paper styles={styles} elevation={raised ? 8 : 1} {...passThru} />;
}

Card.displayName = 'Card';

Card.propTypes = {
	className: PropTypes.string,
	/**
	 * If `true`, the card will use raised styling.
	 */
	raised: PropTypes.bool,
	...bgColor.propTypes,
	...textColor.propTypes,
	...height.propTypes,
	...maxHeight.propTypes,
	...maxWidth.propTypes,
	...minHeight.propTypes,
	...minWidth.propTypes,
	...space.propTypes,
	...width.propTypes,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Card.defaultProps = {
	raised: false,
	styles: {},
};

export default Card;
