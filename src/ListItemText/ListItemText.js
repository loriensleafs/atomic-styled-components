import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ListContext from '../List/ListContext';
import Typography from '../Typography';
import combine from '../utils/combine';
import { getSpacing, useStyles } from '../system';
import { stylesPropType } from '../utils/propTypes';
import { isNil } from '../utils/helpers';

const getDenseStyles = ({ dense }) =>
	dense && {
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

const getBaseStyles = ({ inset }) => ({
	root: {
		minWidth: 0,
		flex: '1 1 auto',
		lineHeight: 1.5,
		...getSpacing({ py: 0, px: 3 }),
		':first-child': {
			paddingLeft: inset ? '56px' : 0,
		},
	},
});

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
	const {
		classes,
		props: {
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
	} = useStyles({ ...props, dense }, getStyles, { nested: true });

	return (
		<div className={classes.root} {...passThru}>
			{!isNil(primary) && !disableTypography ? (
				<Typography
					as="span"
					styles={styles.primaryText}
					variant="body1"
					{...primaryTextProps}
				>
					{primary}
				</Typography>
			) : primary ? (
				primary
			) : (
				children
			)}
			{!isNil(secondary) && !disableTypography ? (
				<Typography
					color="text.secondary"
					styles={styles.secondaryText}
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
	// Alias for the `primary` property.
	children: PropTypes.node,
	className: PropTypes.string,
	// The main content element.
	primary: PropTypes.node,
	/**
	 * These props will be forwarded to the primary typography component
	 * (as long as disableTypography is not `true`).
	 */
	primaryTextProps: PropTypes.object,
	// The secondary content element.
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
