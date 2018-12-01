import React, { cloneElement, isValidElement, useContext, useMemo } from 'react';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { space } from 'styled-system';
import { textColor, fontFamily, fontSize, fontWeight, lineHeight } from './../styles';

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

export const getStyles = props =>
	merge(
		{
			rootStyles: {
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyItems: 'center',
				flexShrink: 0,
				width: 40,
				height: 40,
				borderRadius: '50%',
				overflow: 'hidden',
				userSelect: 'none',
				...fontFamily(props),
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
		},
		getColorStyles(props),
		props.style,
	);

const useStyles = props => useMemo(() => getStyles(props), [props]);

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
	const { theme } = useContext(ThemeContext);
	const {
		alt,
		children,
		className: classNameProp,
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
		order,
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

	const { rootStyles, imageStyles } = useStyles({ ...props, ...{ theme } });
	const className = useMemo(() => cn(classNameProp, rootStyles), [rootStyles]);
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
			}
		</Component>
	);
}

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
	children: PropTypes.node,
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
	...fontFamily.propTypes,
	...fontSize.propTypes,
	...fontWeight.propTypes,
	...lineHeight.propTypes,
	...space.propTypes,
};

Avatar.defaultProps = {
	component: 'div',
};

export default Avatar;
