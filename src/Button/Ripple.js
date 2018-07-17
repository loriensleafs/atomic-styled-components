import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { styled } from './../styled';

const StyledRipple = styled('span', ({ theme, ...props }) => {});

const StyledRippleContent = styled('span', ({ theme, ...props }) => {});

class Ripple extends Component {
	state = {
		visible: false,
		leaving: false,
	};

	handleEnter = () => {
		this.setState({
			visible: true,
		});
	};

	handleExit = () => {
		this.setState({
			leaving: true,
		});
	};

	render() {
		const { className = '', pulstae, rippleX, rippleY, rippleSize, ...passThruProps } = this.props;
		const { visible, leaving } = this.state;
		const rippleStyles = {
			width: rippleSize,
			height: rippleSize,
			top: -(rippleSize / 2) + rippleY,
			left: -(rippleSize / 2) + rippleX,
		};

		return (
			<Transition onEnter={this.handleEnter} onExit={this.handleExit} {...passThruProps}>
				<StyledRipple style={rippleStyles}>
					<StyledRippleContent />
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

export default Ripple;
