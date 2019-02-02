import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import usePrevious from './../hooks/usePrevious';
import ownerDocument from './../utils/ownerDocument';
import { isFn } from './../utils/helpers';

function flipPlacement(placement) {
	switch (placement) {
		case 'bottom-end':
			return 'bottom-start';
		case 'bottom-start':
			return 'bottom-end';
		case 'top-end':
			return 'top-start';
		case 'top-start':
			return 'top-end';
		default:
			return placement;
	}
}

function getAnchor(anchor) {
	return typeof anchor === 'function' ? anchor() : anchor;
}

function getContainer(container) {
	container = isFn(container)
		? container()
		: container && container.current
		? container.current
		: container;
	return container || ownerDocument().body;
}

function getHasTransition({ children }) {
	if (children) {
		return React.Children.toArray(children).some(
			child => isValidElement(child) && child.props.show !== undefined,
		);
	}
	return false;
}

function Popper(props) {
	const {
		anchor,
		children,
		container,
		disablePortal,
		isOpen,
		keepMounted,
		modifiers,
		placement: placementProps,
		popperOptions,
		...passThru
	} = props;
	const prevAnchor = usePrevious(anchor);
	const prevDisablePortal = usePrevious(disablePortal);
	const prevModifiers = usePrevious(modifiers);
	const prevIsOpen = usePrevious(isOpen);
	const prevPlacement = usePrevious(placementProps);
	const prevPopperOptions = usePrevious(popperOptions);
	const [placement, setPlacement] = useState(flipPlacement(placementProps));
	const [hasExcited, setHasExcited] = useState(!isOpen);
	const isExiting = useRef(false);
	const containerRef = useRef(getContainer(container));
	const popperRef = useRef(null);
	const anchorRef = useRef(getAnchor(anchor));
	const popper = useRef(null);
	const hasTransition = getHasTransition(props);

	const handlePopperUpdate = useCallback(
		data => {
			if (data.placement !== placement) {
				setPlacement(() => data.placement);
			}
		},
		[placement],
	);

	const handleClose = useCallback(() => {
		if (popper.current) {
			popper.current.destroy();
			popper.current = null;
		}
	}, []);

	const handleOpen = useCallback(() => {
		if (!containerRef.current || !anchorRef.current || !isOpen) {
			return;
		}

		handleClose();
		popper.current = new PopperJS(anchorRef.current, containerRef.current, {
			placement,
			...popperOptions,
			modifiers: {
				...disablePortal(
					disablePortal
						? {}
						: {
								// It's using scrollParent by default, we can use the
								// viewport when using a portal.
								preventOverflow: {
									boundariesElement: 'window',
								},
						  },
				),
				...modifiers,
				...popperOptions.modifiers,
			},
			// We could have been using a custom modifier like react-popper is
			// doing. But it seems this is the best public API for this use
			// case.
			onCreate: handlePopperUpdate,
			onUpdate: handlePopperUpdate,
		});
	}, []);

	useEffect(() => {
		if (prevIsOpen !== isOpen && !isOpen && !hasTransition) {
			handleClose();
		}

		if (
			prevAnchor !== anchor ||
			prevDisablePortal !== disablePortal ||
			prevIsOpen !== isOpen ||
			prevModifiers !== modifiers ||
			prevPlacement !== placement ||
			prevPopperOptions !== popperOptions
		) {
			handleOpen();
		}
		return () => handleClose();
	}, [anchor, disablePortal, modifiers, isOpen, placement, popperOptions]);

	if (!keepMounted && !isOpen && (!hasTransition || hasExcited)) {
		return null;
	}

	const childProps = {
		placement: placement || flipPlacement(placementProps),
	};

	if (hasTransition) {
		childProps.show = isOpen;
		childProps.onExited = () => {
			if (!isOpen && isExiting.current) {
				isExiting.current = false;
				setHasExcited(() => true);
			}
		};
	}

	const Popper = (
		<div
			ref={popperRef}
			role="tooltip"
			style={{
				// Prevents scroll issue, waiting for Popper.js to add this
				// style once initiated.
				position: 'absolute',
			}}
			{...passThru}
		>
			{isFn(children) ? children(childProps) : children}
		</div>
	);

	if (disablePortal) {
		return Popper;
	}

	return createPortal(Popper, containerRef.current);
}

Popper.displayName = 'Popper';

Popper.propTypes = {
	/**
	 * This is the DOM element, or a function that returns the DOM element,
	 * that may be used to set the position of the popover.
	 * The return value will passed as the reference object of the Popper
	 * instance.
	 */
	anchor: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	// Popper render function or node.
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	/**
	 * A node, component instance, or function that returns either.
	 * The `container` will passed to the Modal component.
	 * By default, it uses the body of the anchorEl's top-level document object,
	 * so it's simply `document.body` most of the time.
	 */
	container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	/**
	 * Disable the portal behavior.
	 * The children stay within it's parent DOM hierarchy.
	 */
	disablePortal: PropTypes.bool,
	/**
	 * Always keep the children in the DOM.
	 * This property can be useful in SEO situation or
	 * when you want to maximize the responsiveness of the Popper.
	 */
	keepMounted: PropTypes.bool,
	/**
	 * Popper.js is based on a "plugin-like" architecture,
	 * most of its features are fully encapsulated "modifiers".
	 *
	 * A modifier is a function that is called each time Popper.js needs to
	 * compute the position of the popper.
	 * For this reason, modifiers should be very performant to avoid
	 * bottlenecks.
	 * To learn how to create a modifier, [read the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
	 */
	modifiers: PropTypes.object,
	// If `true`, the popper is visible.
	isOpen: PropTypes.bool.isRequired,
	// Popper placement.
	placement: PropTypes.oneOf([
		'bottom-end',
		'bottom-start',
		'bottom',
		'left-end',
		'left-start',
		'left',
		'right-end',
		'right-start',
		'right',
		'top-end',
		'top-start',
		'top',
	]),
	/**
	 * Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance.
	 */
	popperOptions: PropTypes.object,
};

Popper.defaultProps = {
	disablePortal: false,
	placement: 'bottom',
	transition: false,
};

export default Popper;
