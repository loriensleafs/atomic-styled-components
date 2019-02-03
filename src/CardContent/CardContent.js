import React from 'react';
import PropTypes from 'prop-types';
import combine from '../utils/combine';
import { getSpacing, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const getBaseStyles = () => ({
	...getSpacing({ py: 3, px: [3, 3.5] }),
	':last-child': getSpacing({ pb: 3.5 }),
});

const getStyles = combine(getBaseStyles, getSpacing);
getStyles.propTypes = getSpacing.propTypes;

function CardContent(props) {
	const [{ classes }, { className, as: Component, ...passThru }] = useStyles(
		props,
		getStyles,
	);

	return <Component className={classes} {...passThru} />;
}

CardContent.displayName = 'CardContent';

CardContent.propTypes = {
	className: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

CardContent.defaultProps = {
	as: 'div',
};

export default CardContent;
