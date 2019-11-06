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

import { createAppContainer } from 'react-navigation';
import { createStackNavigator, StackViewStyleInterpolator } from 'react-navigation-stack';
import { route } from './router/route'
// dateReplacement
const TabNavigator = createStackNavigator(route, {
    initialRouteName: 'Main',
    transitionConfig: () => ({
        // 只要修改最后的forVertical就可以实现不同的动画了。
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    })
});

export default createAppContainer(TabNavigator);