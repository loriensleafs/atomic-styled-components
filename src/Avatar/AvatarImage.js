import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../system/useStyles';

const baseStyles = {
	width: '100%',
	height: '100%',
	textAlign: 'center',
	objectFit: 'cover',
};

function AvatarImage(props) {
	const {
		classes,
		props: { alt, ...passThru },
	} = useStyles(props, null, {
		baseStyles,
	});

	return <img alt={alt} className={classes} {...passThru} />;
}

AvatarImage.displayName = 'AvatarImage';

AvatarImage.propTypes = {
	/**
	 * Used in combination with `src` or `srcSet` to
	 * provide an alt attribute for the rendered `img` element.
	 */
	alt: PropTypes.string,
	// The `sizes` attribute for the `img` element.
	sizes: PropTypes.string,
	// The `src` attribute for the `img` element.
	src: PropTypes.string,
	// The `srcSet` attribute for the `img` element.
	srcSet: PropTypes.string,
};

export default AvatarImage;
