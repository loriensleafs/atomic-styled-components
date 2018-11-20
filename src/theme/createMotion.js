import warning from 'warning';
import { formatMs, isString, arr } from './../utils/helpers';

/**
 * Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
 * to learn the context in which each easing should be used.
 */
export let easing = {
	// Most common easing curve.
	inOut: [0.4, 0, 0.2, 1],
	// Enter at full velocity from off-screen and slowly decelerate.
	out: [0.0, 0, 0.2, 1],
	// Leaves screen at full velocity w/ no deceleration.
	in: [0.4, 0, 1, 1],
	// For objects that may return to the screen at any time.
	sharp: [0.4, 0, 0.6, 1],
};

/**
 * Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
 * to learn when use what timing
 */
export let duration = {
	shortest: 150,
	shorter: 200,
	short: 250,
	// Most basic recommended timing
	standard: 300,
	// For complex animations
	complex: 375,
	// For elements entering the screen
	entering: 225,
	// For elements leaving the screen
	leaving: 195,
};

export let transition;

export let getAutoHeightDuration;

export default overrides => {
	duration = { ...duration, ...overrides.duration };
	easing = { ...easing, ...overrides.easing };
	getAutoHeightDuration = height => {
		if (!height) return 0;
		const constant = height / 36;
		// https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
		return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
	};
	transition = (props = ['all'], options = {}) => {
		const {
			duration: durationProp = duration.standard,
			easing: easingProp = easing.inOut,
			delay = 0,
			...other
		} = options;

		return arr(props)
			.map(
				prop =>
					`${prop} ${
						isString(durationProp) ? durationProp : formatMs(durationProp)
					} cubic-bezier(${easingProp.join()}) ${
						isString(delay) ? delay : formatMs(delay)
					}`,
			)
			.join(',');
	};

	return {
		easing,
		duration,
		transition,
		getAutoHeightDuration,
	};
};
