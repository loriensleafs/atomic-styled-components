import { Client } from 'styletron-engine-atomic';
import { isObj, isStr } from './../utils/helpers';

const engine = window.styletronClient || new Client();

function className(...args) {
	if (args.length < 1) return;

	return args
		.reduce((acc, arg) => {
			if (isStr(arg)) {
				return [...acc, arg];
			} else if (isObj(arg)) {
				return [...acc, ...engine.renderStyle(arg).split(' ')];
			} else {
				return acc;
			}
		}, [])
		.join(' ');
}

export { engine };

export default className;
