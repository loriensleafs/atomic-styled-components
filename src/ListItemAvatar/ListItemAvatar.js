import React, { cloneElement, useContext } from 'react';
import PropTypes from 'prop-types';
import ListContext from './../List/ListContext';
import { getFontSize, getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

const getStyles = ({ theme, ...props }) => ({
	root: {
		width: '36px',
		height: '36px',
		...getFontSize({
			fontSize: 4,
		}),
		...getSpacing({
			mt: props.alignItems === 'flex-start' ? 1 : null,
			mr: 1,
		}),
	},
	icon: props.dense
		? {
				width: '20px',
				height: '20px',
				...getFontSize({
					fontSize: 4,
				}),
		  }
		: null,
});
getStyles.propTypes = {
	alignItems: PropTypes.string,
	dense: PropTypes.bool,
};

function ListItemAvatar(props) {
	const { alignItems, dense } = useContext(ListContext);
	const [{ children, className, ...passThru }, styles, classes] = useStyles(
		{ ...props, alignItems, dense },
		getStyles,
	);

	return cloneElement(children, {
		className: classes.root,
		childrenClassName:
			classes.icon + ' ' + children.props.childrenClassName,
		...passThru,
	});
}

ListItemAvatar.displayName = 'ListItemAvatar';

ListItemAvatar.propTypes = {
	/**
	 * The content of the component – normally `Avatar`.
	 */
	children: PropTypes.element.isRequired,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	...stylesPropType,
	...getStyles.propTypes,
};

export default ListItemAvatar;
