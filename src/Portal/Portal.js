import React, {
	cloneElement,
	useCallback,
	forwardRef,
	useEffect,
	useMemo,
	useState,
	useRef,
} from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ownerDocument from './../utils/ownerDocument';
import { isFunc } from './../utils/helpers';

function getContainer(container, defaultContainer) {
	container = isFunc(container) ? container() : container;
	return findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
	return ownerDocument(findDOMNode(element));
}

function Portal(props) {
	const getMountNode = () => {
		if (props.disablePortal) {
			return findDOMNode(mountNode).parentElement;
		}
		const node = getContainer(props.container, getOwnerDocument().body);
		if (props.ref && isFunc(props.ref)) props.ref(node);
		return node;
	};
	let mountNode = getMountNode();

	useEffect(() => (mountNode = getMountNode()[props]));

	if (props.disablePortal) return props.children;
	return mountNode ? createPortal(props.children, mountNode) : null;
}

Portal.propTypes = {
	/**
	 * The children to render into the `container`.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * A node, component instance, or function that returns either.
	 * The `container` will have the portal children appended to it.
	 * By default, it uses the body of the top-level document object,
	 * so it's simply `document.body` most of the time.
	 */
	container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	/**
	 * Disable the portal behavior.
	 * The children stay within it's parent DOM hierarchy.
	 */
	disablePortal: PropTypes.bool,
	/**
	 * Callback fired once the children has been mounted into the `container`.
	 */
	onRendered: PropTypes.func,
	ref: PropTypes.func,
};

Portal.defaultProps = {
	disablePortal: false,
};

export default Portal;
