'use strict';

var React = require('react-native');
var AnimatedTabs = require('./animated-tabs/AnimatedTabs.js');
var { AppRegistry, StyleSheet, Component, View, Text } = React;
var Dimensions = require('Dimensions');
const deviceHeight = Dimensions.get('window').height;

class ReactNativeAnimatedTabs extends Component {
    render() {
        var content = new Array(7).fill().map((x, i) => "Tab: " + (i + 1));
        var tabs = content.map(this.getPanelContent);

        return (
            <View style={styles.animatedView}>
                <AnimatedTabs tabLabels={content}>
                    {tabs}
                </AnimatedTabs>
            </View>
        );
    }

    getPanelContent(x, i) {
        return (
            <View key={i} style={styles.tabContent}>
                <Text>Content: {x}</Text>
            </View>
        )
    }
}

const HEADER_HEIGHT = 44;
const VIEW_TOP = 22;

var styles = StyleSheet.create({
    animatedView: {
        top: VIEW_TOP,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tabContent: {
        height: deviceHeight / 2 - HEADER_HEIGHT - VIEW_TOP
    }
});

AppRegistry.registerComponent('ReactNativeAnimatedTabs', () => ReactNativeAnimatedTabs);