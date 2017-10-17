import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import AnimatedTabs from 'react-native-animated-tabs';

const getDeviceHeight = () => Dimensions.get('window').height;
const getDeviceWidth = () => Dimensions.get('window').width;
const getPanelWidth = () => getDeviceWidth() / 1.3;

const panelsCount = 4;

class AnimatedTabsExample extends Component {
	constructor() {
		super();

		this.state = {
			activePanel: 0
		}
	}

	render() {
		const animatedViewStyle = {flex: 1, marginTop: getDeviceHeight() / 4};
		const imageStyle = {flex: 1, width: getPanelWidth()};
		const tabContentStyle = {
			height: getDeviceHeight() - getDeviceHeight() / 2,
			width: getPanelWidth()
		};

		return (
			<View style={animatedViewStyle}>
				<AnimatedTabs
					panelWidth={getPanelWidth()}
					activePanel={this.state.activePanel}
					onAnimateFinish={activePanel => this.setState({activePanel})}
				>
					<View style={[tabContentStyle]}>
						<Image style={imageStyle} source={require('./images/cat1.gif')} resizeMode='stretch'/>
					</View>
					<View style={[tabContentStyle, {backgroundColor: '#C1F7DD'}]}>
						<Text style={styles.text}>Tab 2 Header</Text>
						<Image style={imageStyle} source={require('./images/cat3.gif')} resizeMode='cover'/>
					</View>
					<View style={[tabContentStyle]}>
						<Image style={imageStyle} source={require('./images/cat2.gif')} resizeMode='stretch'/>
					</View>
					<View style={[tabContentStyle, {backgroundColor: 'orange'}]}>
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

const styles = StyleSheet.create({
	text: {
		padding: 15,
		alignSelf: 'center'
	},
	buttons: {
		flexDirection: 'row'
	}
});

export default AnimatedTabsExample;