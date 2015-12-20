'use strict';

var React = require('react-native');
var { Component, View, StyleSheet } = React;
var AnimatedTabBarLabel = require('./AnimatedTabBarLabel.js');
var Dimensions = require('Dimensions');
const deviceWidth = Dimensions.get('window').width;

class AnimatedTabBar extends Component {
    render() {
        var tabs = this.props.children.map((tabLabel, i) => {
            return (
                <AnimatedTabBarLabel
                    tabLabel={tabLabel}
                    index={i}
                    key={i}
                    currentIndex={this.props.currentIndex}
                    onPress={this.props.onLabelPress}>
                </AnimatedTabBarLabel>
            );
        });

        return tabs ? (<View style={styles.tabHeader}>{tabs}</View>) : null;
    }
}

AnimatedTabBar.propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.string),
    currentIndex: React.PropTypes.number.isRequired,
    onLabelPress: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    tabHeader: {
        flex: 1,
        flexDirection: 'row',
        top: 0,
        left: deviceWidth,
        height: 44,
        width: deviceWidth,
        backgroundColor: '#92E4BE'
    }
});


module.exports = AnimatedTabBar;