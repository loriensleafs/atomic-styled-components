import React from 'react';
import PropTypes from 'prop-types';
import combine from '../utils/combine';
import { getSizing, getSpacing, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

const getBaseStyles = ({ isMedia }) => ({
	display: 'block',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	...getSizing({ w: isMedia ? 1 : null }),
});

const getStyles = combine(getBaseStyles, getSizing, getSpacing);
getStyles.propTypes = {
	isMedia: PropTypes.bool,
	...getSizing.propTypes,
	...getSpacing.propTypes,
};

function CardMedia(props) {
	const isMedia = MEDIA_COMPONENTS.indexOf(props.component) !== -1;
	const [
		{ classes },
		{ as: Component, className, image, src, style, ...passThru },
	] = useStyles({ ...props, isMedia }, getStyles);

	return (
		<Component
			className={classes}
			style={
				!isMedia && image
					? { backgroundImage: `url("${image}")`, ...style }
					: style
			}
			src={isMedia ? image || src : undefined}
			{...passThru}
		/>
	);
}

CardMedia.displayName = 'CardMedia';

CardMedia.propTypes = {
	className: PropTypes.string,
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
	style: PropTypes.object,
	...componentPropType,
	...stylesPropType,
	...getSizing.propTypes,
	...getSpacing.propTypes,
};

CardMedia.defaultProps = {
	as: 'div',
};

export default CardMedia;
