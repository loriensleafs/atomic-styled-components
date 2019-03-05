import React, { cloneElement, useContext } from 'react';
import PropTypes from 'prop-types';
import ListContext from '../List/ListContext';
import combine from '../utils/combine';
import { getFontSize, getSpacing, useStyles } from '../system';
import { stylesPropType } from '../utils/propTypes';

const getDenseStyles = ({ dense }) =>
	dense && {
		icon: {
			width: '20px',
			height: '20px',
			...getFontSize({ fontSize: 4 }),
		},
	};

const getBaseStyles = ({ alignItems }) => ({
	root: {
		width: '36px',
		height: '36px',
		...getSpacing({ mt: alignItems === 'flex-start' ? 1 : null, mr: 1 }),
		...getFontSize({ fontSize: 4 }),
	},
});

const getStyles = combine(getBaseStyles, getDenseStyles);
getStyles.propTypes = {
	alignItems: PropTypes.string,
	dense: PropTypes.bool,
};

function ListItemAvatar(props) {
	const { alignItems, dense } = useContext(ListContext);
	const {
		classes,
		props: { children, ...passThru },
	} = useStyles({ ...props, alignItems, dense }, getStyles, { nested: true });

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
