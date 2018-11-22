import { useState } from 'react';
import merge from './../utils/pureRecursiveMerge';
import { isFunc, isNil } from './../utils/helpers';

function getRippleRect(ref, pulsate = false, center = false, { clientX, clientY, touches }) {
	const centered = center || (clientX === 0 && clientY === 0) || (!clientX && !touches);
	const touch = isNil(touches);
	const rect = ref ? ref.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
	const x = clientX ? clientX : touches ? touches[0].x : null;
	const y = clientX ? clientY : touches ? touches[0].y : null;
	let rippleX;
	let rippleY;
	let rippleSize;

	if (centered || (x === 0 && y === 0) || (!x && !touch)) {
		rippleX = Math.round(rect.width / 2);
		rippleY = Math.round(rect.height / 2);
	} else {
		rippleX = Math.round(x - rect.left);
		rippleY = Math.round(y - rect.top);
	}

	if (centered) {
		rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
		if (rippleSize % 2 === 0) rippleSize += 1;
	} else {
		const sizeX = Math.max(Math.abs((ref ? ref.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
		const sizeY = Math.max(Math.abs((ref ? ref.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
		rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
	}

	return {
		pulsate,
		pulsateIn: pulsate,
		height: rippleSize + 'px',
		width: rippleSize + 'px',
		top: -(rippleSize / 2) + rippleY + 'px',
		left: -(rippleSize / 2) + rippleX + 'px',
	};
}

function useRipples() {
	const [ripples, setRipples] = useState([]);

	const rippleStartHandler = (ref, pulsate, center, cb) => (event = {}) => {
		if (cb) cb(event);
		if (event.defaultPrevented) return;

		const ripple = {
			...getRippleRect(ref ? ref : event.currentTarget, pulsate, center, event),
			...{ key: ripples.length === 0 ? 1 : ripples.length },
		};

		setRipples(() => [...ripples, ripple]);
	};

	const rippleEndHandler = cb => event => {
		if (cb) cb(event);
		if (event.defaultPrevented) return;

		if (event.type !== 'mouseleave') {
			setRipples(() => ripples.slice(1));
		}
	};

	return [ripples, rippleStartHandler, rippleEndHandler];
}

export default useRipples;
