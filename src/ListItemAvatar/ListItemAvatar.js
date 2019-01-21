import React, { cloneElement, useContext } from 'react';
import PropTypes from 'prop-types';
import ListContext from './../List/ListContext';
import { getFontSize, getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getStyles(props) {
	const { alignItems, dense } = props;
	const isFlexStart = alignItems === 'flex-start';
	const styles = {
		root: {
			width: '36px',
			height: '36px',
			...getSpacing({ mt: isFlexStart ? 1 : null, mr: 1 }),
			...getFontSize({ fontSize: 4 }),
		},
	};

	if (dense) {
		styles.icon = {
			width: '20px',
			height: '20px',
			...getFontSize({ fontSize: 4 }),
		};
	}

	return styles;
}
getStyles.propTypes = {
	alignItems: PropTypes.string,
	dense: PropTypes.bool,
};

function ListItemAvatar(props) {
	const { alignItems, dense } = useContext(ListContext);
	const [{ classes }, { children, className, ...passThru }] = useStyles(
		{ ...props, alignItems, dense },
		getStyles,
	);

	return cloneElement(children, {
		className: classes.root,
		childrenClassName:
			classes.icon + ' ' + children.props.childrenClassName || '',
		...passThru,
	});
}

ListItemAvatar.displayName = 'ListItemAvatar';

ListItemAvatar.propTypes = {
	// The content of the component – normally `Avatar`.
	children: PropTypes.element.isRequired,
	className: PropTypes.string,
	...stylesPropType,
	...getStyles.propTypes,
};

export default ListItemAvatar;
