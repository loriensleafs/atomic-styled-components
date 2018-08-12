/* eslint-disable no-unused-vars */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { classify, themify } from './../styled';
import Ripple from './Ripple';

export const DURATION = 550;
export const DELAY_RIPPLE = 80;

const rootStyles = {
	zIndex: 0,
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	display: 'block',
	overflow: 'hidden',
	borderRadius: 'inherit',
	pointerEvents: 'none',
	backfaceVisibility: 'hidden',
	perspective: 1000,
	willChange: 'transform',
};

class TouchRipple extends PureComponent {
	// Used to filter out mouse emulated events on mobile.
	// On touch events we set this flag to true.
	ignoringMouseDown = false;

	// We use a timer in order to only show the ripples for touch "click" like events.
	// We don't want to display the ripple for touch scroll events.
	startTimer = null;

	// This i sthe hook called once the previous timeout is ready.
	startTimerCommit = null;

	state = {
		nextKey: 0,
		ripples: [],
	};

	componentWillUnmount() {
		clearTimeout(this.startTimer);
	}

	pulsate = () => this.start({}, { pulsate: true });

	start = (event = {}, options = {}, cb) => {
		const {
			pulsate = false,
			center = this.props.center || options.pulsate,
			fakeElement = false, // For test purposes
		} = options;

		if (event.type === 'mousedown' && this.ignoringMouseDown) {
			this.ignoringMouseDown = false;
			return;
		}

		if (event.type === 'touchstart') this.ignoringMouseDown = true;

		const element = fakeElement ? null : ReactDOM.findDOMNode(this);
		const rect = element
			? element.getBoundingClientRect()
			: {
					width: 0,
					height: 0,
					left: 0,
					top: 0,
				};

		// Get the size of the ripple.
		let rippleX;
		let rippleY;
		let rippleSize;

		if (
			center ||
			(event.clientX === 0 && event.clientY === 0) ||
			(!event.clientX && !event.touches)
		) {
			rippleX = Math.round(rect.width / 2);
			rippleY = Math.round(rect.height / 2);
		} else {
			const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
			const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
			rippleX = Math.round(clientX - rect.left);
			rippleY = Math.round(clientY - rect.top);
		}

		if (center) {
			rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

			// For some reason the animation is broken on Mobile Chrome if the size if even.
			if (rippleSize % 2 === 0) {
				rippleSize += 1;
			}
		} else {
			const sizeX =
				Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
			const sizeY =
				Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
			rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
		}

		// Touch devices
		if (event.touches) {
			// Prepare the ripple effect.
			this.startTimerCommit = () => {
				this.startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
			};
			// Delay the execution of the ripple effect.
			this.startTimer = setTimeout(() => {
				if (this.startTimerCommit) {
					this.startTimerCommit();
					this.startTimerCommit = null;
				}
			}, DELAY_RIPPLE);
		} else {
			this.startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
		}
	};

	startCommit = (params) => {
		const { pulsate, rippleX, rippleY, rippleSize, cb } = params;

		this.setState((state) => {
			return {
				nextKey: state.nextKey + 1,
				ripples: [
					...state.ripples,
					<Ripple
						key={state.nextKey}
						timeout={{
							exit: DURATION,
							enter: DURATION,
						}}
						pulsate={pulsate}
						rippleX={rippleX}
						rippleY={rippleY}
						rippleSize={rippleSize}
					/>,
				],
			};
		}, cb);
	};

	stop = (event, cb) => {
		clearTimeout(this.startTimer);
		const { ripples } = this.state;

		// The touch interaction occurs to quickly.
		// We still want to show the ripple effect.
		if (event.type === 'touchend' && this.startTimerCommit) {
			event.persist();
			this.startTimerCommit();
			this.startTimerCommit = null;
			this.startTimer = setTimeout(() => {
				this.stop(event, cb);
			}, 0);
			return;
		}

		this.startTimerCommit = null;

		if (ripples && ripples.length) {
			this.setState(
				{
					ripples: ripples.slice(1),
				},
				cb,
			);
		}
	};

	render() {
		const { center, className = '', innerRef, theme, ...passThru } = this.props;

		return (
			<TransitionGroup
				component="span"
				enter
				exit
				className={classify(rootStyles, className)}
				{...passThru}
			>
				{this.state.ripples}
			</TransitionGroup>
		);
	}
}

TouchRipple.propTypes = {
	/**
	 * If `true`, the ripple starts at the center of the component
	 * rather than at the point of interaction.
	 */
	center: PropTypes.bool,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	theme: PropTypes.object,
};

TouchRipple.defaultProps = {
	center: false,
};

export default themify(TouchRipple);
