import React from 'react';
import PropTypes from 'prop-types';
import combine from './../utils/combine';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getBaseStyles() {
	return {
		...getSpacing({
			py: 3,
			px: [3, 3.5],
		}),
		':last-child': getSpacing({
			pb: 3.5,
		}),
	};
}

const getStyles = combine(getBaseStyles, getSpacing);
getStyles.propTypes = getSpacing.propTypes;

function CardContent(props) {
	const [
		{ className, component: Component, ...passThru },
		styles,
		classes,
	] = useStyles(props, getStyles);

	return <Component className={classes} {...passThru} />;
}

CardContent.displayName = 'CardContent';

CardContent.propTypes = {
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	...stylesPropType,
	...getStyles.propTypes,
};

CardContent.defaultProps = {
	component: 'div',
};

export default CardContent;
