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
    List,
    Portal,
    Toast,
 } from '@ant-design/react-native';

 import GlobalStyles from 'src/res/styles/GlobalStyles'
 import NavigationUtil from 'src/util/NavigationUtil';


 export default function LoginFooter(props){
	 return (
		<View style={[styles.loginType, props.style]}>
			{
				props.type==0 && <View style={styles.loginTypeItem}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.loginItems}
						onPress={()=>{
							NavigationUtil.navigate(props.props, 'Register')
						}}
					>
						<Image source={require('src/res/images/login/icon_zhzc.png')} style={styles.imgStyles}/>
						<Text style={styles.imgText}>账号注册</Text>
					</TouchableOpacity>
				</View>
			}
			{
				props.type==1 && <View style={styles.loginTypeItem}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.loginItems}
						onPress={()=>{
							NavigationUtil.navigate(props.props, 'Login')
						}}
					>
						<Image source={require('src/res/images/login/icon_zhzc.png')} style={styles.imgStyles}/>
						<Text style={styles.imgText}>账号登陆</Text>
					</TouchableOpacity>
				</View>
			}
			<View style={styles.loginTypeItem}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.loginItems}
					onPress={()=>{
						NavigationUtil.navigate(props.props, 'PasswordLogin')
					}}
				>
					<Image source={require('src/res/images/login/icon_mmdl.png')} style={styles.imgStyles}/>
					<Text style={styles.imgText}>密码登录</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.loginTypeItem}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.loginItems}
					onPress={()=>{
						NavigationUtil.navigate(props.props, 'FaceRecognition')
					}}
				>
					<Image source={require('src/res/images/login/icon_sldl.png')} style={styles.imgStyles}/>
					<Text style={styles.imgText}>刷脸登录</Text>
				</TouchableOpacity>
			</View>
		</View>
	 )
 }


 const styles = StyleSheet.create({
 	loginType: {
 		flexDirection: 'row',
 		justifyContent: 'space-between'
 	},
 	loginTypeItem:{
 		flex: 1,
 		alignItems: 'center'
	 },
	 loginItems: {
		alignItems: 'center'
	 },
 	imgStyles: {
		width: 45,
		height: 45,
		marginBottom: 15
 	},
 	imgText: {
 		color: '#666',
 		fontSize: 14
 	}
 });