import toCubicBezierFn from 'bezier-easing';
import { capitalize, formatMs, isString, toArray } from './../utils/helpers';

/**
 * Easing options.
 * The rate at which an animation changes. https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
 * @property {array} inOut The most common easing curve.
 * @property {array} in Element enters screen at peak velocity and ends at rest.
 * @property {array} out Exiting element starts at rest and exits the screen
 * at peak velocity.
 * @property {array} sharp Elements that have temporarily let the screen
 * but can return at any time.
 */
export let easing = {
	inOut: [0.4, 0, 0.2, 1],
	in: [0.4, 0, 1, 1],
	out: [0.0, 0, 0.2, 1],
	sharp: [0.4, 0, 0.6, 1],
};

/**
 * Duration options.
 * The length of time it takes to transition from one state to another.
 *https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
 * @property {number} [shortest=150]
 * @property {number} [shorter=200]
 * @property {number} [short=250] Most basic recommended timing.
 * @property {number} [standard=300] For complex animations.
 * @property {number} [complex=375] For elements entering the screen.
 * @property {number} [entering=225] For elements leaving the screen.
 * @property {number} [leaving=195]
 */
export let duration = {
	shortest: 150,
	shorter: 200,
	short: 250,
	standard: 300,
	complex: 375,
	entering: 225,
	leaving: 195,
};

/**
 * Motion properties that are added to the theme object.
 * @export
 * @param {Object} overrides
 * @param {object} overrides.duration
 * @param {object} overrides.easing
 * @returns {object}
 */
export default function(overrides) {
	const { inOut, in: easeIn, out: easeOut, sharp } = {
		...easing,
		...overrides.easing,
	};
	easing = {
		inOut: `cubic-bezier(${inOut.join()})`,
		in: `cubic-bezier(${easeIn.join()})`,
		out: `cubic-bezier(${easeOut.join()})`,
		sharp: `cubic-bezier(${sharp.join()})`,
		getInOut: toCubicBezierFn(inOut[0], inOut[1], inOut[2], inOut[3]),
		getOut: toCubicBezierFn(easeOut[0], easeOut[1], easeOut[2], easeOut[3]),
		getIn: toCubicBezierFn(easeIn[0], easeIn[1], easeIn[2], easeIn[3]),
		getSharp: toCubicBezierFn(sharp[0], sharp[1], sharp[2], sharp[3]),
	};
	duration = { ...duration, ...overrides.duration };

	return {
		easing,
		duration,
		transition: (
			props = ['all'],
			dur = 'standard',
			ease = 'inOut',
			delay = 0,
		) =>
			toArray(props)
				.map(
					prop =>
						`${prop} ${
							isString(dur)
								? duration[dur]
									? `${duration[dur]}ms`
									: dur
								: formatMs(dur)
						} ${easing[ease]} ${
							isString(delay) ? delay : formatMs(delay)
						}`,
				)
				.join(', '),
		getEasingFn: type => easing[`get${capitalize(type)}`],
	};
}
