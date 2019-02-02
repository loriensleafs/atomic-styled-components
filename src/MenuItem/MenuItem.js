import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './../ListItem';
import combine from './../utils/combine';
import { getSpacing, getTextVariant, useStyles } from './../system';
import { componentPropType, stylesPropType } from './../utils/propTypes';

function getGutterStyles({ disableGutters }) {
	return (
		!disableGutters &&
		getSpacing({
			px: 3,
		})
	);
}

function getBaseStyles(props) {
	return {
		boxSizing: 'content-box',
		width: 'auto',
		height: '24px',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		...getTextVariant({
			variant: 'subheading',
		}),
	};
}

const getStyles = combine(getBaseStyles, getGutterStyles);
getStyles.propTypes = {
	// If `true`, the left and right padding is removed.
	disableGutters: PropTypes.bool,
	isSelected: PropTypes.bool,
};

function MenuItem(props) {
	cosnt[({ styles }, passThru)] = useStyles(props, getStyles, {
		whitelist: ['disableGutters', 'isSelected'],
	});

	return (
		<ListItem
			button
			tabIndex={-1}
			styles={{ root: styles }}
			{...passThru}
		/>
	);
}

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
	// Menu item contents.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object,
	className: PropTypes.string,
	role: PropTypes.string,
	...getStyles.propTypes,
	...componentPropType,
	...stylesPropType,
};

MenuItem.defaultProps = {
	as: 'li',
	disableGutters: false,
	role: 'menuitem',
};

export default MenuItem;
