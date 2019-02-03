import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { fade } from '../utils/colorHelpers';
import { stylesPropType } from '../utils/propTypes';

const getPositionStyles = ({ absolute }) =>
	absolute && {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
	};

const getColorStyles = ({ light, theme: { palette } }) => ({
	backgroundColor: light ? fade(palette.divider, 0.08) : palette.divider,
});

const getIndentStyles = ({ inset }) => inset && { margin: '72px' };

const getStyles = combine(getPositionStyles, getColorStyles, getIndentStyles);
getStyles.propTypes = {
	absolute: PropTypes.bool,
	// If `true`, the divider will be indented.
	inset: PropTypes.bool,
	// If `true`, the divider will have a lighter color.
	light: PropTypes.bool,
};

const baseStyles = {
	width: '100%',
	height: '1px',
	margin: '0px',
	border: 'none',
	flexShrink: 0,
};

function Divider(props) {
	const [{ classes }, { children, as: Component }] = useStyles(
		props,
		getStyles,
		{ baseStyles },
	);

	return <Component className={classes}>{children}</Component>;
}

Divider.displayName = 'Divider';

Divider.propTypes = {
	className: PropTypes.string,
	...stylesPropType,
	...getStyles.propTypes,
};

Divider.defaultProps = {
	absolute: false,
	as: 'hr',
	inset: false,
	light: false,
};

export default Divider;
