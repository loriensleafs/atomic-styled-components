// color palette
const black = '#000'
const white = '#fff'
const lightBlue = '#cdf'
const blue = '#007aff' // primary
const darkBlue = '#049'
const lightGreen = '#cec'
const green = '#0a0' // secondary
const darkGreen = '#060'
const lightRed = '#fcc'
const red = '#c00' // secondary
const darkRed = '#800'
const lightOrange = '#feb'
const orange = '#fa0' // secondary
const darkOrange = '#a50'
const lightPurple = '#ecf'
const purple = '#70b' // secondary
const darkPurple = '#407'

// Primary color palette
const primary = '#61ac47'
const lightPrimary = '#7ece62'
const darkPrimary = '#508a3c'
// Secondary color palette
const secondary = '#ed7653'
const lightSecondary = '#F07051'
const darkSecondary = 'C85C44'
// Error color palette
const error = '#f44336'
const lightError = '#e57373'
const darkError = '#d32f2f'
// Gray color palette
const gray = '#bdbdbd'
const lightGray = '#eeeeee'
const darkGray = '#757575'
// Text color palette
const text = 'rgba(0,0,0,0.8)'
const contrastText = 'rgba(255,255,255,0.7)'
const secondaryText = 'rgba(0,0,0,0.6)'
const secondaryContrastText = 'rgba(255,255,255,0.5)'
const lightText = 'rgba(0,0,0,0.4)'
const lightContrastText = 'rgba(255,255,255,0.38)'
const darkText = 'rgba(0,0,0,1)'
const darkContrastText = 'rgba(255,255,255,1)'
// Divider color palette
const divider = 'rgba(0,0,0,0.075)'
const contrastDivider = 'rgba(255,255,255,0.09)'
const lightDivider = 'rgba(0,0,0,0.045)'
const lightContrastDivider = 'rgba(255,255,255,0.075)'
const darkDivider = 'rgba(0,0,0,0.1)'
const darkContrastDivider = 'rgba(255,255,255,0.1)'
// Background color palette
const bg = '#edf0f2'
const contrastBg = '#303030'
const paperBg = white
const paperContrastBg = '#616161'
const appbarBg = white
const appbarContrastBg = '#166EA3'
const headerBg = white
const headerContrastBg = '#166EA3'
const tabBg = white
const tabContrastBg = '#C85C44'
const chipBg = '#E0E0E0'
const chipContrastBg = '#757575'
// Actions color palette
const activeAction = 'rgba(0,0,0,0.45)'
const activeContrastAction = 'rgba(255,255,255,1)'
const hoverAction = 'rgba(0,0,0,0.12)'
const hoverContrastAction = 'rgba(255,255,255,0.12)'
const selectedAction = 'rgba(0,0,0,0.3)'
const selectedContrastAction = 'rgba(255,255,255,0.3)'
const disabledAction = 'rgba(0,0,0,0.12)'
const disabledContrastAction = 'rgba(255,255,255,0.3)'

// tints
const flatten = (name, colors) =>
    colors.reduce((a, b, i) => {
        const color = {
            [name + i]: {
                enumerable: true,
                get() {
                    console.warn(
                        `Priceline Design System Warning: Using numbered colors like ${[
                            name + i
                        ]} will be deprecated in the next theme. Use light${name
                            .charAt(0)
                            .toUpperCase() + name.slice(1)}, ${name} or dark${name
                                .charAt(0)
                                .toUpperCase() + name.slice(1)} instead.`
                    )
                    return b
                }
            }
        }
        return { ...a, ...color }
    }, {})

const bluePalette = [lightBlue, lightBlue, blue, blue]
const greenPalette = [lightGreen, lightGreen, green, green]
const redPalette = [lightRed, lightRed, red, red]
const orangePalette = [lightOrange, lightOrange, orange, orange]
const purplePalette = [lightPurple, lightPurple, purple, purple]
const primaryPalette = [primary, lightPrimary, darkPrimary]
const secondaryPalette = [secondary, lightSecondary, darkSecondary]
const grayPalette = [gray, lightGray, darkGray]
const errorPalette = [error, lightError, darkError]
const textPalette = [text, contrastText, secondaryText, secondaryContrastText, lightText, lightContrastText, darkText, darkContrastText]
const dividerPalette = [ divider, contrastDivider, lightDivider, lightContrastDivider, darkDivider, darkContrastDivider]
const bgPalette = [bg, contrastBg, paperBg, paperContrastBg, appbarBg, appbarContrastBg, headerBg, headerContrastBg, tabBg, tabContrastBg, chipBg, chipContrastBg]
const actionPalette = [activeAction, activeContrastAction, hoverAction, hoverContrastAction, selectedAction, selectedContrastAction, disabledAction, disabledContrastAction]

const colors = {
    black,
    white,
    text,
    blue,
    lightBlue,
    darkBlue,
    green,
    lightGreen,
    darkGreen,
    red,
    lightRed,
    darkRed,
    orange,
    lightOrange,
    darkOrange,
    purple,
    lightPurple,
    darkPurple,
    primary, 
    lightPrimary, 
    darkPrimary,
    secondary, 
    lightSecondary, 
    darkSecondary,
    gray, 
    lightGray, 
    darkGray,
    error, 
    lightError, 
    darkError,
    text, 
    contrastText, 
    secondaryText, 
    secondaryContrastText, 
    lightText, 
    lightContrastText, 
    darkText, 
    darkContrastText,
    divider, 
    contrastDivider, 
    lightDivider, 
    lightContrastDivider, 
    darkDivider, 
    darkContrastDivider,
    bg, 
    contrastBg, 
    paperBg, 
    paperContrastBg, 
    appbarBg, 
    appbarContrastBg, 
    headerBg, 
    headerContrastBg, 
    tabBg, 
    tabContrastBg, 
    chipBg, 
    chipContrastBg,
    activeAction, 
    activeContrastAction, 
    hoverAction, 
    hoverContrastAction, 
    selectedAction, 
    selectedContrastAction, 
    disabledAction, 
    disabledContrastAction,
    bluePalette,
    greenPalette,
    redPalette,
    orangePalette,
    purplePalette,
    primaryPalette,
    secondaryPalette,
    grayPalette,
    errorPalette,
    textPalette,
    dividerPalette,
    bgPalette,
    actionPalette
}

Object.defineProperties(colors, {
    ...flatten('blue', bluePalette),
    ...flatten('gray', grayPalette),
    ...flatten('green', greenPalette),
    ...flatten('red', redPalette),
    ...flatten('orange', orangePalette),
    ...flatten('purple', purplePalette),
    ...flatten('primary', primaryPalette),
    ...flatten('secondary', secondaryPalette),
    ...flatten('error', errorPalette),
    ...flatten('text', textPalette),
    ...flatten('divider', dividerPalette),
    ...flatten('bg', bgPalette),
    ...flatten('action', actionPalette)
})

export default colors