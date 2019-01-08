import React from 'react';
import PropTypes from 'prop-types';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getStyles(props) {
	return {
		flex: '1 1 auto',
		overflowY: 'auto',
		WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
		...getSpacing({ pt: 0, px: 3.5, pb: 3.5 }),
		':first-child': getSpacing({ pt: 3.5 }),
	};
}

function DialogContent(props) {
	const [{ classes }, { children, className, ...passThru }] = useStyles(
		props,
		getStyles,
	);

	return (
		<div className={classes} {...passThru}>
			{children}
		</div>
	);
}

DialogContent.displayName = 'DialogContent';

DialogContent.propTypes = {
	/**
	 * The content of the component.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	...stylesPropType,
};

export default DialogContent;
