import React, {
	Children,
	isValidElement,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './../ButtonBase';
import ListContext from './../List/ListContext';
import { getBg, getSpacing, useStyles } from './../system';
import { componentPropType, stylesPropType } from './../utils/propTypes';

function checkForAvatar(props) {
	return Children.toArray(props.children).some(
		child =>
			isValidElement(child) &&
			child.type.displayName === 'ListItemAvatar',
	);
}

function checkForSecondaryAction(props) {
	const children = Children.toArray(props.children);

	return (
		children.length &&
		isValidElement(children[children.length - 1]) &&
		children[children.length - 1].type.displayName ===
			'ListItemSecondaryAction'
	);
}

function getButtonStyles(props) {
	const {
		button,
		theme: { getTransition },
	} = props;

	return (
		button && {
			transition: getTransition('background-color', {
				duration: 'shortest',
			}),
			':hover': {
				...getBg({ bg: 'action.hover' }),
				textDecoration: 'none',
			},
		}
	);
}

function getDisabledStyles({ disabled }) {
	return disabled && { opacity: 0.5 };
}

function getFocusVisibleStyles({ isFocused }) {
	return isFocused ? getBg({ bg: 'action.hover' }) : null;
}

function getSelectedStyles({ isSelected }) {
	return (
		isSelected && {
			...getBg({ bg: 'action.selected' }),
			':hover': getBg({ bg: 'action.selected' }),
		}
	);
}

function getStyles(props) {
	const {
		alignItems,
		dense,
		disableGutters,
		hasAvatar,
		hasSecondaryAction,
		theme: { palette },
		...passThru
	} = {
		py: dense || hasAvatar ? 1 : 1.5,
		pl: !disableGutters ? [3, 3.5] : null,
		pr: hasSecondaryAction ? 3 : !disableGutters ? [3, 3.5] : null,
		...props,
	};

	return {
		divider: {
			borderBottom: `1px solid ${palette.divider}`,
			backgroundClip: 'padding-box',
		},
		root: {
			position: 'relative',
			width: '100%',
			display: 'flex',
			justifyContent: 'flex-start',
			alignItems,
			textDecoration: 'none',
			textAlign: 'left',
			...getDisabledStyles(props),
			...getFocusVisibleStyles(props),
			...getSelectedStyles(props),
			...getButtonStyles(props),
			...getSpacing(passThru),
		},
	};
}

getStyles.propTypes = {
	alignItems: PropTypes.oneOf(['flex-start', 'center']),
	dense: PropTypes.bool,
	disableGutters: PropTypes.bool,
	isFocused: PropTypes.bool,
	// Use to apply selected styling.
	isSelected: PropTypes.bool,
	hasAvatar: PropTypes.bool,
	hasSecondaryAction: PropTypes.bool,
	...getSpacing.propTypes,
};

function ListItem(props) {
	const [isFocused, setIsFocused] = useState(false);
	const { alignItems, dense } = {
		...{ dense: false },
		...{ alignItems: props.alignItems, dense: props.dense },
		...useContext(ListContext),
	};
	const hasAvatar = useMemo(() => checkForAvatar(props), [props.children]);
	const hasSecondaryAction = useMemo(() => checkForSecondaryAction(props), [
		props.children,
	]);
	const [
		{ styles, classes },
		{
			as,
			button,
			children,
			className,
			ContainerComponent,
			ContainerProps,
			disableGutters,
			divider,
			...passThru
		},
	] = useStyles(
		{
			...props,
			alignItems,
			dense,
			hasAvatar,
			hasSecondaryAction,
			isFocused,
		},
		getStyles,
	);
	let componentProps = {
		...passThru,
		as: as,
	};
	let Component = as || 'li';

	if (button) {
		Component = ButtonBase;
		componentProps = {
			...componentProps,
			as: as || 'div',
			styles: styles.root,
			onBlur: useCallback(() => setIsFocused(() => false), []),
			onFocusVisible: useCallback(() => setIsFocused(() => true), []),
		};
	} else {
		componentProps.className = classes.root;
	}

	if (hasSecondaryAction) {
		Component = !as ? 'div' : Component;
		componentProps.as = as;

		// Avoids nesting of li > li
		if (ContainerComponent === 'li') {
			if (Component === 'li') {
				Component = 'div';
			} else if (as === 'li') {
				componentProps.as = 'div';
			}
		}

		return (
			<ListContext.Provider value={{ alignItems, dense }}>
				<ContainerComponent {...ContainerProps}>
					<Component {...componentProps}>{children}</Component>
				</ContainerComponent>
			</ListContext.Provider>
		);
	}

	return (
		<ListContext.Provider value={{ alignItems, dense }}>
			<Component {...componentProps}>{children}</Component>
		</ListContext.Provider>
	);
}

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
	// If `true`, the list item will be a button (using `ButtonBase`).
	button: PropTypes.bool,
	// The content of the component.
	children: PropTypes.node,
	className: PropTypes.string,
	// Used when a `ListItemSecondaryAction` is rendered.
	ContainerComponent: componentPropType.as,
	// Applied to the container when displaying a `ListItemSecondaryAction`.
	ContainerProps: PropTypes.object,
	// If `true`, compact vertical padding for keyboard and mouse input is used.
	dense: PropTypes.bool,
	// If `true`, the list item will be disabled.
	disabled: PropTypes.bool,
	// If `true`, the left and right padding is removed.
	disableGutters: PropTypes.bool,
	// If `true`, a 1px light border is added to the bottom of the list item.
	divider: PropTypes.bool,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

ListItem.defaultProps = {
	alignItems: 'center',
	button: false,
	ContainerComponent: 'li',
	dense: false,
	disabled: false,
	disableGutters: false,
	divider: false,
	isSelected: false,
};

export default ListItem;
