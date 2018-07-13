import { styled } from 'styletron-react'
import { width, space, pseudoStyle, style, responsiveStyle, themeGet } from 'styled-system'

const disabled = props => {
}

const disableFocusRipple = props => {
}

const size = props => {
}

const variant = props => {
}

const Button = styled('button', ({}, ...props) => ({
    ...size(props),
    ...space(props),
    ...variant(props),
    ...width(props)
}))

Button.displayName = 'Button'

Button.propTypes = {
    ...space.propTypes,
    ...width.propTypes
}

export default Button