import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { getColor, getSpacing, getText, useStyles } from './../system';
import combine from './../utils/combine';
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

const getStyles = combine(getText, getColor, getSpacing);
getStyles.propTypes = {
	...getColor.propTypes,
	...getSpacing.propTypes,
	...getText.propTypes,
};

const Typography = memo(props => {
	const {
		classes,
		props: { as, children, paragraph, variant, ...passThru },
	} = useStyles(props, getStyles, {
		nested: false,
		whitelist: ['variant'],
	});
	const Component = as ? as : paragraph ? 'p' : TAGS[variant] || 'span';

	return (
		<Component className={classes} {...passThru}>
			{children}
		</Component>
	);
});

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
