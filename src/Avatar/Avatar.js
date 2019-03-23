import PropTypes from 'prop-types';
import React, { cloneElement, forwardRef, isValidElement } from 'react';
import { getColor, getColors, getSpacing, getText, useStyles } from '../system';
import cn from '../system/className';
import combine from '../utils/combine';
import { componentPropType, stylesPropType } from '../utils/propTypes';
import AvatarImage from './AvatarImage';

const getColorStyles = props => {
	const {
		children,
		src,
		srcSet,
		theme: { palette },
	} = props;
	const colorStyles =
		!src && !srcSet && children
			? {
					backgroundColor:
						palette.grey[
							palette.type === 'light' ? 'main' : 'light'
						],
					color: palette.bg.default,
			  }
			: {};

	return { ...getColor(props), ...colorStyles };
};

const getStyles = combine(getColorStyles, getSpacing, getText);
getStyles.propTypes = {
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
	// The `src` attribute for the `img` element.
	src: PropTypes.string,
	// The `srcSet` attribute for the `img` element.
	srcSet: PropTypes.string,
	...getColors.propTypes,
	...getSpacing.propTypes,
	...getText.propTypes,
};

const baseStyles = {
	position: 'relative',
	width: '40px',
	height: '40px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
	borderRadius: '50%',
	overflow: 'hidden',
	userSelect: 'none',
};

const Avatar = forwardRef((props, ref) => {
	const {
		classes,
		props: {
			alt,
			as: Component,
			children: childrenProp,
			childrenClassName,
			imgProps,
			imgStyles,
			sizes,
			src,
			srcSet,
			...passThru
		},
	} = useStyles({ ...props, fontFamily: 'ui' }, getStyles, {
		baseStyles,
		whitelist: ['children', 'src', 'srcSet'],
	});
	let children = childrenProp;

	if (src || srcSet) {
		children = (
			<AvatarImage
				alt={alt}
				src={src}
				srcSet={srcSet}
				sizes={sizes}
				styles={imgStyles}
				{...imgProps}
			/>
		);
	} else if (childrenClassName && isValidElement(childrenProp)) {
		children = cloneElement(childrenProp, {
			className: cn(childrenClassName, childrenProp.props.className),
		});
	}

	return (
		<Component className={classes} ref={ref} {...passThru}>
			{children}
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
	className: PropTypes.string,
	childrenClassName: PropTypes.string,
	classes: PropTypes.object,
	// If an image, attributes applied to the 'img' element.
	imgProps: PropTypes.object,
	// The `sizes` attribute for the `img` element.
	sizes: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

Avatar.defaultProps = {
	as: 'div',
};

export default Avatar;
