import React, { useContext } from 'react';
import {
	fontFamily,
	fontSize,
	textAlign,
	lineHeight,
	fontWeight,
	letterSpacing,
} from 'styled-system';
import ThemeContext from './../theme/ThemeContext';
import cn from './../styles/className';
import { bgColor, textColor } from './../styles';

function Text(props) {
	const { theme } = useContext(ThemeContext);
	const styleProps = { ...props, ...{ theme } };
	const className = cn(props.className, {
		...fontFamily(styleProps),
		...fontSize(styleProps),
		...textAlign(styleProps),
		...lineHeight(styleProps),
		...fontWeight(styleProps),
		...letterSpacing(styleProps),
		...bgColor(styleProps),
		...textColor(styleProps),
	});

	return <div className={className}>{props.children}</div>;
}

Text.displayName = 'Text';

Text.propTypes = {
	...fontFamily.propTypes,
	...fontSize.propTypes,
	...textAlign.propTypes,
	...lineHeight.propTypes,
	...fontWeight.propTypes,
	...letterSpacing.propTypes,
};

export default Text;
