# react-native-animated-tabs
Animated Tabs for React Native. Both for iOS and Android.
Just swipe between tabs to navigate.

#### Changelog:
v 1.1.0
* Fixed bug on Android
* Supported navigation between tabs with external buttons (see example)

v 1.2.0
* Reinitialisation of component when Children are changed
* Pass onMoveShouldSetPanResponder handler to set on which swipes animation should react. 
For example to react only on horizontal swipes:
```
    onMoveShouldSetPanResponder={(a, e) => {
        return Math.abs(e.dx) > 30 && Math.abs(e.dx) > Math.abs(e.dy) * 1.5;
    }}
```

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
`onMoveShouldSetPanResponder`  | function | should animation be started | undefined (start immediately) 
`panelStyle`  | object | animated view styles |   
`panelWidth`  | number | animated view width | deviceWidth / 1.4
`swipeThreshold`  | number | threshold - to start or cancel swipe | deviceWidth / 7
`sidePanelOpacity`  | number | opacity of not active panels | 1
`sidePanelScale`  | number | scale of not active panels | 0.8
