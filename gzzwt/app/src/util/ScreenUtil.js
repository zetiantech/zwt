'use strict';

import {Dimensions, PixelRatio, Platform} from 'react-native';
export const windowWidth = Dimensions.get('window').width; //当前设备宽高
export const windowHeight = Dimensions.get('window').height;

const fontScale = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get(); //当前设备像素密度
const PPI = 2; //iphone6 像素密度，将iPhone6作为基准
const iphone6Width = 750 / PPI;
const iphone6Height = 1334 / PPI;
const scaleWidth = windowWidth / iphone6Width; //获取宽高缩放比例
const scaleHeight = windowHeight / iphone6Height;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * @description 屏幕适配类
 * @version 0.1
 **/
export default class ScreenUtil {
  /**
   * @description 设置text为sp
   * @param size  sp
   * @returns {Number} dp 转换后的值
   */
  static setSpText(size: Number) {
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(((size * scale + 0.5) * pixelRatio) / fontScale);
    return size / PPI;
  }

  /**
   * @description 屏幕适配类
   * @param size
   * @returns {number} 转换后的值
   */
  static scaleSize(size: Number) {
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(size * scale + 0.5);
    return size / PPI;
  }

  /**
   * @description 获取手机屏幕的长度
   * @param size
   * @returns {number} 手机屏幕的长度
   */
  static getWidth() {
    return windowWidth;
  }

  /**
   * @description 获取手机屏幕的高度
   * @param size
   * @returns {number} 屏幕的高度
   */
  static getHeight() {
    return windowHeight;
  }

  static isIphoneX() {
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      ((windowHeight === 896 && windowWidth === 414) ||
        (windowHeight === 812 && windowWidth === 375))
    );
  }
}
