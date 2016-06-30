import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import AnimatedTabs from './src/AnimatedTabs';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const panelWidth = deviceWidth / 1.3;

const panelsCount = 4;

class AnimatedTabsExample extends Component {
	constructor() {
		super();

		this.state = {
			activePanel: 0
		}
	}

	render() {
		return (
			<View style={styles.animatedView}>
				<AnimatedTabs
					panelWidth={panelWidth}
					activePanel={this.state.activePanel}
					onAnimateFinish={activePanel => this.setState({activePanel})}
				>
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

				<View style={styles.buttons}>
					<TouchableOpacity style={styles.text} onPress={() => this.goToPanel(-1)}>
						<Text>Previous</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.text} onPress={() => this.goToPanel(1)}>
						<Text>Next</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	goToPanel(direction) {
		const nextPanel = this.state.activePanel + direction;

		if (nextPanel >= 0 && nextPanel < panelsCount) {
			this.setState({activePanel: nextPanel});
		}
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
	},
	buttons: {
		flexDirection: 'row'
	}
});

export default AnimatedTabsExample;