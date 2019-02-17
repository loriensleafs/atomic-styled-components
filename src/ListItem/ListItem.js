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

const checkForAvatar = props =>
	Children.toArray(props.children).some(
		child =>
			isValidElement(child) &&
			child.type.displayName === 'ListItemAvatar',
	);

const checkForSecondaryAction = props => {
	const children = Children.toArray(props.children);

	return (
		children.length &&
		isValidElement(children[children.length - 1]) &&
		children[children.length - 1].type.displayName ===
			'ListItemSecondaryAction'
	);
};

const getButtonStyles = ({ button, theme: { getTransition } }) =>
	button && {
		transition: getTransition('background-color', {
			duration: 'shortest',
		}),
		':hover': {
			...getBg({ bg: 'action.hover' }),
			textDecoration: 'none',
		},
	};

const getDisabledStyles = ({ disabled }) => disabled && { opacity: 0.5 };

const getFocusVisibleStyles = ({ focused }) =>
	focused ? getBg({ bg: 'action.hover' }) : null;

const getSelectedStyles = ({ selected }) =>
	selected && {
		...getBg({ bg: 'action.selected' }),
		':hover': getBg({ bg: 'action.selected' }),
	};

const getStyles = props => ({
	divider: {
		borderBottom: `1px solid ${props.theme.palette.divider}`,
		backgroundClip: 'padding-box',
	},
	container: {
		position: 'relative',
	},
	root: {
		position: 'relative',
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: props.alignItems,
		textDecoration: 'none',
		textAlign: 'left',
		...getDisabledStyles(props),
		...getFocusVisibleStyles(props),
		...getSelectedStyles(props),
		...getButtonStyles(props),
		...getSpacing({
			py: props.dense || props.hasAvatar ? 2 : 10,
			pl: !props.disableGutters ? 3 : null,
			pr: props.hasSecondaryAction
				? 3
				: !props.disableGutters
				? [3, 3.5]
				: null,
		}),
	},
});

getStyles.propTypes = {
	alignItems: PropTypes.oneOf(['flex-start', 'center']),
	dense: PropTypes.bool,
	disableGutters: PropTypes.bool,
	focused: PropTypes.bool,
	// Use to apply selected styling.
	selected: PropTypes.bool,
	hasAvatar: PropTypes.bool,
	hasSecondaryAction: PropTypes.bool,
	...getSpacing.propTypes,
};

function ListItem(props) {
	const [focused, setFocused] = useState(false);
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
			focused,
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
			onBlur: useCallback(() => setFocused(false), []),
			onFocusVisible: useCallback(() => setFocused(true), []),
		};
	} else {
		componentProps.className = classes.root;
	}

	if (hasSecondaryAction) {
		const componentChildren = [...children];
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
				<ContainerComponent
					className={classes.container}
					{...ContainerProps}
				>
					<Component {...componentProps}>
						{componentChildren}
					</Component>
					{componentChildren.pop()}
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
	selected: false,
};

export default ListItem;
