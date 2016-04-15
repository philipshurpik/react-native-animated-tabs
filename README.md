# react-native-animated-tabs
Animated Tabs for React Native. Both for iOS and Android.
Just swipe between tabs to navigate.

#### Usage: 
`npm i react-native-animated-tabs --save`

Example of usage:
```
<AnimatedTabs>
    <View style={styles.tabContent}>
        <Text style={styles.text}>Tab 1 Content</Text>
    </View>
    <View style={styles.tabContent}>
        <Text style={styles.text}>Tab 2 Content</Text>
    </View>
    <View style={styles.tabContent}>
        <Image style={styles.image} source={require('./images/cat1.gif')} resizeMode='stretch'/>
    </View>
</AnimatedTabs> 
```
More - in example folder

![](https://github.com/philipshurpik/react-native-animated-tabs/raw/master/tabs.gif)

----------

#### API:
Property     | Type | Description | Default value
------------ | ---- | ----------- | -------------
`activePanel` | number | active panel | 0
`animatedConfig`      | object | spring animation properties | { tension: 70, friction: 10 }
`onAnimate`  | function | animate start callback, returns next active panel index |   
`onAnimateFinish`  | function | animate finish callback, returns next active panel index |  
`panelStyle`  | object | animated view styles |   
`panelWidth`  | number | animated view width | deviceWidth / 1.4
`swipeThreshold`  | number | threshold - to start or cancel swipe | deviceWidth / 7
`sidePanelOpacity`  | number | opacity of not active panels | 1
`sidePanelScale`  | number | scale of not active panels | 0.8
