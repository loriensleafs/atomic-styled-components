/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import merge from './../utils/pureRecursiveMerge';
import { styled } from 'styletron-react';
import ThemeContext from './../theme/ThemeContext';
import { DURATION } from './TouchRipple';

const RippleSurface = styled('span', ({ $theme, $visible, $pulsate }) => {
	let next = {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 50,
		height: 50,
		opacity: 0,
	};

	if ($visible) {
		next = merge({}, next, {
			opacity: 0.3,
			transform: 'scale(1)',
			animationName: {
				from: {
					transform: 'scale(0) translate3d(0,0,0)',
					opacity: 0.1,
				},
				to: {
					transform: 'scale(1) translate3d(0,0,0)',
					opacity: 0.3,
				},
			},
			animationDuration: `${DURATION}ms`,
			animationTimingFunction: `cubic-bezier(${$theme.easing.inOut.join()})`,
		});
	}

	if ($pulsate) {
		next = merge({}, next, {
			animationDuration: `${$theme.duration.shortest}ms`,
		});
	}

	return next;
});

RippleSurface.propTypes = {
	$pulsate: PropTypes.bool,
	$theme: PropTypes.object,
	$visible: PropTypes.bool,
};

RippleSurface.displayName = 'RippleSurface';

const RippleWave = styled('span', ({ $theme, $leaving, $pulsate }) => {
	let next = {
		position: 'relative',
		width: '100%',
		height: '100%',
		display: 'block',
		opacity: 1,
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	};

	if ($leaving) {
		next = merge({}, next, {
			animationName: {
				from: {
					opacity: 1,
				},
				to: {
					opacity: 0,
				},
			},
			animationDuration: `${DURATION}ms`,
			animationTimingFunction: `cubic-bezier(${$theme.easing.inOut.join()})`,
		});
	}

	if ($pulsate) {
		next = merge({}, next, {
			position: 'absolute',
			left: 0,
			top: 0,
			animationName: {
				'0%': {
					transform: 'scale(1)',
				},
				'50%': {
					transform: 'scale(0.92)',
				},
				'100%': {
					transform: 'scale(1)',
				},
			},
			animationDuration: '2500ms',
			animationTimingFunction: `cubic-bezier(${$theme.easing.inOut.join()}`,
			animationDelay: '200ms',
			animationIterationCount: 'infinite',
		});
	}

	return next;
});

RippleWave.propTypes = {
	$leaving: PropTypes.bool,
	$pulsate: PropTypes.bool,
	$theme: PropTypes.object,
};

RippleWave.displayName = 'RippleWave';

const getInlineStyles = (rippleSize, rippleX, rippleY) => ({
	width: rippleSize,
	height: rippleSize,
	top: -(rippleSize / 2) + rippleY,
	left: -(rippleSize / 2) + rippleX,
});

class Ripple extends Component {
	state = {
		visible: false,
		leaving: false,
	};

	handleEnter = () => {
		this.setState({ visible: true });
	};

	handleExit = () => {
		this.setState({ leaving: true });
	};

	render() {
		const { theme } = this.context;
		const {
			className: classNameProp,
			pulsate,
			rippleX,
			rippleY,
			rippleSize,
			styles,
			...passThru
		} = this.props;

		const { visible, leaving } = this.state;

		return (
			<Transition onEnter={this.handleEnter} onExit={this.handleExit} {...passThru}>
				<RippleSurface
					className={classNameProp}
					$pulsate={pulsate}
					style={getInlineStyles(rippleSize, rippleX, rippleY)}
					$theme={theme}
					$visible={visible}>
					<RippleWave $leaving={leaving} $pulsate={pulsate} $theme={theme} />
				</RippleSurface>
			</Transition>
		);
	}
}

Ripple.contextType = ThemeContext;

Ripple.propTypes = {
	className: PropTypes.string,
	pulsate: PropTypes.bool,
	rippleSize: PropTypes.number,
	rippleX: PropTypes.number,
	rippleY: PropTypes.number,
};

Ripple.defaultProps = {
	pulsate: false,
};

export default Ripple;
