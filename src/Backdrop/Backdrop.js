import React from 'react';
import Fade from './../Fade';
import cn from './../theme/className';
import merge from './../utils/pureRecursiveMerge';
import { isFunc } from './../utils/helpers';

const getStyles = props =>
	merge(
		{
			zIndex: -1,
			position: 'fixed',
			right: 0,
			bottom: 0,
			top: 0,
			left: 0,
			backgroundColor: props.invisible ? 'transparent' : 'rgba(0,0,0,0.5)',
			// Removes the grey highlight.
			WebkitTapHighlightColor: 'transparent',
			// Disable scroll capabilities
			touchAction: 'none',
		},
		isFunc(props.styles) ? props.styles(props) : props.styles,
	);

const Backdrop = React.memo(function Backdrop(props) {
	const { className, invisible, open, ...passThru } = props;

	return (
		<Fade appear in={open} {...passThru}>
			<div className={cn(className, getStyles(props))} aria-hidden="true" />
		</Fade>
	);
});

Backdrop.propTypes = {};

Backdrop.defaultProps = {
	invisible: false,
};

export default Backdrop;
