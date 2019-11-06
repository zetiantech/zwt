/**
 * @description 解锁方式
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
    List,
    Flex,
    Provider
 } from '@ant-design/react-native';


 import NavigationUtil from 'src/util/NavigationUtil';
 import ToastUtil from 'src/util/ToastUtil'

 const UnlockModeComponent = ({props, isValid, onChangeHander}) => {
	return (
		<View style={styles.mainBox}>
			<TouchableOpacity
				onPress={()=>{
					NavigationUtil.goBack(props)
				}}
			>
				<View style={styles.closeBox}>
					<Image source={require('src/res/images/login/back.png')} style={{width: 24, height: 24}} />
				</View>
			</TouchableOpacity>
			<View style={styles.headBox}>
				<Text style={{fontSize: 16, color: '#666'}}>设置解锁方式，保护隐私信息</Text>
			</View>
			<View style={{ marginTop: 45 }}>
				<Flex style={{justifyContent: 'center'}}>
					<Flex.Item style={[styles.unlockItemLine, {alignItems: 'center'}]}>
						<View style={styles.imgBox}>
							{ isValid==1 && <Image source={require('src/res/images/login/icon_success.png')} style={styles.checkedIcon} />}
							<TouchableOpacity onPress={()=>onChangeHander(1)}>
								<Image source={require('src/res/images/login/icon_zwjs.png')} style={styles.img} />
							</TouchableOpacity>
						</View>
						<Text style={styles.imgText}>指纹解锁</Text>
					</Flex.Item>
					<Flex.Item style={{alignItems: 'center'}}>
						<View style={styles.imgBox}>
							{ isValid==2 && <Image source={require('src/res/images/login/icon_success.png')} style={styles.checkedIcon} />}
							<TouchableOpacity  onPress={()=>onChangeHander(2)}>
								<Image source={require('src/res/images/login/icon_ssjs.png')} style={styles.img} />
							</TouchableOpacity>
						</View>
						<Text style={styles.imgText}>手势解锁</Text>
					</Flex.Item>
				</Flex>
			</View>
		</View>
	)
 }



 export default function UnlockMode(props){

	const [isValid, setIsValid] = useState(0)

	const onChangeHander = (index) => {
		setIsValid(index);
	}

	const onSure = () => {
		if(isValid == 1){
			NavigationUtil.navigate(props, 'TouchIdComponentVerify')
		}else if(isValid == 2){
			NavigationUtil.navigate(props, 'GestureUnlock')
		}else{
			ToastUtil.toast('请选择解锁方式')
		}
		
	}

	const noSetHandler = () => {
		NavigationUtil.navigate(props, 'Main')
	}

	 return (
		<Provider>
			<View style={styles.container}>
				<UnlockModeComponent props={props} isValid={isValid} onChangeHander={onChangeHander} />
				<Button style={[styles.submitBox, {marginTop: 40}]} type="primary"
					onPress={onSure} >确定</Button>
				<Button style={[styles.submitBox,{backgroundColor: '#E5E5E5'}]}
					onPress={noSetHandler}>
					<Text style={{color: '#FFFFFF'}}>暂不设置</Text>
				</Button>
			</View>
		</Provider>
	 )
 }


 const styles = StyleSheet.create({
 	container: {
 		flex: 1,
 		backgroundColor: '#ffffff'
 	},
 	mainBox: {
 		paddingLeft: 30,
 		paddingRight: 30,
 		paddingBottom: 20
 	},
 	closeBox: {
 		marginTop: 50,
 	},
 	headBox: {
 		marginTop: 60,
		alignItems: 'center'
 	},
 	codeBtn: {
 		height: 36
 	},
 	unlockItemLine: {
 		borderRightWidth: 1,
 		borderStyle: 'solid', 
 		borderRightColor: '#f2f2f2'
 	},
 	imgBox: {
 		width: 80,
 		height: 80,
 		alignItems: 'center',
 		justifyContent: 'center',
 		backgroundColor: '#F4F5FF',
 		borderRadius: 6
 	},
 	imgText: {
		marginTop: 20,
		color: '#333',
		fontSize: 14
 	},
 	img: {
 		width: 60,
 		height: 60
 	},
 	checkedIcon: {
 		position: 'absolute',
 		right: -8,
		top: -8,
		width: 20,
		height: 20
	 },
	 submitBox: {
		 marginVertical: 10,
		 marginHorizontal: 20,
	 }
 });