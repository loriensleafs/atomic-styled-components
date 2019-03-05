import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './../system/useStyles';
import { stylesPropType } from './../utils/propTypes';

function isHorizontal(props) {
	return ['left', 'right'].indexOf(props.anchor) !== -1;
}

const getPositionStyles = props => {
	switch (props.anchor) {
		case 'top':
			return {
				bottom: 'auto',
				right: '0px',
			};
		case 'right':
			return {
				left: 'auto',
				right: '0px',
			};
		case 'bottom':
			return {
				top: 'auto',
				bottom: '0px',
				right: '0px',
			};
		case 'left':
			return { right: 'auto' };
		default:
			return null;
	}
};

const baseStyles = {
	zIndex: 1199,
	position: 'fixed',
	top: '0px',
	left: '0px',
	bottom: '0px',
};

function SwipeArea(props) {
	const {
		classes,
		props: { width, ...passThru },
	} = useStyles(props, getPositionStyles, { baseStyles });

	return (
		<div
			className={classes}
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
	...stylesPropType,
	/**
	 * The width of the left most (or right most) area in pixels where the
	 * drawer can be swiped open from.
	 */
	width: PropTypes.number.isRequired,
};

export default SwipeArea;
