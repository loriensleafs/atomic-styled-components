import React from 'react';
import PropTypes from 'prop-types';
import { withWrapper } from 'styletron-react';
import merge from './../utils/pureRecursiveMerge';
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
import Paper from './../Paper';
import { classify, themify } from './../themify';

const styles = (props) =>
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
		typeof props.$styles === 'function' ? props.$styles(props) : props.$styles,
	);

const Card = withWrapper(Paper, (Styled) => ({ $styles, bg, blacklist, raised, ...passThru }) => (
	<Styled
		$styles={styles({ ...$styles, ...bg, ...passThru })}
		$elevation={raised ? 8 : 1}
		{...passThru}
	/>
));

Card.displayName = 'Card';

Card.propTypes = {
	$styles: PropTypes.object,
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
};

Card.defaultProps = {
	blacklist: Object.keys(Card.propTypes),
	raised: false,
	$styles: {},
};

export default themify(Card);
