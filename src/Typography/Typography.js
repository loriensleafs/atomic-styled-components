import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { textAlign, variant } from 'styled-system';
import { textColor, fontFamily, fontSize, fontWeight, lineHeight, space } from './../styles';

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

export const getBaseStyles = props => ({
	margin: 0,
});

function Typography(props) {
	const {
		className: classNameProp,
		font,
		lineHeight,
		paragraph,
		size,
		variant,
		weight,
		styles: stylesProp,
	} = props;
	const { theme } = useContext(ThemeContext);
	const styles = useStyles(
		{ ...props, theme },
		[props, theme],
		[
			getBaseStyles,
			variants,
			fontFamily,
			fontSize,
			fontWeight,
			lineHeight,
			textAlign,
			textColor,
			space,
		],
	);
	const className = useMemo(() => cn(classNameProp, styles), [classNameProp, styles]);
	const Component = paragraph ? 'p' : TAG_MAP[variant] || 'span';

	return <Component className={className}>{props.children}</Component>;
}

Typography.displayName = 'Typography';

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
