import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Fade from './../Fade';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';

const getBaseStyles = props => ({
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
});

const Backdrop = React.memo(function Backdrop(props) {
	const {
		className: classNameProp,
		invisible,
		onClick,
		open,
		styles: stylesProp,
		...passThru
	} = props;
	const styles = useStyles([getBaseStyles], props);
	const className = useMemo(() => cn(classNameProp, styles), [classNameProp, invisible, styles]);

	const handleClick = useCallback(event => onClick && onClick(event), []);

	return (
		<Fade in={open}>
			<div className={className} onClick={handleClick} aria-hidden="true" />
		</Fade>
	);
});

Backdrop.displayName = 'Backdrop';

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
