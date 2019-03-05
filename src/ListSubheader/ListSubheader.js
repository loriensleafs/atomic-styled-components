import React from 'react';
import PropTypes from 'prop-types';
import combine from '../utils/combine';
import { getSpacing, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const getStickyStyles = ({ disableSticky }) =>
	!disableSticky && {
		zIndex: 1,
		position: 'sticky',
		top: '0px',
		backgroundColor: 'inherit',
	};

const getColorStyles = ({ color, theme: { palette } }) =>
	color === 'primary' ||
	(color === 'inherit' && {
		color: color === 'inherit' ? 'inherit' : palette.primary.main,
	});

const getBaseStyles = ({
	disableGutters,
	inset,
	theme: {
		palette,
		typography: { fontFamilies, fontSizes, fontWeights, unit },
	},
}) => ({
	lineHeight: '48px',
	listStyle: 'none',
	color: palette.text.secondary,
	fontFamily: fontFamilies.ui,
	fontWeight: fontWeights.medium,
	fontSize: `${fontSizes[2]}${unit}`,
	...getSpacing({
		px: !disableGutters ? 3 : null,
		pl: inset ? 72 : null,
	}),
});

const getStyles = combine(getBaseStyles, getColorStyles, getStickyStyles);
getStyles.propTypes = {
	// Component color. Supports theme colors that make sense for the component.
	color: PropTypes.oneOf(['default', 'primary', 'inherit']),
	// If `true`, the List Subheader will not have gutters.
	disableGutters: PropTypes.bool,
	// If `true`, the List Subheader will not stick to the top during scroll.
	disableSticky: PropTypes.bool,
	// If `true`, the List Subheader will be indented.
	inset: PropTypes.bool,
};

function ListSubheader(props) {
	const {
		classes,
		props: { as: Component, ...passThru },
	} = useStyles(props, getStyles);

	return <Component className={classes} {...passThru} />;
}

ListSubheader.displayName = 'ListSubheader';

ListSubheader.propTypes = {
	// The content of the component.
	children: PropTypes.node,
	className: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

ListSubheader.defaultProps = {
	as: 'li',
	color: 'default',
	disableGutters: false,
	disableSticky: false,
	inset: false,
};

export default ListSubheader;
