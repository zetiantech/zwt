/**
 * @description 欢迎页面
 * @author 择天团队
 * 
 * **/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    InteractionManager
} from 'react-native'

import Swiper from 'react-native-swiper'
import GlobalStyles from '../res/styles/GlobalStyles'
import SplashScreen from 'react-native-splash-screen'
import Theme from '../expand/Theme'


/**
 * @description 引导页面
 * @author Jonne
 */
export default class WelcomePage extends Component {
    constructor(porps) {
        super(porps);
        this.state = {
            swiperShow: true
        }
    }
    
    componentDidMount() {
        const _this = this
        const { navigate } = this.props.navigation;
        new Theme().getTheme().then((data => {
            _this.theme = data;
        }));
        this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
                navigate('Main', { theme: _this.theme });
            });
        }, 3000);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    renderSwiper () {
        if (this.state.swiperShow){
            return (
                <Swiper style={styles.wrapper}
                        height={GlobalStyles.window_height}
                        showsButtons={false}
                        removeClippedSubviews={false}
                        horizontal={true}
                        paginationStyle={{bottom: 10}}
                        loop={false}
                        autoplay={true}
                        autoplayTimeout={2}
                >
                    <Image style={styles.imagItem} resizeMode='cover' source={require('../res/images/launch/launch.jpg')}/>
                </Swiper>
            );
        } else {
            <View style={styles.container}>
                <Image style={styles.imagItem} resizeMode='cover' source={require('../res/images/launch/launch.jpg')}/>
            </View>
        }
    }
    render() {
        return (
            <View style={styles.container}>
                { this.renderSwiper() }
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    wrapper: {
        flex: 1,
        width: GlobalStyles.window_width,
        height: GlobalStyles.window_height
    },
    imagItem: {
        flex: 1,
        width: GlobalStyles.window_width,
        height: GlobalStyles.window_height
    },
    dotStyle: {
        
    },
    activeDotStyle: {

    }
})