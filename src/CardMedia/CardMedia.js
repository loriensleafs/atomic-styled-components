import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { maxHeight, maxWidth, minHeight, minWidth } from 'styled-system';
import { height, width } from './../styles';

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

const getMediaStyles = props =>
	props.isMedia && {
		rootStyles: {
			width: '100%',
		},
	};

const getBaseStyles = props => ({
	rootStyles: {
		display: 'block',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		...height(props),
		...maxHeight(props),
		...maxWidth(props),
		...minHeight(props),
		...minWidth(props),
		...width(props),
	},
});

function CardMedia(props) {
	const {
		className: classNameProp,
		component: Component,
		h,
		image,
		maxHeight,
		maxWidth,
		minHeight,
		minWidth,
		src,
		style,
		styles,
		w,
		...passThru
	} = props;
	const isMedia = MEDIA_COMPONENTS.indexOf(Component) !== -1;
	const { rootStyles } = useStyles(
		{ h, isMedia, maxHeight, maxWidth, minHeight, minWidth, styles, w },
		[h, isMedia, maxHeight, maxWidth, minHeight, minWidth, styles, w],
		[getBaseStyles, getMediaStyles],
	);
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);
	const composedStyle =
		!isMedia && image ? { backgroundImage: `url("${image}")`, ...style } : style;

	return (
		<Component
			className={className}
			style={composedStyle}
			src={isMedia ? image || src : undefined}
			{...passThru}
		/>
	);
}

CardMedia.displayName = 'CardMedia';

CardMedia.propTypes = {
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * Component for rendering image.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
	/**
	 * Image to be displayed as a background image.
	 * Either `image` or `src` prop must be specified.
	 * Note that caller must specify height otherwise the image will not be visible.
	 */
	image: PropTypes.string,
	/**
	 * An alias for `image` property.
	 * Available only with media components.
	 * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
	 */
	src: PropTypes.string,
	/**
	 * @ignore
	 */
	style: PropTypes.object,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	...height.propTypes,
	...maxHeight.propTypes,
	...maxWidth.propTypes,
	...minHeight.propTypes,
	...minWidth.propTypes,
	...width.propTypes,
};

CardMedia.defaultProps = {
	component: 'div',
};

export default CardMedia;
