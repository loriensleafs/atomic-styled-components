import PropTypes from 'prop-types';
import tag from 'clean-tag';
import merge from './../utils/pureRecursiveMerge';
import { fade } from './../utils/colorHelpers';
import { styled } from 'styletron-react';
import { themify } from './../theme';

const getAbsoluteStyles = ({ $absolute }) =>
	$absolute
		? {
				position: 'absolute',
				bottom: 0,
				left: 0,
				width: '100%',
			}
		: null;

const Divider = styled(tag, ({ $absolute, $inset, $light, $styles, theme: { palette } }) =>
	merge(
		{
			width: '100%',
			height: '1px',
			margin: $inset ? '72px' : 0,
			border: 'none',
			flexShrink: 0,
			backgroundColor: $light ? fade(palette.divider, 0.08) : palette.divider,
		},
		getAbsoluteStyles({ $absolute }),
		$styles,
	),
);

Divider.displayName = 'Divider';

Divider.propTypes = {
	$absolute: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * If `true`, the divider will be indented.
	 */
	$inset: PropTypes.bool,
	/**
	 * If `true`, the divider will have a lighter color.
	 */
	$light: PropTypes.bool,
	$styles: PropTypes.object,
};

Divider.defaultProps = {
	is: 'hr',
	$absolute: false,
	$inset: false,
	$light: false,
	$styles: {},
};

export default themify(Divider);
