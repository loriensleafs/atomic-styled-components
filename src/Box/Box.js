import { space, width, fontSize, color } from 'styled-system'
import tag from 'clean-tag'
import { styled } from "./../styled"

const Box = styled(tag, props => ({
    ...space(props),
    ...width(props),
    ...fontSize(props),
    ...color(props)
}))

Box.displayName = 'Box'

Box.propTypes = {
    ...space.propTypes,
    ...width.propTypes,
    ...fontSize.propTypes,
    ...color.propTypes,
};

export default Box