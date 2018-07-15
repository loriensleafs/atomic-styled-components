import { fontFamily, fontSize, textAlign, lineHeight, fontWeight, letterSpacing, color, responsiveStyle, style } from 'styled-system'
import tag from 'clean-tag'
import styled from "./../styled"


export const textTransform = style({
    prop: 'caps',
    cssProperty: 'textTransform',
    getter: n => n ? 'uppercase' : null
})

const Text = styled(tag, props => ({
    ...textTransform(props),
    ...fontFamily(props),
    ...fontSize(props),
    ...textAlign(props),
    ...lineHeight(props),
    ...fontWeight(props),
    ...letterSpacing(props),
}));

Text.displayName = 'Text'

Text.propTypes = {
    ...textTransform.propTypes,
    ...fontFamily.propTypes,
    ...fontSize.propTypes,
    ...textAlign.propTypes,
    ...lineHeight.propTypes,
    ...fontWeight.propTypes,
    ...letterSpacing.propTypes,
};

export default Text