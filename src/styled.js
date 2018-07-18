import { Client } from 'styletron-engine-atomic';
import { styled as styletronStyled, withStyle as styletronWithStyle } from 'styletron-react';
import { withTheme } from 'styled-components';

export const engine = new Client();

export const classify = (styles) => engine.renderStyle(styles);

export const styled = (component, styleArgs) => {
	const StyledComponent = styletronStyled(component, styleArgs);
	return withTheme(StyledComponent);
};

export const withStyle = (component, styleArgs) => {
	const StyledComponent = styletronWithStyle(component, styleArgs);
	return withTheme(StyledComponent);
};
