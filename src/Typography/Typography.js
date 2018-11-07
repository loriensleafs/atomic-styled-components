import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../styles/className';
import { space, style, textAlign, variant } from 'styled-system';
import { bgColor, textColor } from './../styles';

export const num = n => typeof n === 'number' && !isNaN(n);
export const px = n => (num(n) ? n + 'px' : n);

export const fontFamily = style({
	prop: 'font',
	key: 'typography.fontFamily',
});

export const fontWeight = style({
	prop: 'weight',
	key: 'typography.fontWeights',
});

export const fontSize = style({
	prop: 'size',
	key: 'typography.fontSizes',
	transformValue: px,
	scale: [0.625, 0.75, 0.875, 1, 1.25, 1.5, 2.125, 3, 3.75, 6],
});

export const lineHeight = style({
	prop: 'lineHeight',
	key: 'typography.lineHeights',
});

export const typographyVariants = variant({
	key: 'typography.variants',
});

const tagMap = {
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

function Typography(props) {
	const { theme } = useContext(ThemeContext);
	const styleProps = { ...props, ...{ theme } };
	const className = cn(props.className, {
		...typographyVariants(styleProps),
		...fontFamily(styleProps),
		...fontSize(styleProps),
		...fontWeight(styleProps),
		...lineHeight(styleProps),
		...textAlign(styleProps),
		...textColor(styleProps),
		...space(styleProps),
	});
	const Component = props.paragraph ? 'p' : tagMap[props.variant] || 'span';

	return <Component className={className}>{props.children}</Component>;
}

Typography.propTypes = {
	...fontFamily.propTypes,
	...fontSize.propTypes,
	...fontWeight.propTypes,
	...lineHeight.propTypes,
	...space.propTypes,
	...textAlign.propTypes,
	...textColor.propTypes,
	...typographyVariants.propTypes,
	...{
		paragraph: PropTypes.bool,
	},
};

Typography.defaultProps = {
	variant: 'body1',
};

export default Typography;
