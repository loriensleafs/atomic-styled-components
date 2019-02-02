import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './../ButtonBase';
import combine from './../utils/combine';
import { getColors, getSpacing, useStyles } from './../system';
import { fade } from './../utils/colorHelpers';
import { stylesPropType } from '../utils/propTypes';

function getColorStyles(props) {
	const {
		color,
		isDisabled,
		theme: { palette },
	} = props;
	const backgroundColor = {
		':hover': {
			backgroundColor: fade(
				palette.action.active,
				palette.action.hoverOpacity,
			),
		},
		'@media (hover: none)': {
			backgroundColor: 'transparent',
		},
		':disabled': {
			backgroundColor: 'transparent',
		},
	};

	if (isDisabled) {
		return {
			root: {
				...getColors({ color: 'action.disabled' }),
				':disabled': getColors({ color: 'action.disabled' }),
			},
		};
	}

	switch (color) {
		case 'primary':
		case 'secondary':
		case 'error':
			return {
				root: {
					...getColors({ color: `${color}.main` }),
					...backgroundColor,
				},
			};
		case 'inherit':
			return {
				root: {
					color: 'inherit',
					...backgroundColor,
				},
			};
		default:
			return {
				root: {
					...getColors({ color: 'action.active' }),
					...backgroundColor,
				},
			};
	}
}

function getBaseStyles(props) {
	const { getTransition } = props.theme;

	return {
		root: {
			position: 'relative',
			textAlign: 'center',
			flex: '0 0 auto',
			fontSize: '24px',
			width: '48px',
			height: '48px',
			padding: 0,
			borderRadius: '50%',
			transition: getTransition('background-color', {
				duration: 'shortest',
				easing: 'in',
			}),
			...getSpacing(props),
		},
		label: {
			position: 'relative',
			width: '100%',
			display: 'flex',
			alignItems: 'inherit',
			justifyContent: 'inherit',
		},
	};
}

const getStyles = combine(getBaseStyles, getColorStyles);
getStyles.propTypes = {
	/**
	 * The color of the component. It supports those theme palette that make
	 * sense for this component.
	 */
	color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
	...getSpacing.propTypes,
};

const IconButton = forwardRef((props, ref) => {
	const [{ styles, classes }, { children, ...passThru }] = useStyles(
		props,
		getStyles,
	);

	return (
		<ButtonBase styles={styles.root} ref={ref} {...passThru}>
			<span className={classes.label}>{children}</span>
		</ButtonBase>
	);
});

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
	// The icon element.
	children: PropTypes.node,
	className: PropTypes.string,
	// If `true`, the ripple will be disabled.
	disableRipple: PropTypes.bool,
	...stylesPropType,
	...getStyles.propTypes,
};

IconButton.defaultProps = {
	color: 'default',
	isDisabled: false,
};

export default IconButton;
