import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ListContext from './../List/ListContext';
import Typography from './../Typography';
import combine from './../utils/combine';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getDenseStyles(props) {
	if (props.dense) {
		return {
			primaryText: {
				fontSize: 'inherit',
			},
			root: {
				fontSize: '0.8125rem',
			},
			secondaryText: {
				fontSize: 'inherit',
			},
		};
	}
	return null;
}

function getBaseStyles(props) {
	return {
		primaryText: {},
		root: {
			minWidth: 0,
			flex: '1 1 auto',
			lineHeight: 1.5,
			...getSpacing({ py: 0, px: 2 }),
			':first-child': {
				paddingLeft: props.inset ? '56px' : 0,
			},
		},
		secondaryText: {},
	};
}

const getStyles = combine(getBaseStyles, getDenseStyles);
getStyles.propTypes = {
	dense: PropTypes.bool,
	/**
	 * If `true`, the children will be indented.
	 * This should be used if there is no left avatar or left icon.
	 */
	inset: PropTypes.bool,
};

function ListItemText(props) {
	const { dense } = useContext(ListContext);
	const [
		{
			children,
			className,
			disableTypography,
			primary,
			primaryTextProps,
			secondary,
			secondaryTextProps,
			...passThru
		},
		styles,
		classes,
	] = useStyles({ ...props, dense }, getStyles);

	return (
		<div className={classes.root} {...passThru}>
			{primary !== null && !disableTypography ? (
				<Typography
					variant="subtitle1"
					styles={styles.primaryText}
					component="span"
					{...primaryTextProps}
				>
					{primary}
				</Typography>
			) : primary ? (
				primary
			) : (
				children
			)}
			{secondary !== null && !disableTypography ? (
				<Typography
					styles={styles.secondaryText}
					color="text.secondary"
					{...secondaryTextProps}
				>
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
	...stylesPropType,
	...getStyles.propTypes,
};

ListItemText.defaultProps = {
	disableTypography: false,
	inset: false,
};

export default ListItemText;
