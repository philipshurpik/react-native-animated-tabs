import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import AnimatedTabs from 'react-native-animated-tabs';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const panelWidth = deviceWidth / 1.3;

class AnimatedTabsExample extends Component {
	render() {
		return (
			<View style={styles.animatedView}>
				<AnimatedTabs panelWidth={panelWidth}>
					<View style={[styles.tabContent]}>
						<Image style={styles.image} source={require('./images/cat1.gif')} resizeMode='stretch'/>
					</View>
					<View style={[styles.tabContent, {backgroundColor: '#C1F7DD'}]}>
						<Text style={styles.text}>Tab 2 Header</Text>
						<Image style={styles.image} source={require('./images/cat3.gif')} resizeMode='cover'/>
					</View>
					<View style={[styles.tabContent]}>
						<Image style={styles.image} source={require('./images/cat2.gif')} resizeMode='stretch'/>
					</View>
					<View style={[styles.tabContent, {backgroundColor: 'orange'}]}>
						<Text style={styles.text}>Tab 3 Text Content</Text>
					</View>
				</AnimatedTabs>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	animatedView: {
		marginTop: deviceHeight / 4,
		flex: 1
	},
	tabContent: {
		height: deviceHeight - deviceHeight / 2,
		width: panelWidth
	},
	image: {
		flex: 1,
		width: panelWidth
	},
	text: {
		padding: 15,
		alignSelf: 'center'
	}
});

export default AnimatedTabsExample;