import PropTypes from 'prop-types';
import React from 'react';
import { getSpacing, useStyles } from '../system';
import Typography from '../Typography';
import { stylesPropType } from '../utils/propTypes';

const getStyles = () => ({
	...getSpacing({ m: 0, pt: 3.5, px: 3.5, pb: 3 }),
	flex: '0 0 auto',
});

function DialogTitle(props) {
	const {
		classes,
		props: { children, disableTypography, ...passThru },
	} = useStyles(props, getStyles);

	return (
		<div className={classes} {...passThru}>
			{disableTypography ? (
				children
			) : (
				<Typography variant="h6">{children}</Typography>
			)}
		</div>
	);
}

DialogTitle.displayName = 'DialogTitle';

DialogTitle.propTypes = {
	// The content of the component.
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	/**
	 * If `true`, the children won't be wrapped by a typography component.
	 * For instance, this can be useful to render an h4 instead of the default h2.
	 */
	disableTypography: PropTypes.bool,
	...stylesPropType,
};

DialogTitle.defaultProps = {
	disableTypography: false,
};

export default DialogTitle;
