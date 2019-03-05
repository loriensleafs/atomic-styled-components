import React from 'react';
import PropTypes from 'prop-types';
import { getSpacing, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const getStyles = props => ({
	...getSpacing({ py: 3, px: [3, 3.5] }),
	...getSpacing(props),
	':last-child': getSpacing({ pb: 3.5 }),
});
getStyles.propTypes = getSpacing.propTypes;

function CardContent(props) {
	const {
		classes,
		props: { as: Component, ...passThru },
	} = useStyles(props, getStyles);

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
