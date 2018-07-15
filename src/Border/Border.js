import { styled } from "./../styled"
import { borderRadius, borderColor, borders } from 'styled-system'
import tag from 'clean-tag'

const Border = styled(tag, props => ({
    ...borderRadius(props),
    ...borderColor(props),
    ...borders(props)
}))

Border.displayName = 'Border'

Border.propTypes = {
    ...borderRadius.propTypes,
    ...borderColor.propTypes,
    ...borders.propTypes
}

export default Border