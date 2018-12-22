import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';

function isHorizontal(props) {
	return ['left', 'right'].indexOf(props.anchor) !== -1;
}

const getPositionStyles = props => {
	switch (props.anchor) {
		case 'top':
			return {
				rootStyles: {
					bottom: 'auto',
					right: '0px',
				},
			};

		case 'right':
			return {
				rootStyles: {
					left: 'auto',
					right: '0px',
				},
			};

		case 'bottom':
			return {
				rootStyles: {
					top: 'auto',
					bottom: '0px',
					right: '0px',
				},
			};

		case 'left':
			return {
				rootStyles: {
					right: 'auto',
				},
			};

		default:
			return null;
	}
};

const getBaseStyles = props => ({
	rootStyles: {
		zIndex: 1199,
		position: 'fixed',
		top: '0px',
		left: '0px',
		bottom: '0px',
	},
});

function SwipeArea(props) {
	const { anchor, className: classNameProp, styles, width, ...passThru } = props;
	const { theme } = useContext(ThemeContext);
	const { rootStyles } = useStyles([getBaseStyles, getPositionStyles], {
		anchor,
		styles,
		width,
		theme,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return (
		<div
			className={className}
			style={{
				[isHorizontal(props) ? 'width' : 'height']: width,
			}}
			{...passThru}
		/>
	);
}

SwipeArea.displayName = 'SwipeArea';

SwipeArea.propTypes = {
	/**
	 * Side on which to attach the discovery area.
	 */
	anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']).isRequired,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * The width of the left most (or right most) area in pixels where the
	 * drawer can be swiped open from.
	 */
	width: PropTypes.number.isRequired,
};

export default SwipeArea;
