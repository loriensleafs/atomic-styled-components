import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { height, maxHeight, maxWidth, minHeight, minWidth, space, width } from './../styles';

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
		...space(props),
		...width(props),
	},
});

function CardMedia(props) {
	const {
		className: classNameProp,
		component: Component,
		h,
		hMax,
		hMin,
		image,
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
		src,
		style,
		styles,
		w,
		wMax,
		wMin,
		...passThru
	} = props;
	const isMedia = MEDIA_COMPONENTS.indexOf(Component) !== -1;
	const { rootStyles } = useStyles([getBaseStyles, getMediaStyles], {
		h,
		hMax,
		hMin,
		isMedia,
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
		src,
		styles,
		w,
		wMax,
		wMin,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return (
		<Component
			className={className}
			style={!isMedia && image ? { backgroundImage: `url("${image}")`, ...style } : style}
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
	...space.propTypes,
	...width.propTypes,
};

CardMedia.defaultProps = {
	component: 'div',
};

export default CardMedia;
