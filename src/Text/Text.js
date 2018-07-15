import { fontFamily, fontSize, textAlign, lineHeight, fontWeight, letterSpacing, color } from 'styled-system'
import tag from 'clean-tag'
import { styled } from "./../styled"

const Text = styled(tag, props => ({
    ...fontFamily(props),
    ...fontSize(props),
    ...textAlign(props),
    ...lineHeight(props),
    ...fontWeight(props),
    ...letterSpacing(props),
    ...color(props)
}));

Text.displayName = 'Text'

Text.propTypes = {
    ...fontFamily.propTypes,
    ...fontSize.propTypes,
    ...textAlign.propTypes,
    ...lineHeight.propTypes,
    ...fontWeight.propTypes,
    ...letterSpacing.propTypes,
};

export default Text