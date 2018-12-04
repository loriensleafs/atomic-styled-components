import React, { isValidElement, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import ButtonBase from './../ButtonBase';
import ListContext from './../List/ListContext';
import cn from './../theme/className';
import ThemeContext from '../theme/ThemeContext';
import { space } from './../styles';

const getButtonStyles = props =>
	props.button && {
		rootStyles: {
			transition: `background-color ${
				props.theme.duration.shortest
			}ms cubic-bezier(${props.theme.easing.inOut.join()})`,
			':hover': {
				textDecoration: 'none',
				backgroundColor: props.theme.palette.action.hover,
			},
		},
	};

const getDisabledStyles = props =>
	props.disabled && {
		rootStyles: {
			opacity: 0.5,
		},
	};

const getFocusVisibleStyles = props =>
	props.focusVisible && {
		rootStyles: {
			backgroundColor: props.theme.palette.action.hover,
		},
	};

const getSelectedStyles = props =>
	props.selected && {
		backgroundColor: props.theme.palette.action.selected,
		':hover': {
			backgroundColor: props.theme.palette.action.selected,
		},
	};

const getBaseStyles = props => ({
	containerStyles: {
		position: 'relative',
	},
	dividerStyles: {
		borderBottom: `1px solid ${props.theme.palette.divider}`,
		backgroundClip: 'padding-box',
	},
	rootStyles: {
		position: 'relative',
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: props.alignItems === 'flex-start' ? 'flex-start' : null,
		textDecoration: 'none',
		textAlign: 'left',
		...space({
			py: props.dense || props.hasAvatar ? 2 : 2.5,
			pl: !props.disableGutters ? [3, 3.5] : null,
			pr: props.hasSecondaryAction ? 4 : !props.disableGutters ? [3, 3.5] : null,
		}),
	},
});

function ListItem(props) {
	const {
		alignItems: alignItemsProp,
		button,
		children: childrenProp,
		className: classNameProp,
		component,
		ContainerComponent,
		ContainerProps,
		dense: denseProp,
		disabled,
		disableGutters,
		divider,
		selected,
		styles,
		...passThru
	} = props;
	const { alignItems, dense } = {
		...{ dense: false },
		...{ alignItems: alignItemsProp, dense: denseProp },
		...useContext(ListContext),
	};
	const { theme } = useContext(ThemeContext);
	const [focusVisible, setFocusVisible] = useState(false);

	const children = React.Children.toArray(childrenProp);
	const hasAvatar = children.some(
		child => isValidElement(child) && child.type.displayName === 'ListItemAvatar',
	);
	const hasSecondaryAction =
		children.length &&
		isValidElement(children[children.length - 1]) &&
		children[children.length - 1].type.displayName === 'ListItemSecondaryAction';

	const { containerStyles, dividerStyles, rootStyles } = useStyles(
		[
			getBaseStyles,
			getSelectedStyles,
			getFocusVisibleStyles,
			getDisabledStyles,
			getButtonStyles,
		],
		{
			alignItems,
			button,
			dense,
			disabled,
			disableGutters,
			focusVisible,
			hasAvatar,
			hasSecondaryAction,
			selected,
			styles,
			theme,
		},
	);
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);
	const containerClassName = useMemo(() => cn(containerStyles), [containerStyles]);

	const componentProps = { disabled, ...passThru };
	let Component = component || 'li';

	if (button) {
		componentProps.component = component || 'div';
		componentProps.styles = { rootStyles };
		componentProps.onFocusVisible = useCallback(() => setFocusVisible(() => true), []);
		componentProps.onBlur = useCallback(() => setFocusVisible(() => false), []);
		Component = ButtonBase;
	} else {
		componentProps.className = className;
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
			<ContainerComponent className={containerClassName} {...ContainerProps}>
				<Component {...componentProps}>{children}</Component>
			</ContainerComponent>
		</ListContext.Provider>
	);
}

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
	/**
	 * Defines the `align-items` style property.
	 */
	alignItems: PropTypes.oneOf(['flex-start', 'center']),
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
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
	/**
	 * The container component used when a `ListItemSecondaryAction` is rendered.
	 */
	ContainerComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
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
	/**
	 * Use to apply selected styling.
	 */
	selected: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
