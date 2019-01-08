import React from 'react';
import PropTypes from 'prop-types';
import Typography from './../Typography';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getStyles(props) {
	return {
		flex: '0 0 auto',
		...getSpacing({ m: 0, pt: 3.5, px: 3.5, pb: 3 }),
	};
}

function DialogTitle(props) {
	const [
		{ classes },
		{ children, className, disableTypography, ...passThru },
	] = useStyles(props, getStyles);

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
	/**
	 * The content of the component.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * @ignore
	 */
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
