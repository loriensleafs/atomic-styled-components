import React from 'react';
import PropTypes from 'prop-types';
import { withWrapper } from 'styletron-react';
import merge from './../utils/pureRecursiveMerge';
import { space, width } from 'styled-system';
import { bgColor, textColor, height, maxHeight, maxWidth, minHeight, minWidth } from './../styles';
import Paper from './../Paper';
import { classify, themify } from './../themify';

const styles = (props) =>
	merge(
		{
			rootStyles: {
				overflow: 'hidden',
				...bgColor(props),
				...textColor(props),
				...height(props),
				...maxHeight(props),
				...maxWidth(props),
				...minHeight(props),
				...minWidth(props),
				...space(props),
				...width(props),
			},
			paperStyles: {},
		},
		props.$styles,
	);

const Card = withWrapper(Paper, (Styled) => (props) => {
	const { raised, className, ...passThru } = props;
	const { rootStyles, paperStyles } = styles(props);
	return (
		<Styled
			className={classify(rootStyles, className)}
			$styles={{ root: paperStyles }}
			$elevation={raised ? 8 : 1}
			{...passThru}
		/>
	);
});

Card.displayName = 'Card';

Card.propTypes = {
	className: PropTypes.string,
	/**
	 * If `true`, the card will use raised styling.
	 */
	raised: PropTypes.bool,
	$styles: PropTypes.object,
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
	raised: false,
	$styles: {
		root: {},
		paper: {},
	},
};

export default themify(Card);
