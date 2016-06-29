import React, {Component, PropTypes} from 'react';
import {Animated, Dimensions} from 'react-native';

class AnimatedTabPanel extends Component {
	render() {
		const {translateX, sideScale, sideOpacity, width, panelStyle, panHandlers, children} = this.props;

		var animatedStyle = {
			transform: [
				{translateX},
				{scale: this.getAnimatedStyle(1, sideScale)}
			],
			opacity: this.getAnimatedStyle(1, sideOpacity)
		};
		var styles = [{width}, panelStyle, animatedStyle];

		return <Animated.View style={styles} {...panHandlers}>
			{children}
		</Animated.View>
	}

	getAnimatedStyle(centerValue, sideValue) {
		const {index, activePanel, width, translateX} = this.props;
		let isCenter = index === activePanel;

		if (Math.abs(index - activePanel) > 1) {
			return sideValue;
		}

		let outputRange = isCenter ? [sideValue, centerValue, sideValue] : [centerValue, sideValue, centerValue];
		return translateX.interpolate({inputRange: [-width, 0, width], outputRange});
	}
}

AnimatedTabPanel.propTypes = {
	activePanel: PropTypes.number.isRequired,
	children: PropTypes.object,
	index: PropTypes.number.isRequired,
	panelStyle: PropTypes.object,
	panHandlers: PropTypes.object.isRequired,
	sideOpacity: PropTypes.number,
	sideScale: PropTypes.number,
	translateX: PropTypes.object.isRequired,
	width: PropTypes.number.isRequired
};

AnimatedTabPanel.defaultProps = {
	sideOpacity: 1,
	sideScale: 0.8
};

export default AnimatedTabPanel;