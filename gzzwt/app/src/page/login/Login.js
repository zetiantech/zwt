/**
 * @description 登陆页面
 * @author 择天团队 Jonne
 */

import React, { useState, useEffect } from 'react'

import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native'

import { 
    Button,
    InputItem,
    List,
    Modal,
    Provider
 } from '@ant-design/react-native';

 import TouchID from 'react-native-touch-id';
 import LinearGradient from 'react-native-linear-gradient';
 import validator from 'validator';
 import NavigationBar from 'src/common/NavigationBar'

 import AsyncStorageUtil from 'src/util/AsyncStorageUtil'
 import LoginFooter from './LoginFooter'
 import ToastUtil from 'src/util/ToastUtil'
 import { API } from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil'
 import NavigationUtil from 'src/util/NavigationUtil'

 const optionalConfigObject = {
    title: "政务通", // Android
    imageColor: '#2f74ed', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: '请验证指纹', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: '取消', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};


const LoginContent = ({params, setParams, checked, codeText, onSendCode, onSubmitLogin, props}) => {
	const bottomColor = `rgba(134, 106, 255, ${1})`
    const maskColor = `rgba(47, 116, 237, ${1})`
	return (
		<View style={styles.LoginBox}>
			<TouchableOpacity
				onPress={()=>{
					NavigationUtil.goBack(props)
				}}
			>
				<View style={styles.closeBox}>
					<Image source={require('src/res/images/login/back.png')} style={{width: 24, height: 24}} />
				</View>
			</TouchableOpacity>
			<View style={styles.titleBox}>
				<Text style={styles.titleText}>登录</Text>
				<LinearGradient 
					colors={[maskColor, bottomColor]} 
					start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} 
					locations={[0, 0.75]} 
					style={styles.linearGradient}>
				</LinearGradient>
			</View>
			<View style={{ marginTop: 40 }}>
				<InputItem
					type="number"
					value={params.phone}
					extra={
						<Button 
							style={styles.codeBtn}
							disabled={checked}
							onPress={onSendCode}
						>
							<Text style={{fontSize: 14, color: '#92B5F5'}}>{codeText}</Text>
						</Button>
					}
					onChange={(value) => setParams({...params, phone: value})}
					placeholder="请输入手机号"
				/>
			</View>
			<View style={{ marginTop: 30 }}>
				<InputItem
					type="number"
					value={params.shortCode}
					onChange={(value) => setParams({...params, shortCode: value})}
					placeholder="请输入验证码"
				/>
			</View>
			<View style={{marginTop: 30, marginLeft: 15}}>
				<Button type="primary" onPress={onSubmitLogin}>登录</Button>
			</View>
			<View style={styles.agreenText}>
				<Text style={{color: '#999999'}}>登录即同意</Text>
				<TouchableOpacity>
					<Text style={{color: '#2F74ED'}}>《广州政务通协议》</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

 export default function LoginComponent(props) {

	const [isTouchID, setIsTouchID] = useState(false)
	const [checked, setChecked] = useState(false)
	const [codeText, setCodeText] = useState('发送验证码')
	const [params, setParams] = useState({
		phone: '',
		shortCode: ''
	})

	function onSendCode() {
		const  { phone } = params
		if(!validator.isMobilePhone(phone, 'zh-CN')){
			ToastUtil.toast('请输入正确格式的手机号码')
 	 		return;
		}
		getCode()
 	 	HttpUtil.post(API.SEND_CODE, {
 	 		phone: phone
 	 	}).then((responseJson) => {
			  const { code, data, msg } = responseJson.data
 	 		if(code === 0) {
 	 			ToastUtil.toast("发送成功！")
 	 		}else{
				ToastUtil.toast(msg)
			}
 	 	});
	  }

	useEffect(() => {
		TouchID.isSupported(optionalConfigObject)
		.then(biometryType => {
			setIsTouchID(true)
		})
		.catch(error => {
			setIsTouchID(false)
		});
	}, [])

	let time = 60;
	function getCode(){
		time--;
		setChecked(true)
		setCodeText(time + 's后重新获取')
		setTimeout(function(){
			if(time <= 1){
				time = 60
				setChecked(false)
				setCodeText('发送验证码')
			}else{
				getCode()
			}
		}, 1000)
	}

	function onSubmitLogin(){
		const { phone, shortCode} = params
		if(!validator.isMobilePhone(phone, 'zh-CN')){
		  ToastUtil.toast('请输入正确格式的手机号码')
			return;
	  }
	  if (validator.isEmpty(shortCode)) {
		  ToastUtil.toast("验证码不能为空");
		  return false;
	  }
		HttpUtil.post(API.URL_LOGIN, {
			phone: phone,
			shortCode: shortCode,
			type: 'PHONE'
		}).then((responseJson) => {
			const { code, data, msg } = responseJson.data
			const { accessToken, gesture }  = data
			if(code == 0 ) {
			  global.accessToken = accessToken
			  global.lock = false
			  global.isRealName=true
			  AsyncStorageUtil.setItem("ACCESS_TOKEN", accessToken)
			  AsyncStorageUtil.setItem('PHONE', phone);
			  AsyncStorageUtil.setItem("GESTURE_PASSWORD",gesture);
			  if(isTouchID){
				NavigationUtil.navigate(props, 'LockMode')
			  }else{
				if(gesture==''){
					NavigationUtil.navigate(props, 'GestureUnlock')
				}else{
					NavigationUtil.navigate(props, 'GesturePasswordVerify')	
				}
			  }
			}else{
				ToastUtil.toast(msg)
			}
		})
	}

	 return (
		<Provider>
			<View style={styles.container}>
				<NavigationBar statusBar={{backgroundColor: '#FFFFFF'}} hide={true}/>
				<LoginContent 
					codeText={codeText} 
					time={time}
					checked={checked}
					params={params} 
					setParams={setParams}
					props={props} 
					onSendCode={onSendCode}
					onSubmitLogin={onSubmitLogin}
				/>
				<LoginFooter type={0} style={{marginTop: 80}} props={props}/>
			</View>
		</Provider>
	 )
 }

 const styles = StyleSheet.create({
 	container: {
 		flex: 1,
 		backgroundColor: '#ffffff'
 	},
 	closeBox: {
 		marginTop: 30,
 	},
 	LoginBox: {
 		paddingLeft: 25,
 		paddingRight: 40
 	},
 	imgBox: {
 		marginTop: 20,
		alignItems: 'center'
 	},
 	linearGradient: {
 		zIndex: -1,
	    height: 8,
	    left: 0,
	    top: -11,
	    width: 46,
	    borderRadius: 2
	},
 	titleBox: {
 		marginLeft: 15,
 		marginTop: 34,
 	},
 	titleText: {
 		fontSize: 24,
 		color: '#333',
 	},
 	codeBtn: {
 		height: 36,
 		borderColor: '#92B5F5',
 	},
 	agreenText: {
 		flexDirection: 'row',
 		padding: 20,
 		justifyContent: 'center',
 		alignItems: 'center'
 	}
 });