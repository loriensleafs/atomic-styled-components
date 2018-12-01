import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import merge from './../utils/pureRecursiveMerge';
import cn from './../theme/className';
import { height, maxHeight, maxWidth, minHeight, minWidth, width } from './../styles';
import { isFunc } from './../utils/helpers';

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

const getMediaStyles = props =>
	props.isMedia && {
		width: '100%',
	};

const getStyles = props =>
	merge(
		{
			display: 'block',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
		},
		getMediaStyles(props),
		height(props),
		maxHeight(props),
		maxWidth(props),
		minHeight(props),
		minWidth(props),
		width(props),
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

const useStyles = props => useMemo(() => getStyles(props), [props]);

function CardMedia(props) {
	const {
		className: classNameProp,
		component: Component,
		image,
		src,
		style,
		styles,
		...passThru
	} = props;
	const isMedia = MEDIA_COMPONENTS.indexOf(Component) !== -1;
	const className = useMemo(() => cn(classNameProp, useStyles({ ...props, isMedia })), [props]);
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
