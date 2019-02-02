import React from 'react';
import PropTypes from 'prop-types';
import combine from './../utils/combine';
import { getHeight, getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getGutterStyles({ disableGutters }) {
	return getSpacing({
		px: !disableGutters ? [3, 3.5] : null,
	});
}

function getVariantStyles({ variant }) {
	switch (variant) {
		case 'dense':
			return getHeight({ hMin: 48 });

		default:
			// 'regular'
			return getHeight({ hMin: [48, 56, 64] });
	}
}

const getStyles = combine(getVariantStyles, getGutterStyles);
getStyles.propTypes = {
	// If `true`, disables gutter padding.
	disableGutters: PropTypes.bool,
	// The variant to use.
	variant: PropTypes.oneOf(['regular', 'dense']),
};

const baseStyles = {
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
};

function Toolbar(props) {
	const [{ classes }, { children, className, ...passThru }] = useStyles(
		props,
		getStyles,
		{ baseStyles },
	);

	return (
		<div className={classes} {...passThru}>
			{children}
		</div>
	);
}

Toolbar.displayName = 'Toolbar';

Toolbar.propTypes = {
	// Children, usually a mixture of `IconButton`, `Button` and `Typography`.
	children: PropTypes.node,
	className: PropTypes.string,
	...stylesPropType,
	...getStyles.propTypes,
};

Toolbar.defaultProps = {
	disableGutters: false,
	variant: 'regular',
};

export default Toolbar;
