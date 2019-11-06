/**
 * @description 公用的授权页面, 按需扩展
 * @author Jonne
 * @datetime 2019-10-04
 */

import React, { Component } from 'react'

import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native'

import SuccessComponent from '../component/SuccessComponent'
import { Button } from '@ant-design/react-native'

/*
 * @description 根据参数设置授权页面
 * @params type 0-广州群体通 
 **/
export default class Authorization extends Component {
	constructor(props) {
		super(props)
        const type = this.props.navigation.getParam("type") || 0
        const id = this.props.navigation.getParam('id') || "";
		this.state = {
            type: type,
            id: id
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
 	 				onPress={()=>{
						this.props.navigation.navigate('Login')
					}}
 	 			>
	 	 			<View style={styles.closeBox}>
	 	 				<Image source={require('../res/images/login/back.png')} style={{width: 24, height: 24}} />
	 	 			</View>
	 	 		</TouchableOpacity>
				{
					this.state.type == 0 && 
                        <SuccessComponent
                            title='广州群体通'
                            isCancel={true}
                            message={
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{padding: 3, color: '#666666'}}>该服务由广州群体通提供，向您申请获取以下权限</Text>
                                    <Text style={{padding: 3, color: '#666666'}}>获得您的个人信息(姓名，手机号等)</Text>
                                </View>
                            }
                            buttonText='同意并授权'
                            onButtonClick={(e)=>{
                                this.props.navigation.navigate("Confirmation", {id: this.state.id})
                            }}
                            onCancelClick={()=>{
                                this.props.navigation.navigate("Home");
                            }}
                        />
                }
			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 30,
		flex: 1,
		backgroundColor: 'white'
	},
	closeBox: {
 		marginTop: 20,
 	},
});