import React, { createPortal, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import ownerDocument from '../utils/ownerDocument';
import { useDidMount } from '../hooks';

const Portal = forwardRef((props, ref) => {
	ref = ref ? ref : useRef(null);
	const { children, disablePortal } = props;

	useDidMount(() => {
		if (disablePortal && ref && ref.current) {
			ref.current = ref.current.parentElement;
		} else if ((!disablePortal && !ref) || !ref.current) {
			ref.current = ownerDocument().body;
		}
	});

	if (disablePortal) return children;

	return ref.current ? createPortal(children, ref.current) : null;
});

export default Portal;
