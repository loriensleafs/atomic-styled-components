import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
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
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

const useStyles = props => useMemo(() => getStyles(props), [props.invisible, props.styles]);

const Backdrop = React.memo(function Backdrop(props) {
	const { className: classNameProp, invisible, open } = props;
	const className = useMemo(() => cn(classNameProp, useStyles(props)), [
		classNameProp,
		invisible,
	]);

	return (
		<Fade in={open}>
			<div className={className} aria-hidden="true" />
		</Fade>
	);
});

Backdrop.propTypes = {
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * If `true`, the backdrop is invisible.
	 * It can be used when rendering a popover or a custom select component.
	 */
	invisible: PropTypes.bool,
	/**
	 * If `true`, the backdrop is open.
	 */
	open: PropTypes.bool.isRequired,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Backdrop.defaultProps = {
	invisible: false,
};

export default Backdrop;
