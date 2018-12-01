import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { space, textAlign, variant } from 'styled-system';
import { textColor, fontFamily, fontSize, fontWeight, lineHeight } from './../styles';
import { isFunc, px } from './../utils/helpers';

export const variants = variant({
	key: 'typography.variants',
});

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

export const getStyles = props => ({
	...{
		margin: 0,
	},
	...variants(props),
	...fontFamily(props),
	...fontSize(props),
	...fontWeight(props),
	...lineHeight(props),
	...textAlign(props),
	...textColor(props),
	...space(props),
	...(isFunc(props.styles) ? props.styles(props) : props.styles || {}),
});

const useStyles = props => useMemo(() => getStyles(props), [props]);

function Typography(props) {
	const { className: classNameProp, font, lineHeight, paragraph, size, variant, weight } = props;
	const { theme } = useContext(ThemeContext);
	const className = useMemo(() => cn(classNameProp, useStyles({ ...props, theme })), [
		props,
		theme,
	]);
	const Component = paragraph ? 'p' : TAG_MAP[variant] || 'span';

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
	...variants.propTypes,
	...{
		paragraph: PropTypes.bool,
	},
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Typography.defaultProps = {
	variant: 'body1',
};

export default Typography;
