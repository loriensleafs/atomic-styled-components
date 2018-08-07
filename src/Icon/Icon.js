import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classify, themify } from './../styled';

/**
 * Maps props to styles
 * Icon component color styles
 */
export const getColorStyles = (props) => {
	const { colors } = props.theme;

	switch (props.color) {
		case 'primary':
			return {
				color: colors.primary.main,
			};
		case 'secondary':
			return {
				color: colors.secondary.main,
			};
		case 'active':
			return {
				color: colors.action.active,
			};
		case 'error':
			return {
				color: colors.error.main,
			};
		case 'disabled':
			return {
				color: colors.action.disabled,
			};
		default:
			return {};
	}
};

/**
 * Icon component root styles
 */
export const getRootStyles = (props) => {
	const {} = props.theme;

	return {
		...{
			userSelect: 'none',
			fontSize: 24,
			width: '1em',
			height: '1em',
			overflow: 'hidden',
			flexShrink: 0,
		},
		...getColorStyles(props),
	};
};

const Icon = (props) => {
	const { children, className: classNameProp, color, fontSize, ...passThru } = props;
	const className = classify(getRootStyles(props), classNameProp);

	return (
		<span className={className} aria-hidden="true" {...passThru}>
			{children}
		</span>
	);
};

Icon.propTypes = {
	/**
	 * The name of the icon font ligature.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf([ 'inherit', 'primary', 'secondary', 'action', 'error', 'disabled' ]),
	/**
	 * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
	 */
	fontSize: PropTypes.oneOf([ 'inherit', 'default' ]),
};

Icon.defaultProps = {
	color: 'inherit',
	fontSize: 'default',
};

Icon.displayName = 'Icon';

export default themify(Icon);
