import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';
import { fade } from './../utils/colorHelpers';

const getAbsoluteStyles = props =>
	props.absolute && {
		rootStyles: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: '100%',
		},
	};

const getBaseStyles = props => ({
	rootStyles: {
		width: '100%',
		height: '1px',
		margin: props.inset ? '72px' : 0,
		border: 'none',
		flexShrink: 0,
		backgroundColor: props.light
			? fade(props.theme.palette.divider, 0.08)
			: props.theme.palette.divider,
	},
});

function Divider(props) {
	const {
		absolute,
		children,
		className: classNameProp,
		inset,
		is: C,
		light,
		styles,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const { rootStyles } = useStyles([getBaseStyles, getAbsoluteStyles], {
		absolute,
		inset,
		light,
		styles,
		theme,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return <C className={className}>{children}</C>;
}

Divider.displayName = 'Divider';

Divider.propTypes = {
	absolute: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * If `true`, the divider will be indented.
	 */
	inset: PropTypes.bool,
	/**
	 * If `true`, the divider will have a lighter color.
	 */
	light: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Divider.defaultProps = {
	absolute: false,
	inset: false,
	is: 'hr',
	light: false,
};

export default Divider;
