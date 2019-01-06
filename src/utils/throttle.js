function throttle(cb, wait) {
	let af;
	let timer;

	const update = args => () => {
		if (cb) {
			if (wait) {
				clearTimeout(timer);
				timer = setTimeout(() => {
					cb(args);
					af = null;
				}, wait);
			} else {
				cb(args);
				af = null;
			}
		}
	};

	const throttled = (...args) => {
		if (af === null || af === undefined) {
			af = requestAnimationFrame(update(args));
		}
	};

	throttled.cancel = () => {
		if (wait) clearTimeout(timer);
		cancelAnimationFrame(af);
		af = null;
	};

	return throttled;
}

export default throttle;
