import React, {StyleSheet, Component, View, Text, Dimensions} from 'react-native';
import AnimatedTabs from 'react-native-animated-tabs';

const deviceHeight = Dimensions.get('window').height;

class AnimatedTabsExample extends Component {
	render() {
		return (
			<View style={styles.cc}>
				<View style={styles.animatedView}>
					<AnimatedTabs>
						<View style={styles.tabContent}>
							<Text>1</Text>
						</View>
						<View style={styles.tabContent}>
							<Text>2</Text>
						</View>
						<View style={styles.tabContent}>
							<Text>3</Text>
						</View>
					</AnimatedTabs>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	cc: {
		flex: 1
	},
	animatedView: {
		flex: 1,
	},
	tabContent: {
		height: 300,
		backgroundColor: '#C1F7DD',
		padding: 15,
		borderColor: 'rgba(0,0,0,0.1)'
	}
});

export default AnimatedTabsExample;