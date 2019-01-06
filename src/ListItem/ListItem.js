import React, {
	isValidElement,
	useCallback,
	useContext,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './../ButtonBase';
import ListContext from './../List/ListContext';
import combine from './../utils/combine';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getButtonStyles({ button, theme: { getTransition, palette } }) {
	if (button) {
		return {
			root: {
				transition: getTransition('background-color', 'shortest'),
				':hover': {
					textDecoration: 'none',
					backgroundColor: palette.action.hover,
				},
			},
		};
	}
	return null;
}

function getDisabledStyles(props) {
	if (props.disabled) {
		return {
			root: {
				opacity: 0.5,
			},
		};
	}
	return null;
}

function getFocusVisibleStyles(props) {
	if (props.focusVisible) {
		return {
			root: {
				backgroundColor: props.theme.palette.action.hover,
			},
		};
	}
	return null;
}

function getSelectedStyles(props) {
	if (props.selected) {
		return {
			root: {
				backgroundColor: props.theme.palette.action.selected,
				':hover': {
					backgroundColor: props.theme.palette.action.selected,
				},
			},
		};
	}
	return null;
}

function getBaseStyles(props) {
	return {
		container: {
			position: 'relative',
		},
		divider: {
			borderBottom: `1px solid ${props.theme.palette.divider}`,
			backgroundClip: 'padding-box',
		},
		root: {
			position: 'relative',
			width: '100%',
			display: 'flex',
			justifyContent: 'flex-start',
			alignItems: props.alignItems === 'flex-start' ? 'flex-start' : null,
			textDecoration: 'none',
			textAlign: 'left',
			...getSpacing({
				py: props.dense || props.hasAvatar ? 1 : 1.5,
				pl: !props.disableGutters ? [3, 3.5] : null,
				pr: props.hasSecondaryAction
					? 3
					: !props.disableGutters
					? [3, 3.5]
					: null,
			}),
		},
	};
}

const getStyles = combine(
	getBaseStyles,
	getDisabledStyles,
	getFocusVisibleStyles,
	getSelectedStyles,
	getButtonStyles,
);
getStyles.propTypes = {
	alignItems: PropTypes.oneOf(['flex-start', 'center']),
	dense: PropTypes.bool,
	disableGutters: PropTypes.bool,
	focusVisible: PropTypes.bool,
	hasAvatar: PropTypes.bool,
	hasSecondaryAction: PropTypes.bool,
	/**
	 * Use to apply selected styling.
	 */
	selected: PropTypes.bool,
};

function ListItem(props) {
	const [focusVisible, setFocusVisible] = useState(false);
	const { alignItems, dense } = {
		...{ dense: false },
		...{ alignItems: props.alignItems, dense: props.dense },
		...useContext(ListContext),
	};
	const children = React.Children.toArray(props.children);
	const hasAvatar = children.some(
		child =>
			isValidElement(child) &&
			child.type.displayName === 'ListItemAvatar',
	);
	const hasSecondaryAction =
		children.length &&
		isValidElement(children[children.length - 1]) &&
		children[children.length - 1].type.displayName ===
			'ListItemSecondaryAction';
	const [
		{
			button,
			children: childrenProp,
			className,
			component,
			ContainerComponent,
			ContainerProps,
			disabled,
			disableGutters,
			divider,
			...passThru
		},
		styles,
		classes,
	] = useStyles(
		{
			...props,
			alignItems,
			focusVisible,
			dense,
			hasAvatar,
		},
		getStyles,
	);

	const componentProps = { disabled, ...passThru };
	let Component = component || 'li';

	if (button) {
		componentProps.component = component || 'div';
		componentProps.styles = styles.root;
		componentProps.onFocusVisible = useCallback(
			() => setFocusVisible(() => true),
			[],
		);
		componentProps.onBlur = useCallback(
			() => setFocusVisible(() => false),
			[],
		);
		Component = ButtonBase;
	} else {
		componentProps.className = classes.root;
	}

	if (hasSecondaryAction) {
		Component = !componentProps.component && !component ? 'div' : Component;

		// Avoids nesting of li > li
		if (ContainerComponent === 'li') {
			if (Component === 'li') {
				Component = 'div';
			} else if (componentProps.component === 'li') {
				componentProps.component = 'div';
			}
		}
	}

	return (
		<ListContext.Provider value={{ alignItems, dense }}>
			<ContainerComponent
				className={classes.container}
				{...ContainerProps}
			>
				<Component {...componentProps}>{children}</Component>
			</ContainerComponent>
		</ListContext.Provider>
	);
}

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
	/**
	 * If `true`, the list item will be a button (using `ButtonBase`).
	 */
	button: PropTypes.bool,
	/**
	 * The content of the component.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 * By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`.
	 */
	component: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	/**
	 * The container component used when a `ListItemSecondaryAction` is rendered.
	 */
	ContainerComponent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	/**
	 * Properties applied to the container element when the component
	 * is used to display a `ListItemSecondaryAction`.
	 */
	ContainerProps: PropTypes.object,
	/**
	 * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
	 */
	dense: PropTypes.bool,
	/**
	 * If `true`, the list item will be disabled.
	 */
	disabled: PropTypes.bool,
	/**
	 * If `true`, the left and right padding is removed.
	 */
	disableGutters: PropTypes.bool,
	/**
	 * If `true`, a 1px light border is added to the bottom of the list item.
	 */
	divider: PropTypes.bool,
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
	selected: false,
};

export default ListItem;
