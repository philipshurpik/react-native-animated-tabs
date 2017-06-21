import React, {Component, PropTypes} from 'react';
import {View, Animated, PanResponder, StyleSheet, Dimensions} from 'react-native';
import AnimatedTabPanel from './AnimatedTabPanel';
const deviceWidth = Dimensions.get('window').width;

class AnimatedTabs extends Component {
	state = this.initialize(this.props);

	initialize(props) {
		validate(props);
		return {
			panels: props.children,
			activePanel: props.activePanel,
			x: new Animated.Value(0),
			animatedConfig: props.animatedConfig
		};
	}

	componentWillMount() {
		const {onMoveShouldSetPanResponder} = this.props;
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: onMoveShouldSetPanResponder ? () => false : () => true,
			onMoveShouldSetPanResponder: onMoveShouldSetPanResponder ? onMoveShouldSetPanResponder : () => false,
			onMoveShouldSetPanResponderCapture: () => false,
			onPanResponderMove: (a, e) => Animated.event([{dx: this.state.x}])(e),
			onPanResponderRelease: () => this._onPanResponderRelease()
		});
	}

	componentWillReceiveProps(props) {
		if (props.activePanel !== this.state.activePanel) {
			const direction = Math.sign(this.state.activePanel - props.activePanel);
			this._animate(this.props.panelWidth * direction, props.activePanel);
		}
		if (this.props.children !== props.children) {
			this.setState(this.initialize(props));
		}
	}

	render() {
		const {panelStyle, panelWidth, sidePanelOpacity, sidePanelScale} = this.props;
		const {activePanel, x} = this.state;
		const margin = -panelWidth + (deviceWidth - panelWidth) / 2;
		const translateX = margin + activePanel * -panelWidth;
		const panels = [null, ...this.state.panels, null];
		const width = panelWidth * panels.length;

		return (
			<View style={[styles.panels, this.props.style, {width, transform: [{translateX}]}]}>
				{panels.map((panel, index) =>
					<AnimatedTabPanel
						key={index}
						index={index-1}
						width={panelWidth}
						translateX={x}
						activePanel={activePanel}
						panHandlers={this._panResponder.panHandlers}
						panelStyle={panelStyle}
						sideOpacity={sidePanelOpacity}
						sideScale={sidePanelScale}
					>
						{panel}
					</AnimatedTabPanel>
				)}
			</View>
		);
	}

	_onPanResponderRelease() {
		const {panelWidth, swipeThreshold} = this.props;
		const {x, panels, activePanel} = this.state;
		const direction = x._value > 0 ? 1 : -1;
		const canMove = (direction > 0 && activePanel > 0) || (direction < 0 && activePanel < panels.length - 1);

		if (Math.abs(x._value) > swipeThreshold && canMove) {
			this._animate(panelWidth * direction, activePanel - direction);
		} else {
			this._animate(0, activePanel);
		}
	}

	_animate(toValue, activePanel) {
		let {animatedConfig, x} = this.state;

		animatedConfig.toValue = toValue;
		this.props.onAnimate(activePanel);
		Animated.spring(x, animatedConfig).start(() => {
			x.setValue(0);
			this.setState({activePanel});
			this.props.onAnimateFinish(activePanel);
		});
	}
}

AnimatedTabs.propTypes = {
	activePanel: PropTypes.number,
	animatedConfig: PropTypes.object,
	children: PropTypes.array.isRequired,
	onAnimate: PropTypes.func,
	onAnimateFinish: PropTypes.func,
	onMoveShouldSetPanResponder: PropTypes.func,
	panelStyle: PropTypes.object,
	panelWidth: PropTypes.number,
	swipeThreshold: PropTypes.number,
	sidePanelOpacity: PropTypes.number,
	sidePanelScale: PropTypes.number
};

AnimatedTabs.defaultProps = {
	activePanel: 0,
	animatedConfig: {
		tension: 70,
		friction: 10
	},
	onAnimate: () => undefined,
	onAnimateFinish: () => undefined,
	panelWidth: deviceWidth / 1.4,
	swipeThreshold: deviceWidth / 7
};

function validate(props) {
	if (!props.children) {
		throw new Error('Animated Tabs: should have at least one panel in children');
	}
	if (props.activePanel >= props.children.length) {
		throw new Error('Animated Tabs: activePanel index can\'t be larger than panels count');
	}
}

const styles = StyleSheet.create({
	panels: {
		flex: 1,
		top: 0,
		alignItems: 'flex-start',
		flexDirection: 'row'
	}
});

export default AnimatedTabs;
