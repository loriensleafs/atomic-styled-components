export const font = `'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif`

export const fontSizes = ['0.75rem','0.875rem','1rem','1.125rem','1.5rem','1.75rem','2.125rem','2.8125rem','3.5rem','5rem']

export const lineHeights = ['1.125rem','1.25rem','1.5rem','1.75rem','2rem','2.125rem','3rem','4.5rem','5.5rem','6.5rem']

export const regular = 400
export const bold = 600

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 600
}

export const letterSpacings = {
    normal: 'normal',
    caps: '0.025em'
}

export default {
    font,
    fontSizes,
    lineHeights,
    fontWeights,
    letterSpacings
}