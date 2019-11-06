/**
 * @description 主题样式
 * @author Jonne
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';

import ThemeFactory, {ThemeFlags} from '../res/styles/ThemeFactory'

const THEME_KEY = 'theme_key'

export default class ThemeDao {
    getTheme(theme) {
        let currentTheme = theme ? ThemeFlags[theme] :  ThemeFlags['Default']
        return new Promise((resolve, reject)=> {
            // AsyncStorage.removeItem('theme_key')
            AsyncStorage.getItem(THEME_KEY, (error, result)=> {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    this.save(currentTheme);
                    result = currentTheme;
                }
                resolve(ThemeFactory.createTheme(result));
            });
        });
    }

    save(themeFlag) {
        AsyncStorage.setItem(THEME_KEY, themeFlag, (error, result)=> {});
    }
}