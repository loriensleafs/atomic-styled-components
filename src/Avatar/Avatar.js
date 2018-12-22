import React, { cloneElement, isValidElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';
import {
	backgroundColor,
	color as colorParser,
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
	space,
} from './../styles';

export const getColorStyles = props =>
	props.color === 'default'
		? {
				rootStyles: {
					color: props.theme.palette.bg.default,
					backgroundColor:
						props.theme.palette.grey[
							props.theme.palette.type === 'light' ? 'light' : 'dark'
						],
				},
		  }
		: {};

export const getBaseStyles = props => ({
	rootStyles: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
		width: '40px',
		height: '40px',
		fontFamily: props.theme.typography.fontFamily,
		borderRadius: '50%',
		overflow: 'hidden',
		userSelect: 'none',
		...backgroundColor(props),
		...colorParser(props),
		...fontSize(props),
		...fontWeight(props),
		...lineHeight(props),
		...space(props),
	},
	imageStyles: {
		width: '100%',
		height: '100%',
		textAlign: 'center',
		objectFit: 'cover',
	},
});

function AvatarImage(props) {
	const { alt, src, srcSet, sizes, className, ...passThru } = props;

	return (
		<img
			alt={alt}
			src={src}
			srcSet={srcSet}
			sizes={sizes}
			className={className}
			{...passThru}
		/>
	);
}

function Avatar(props) {
	const {
		alt,
		bg,
		children,
		className: classNameProp,
		color,
		component: Component,
		font,
		imageProps,
		lineHeight,
		m,
		mb,
		ml,
		mr,
		mt,
		mx,
		my,
		p,
		pb,
		pl,
		pr,
		pt,
		px,
		py,
		size,
		sizes,
		src,
		srcSet,
		styles,
		weight,
		...passThru
	} = props;
	const { rootStyles, imageStyles } = useStyles([getBaseStyles, getColorStyles], props);
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);
	const imageClassName = useMemo(() => cn(imageStyles), [imageStyles]);

	return (
		<Component className={className} {...passThru}>
			{src || srcSet ? (
				<AvatarImage
					alt={alt}
					src={src}
					srcSet={srcSet}
					sizes={sizes}
					className={imageClassName}
					{...imageProps}
				/>
			) : isValidElement(children) ? (
				cloneElement(children, { className: imageClassName })
			) : (
				children
			)}
		</Component>
	);
}

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
	...backgroundColor.propTypes,
	...colorParser.propTypes,
	...fontFamily.propTypes,
	...fontSize.propTypes,
	...fontWeight.propTypes,
	...lineHeight.propTypes,
	...space.propTypes,
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
        PropTypes.node
    ]),
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
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
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

Avatar.defaultProps = {
	component: 'div',
};

export default Avatar;
