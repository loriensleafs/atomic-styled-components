import PropTypes from 'prop-types';
import React from 'react';
import { getSpacing, useStyles } from '../system';
import combine from '../utils/combine';

const getSpacingStyles = ({ disableActionSpacing }) =>
	disableActionSpacing && {
		root: getSpacing({ my: 0, mx: 1 }),
		action: getSpacing({ my: 0, mx: 1 }),
	};

const getBaseStyles = props => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flex: '0 0 auto',
		...getSpacing({ my: 2, mx: 1 }),
	},
	action: {},
});

const getStyles = combine(getBaseStyles, getSpacingStyles);
getStyles.propTypes = {
	// If `true`, the dialog actions do not have additional margin.
	disableActionSpacing: PropTypes.bool,
};

function DialogActions(props) {
	const {
		classes,
		props: { children, className, disableActionSpacing, ...passThru },
		styles,
	} = useStyles(props, getStyles, {
		nested: true,
		whitelist: ['disableActionSpacing'],
	});

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
	...getStyles.propTypes,
};

DialogActions.defaultProps = {
	disableActionSpacing: false,
};

export default DialogActions;
