import toCubicBezierFn from 'bezier-easing';
import { capitalize, isStr, toArr, toMs } from './../utils/helpers';

const TRANSITION_OPTIONS = {
	duration: 'standard',
	easing: 'inOut',
	delay: 0,
};

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
export let easings = {
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
export let durations = {
	shortest: 150,
	shorter: 200,
	short: 250,
	standard: 300,
	complex: 375,
	entering: 225,
	leaving: 195,
};

const getDuration = duration =>
	isStr(duration) && durations[duration]
		? toMs(durations[duration])
		: toMs(duration);

const getDelay = delay => (isStr(delay) ? delay : toMs(delay));

/**
 * Motion properties that are added to the theme object.
 * @param {Object} overrides
 * @param {object} overrides.duration
 * @param {object} overrides.easing
 * @return {[type]}
 */
function createMotion(overrides) {
	const { inOut, in: easeIn, out: easeOut, sharp } = {
		...easings,
		...overrides.easings,
	};

	return {
		easings: {
			inOut: `cubic-bezier(${inOut.toString()})`,
			in: `cubic-bezier(${easeIn.toString()})`,
			out: `cubic-bezier(${easeOut.toString()})`,
			sharp: `cubic-bezier(${sharp.toString()})`,
			getInOut: toCubicBezierFn(inOut[0], inOut[1], inOut[2], inOut[3]),
			getOut: toCubicBezierFn(
				easeOut[0],
				easeOut[1],
				easeOut[2],
				easeOut[3],
			),
			getIn: toCubicBezierFn(easeIn[0], easeIn[1], easeIn[2], easeIn[3]),
			getSharp: toCubicBezierFn(sharp[0], sharp[1], sharp[2], sharp[3]),
		},
		durations: { ...durations, ...overrides.durations },
		getTransition: (props = ['all'], options) => {
			const { duration, easing, delay } = {
				...TRANSITION_OPTIONS,
				...options,
			};

			return toArr(props)
				.map(
					prop =>
						`${prop} ${getDuration(duration)} cubic-bezier(${
							easings[easing]
						}) ${getDelay(delay)}`,
				)
				.join(', ');
		},
		getEasing: type => easings[`get${capitalize(type)}`],
	};
}

export default createMotion;
