import React from 'react';
import PropTypes from 'prop-types';
import AvatarImage from './AvatarImage';
import combine from './../utils/combine';
import { getColors, getSpacing, getText, useStyles } from './../system';
import { componentPropType, stylesPropType } from './../utils/propTypes';

function getColorStyles({ color, theme }) {
	return (
		color === 'default' &&
		getColors({
			bg: `grey.${theme.palette.type}`,
			color: 'bg.default',
		})
	);
}

const getStyles = combine(getColors, getColorStyles, getSpacing, getText);
getStyles.propTypes = {
	...getColors.propTypes,
	...getSpacing.propTypes,
	...getText.propTypes,
};

const baseStyles = {
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
	width: '40px',
	height: '40px',
	borderRadius: '50%',
	overflow: 'hidden',
	userSelect: 'none',
};

function Avatar(props) {
	const [
		{
			alt,
			as: Component,
			children,
			className: cn = '',
			imgProps,
			imgStyles,
			sizes,
			src,
			srcSet,
			...passThru
		},
		styles,
		classes,
	] = useStyles(props, getStyles, { baseStyles });

	return (
		<Component className={cn.concat(classes)} {...passThru}>
			{src || srcSet ? (
				<AvatarImage
					alt={alt}
					src={src}
					srcSet={srcSet}
					sizes={sizes}
					styles={imgStyles}
					{...imgProps}
				/>
			) : (
				children
			)}
		</Component>
	);
}

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
	/**
	 * Used in combination with `src` or `srcSet` to
	 * provide an alt attribute for the rendered `img` element.
	 */
	alt: PropTypes.string,
	/**
	 * Used to render icon or text elements inside the Avatar.
	 * `src` and `alt` props will not be used and no `img` will
	 * be rendered by default.
	 *
	 * This can be an element, or just a string.
	 */
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	/**
	 * Attributes applied to the `img` element if the component
	 * is used to display an image.
	 */
	imgProps: PropTypes.object,
	/**
	 * The `sizes` attribute for the `img` element.
	 */
	sizes: PropTypes.string,
	/**
	 * The `src` attribute for the `img` element.
	 */
	src: PropTypes.string,
	/**
	 * The `srcSet` attribute for the `img` element.
	 */
	srcSet: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getColors.propTypes,
	...getSpacing.propTypes,
	...getText.propTypes,
};

Avatar.defaultProps = {
	as: 'div',
	fontFamily: 'ui',
};

export default Avatar;
