import { styled } from "styletron-react";
import { withTheme } from 'styled-components'

export default (component, styleArgs) => {
    const StyledComponent = styled(component, styleArgs);
    return withTheme(StyledComponent);
};