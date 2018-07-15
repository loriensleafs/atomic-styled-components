import { styled } from "styletron-react";
import { withTheme } from 'styled-components'

export default (component, styleArgs) => withTheme(styled(component, styleArgs));