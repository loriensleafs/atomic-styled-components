import React, { cloneElement, forwardRef, isValidElement } from 'react';
import PropTypes from 'prop-types';
import AvatarImage from './AvatarImage';
import combine from '../utils/combine';
import cn from '../system/className';
import { getColors, getSpacing, getText, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils/propTypes';

function getColorStyles(props) {
	const {
		color,
		theme: { palette },
	} = props;

	return (
		color === 'default' &&
		getColors({
			bg: `grey.${palette.type}`,
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

const Avatar = forwardRef((props, ref) => {
	const [
		{ classes },
		{
			alt,
			as: Component,
			children,
			className,
			childrenClassName,
			imgProps,
			imgStyles,
			sizes,
			src,
			srcSet,
			...passThru
		},
	] = useStyles(props, getStyles, { baseStyles });

	return (
		<Component className={classes} ref={ref} {...passThru}>
			{src || srcSet ? (
				<AvatarImage
					alt={alt}
					src={src}
					srcSet={srcSet}
					sizes={sizes}
					styles={imgStyles}
					{...imgProps}
				/>
			) : childrenClassName && isValidElement(children) ? (
				cloneElement(children, {
					className: cn(childrenClassName, children.props.className),
				})
			) : (
				children
			)}
		</Component>
	);
});

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
	className: PropTypes.string,
	childrenClassName: PropTypes.string,
	classes: PropTypes.object,
	// If an image, attributes applied to the 'img' element.
	imgProps: PropTypes.object,
	// The `sizes` attribute for the `img` element.
	sizes: PropTypes.string,
	// The `src` attribute for the `img` element.
	src: PropTypes.string,
	// The `srcSet` attribute for the `img` element.
	srcSet: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

Avatar.defaultProps = {
	as: 'div',
	fontFamily: 'ui',
};

export default Avatar;
