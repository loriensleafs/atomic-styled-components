import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deep-extend';
import { space, width, color } from 'styled-system';
import { height, maxHeight, maxWidth, minHeight, minWidth } from './../styles';
import Paper from './../Paper';
import { classify } from './../themify';

const styles = ({ color: colorProp, ...props }) =>
	merge(
		{
			root: {
				overflow: 'hidden',
				...color(props),
				...height(props),
				...maxHeight(props),
				...maxWidth(props),
				...minHeight(props),
				...minWidth(props),
				...space(props),
				...width(props),
			},
			paper: {},
		},
		props.$styles,
	);

const Card = (props) => {
	const {
		className,
		raised,
		$styles,
		color,
		bg,
		height,
		maxHeight,
		maxWidth,
		minHeight,
		minWidth,
		m,
		ml,
		mr,
		mt,
		mb,
		mx,
		my,
		p,
		pl,
		pr,
		pt,
		pb,
		px,
		py,
		width,
		...passThru
	} = props;
	const { root: rootStyles, paper: paperStyles } = styles(props);

	return (
		<Paper
			className={classify(rootStyles, className)}
			$styles={{ root: paperStyles }}
			$elevation={raised ? 8 : 1}
			{...passThru}
		/>
	);
};

Card.displayName = 'Card';

Card.propTypes = {
	className: PropTypes.string,
	/**
	 * If `true`, the card will use raised styling.
	 */
	raised: PropTypes.bool,
	$styles: PropTypes.object,
	...color.propTypes,
	...height.propTypes,
	...maxHeight.propTypes,
	...maxWidth.propTypes,
	...minHeight.propTypes,
	...minWidth.propTypes,
	...space.propTypes,
	...width.propTypes,
};

Card.defaultProps = {
	raised: false,
	$styles: {
		root: {},
		paper: {},
	},
};

export default Card;
