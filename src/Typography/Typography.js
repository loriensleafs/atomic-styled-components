import React from 'react';
import PropTypes from 'prop-types';
import combine from './../utils/combine';
import { getColor, getSpacing, getText, useStyles } from './../system';
import { componentPropType, stylesPropType } from './../utils/propTypes';

const TAGS = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	subtitle1: 'h6',
	subtitle2: 'h6',
	body1: 'p',
	body2: 'p',
	caption: 'span',
	overline: 'span',
};

function getColorStyles(props) {
	const { color } = props;

	switch (color) {
		case 'primary':
		case 'secondary':
		case 'textPrimary':
		case 'textSecondary':
		case 'error':
			return getColor({
				color: `${color}.main`,
			});

		case 'inherit':
			return {
				color: 'inherit',
			};
	}
}

const getStyles = combine(getColorStyles, getText, getColor, getSpacing);
getStyles.propTypes = {
	...getColor.propTypes,
	...getSpacing.propTypes,
	...getText.propTypes,
};

function Typography(props) {
	const [
		{ classes },
		{ as, children, paragraph, variant, ...passThru },
	] = useStyles(props, getStyles, {
		whitelist: ['variant'],
	});
	const Component = as ? as : paragraph ? 'p' : TAGS[variant] || 'span';

	return (
		<Component className={classes} {...passThru}>
			{children}
		</Component>
	);
}

Typography.displayName = 'Typography';

Typography.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	className: PropTypes.string,
	paragraph: PropTypes.bool,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

Typography.defaultProps = {
	m: 0,
	variant: 'body2',
};

export default Typography;
