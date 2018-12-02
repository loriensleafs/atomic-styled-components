import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import ThemeContext from '../theme/ThemeContext';
import ListContext from './../List/ListContext';
import Typography from './../Typography';
import cn from './../theme/className';
import { fontSize, space } from './../styles';

const getDenseStyles = props =>
	props.dense && {
		rootStyles: fontSize(2),
		primaryTextStyles: {
			fontSize: 'inherit',
		},
		secondaryTextStyles: {
			fontSize: 'inherit',
		},
	};

const getBaseStyles = props => ({
	rootStyles: {
		minWidth: 0,
		flex: '1 1 auto',
		...space({
			py: 0,
			px: 3,
		}),
		':first-child': {
			paddingLeft: props.inset ? '56px' : 0,
		},
	},
	primaryTextStyles: {},
	secondaryTextStyles: {},
});

function ListItemText(props) {
	const {
		children,
		className: classNameProp,
		disableTypography,
		inset,
		primary,
		primaryTextProps,
		secondary,
		secondaryTextProps,
		styles,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const { dense } = useContext(ListContext);
	const { rootStyles, primaryTextStyles, secondaryTextStyles } = useStyles(
		{ disableTypography, inset, primary, secondary, dense, styles, theme },
		[disableTypography, inset, primary, secondary, dense, styles, theme],
		[getBaseStyles, getDenseStyles],
	);
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);
	const primaryTextClassName = useMemo(() => cn(primaryTextStyles), [primaryTextStyles]);
	const secondaryTextClassName = useMemo(() => cn(secondaryTextStyles), [secondaryTextStyles]);

	return (
		<div className={className} {...passThru}>
			{primary !== null && !disableTypography ? (
				<Typography
					variant="subtitle1"
					styles={primaryTextStyles}
					component="span"
					{...primaryTextProps}>
					{primary}
				</Typography>
			) : primary ? (
				primary
			) : (
				children
			)}
			{secondary !== null && !disableTypography ? (
				<Typography
					styles={secondaryTextStyles}
					color="text.secondary"
					{...secondaryTextProps}>
					{secondary}
				</Typography>
			) : (
				secondary
			)}
		</div>
	);
}

ListItemText.displayName = 'ListItemText';

ListItemText.propTypes = {
	/**
	 * Alias for the `primary` property.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * If `true`, the children won't be wrapped by a Typography component.
	 * This can be useful to render an alternative Typography variant by wrapping
	 * the `children` (or `primary`) text, and optional `secondary` text
	 * with the Typography component.
	 */
	disableTypography: PropTypes.bool,
	/**
	 * If `true`, the children will be indented.
	 * This should be used if there is no left avatar or left icon.
	 */
	inset: PropTypes.bool,
	/**
	 * The main content element.
	 */
	primary: PropTypes.node,
	/**
	 * These props will be forwarded to the primary typography component
	 * (as long as disableTypography is not `true`).
	 */
	primaryTextProps: PropTypes.object,
	/**
	 * The secondary content element.
	 */
	secondary: PropTypes.node,
	/**
	 * These props will be forwarded to the secondary typography component
	 * (as long as disableTypography is not `true`).
	 */
	secondaryTextProps: PropTypes.object,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

ListItemText.defaultProps = {
	disableTypography: false,
	inset: false,
};

export default ListItemText;
