/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import posed from 'react-pose';
import { tween } from 'popmotion';
import { styled } from 'styletron-react';
import { themify } from './../styled';
import { DURATION } from './TouchRipple';

/**
 * StyledRipple component
 */
const StyledRipple = styled('span', ({ $theme, $visible, $pulsate }) => {
	let next = {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 50,
		height: 50,
		opacity: 0,
	};

	if ($visible) {
		next = {
			...next,
			...{
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
				animationTimingFunction: $theme.easing.easeInOut,
			},
		};
	}

	if ($pulsate) {
		next = {
			...next,
			...{
				animationDuration: `${$theme.duration.shorter}ms`,
			},
		};
	}

	return next;
});

// StyledWave component
const StyledWave = styled('span', ({ $theme, $leaving, $pulsate }) => {
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
		next = {
			...next,
			...{
				animationName: {
					from: {
						opacity: 1,
					},
					to: {
						opacity: 0,
					},
				},
				animationDuration: `${DURATION}ms`,
				animationTimingFunction: $theme.easing.easeInOut,
			},
		};
	}

	if ($pulsate) {
		next = {
			...next,
			...{
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
				animationTimingFunction: $theme.easing.easeInOut,
				animationDelay: '200ms',
				animationIterationCount: 'infinite',
			},
		};
	}

	return next;
});

const getRippleStyles = (rippleSize, rippleX, rippleY) => ({
	width: rippleSize,
	height: rippleSize,
	top: -(rippleSize / 2) + rippleY,
	left: -(rippleSize / 2) + rippleX,
});

// Composed Ripple component
class Ripple extends Component {
	state = {
		visible: false,
		leaving: false,
	};

	shouldComponentUpdate(nextProps, nextState) {
		return this.props !== nextProps && this.state === nextState;
	}

	handleEnter = () => this.setState({ visible: true });

	handleExit = () => this.setState({ leaving: true });

	render() {
		const {
			className: classNameProp,
			pulsate,
			rippleX,
			rippleY,
			rippleSize,
			styles,
			theme,
			...passThru
		} = this.props;

		const { visible, leaving } = this.state;

		return (
			<Transition onEnter={this.handleEnter} onExit={this.handleExit} {...passThru}>
				<StyledRipple
					className={classNameProp}
					$visible={visible}
					$pulsate={pulsate}
					$theme={theme}
					style={getRippleStyles(rippleSize, rippleX, rippleY)}
				>
					<StyledWave $leaving={leaving} $pulsate={pulsate} $theme={theme} />
				</StyledRipple>
			</Transition>
		);
	}
}

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

export default themify(Ripple);
