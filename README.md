# react-native-animated-tabs
Animated Tabs for React Native. Both for iOS and Android.
Just swipe between tabs to navigate. Or press on tabbar labels.

#### See example of usage:
- index.android.js: header tab bar with labels
- index.ios.js: footer tab bar with labels + carousel scrolling

----------

#### Usage: 
Just copy animated-tabs folder to your app and use it in code

To change color scheme - just change color values in files. Soon you will be able to set your colors in component

----------

#### API:
Property     | Type | Description | Default value
------------ | ---- | ----------- | -------------
`selectedIndex` | number | tab to start | 0
`carousel`      | bool | carousel scrolling | false
`tabBarStyle`   | enum('header', 'footer') | style for tabbar | 'header'
`tabBarLabels`  | arrayOf(string) | tab labels | 

`tabBarLabels` need to be specified to render tabBar
