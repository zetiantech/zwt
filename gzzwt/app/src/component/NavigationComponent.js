/**
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../src/page/HomePage'
import NewsScreen from '../src/page/HomePage'
import MyScreen from '../src/page/HomePage'


const BottomTabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  News: NewsScreen,
  My: MyScreen
});

const AppBottomTabNavigator = createAppContainer(BottomTabNavigator);

export default class NavigationComponent extends Component {
    render() {
        return (<AppBottomTabNavigator />)
    }
}