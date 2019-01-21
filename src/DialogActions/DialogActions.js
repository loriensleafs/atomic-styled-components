import React from 'react';
import PropTypes from 'prop-types';
import { getSpacing, useStyles } from '../system';

function getStyles(props) {
	const { disableActionSpacing } = props;
	const styles = {
		root: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			flex: '0 0 auto',
			...getSpacing({ my: 2, mx: 1 }),
		},
		action: {},
	};

	if (disableActionSpacing) {
		const spacing = getSpacing({ my: 0, mx: 1 });

		styles.root = { ...styles.root, ...spacing };
		styles.action = spacing;
	}

	return styles;
}
getStyles.propTypes = {
	disableActionSpacing: PropTypes.bool,
};

function DialogActions(props) {
	const [
		{ classes, styles },
		{ children, className, disableActionSpacing, ...passThru },
	] = useStyles(props, getStyles, { whitelist: ['disableActionSpacing'] });

	return (
		<div className={classes.root} {...passThru}>
			{disableActionSpacing
				? children
				: React.Children.map(
						children,
						child =>
							React.isValidElement(child) &&
							React.cloneElement(child, {
								styles: styles.action,
							}),
				  )}
		</div>
	);
}

DialogActions.propTypes = {
	// The content of the component.
	children: PropTypes.node,
	className: PropTypes.string,
	// If `true`, the dialog actions do not have additional margin.
	disableActionSpacing: PropTypes.bool,
};

DialogActions.defaultProps = {
	disableActionSpacing: false,
};

export default DialogActions;
