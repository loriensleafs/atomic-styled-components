// animation duration
export const duration = {
    fast: `150ms`,
    normal: `300ms`,
    slow: `450ms`,
    slowest: `600ms`
}

// animation easing curves
const easeInOut = 'cubic-bezier(0.5, 0, 0.25, 1)'
const easeOut = 'cubic-bezier(0, 0, 0.25, 1)'
const easeIn = 'cubic-bezier(0.5, 0, 1, 1)'

const timingFunctions = {
    easeInOut,
    easeOut,
    easeIn
}

// animation delay
const transitionDelays = {
    small: `60ms`,
    medium: `160ms`,
    large: `260ms`,
    xLarge: `360ms`
}

export default {
    duration,
    timingFunctions,
    transitionDelays
}