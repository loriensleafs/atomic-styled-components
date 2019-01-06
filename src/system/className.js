import { Client } from 'styletron-engine-atomic';
import { isObj } from './../utils/helpers';

const engine = window.styletronClient || new Client();

function className() {
	let classes = [];

	for (let i = 0; i < arguments.length; i++) {
		const arg = arguments[i];
		if (!arg) continue;

		const argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (isObj(arg)) {
			classes.push(engine.renderStyle(arg));
		}
	}

	return classes.join('');
}

export { engine };

export default className;
