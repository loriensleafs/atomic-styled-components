import engine from './engine';

export default function() {
	let classes = [];

	for (let i = 0; i < arguments.length; i++) {
		const arg = arguments[i];
		if (!arg) continue;

		const argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (argType === 'object' && !Array.isArray(arg)) {
			classes.push(engine.renderStyle(arg));
		}
	}

	return classes.join('');
}
