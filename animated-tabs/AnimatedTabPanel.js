'use strict';

var React = require('react-native');
var { Component, Animated, StyleSheet } = React;

var Dimensions = require('Dimensions');
const deviceWidth = Dimensions.get('window').width;

class AnimatedTabPanel extends Component {
    render() {
        var animateStyles = {
            transform: [{translateX: this.props.x}, {scale: this.getScale()}],
            opacity: this.getOpacity(),
            shadowOpacity: this.getIOSShadowOpacity(),
            elevation: this.getAndroidElevation()
        };
        var contentStyles = this.props.children ? styles.contentPanel : null;
        var panelStyles = [styles.panel, contentStyles, animateStyles];

        return (
            <Animated.View style={panelStyles} {...this.props.panHandlers}>
                {this.props.children}
            </Animated.View>
        );
    }

    getOpacity() {
        const SIDE_OPACITY = 0.5;
        var opacityRange = this.props.isMain ? [SIDE_OPACITY, 1, SIDE_OPACITY] : [1, SIDE_OPACITY, 1];
        return this.props.x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: opacityRange});
    }

    getIOSShadowOpacity() {
        const SHADOW_OPACITY = 0.7;
        var shadowRange = this.props.isMain ? [SHADOW_OPACITY, 0, SHADOW_OPACITY] : [0, SHADOW_OPACITY, 0];
        return this.props.x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: shadowRange});
    }

    getAndroidElevation() {
        const MAX_ELEVATION = 15;
        var elevationRange = this.props.isMain ? [MAX_ELEVATION, 0, MAX_ELEVATION] : [0, MAX_ELEVATION, 0];
        return this.props.x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: elevationRange});
    }

    getScale() {
        const SIDE_SCALE = 0.8;
        var scaleRange = this.props.isMain ? [SIDE_SCALE, 1, SIDE_SCALE] : [1, SIDE_SCALE, 1];
        return this.props.x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: scaleRange});
    }
}

AnimatedTabPanel.propTypes = {
    children: React.PropTypes.object,
    x: React.PropTypes.object.isRequired,
    isMain: React.PropTypes.bool.isRequired,
    panHandlers: React.PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    panel: {
        width: deviceWidth
    },
    contentPanel: {
        backgroundColor: '#C1F7DD',
        padding: 15,
        borderColor: 'rgba(0,0,0,0.1)',

        /* Only iOS */
        shadowColor: '#000',
        shadowOffset: {height: 5},
        shadowRadius: 10

        /* Android uses elevation property */
    }
});

module.exports = AnimatedTabPanel;