/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppComponent from './app/src/App'
import {name as appName} from './app.json';

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];

console.disableYellowBox = true // 关闭全部黄色警告

AppRegistry.registerComponent(appName, () => AppComponent);
