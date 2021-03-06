import { useCallback, useRef } from 'react';

/**
 * The id of the next ripple that is created.
 */
let key = 0;

/**
 * Get the size and position properties for a ripple DOM node.
 * @param {boolean} [center=false]
 * @param {boolean} [pulsate=false]
 * @param {object} [rect={top:0,left:0,width:0,height:0}]
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @returns {object}
 */
function getRect(props) {
	const {
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
	} = props;
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
		if (rippleSize % 2 === 0) {
			rippleSize += 1;
		}
	} else {
		const sizeX = Math.max(Math.abs(width - rippleX), rippleX) * 2 + 2;
		const sizeY = Math.max(Math.abs(height - rippleY), rippleY) * 2 + 2;
		rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
	}

	return {
		key: key++,
		top: -(rippleSize / 2) + rippleY + 'px',
		left: -(rippleSize / 2) + rippleX + 'px',
		width: rippleSize + 'px',
		height: rippleSize + 'px',
		in: pulsate,
		pulsate,
	};
}

/**
 * Manages a pool of ripples to be rendered by a Component.
 * @param {Object} ref The ref for the parent/container element.
 * @param {Element} ref.current The current parent/container element.
 * @returns {array}
 * @public
 */
export default function useRipples(ref) {
	/**
	 * Action used to update the ripples state.
	 */
	const updateRipple = useRef(null);

	/**
	 * Creates the updateRipple action.  Adds or removes a ripple.
	 * @param {Object} action Payload describing how the state should update.
	 * @param {String} action.type The type of update. Can be 'add' or 'remove'.
	 * @param {Object} action.ripple Describes size and location of the ripple.
	 */
	const actionCreator = useCallback(
		action => (updateRipple.current = action),
		[updateRipple.current],
	);

	/**
	 * Create a new ripple.
	 * @param {Object} props
	 * @param {boolean} [props.center] Whether or not the ripple is centered.
	 * @param {boolean} [props.pulsate] Whether or not the ripple pulsates.
	 * @param {object} [props.rect] The size of the ripple.
	 * @param {number} [props.x] The coordinate of the horizontal center point.
	 * @param {number} [props.y] The coordinate of the vertical center point.
	 * @public
	 */
	const add = useCallback(
		({ center, pulsate, rect, x, y }) =>
			updateRipple.current({
				type: 'add',
				ripple: getRect({
					center,
					pulsate,
					rect: rect
						? rect
						: ref &&
						  ref.current &&
						  ref.current.getBoundingClientRect().toJSON(),
					x,
					y,
				}),
			}),
		[updateRipple],
	);

	/**
	 * Create an event handle to start or end a ripple's lifecycle.
	 * @param {Object} props
	 * @param {string} props.type Lifecycle type.
	 * @param {boolean} [props.center] Whether or not the ripple is centered.
	 * @param {boolean} [props.pulsate] Whether or not the ripple pulsates.
	 * @param {function} [cb] Callback.
	 * @returns {function} The event handler.
	 * @public
	 */
	const createHandler = useCallback(
		(props, cb) => event => {
			const { type, center, pulsate } = props;

			if (cb) {
				cb(event);
			}

			if (event.defaultPrevented || !updateRipple.current) {
				return;
			}

			if (type === 'start') {
				updateRipple.current({
					type: 'add',
					ripple: getRect({
						center,
						pulsate,
						rect: event.currentTarget
							.getBoundingClientRect()
							.toJSON(),
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
					}),
				});
			} else if (type === 'end') {
				updateRipple.current({ type: 'remove' });
			}
		},
		[updateRipple],
	);

	/**
	 * Remove a ripple.
	 */
	const remove = useCallback(() => updateRipple.current({ type: 'remove' }), [
		updateRipple,
	]);

	return {
		add,
		createHandler,
		props: { children: actionCreator },
		remove,
	};
}
