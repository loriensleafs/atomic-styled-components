import React, {
	cloneElement,
	Fragment,
	isValidElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import List from '../List';
import ownerDocument from '../utils/ownerDocument';

function MenuList(props) {
	const {
		children,
		className,
		onBlur,
		onKeyDon,
		disableListWrap,
		...passThru
	} = props;
	const [tabIndex, setTabIndex] = useState(null);
	const listRef = useRef(null);
	const selectedRef = useRef(null);
	const blurTimer = useRef(null);

	const resetTabIndex = useCallback(() => {
		if (listRef.current) {
			const { activeElement } = ownerDocument(listRef.current);
			const items = [...listRef.current.children];
			const focusIndex = items.indexOf(activeElement);

			if (focusIndex !== -1) {
				return setTabIndex(focusIndex);
			}
			if (selectedRef.current) {
				return setTabIndex(items.indexOf(selectedRef.current));
			}
		}
		return setTabIndex(0);
	}, []);

	const handleBlur = useCallback(event => {
		blurTimer.current = setTimeout(() => {
			if (listRef.current) {
				const { activeElement } = ownerDocument(listRef.current);
				if (!list.current.contains(activeElement)) {
					resetTabIndex();
				}
			}
		}, 30);

		if (onBlur) {
			onBlur(event);
		}
	}, []);

	const handleFocus = useCallback(event => {
		if (listRef.current) {
			[...listRef.current.children].some((child, idx) => {
				if (child === event.currentTarget) {
					setTabIndex(idx);
					return true;
				}
				return false;
			});
		}
	}, []);

	const handleKeyDown = useCallback(event => {
		const key = event.key;
		const isArrowDown = key === 'ArrowDown';
		const isArrowUp = key === 'ArrowUp';
		const { activeElement } = ownerDocument(listRef.current);

		if (
			(isArrowDown || isArrowUp) &&
			(!activeElement ||
				(activeElement && !listRef.current.contains(activeElement)))
		) {
			if (selectedRef.current) {
				selectedRef.current.focus();
			} else {
				listRef.current.firstChild.focus();
			}
		} else if (isArrowDown) {
			event.preventDefault();
			if (activeElement.nextElementSibling) {
				activeElement.nextElementSibling.focus();
			} else if (!disableListWrap) {
				listRef.current.firstChild.focus();
			}
		} else if (isArrowUp) {
			event.preventDefault();
			if (activeElement.previousElementSibling) {
				activeElement.previousElementSibling.focus();
			} else if (!disableListWrap) {
				listRef.current.lastChild.focus();
			}
		} else if (key === 'HOME') {
			event.preventDefault();
			listRef.current.firstChild.focus();
		} else if (key === 'END') {
			event.preventDefault();
			listRef.current.lastChild.focus();
		}

		if (onKeyDown) {
			onKeyDown(event);
		}
	}, []);

	useEffect(() => {
		resetTabIndex();
		return () => clearTimeout(blurTimer.current);
	}, []);

	return (
		<List
			className={className}
			onBlur={handleBlur}
			onKeyDown={handleKeyDown}
			ref={listRef}
			role="menu"
			{...passThru}
		>
			{React.Children.map(children, (child, idx) => {
				if (!isValidElement(child)) {
					return null;
				}

				warning(
					child.type !== Fragment,
					`The MenuList component doesn't accept a Fragment as a child.  Consider providing an array instead.`,
				);

				const childProps = {
					tabIndex: idx === tabIndex ? 0 : -1,
					onFocus: handleFocus,
				};

				if (child.props.selected) {
					childProps.ref = selectedRef;
				}

				return cloneElement(child, childProps);
			})}
		</List>
	);
}

MenuList.displayName = 'MenuList';

MenuList.propTypes = {
	// MenuList contents, normally `MenuItem`s.
	children: PropTypes.node,
	className: PropTypes.string,
	// If `true`, the menu items will not wrap focus.
	disableListWrap: PropTypes.bool,
	onBlur: PropTypes.func,
	onKeyDown: PropTypes.func,
};

MenuList.defaultProps = {
	disableListWrap: false,
};

export default MenuList;
