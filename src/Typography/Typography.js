import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { textAlign, variant } from 'styled-system';
import {
	color as colorParser,
	fontFamily as fontFamilyParser,
	fontSize as fontSizeParser,
	fontWeight,
	lineHeight as lineHeightParser,
	space,
} from './../styles';

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
				rootStyles: {
					color: props.theme.palette[props.color].main,
				},
			};

		case 'inherit':
			return {
				rootStyles: {
					color: 'inherit',
				},
			};

		default:
			return null;
	}
};

export const getBaseStyles = props => ({
	rootStyles: {
		margin: '0px',
		...variants(props),
		...colorParser(props),
		...fontFamilyParser(props),
		...fontSizeParser(props),
		...fontWeight(props),
		...lineHeightParser(props),
		...textAlign(props),
		...space(props),
	},
});

function Typography(props) {
	const {
		children,
		color,
		className: classNameProp,
		component,
		font,
		lineHeight,
		m,
		mb,
		ml,
		mr,
		mt,
		mx,
		my,
		p,
		paragraph,
		pb,
		pl,
		pr,
		pt,
		px,
		py,
		size,
		variant,
		weight,
		styles,
		...passThru
	} = props;
	const { rootStyles } = useStyles([getBaseStyles, getColorStyles], {
		color,
		font,
		lineHeight,
		m,
		mb,
		ml,
		mr,
		mt,
		mx,
		my,
		p,
		paragraph,
		pb,
		pl,
		pr,
		pt,
		px,
		py,
		size,
		styles,
		variant,
		weight,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);
	const Component = component ? component : paragraph ? 'p' : TAG_MAP[variant] || 'span';

	return (
		<Component className={className} {...passThru}>
			{children}
		</Component>
	);
}

Typography.displayName = 'Typography';

Typography.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	paragraph: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Typography.defaultProps = {
	color: 'default',
	variant: 'body1',
};

export default Typography;
