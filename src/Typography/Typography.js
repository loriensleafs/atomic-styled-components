import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import Box from './../Box';
import {
	fontFamily as fontFamilyParser,
	fontSize as fontSizeParser,
	fontStyle as fontStyleParser,
	fontWeight as fontWeightParser,
	lineHeight as lineHeightParser,
	textAlign as textAlignParser,
	variant,
} from 'styled-system';
import { whiteSpace as whiteSpaceParser } from './../styles';

const TAG_MAP = {
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

export const variants = variant({
	key: 'typography.variants',
});

const getColorStyles = props => {
	switch (props.color) {
		case 'primary':
		case 'secondary':
		case 'textPrimary':
		case 'textSecondary':
		case 'error':
			return {
				color: props.theme.palette[props.color].main,
			};

		case 'inherit':
			return {
				color: 'inherit',
			};

		default:
			return null;
	}
};

export const getBaseStyles = {
	margin: '0px',
};

function Typography(props) {
	const {
		children,
		className: classNameProp,
		component,
		fontFamily,
		fontSize,
		fontWeight,
		lineHeight,
		paragraph,
		styles: stylesProp,
		textAlign,
		variant,
		whiteSpace,
		...passThru
	} = props;
	const styles = useStyles(
		[
			getBaseStyles,
			getColorStyles,
			fontFamilyParser,
			fontSizeParser,
			fontStyleParser,
			fontWeightParser,
			lineHeightParser,
			textAlignParser,
			whiteSpaceParser,
		],
		{
			fontFamily,
			fontSize,
			fontWeight,
			lineHeight,
			paragraph,
			styles: stylesProp,
			textAlign,
			variant,
			whiteSpace,
		},
	);
	const className = useMemo(() => cn(classNameProp, styles), [
		classNameProp,
		styles,
	]);
	const Component = component
		? component
		: paragraph
		? 'p'
		: TAG_MAP[variant] || 'span';

	return (
		<Box className={className} is={Component} {...passThru}>
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
	...fontFamilyParser.propTypes,
	...fontSizeParser.propTypes,
	...fontStyleParser.propTypes,
	...fontWeightParser.propTypes,
	...lineHeightParser.propTypes,
	paragraph: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	...textAlignParser.propTypes,
	...whiteSpaceParser.propTypes,
};

Typography.defaultProps = {
	color: 'default',
	variant: 'body1',
};

export default Typography;
