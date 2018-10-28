import engine from './engine';
import { isObject } from './../utils/helpers';

export default function() {
	let classes = [];

	for (let i = 0; i < arguments.length; i++) {
		const arg = arguments[i];
		if (!arg) continue;

		const argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (isObject(arg)) {
			classes.push(engine.renderStyle(arg));
		}
	}

	return classes.join('');
}
