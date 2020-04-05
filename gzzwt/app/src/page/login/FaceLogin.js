/**
 * @description 登陆页面
 * @author 择天团队 Jonne
 */

import React, { Component } from 'react'

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
 } from '@ant-design/react-native';

 import LinearGradient from 'react-native-linear-gradient';
 import RNFS from 'react-native-fs';
 import NavigationBar from '../../common/NavigationBar'

 import ToastUtil from '../../util/ToastUtil'
 import { API } from '../../api/Api'
 import HttpUtil from '../../util/HttpUtil'
 import LogUtil from '../../util/LogUtil'


 class FaceContent extends Component {
 	 constructor(props){
 	 	super(props)
 	 	this.state = {
 	 		phone: global.phone,

 	 	}
 	 }

 	 componentDidMount(){

 	 }

 	 onSubmitLogin() {
 	 	const { phone, face} = this.state
 	 	if(!phone || phone=='') {
 	 		ToastUtil.toast('请输入手机号')
 	 		return;
 	 	}
 	 	if(!face || face=='') {
 	 		ToastUtil.toast('请上传图片')
 	 		return;
 	 	}
 	 	HttpUtil.post(API.URL_LOGIN, {
 	 		phone: phone,
 	 		face: face,
 	 		type: 'FACE'
 	 	}).then((responseJson) => {
 	 		const { data, code, msg } = responseJson;

 	 		console.log(responseJson, msg,  121212121);
 	 		if(code === 0){
 	 			const { accessToken } = data;
 	 			// global.accessToken = accessToken;
 	 			LogUtil.log('刷脸登陆：' + msg);
 	 		}else{
 	 			LogUtil.debug('刷脸登陆:' + msg);
 	 		}
 	 	}).
 	 	catch((error) => {
 	 		console.log(error, 222222222222);
 	 	});
 	 }

 	 render() {
 	 	return (
 	 		<>
	 	 		<View style={styles.LoginBox}>
	 	 			<View style={{ marginTop: 30 }}>
						<InputItem
	                        type="number"
	                        value={this.state.face}
	                        onChange={(value) => {
	                            this.setState({
	                                face: value,
	                            });
	                        }}
	                        placeholder="请输入验证码"
	                    />
	 	 			</View>
	 	 			<View style={{marginTop: 30, marginLeft: 15}}>
						<Button type="primary" onPress={()=>{
							this.onSubmitLogin()
						}}>登录</Button>
	 	 			</View>
	 	 		</View>
	 		</>
 	 	);
 	 }
 }

 export default class FaceComponent extends Component {
 	constructor(props) {
 		super(props)
 	}
 	render() {
 		let navigationBar = <NavigationBar
 			title='刷脸登录'
        	hide={false}/>;
        const loginView = <FaceContent {...this.props} />
 		return (
 			<View style={styles.container}>
 				{navigationBar}
				{loginView}
 			</View>
 		);
 	}
 }

 const styles = StyleSheet.create({
 	container: {
 		flex: 1,
 		backgroundColor: '#ffffff'
 	}
 });