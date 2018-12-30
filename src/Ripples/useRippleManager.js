import { useCallback, useReducer } from 'react';
import nanoid from 'nanoid';

/**
 * Get the size and position properties for a ripple DOM node.
 * @param {boolean} [center=false]
 * @param {boolean} [pulsate=false]
 * @param {object} [rect={top:0,left:0,width:0,height:0}]
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @returns {object}
 */
function getRect(
	center = false,
	pulsate = false,
	rect = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	},
	x = 0,
	y = 0,
) {
	const { width = 0, height = 0, left = 0, top = 0 } = rect;
	const centered = pulsate || center;
	let rippleX;
	let rippleY;
	let rippleSize;

	if (centered || (x === 0 && y === 0)) {
		rippleX = Math.round(width / 2);
		rippleY = Math.round(height / 2);
	} else {
		rippleX = Math.round(x - left);
		rippleY = Math.round(y - top);
	}

	if (centered) {
		rippleSize = Math.sqrt((2 * width ** 2 + height ** 2) / 3);
		if (rippleSize % 2 === 0) rippleSize += 1;
	} else {
		const sizeX = Math.max(Math.abs(width - rippleX), rippleX) * 2 + 2;
		const sizeY = Math.max(Math.abs(height - rippleY), rippleY) * 2 + 2;
		rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
	}

	return {
		id: nanoid(),
		top: -(rippleSize / 2) + rippleY + 'px',
		left: -(rippleSize / 2) + rippleX + 'px',
		width: rippleSize + 'px',
		height: rippleSize + 'px',
		in: pulsate,
		pulsate,
	};
}

function ripplesReducer(
	ripples = [],
	{ type, id, center, pulsate, rect, x, y },
) {
	switch (type) {
		case 'start':
			return [...ripples, getRect(center, pulsate, rect, x, y)];

		case 'end':
			return ripples.filter(r => (r.id !== id ? id : ripples[0].id));

		default:
			return ripples;
	}
}

/**
 * Manages a pool of ripples to be rendered by a Component.
 * @param {Object} ref The ref for the parent/container element.
 * @param {Element} ref.current The current parent/container element.
 * @returns {array}
 * @public
 */
export default function useRippleManager(ref) {
	const [ripples, dispatch] = useReducer(ripplesReducer, []);

	/**
	 * Create an event handle to start/end a ripple lifecycle.
	 * @param {Object} props
	 * @param {string} props.type Lifecycle type.
	 * @param {boolean} [props.center] Whether or not the ripple is centered.
	 * @param {boolean} [props.pulsate] Whether or not the ripple pulsates.
	 * @param {function} [cb] Callback.
	 * @returns {function} The event handler.
	 * @public
	 */
	const eventHandler = useCallback(
		(props, cb) => event => {
			if (cb) cb(event);
			if (event.defaultPrevented) return;
			const { type, center, pulsate, id } = props;

			if (type === 'start') {
				dispatch({
					center,
					pulsate,
					rect: event.currentTarget.getBoundingClientRect(),
					type,
					x:
						event && event.clientX
							? event.clientX
							: event && event.touches
							? event.touches[0].clientX
							: 0,
					y:
						event && event.clientY
							? event.clientY
							: event && event.touches
							? event.touches[0].clientY
							: 0,
				});
			} else if (type === 'end') {
				dispatch({
					id,
					type,
				});
			}
		},
		[],
	);

	/**
	 * Start a new ripple.
	 * @param {Object} props
	 * @param {boolean} [props.center] Whether or not the ripple is centered.
	 * @param {boolean} [props.pulsate] Whether or not the ripple pulsates.
	 * @param {object} [props.rect] The size of the ripple.
	 * @param {number} [props.x] The coordinate of the horizontal center point.
	 * @param {number} [props.y] The coordinate of the vertical center point.
	 * @public
	 */
	const start = useCallback(props => {
		const { center, pulsate, rect, x, y } = props;

		dispatch({
			type: 'start',
			center,
			pulsate,
			rect: rect
				? rect
				: ref && ref.current && ref.current.getBoundingClientRect(),
			x,
			y,
		});
	}, []);

	/**
	 * End a ripple.
	 * By default ends the first ripple (oldest) in ripples array.
	 * @param {string} [id] A specific ripple to end.
	 * @public
	 */
	const end = useCallback(id => dispatch({ type: 'end', id }), []);

	return [ripples, eventHandler, start, end];
}
