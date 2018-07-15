import PropTypes from 'prop-types'
import tag from 'clean-tag'
import { withTheme } from 'styled-components'
import styled from './../styled'
import { buttonPropTypes } from './Button'

const ButtonBase = styled(tag.button, ({theme, ...props}) => ({
    ...{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Removes the grey highlight.
        WebkitTapHighlightColor: 'transparent',
        backgroundColor: 'transparent',
        // Disable the focus ring for mouse, touch and keyboard users.
        outline: 'none',
        border: 0,
        // Remove the margin in Safari.
        margin: 0,
        // Remove the padding in Firefox.
        padding: 0,
        borderRadius: 0,
        cursor: 'pointer',
        userSelect: 'none',
        verticalAlign: 'middle',
        // Reset
        '-moz-appearance': 'none',
        '-webkit-appearance': 'none',
        textDecoration: 'none',
        // So we take precedent over the style of a native <a /> element.
        color: 'inherit',
        ':disabled': {
            // Disable the link interactions.
            pointerEvents: 'none',
            cursor: 'default'
        }
    }
}))

ButtonBase.displayName = 'ButtonBase'
ButtonBase.propTypes = {
    ...buttonPropTypes,
    ...{
        focusRipple: PropTypes.bool,
        type: PropTypes.string
    }
}

export default ButtonBase