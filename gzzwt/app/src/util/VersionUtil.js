'use strict'


import React from 'react'
import * as DeviceInfo from 'react-native-device-info/deviceinfo'
import {
	Alert,
	Platform,
	NativeModules,
} from 'react-native'

import HttpUtil from './HttpUtil'
import LogUtil from './LogUtil'
import { API } from '../api/Api'

/**
 * @description  版本更新
 * @author 择天科技
 */
export default class VersionUtil {

	/**
	 * @description  检查版本更新
	 * @param {String} [id] 唯一标识（可以是包名）
	 */
	static versionUpdate() {
		// 检查是否需更新
		// 如果获取版本大于当前版本则更新
		let formData = new FormData()
		formData.append("id", API.APP_ID)
		// 发起请求
		HttpUtil.post(API.URL_VERSION, formData)
			.then(responseJson => {
				const { code,  data, msg } = responseJson.data;
				// 判断是否成功
				if (code === 0) {
					// 数据结构 { releaseVersion: 版本号, releaseApk: 最新版本Apk下载地址 }
					const { version } = data;
					// 如当前版本小于最新版本则更新
					if (DeviceInfo.getVersion() < version.releaseVersion) {
						// 版本更新提示
						Alert.alert('版本更新', version.releaseVersion, [
								{ text: '取消', onPress: () => LogUtil.debug("取消版本更新"), style: 'cancel' },
								{ 
									text: '更新',
									onPress: () => {
										// android 更新
										if (Platform.OS == 'android') {
											NativeModules.AppVersionUpdate.versionUpdate(version.releaseApk)
										}
									}
								}
							], { cancelable: false })
					}
				} else {
					LogUtil.debug(msg);
				}
			}).catch( error => {

			})
	}

}