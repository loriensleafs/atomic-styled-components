import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../system/useStyles';
import cn from '../system/className';
import merge from '../utils/merge';

const baseStyles = {
	width: '100%',
	height: '100%',
	textAlign: 'center',
	objectFit: 'cover',
};

function AvatarImage(props) {
	const [{ classes }, { alt, ...passThru }] = useStyles(props, null, {
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
	alt: PropTypes.bool,
	// The `sizes` attribute for the `img` element.
	sizes: PropTypes.string,
	// The `src` attribute for the `img` element.
	src: PropTypes.string,
	// The `srcSet` attribute for the `img` element.
	srcSet: PropTypes.string,
};

export default AvatarImage;
