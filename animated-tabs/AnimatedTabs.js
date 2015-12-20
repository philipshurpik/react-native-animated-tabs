'use strict';

var React = require('react-native');
var { View, Animated, Component, PanResponder, StyleSheet } = React;
var AnimatedTabPanel = require('./AnimatedTabPanel.js');
var AnimatedTabHeader = require('./AnimatedTabHeader.js');
var AnimatedTabsService = require('./AnimatedTabs.service.js');

const deviceWidth = require('Dimensions').get('window').width;
const MAX_ANIMATION_TIME = 700;
const SWIPE_THRESHOLD = deviceWidth / 3;
const ANIMATED_CONFIG = {
    tension: 25,
    friction: 6
};

class AnimatedTabs extends Component {
    constructor(props) {
        super(props);

        var panels = this.props.children;
        var indexes = AnimatedTabsService.init(panels, props);

        this.state = {
            panels: panels,
            pan: new Animated.ValueXY(),
            previous: indexes.previous,
            current: indexes.current,
            next: indexes.next,
            animatedConfig: this.props.animatedConfig || ANIMATED_CONFIG
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.state.transitionBlocked) {
            return;
        }

        if (newProps.selectedIndex !== this.state.current) {
            this.state.transitionBlocked = true;
            this._goToPanel(newProps.selectedIndex);
        }
    }

    componentWillMount() {
        var view = this;
        view._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderMove: Animated.event([
                null, {dx: view.state.pan.x}
            ]),

            onPanResponderRelease: () => {
                view.state.pan.flattenOffset();
                let isLeftDirection = view.state.pan.x._value > 0;
                let canMove = AnimatedTabsService.canMove(isLeftDirection);

                if (Math.abs(view.state.pan.x._value) > SWIPE_THRESHOLD && canMove) {
                    view._animateToPanel(isLeftDirection);
                } else {
                    view._cancelAnimation();
                }
            }
        });
    }

    render() {
        var x = this.state.pan.x;

        return (
            <View>
                <AnimatedTabHeader onLabelPress={this._goToPanel.bind(this)} currentIndex={this.state.current}>
                    {this.props.tabLabels}
                </AnimatedTabHeader>

                <View style={styles.panels}>
                    <AnimatedTabPanel key={1} x={x} isMain={false} panHandlers={this._panResponder.panHandlers}>
                        {this.state.panels[this.state.previous]}
                    </AnimatedTabPanel>
                    <AnimatedTabPanel key={2} x={x} isMain={true} panHandlers={this._panResponder.panHandlers}>
                        {this.state.panels[this.state.current]}
                    </AnimatedTabPanel>
                    <AnimatedTabPanel key={3} x={x} isMain={false} panHandlers={this._panResponder.panHandlers}>
                        {this.state.panels[this.state.next]}
                    </AnimatedTabPanel>
                </View>
            </View>
        );
    }

    _goToPanel(newIndex) {
        var isLeftDirection = newIndex < this.state.current;
        var indexes = AnimatedTabsService.forceMoveToIndex(newIndex);

        this.setState(indexes);
        this._animateToPanel(isLeftDirection);
    }

    _animateToPanel(isLeftDirection) {
        this.state.nextX = isLeftDirection ? deviceWidth : -deviceWidth;
        this.state.animatedConfig.toValue = {x: this.state.nextX, y: 0};

        Animated.spring(this.state.pan, this.state.animatedConfig).start(this._resetState.bind(this));

        setTimeout(() => this.state.pan.stopAnimation(), MAX_ANIMATION_TIME);
    }

    _resetState() {
        var indexes = this.state.nextX < 0 ? AnimatedTabsService.moveNext() : AnimatedTabsService.movePrevious();

        this.state.pan.setValue({x: 0, y: 0});
        this.setState(indexes);
        this.state.transitionBlocked = false;
    }

    _cancelAnimation() {
        this.state.animatedConfig.toValue = {x: 0, y: 0};
        Animated.spring(this.state.pan, this.state.animatedConfig).start();
    }
}

AnimatedTabs.propTypes = {
    selectedIndex: React.PropTypes.number,
    carousel: React.PropTypes.bool,
    tabStyle: React.PropTypes.oneOf(['headerTabs', 'footerTabs', 'headerLabel']),
    tabLabels: React.PropTypes.arrayOf(React.PropTypes.string)
};

AnimatedTabs.defaultProps = {
    selectedIndex: 0,
    carousel: false
};

const styles = StyleSheet.create({
    panels: {
        flex: 1,
        top: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row'
    }
});

module.exports = AnimatedTabs;
