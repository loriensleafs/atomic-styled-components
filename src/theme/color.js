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
const activeAction = 'rgba(0, 0, 0, 0.45)'
const activeContrastAction = 'rgba(255, 255, 255, 1)'
const hoverAction = 'rgba(0, 0, 0, 0.08)'
const hoverContrastAction = 'rgba(255, 255, 255, 0.08)'
const selectedAction = 'rgba(0,0,0,0.14)'
const selectedContrastAction = 'rgba(255, 255, 255, 0.14)'
const disabledAction = 'rgba(0,0,0,0.26)'
const disabledContrastAction = 'rgba(255, 255, 255, 0.3)'
const disabledBgAction = 'rgba(0, 0, 0, 0.12)'
const disabledBgContrastAction = 'rgba(255, 255, 255, 0.12)'

// tints
const flatten = (name, colors) => Object.values(colors)
    .filter((a, b, i) => typeof(a) === 'string')
    .reduce((a, b, i) => {
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

const bluePalette = {
    light: lightBlue, 
    primary: blue
}
const greenPalette = {
    light: lightGreen, 
    primary: green
}
const redPalette = {
    light: lightRed, 
    primary: red
}
const orangePalette = {
    light: lightOrange, 
    primary: orange
}
const purplePalette = {
    light: lightPurple, 
    primary: purple
}
const primaryPalette = {
    main: primary, 
    light: lightPrimary, 
    dark: darkPrimary,
    contrast: white
}
const secondaryPalette = {
    main: secondary, 
    light: lightSecondary, 
    dark: darkSecondary,
    contrast: white
}
const grayPalette = {
    main: gray, 
    light: lightGray, 
    dark: darkGray
}
const errorPalette = {
    main: error, 
    light: lightError, 
    dark: darkError,
    contrast: white
}
const textPalette = {
    primary: text, 
    secondary: secondaryText, 
    light: lightText, 
    dark: darkText, 
    contrast: {
        primary: contrastText, 
        secondary: secondaryContrastText, 
        light: lightContrastText, 
        dark: darkContrastText,
    }
}
const dividerPalette = { 
    default: divider, 
    light: lightDivider, 
    dark: darkDivider, 
    contrast: {
        default: contrastDivider,
        light: lightContrastDivider,
        dark: darkContrastDivider
    }
}
const bgPalette = {
    default: bg, 
    paper: paperBg, 
    appbar: appbarBg, 
    header: headerBg, 
    tab: tabBg, 
    chip: chipBg, 
    contrast: {
        default: contrastBg, 
        paper: paperContrastBg, 
        appbar: appbarContrastBg, 
        header: headerContrastBg, 
        tab: tabContrastBg, 
        chip: chipContrastBg,
    }
}
const actionPalette = {
    active: activeAction, 
    hover: hoverAction, 
    selected: selectedAction, 
    disabled: disabledAction, 
    disabledBg: disabledBgAction,
    contrast: {
        active: activeContrastAction,
        hover: hoverContrastAction,
        selected: selectedContrastAction,
        disabled: disabledContrastAction,
        disabledBg: disabledBgContrastAction
    }
}

const colors = {
    type: 'light',
    black,
    white,
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
    bluePalette,
    greenPalette,
    redPalette,
    orangePalette,
    purplePalette,
    primary: primaryPalette,
    secondary: secondaryPalette,
    gray: grayPalette,
    error: errorPalette,
    text: textPalette,
    divider: dividerPalette,
    bg: bgPalette,
    action: {
        ...actionPalette,
        ...{
            hoverOpacity: 0.08
        }
    }
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
    ...flatten('action', actionPalette),
    ...flatten('textContrast', textPalette.contrast),
    ...flatten('dividerContrast', dividerPalette.contrast),
    ...flatten('bgContrast', bgPalette.contrast),
    ...flatten('actionContrast', actionPalette.contrast)
})

export default colors