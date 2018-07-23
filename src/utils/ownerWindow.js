import ownerDocument from './ownerDocument';

export default function ownerWindow(node, fallback = window) {
	const doc = ownerDocument(node);

	return doc.defaultView || doc.parentView || fallback;
}
