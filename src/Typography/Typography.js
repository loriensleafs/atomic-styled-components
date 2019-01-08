import React from 'react';
import PropTypes from 'prop-types';
import Box from './../Box';
import combine from './../utils/combine';
import { getColor, getText, useStyles } from './../system';
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

		default:
			return null;
	}
}

const getStyles = combine(getColorStyles, getText, getColor);
getStyles.propTypes = {
	...getColor.propTypes,
	...getText.propTypes,
};

function Typography(props) {
	const [
		{ styles },
		{ as, children, paragraph, variant, ...passThru },
	] = useStyles(props, getStyles, {
		whitelist: ['variant'],
	});
	const component = as ? as : paragraph ? 'p' : TAGS[variant] || 'span';

	return (
		<Box styles={styles} as={component} {...passThru}>
			{children}
		</Box>
	);
}

Typography.displayName = 'Typography';

Typography.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	paragraph: PropTypes.bool,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

Typography.defaultProps = {
	mt: 0,
	mr: 0,
	mb: 0,
	ml: 0,
	variant: 'body1',
};

export default Typography;
