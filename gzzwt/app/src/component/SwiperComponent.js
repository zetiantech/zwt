/**
 * @description 欢迎页面
 * @author 择天团队
 * 
 * **/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native'

import Swiper from 'react-native-swiper'
import GlobalStyles from '../res/styles/GlobalStyles'


/**
 * @description 轮播图
 * @author Jonne
 */
export default class SwiperComponent extends Component {
    constructor(porps) {
        super(porps);
    }
    _renderSwiperView() {
        const { swiper } = this.props
        if(swiper && swiper.length){
            const swiperView = swiper && swiper.map((item, i)=>{
                return (
                    <Image style={styles.imagItem} resizeMode='cover' source={{uri: item}}/>
                );
            });
            return swiperView
        }
    }
    renderSwiper () {
        return (
            <Swiper style={[styles.wrapper, this.props.style]}
                    showsButtons={false}
                    removeClippedSubviews={false}
                    horizontal={true}
                    paginationStyle={{bottom: 10}}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={2}
            >
                <>
                    { this._renderSwiperView() }
                </>
            </Swiper>
        );
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
    wrapper: {
        flex: 1,
        width: GlobalStyles.window_width,
        height: 200
    },
    imagItem: {
        flex: 1,
        width: GlobalStyles.window_width,
        height: '100%'
    }
})