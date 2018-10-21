import PropTypes from 'prop-types';
import tag from 'clean-tag';
import merge from './../utils/pureRecursiveMerge';
import { styled } from 'styletron-react';
import { themify } from './../themify';

const getAbsoluteStyles = ({ $absolute }) =>
	$absolute
		? {
				position: 'absolute',
				bottom: 0,
				left: 0,
				width: '100%',
			}
		: {};

const Divider = styled(tag, (props) =>
	merge(
		{
			...{
				width: '100%',
				height: '1px',
				margin: props.$inset ? '72px' : 0,
				border: 'none',
				flexShrink: 0,
				backgroundColor: props.theme.palette.divider[props.$light ? 'light' : 'main'],
			},
			...getAbsoluteStyles(props),
		},
		props.$styles,
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
