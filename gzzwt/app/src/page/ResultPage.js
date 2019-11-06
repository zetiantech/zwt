/**
 * @description 公用的结果页面, 按需扩展
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
import NavigationUtil from '../util/NavigationUtil'


/*
 * @description 根据参数设置结果页面
 * @params type 0-解锁设置  1-认证成功  2-资料提交成功  3-申请成功 4-支付成功  5-预约成功
 **/
export default class ResultPage extends Component {
	constructor(props) {
		super(props)
		const type = this.props.navigation.getParam("type") || 0
		this.state = {
			type: type
		}
	}
	render() {
		return (
			<View style={styles.container}>
				{/* <TouchableOpacity
 	 				onPress={()=>{
						NavigationUtil.dispatch(this.props,'Home')
					}}
 	 			>
	 	 			<View style={styles.closeBox}>
	 	 				<Image source={require('../res/images/login/back.png')} style={{width: 24, height: 24}} />
	 	 			</View>
	 	 		</TouchableOpacity> */}
				{
					this.state.type == 0 && <SuccessComponent
						title='解锁设置成功'
						message={
							<View style={{ alignItems: 'center' }}>
							<Text style={{padding: 3, color: '#666666'}}>涉及隐私信息时，将需要解锁验证</Text>
							<Text style={{padding: 3, color: '#666666'}}>您还可以在我的-设置-账号安全中进行修改</Text>
							</View>
						}
						buttonText='知道了'
						onButtonClick={(e)=>{
							NavigationUtil.dispatch(this.props, 'Main')
						}}
					 />
				}
				{
					this.state.type == 1 && <SuccessComponent
						title='认证成功'
				           message={
				           	 <View style={{ alignItems: 'center' }}>
				           	 	<Text style={{padding: 3, color: '#666666'}}>使用包含隐私信息服务时，将向您申请授权</Text>
				           	 	<Text style={{padding: 3, color: '#666666'}}>您可以在个人中心查看实名认证信息</Text>
				           	 </View>
				           }
				           buttonText='知道了'
				           onButtonClick={(e)=>{
							NavigationUtil.dispatch(this.props, 'Main')
							

				           }}
					 />
				}
				{
					this.state.type == 2 && <SuccessComponent
						title='资料提交成功'
				           message={
				           	 <View style={{ alignItems: 'center' }}>
				           	 	<Text style={{padding: 3, color: '#666666'}}></Text>
				           	 	<Text style={{padding: 3, color: '#666666'}}>请等待审核结果</Text>
				           	 </View>
				           }
				           buttonText='知道了'
				           onButtonClick={(e)=>{							   
							NavigationUtil.dispatch(this.props, 'Main')
				           }}
					 />
				}
				{
					this.state.type == 3 && <SuccessComponent
						title='申请成功'
				           message={
				           	 <View style={{ alignItems: 'center' }}>
				           	 	<Text style={{padding: 3, color: '#666666'}}></Text>
				           	 	<Text style={{padding: 3, color: '#666666'}}>您可以在个人中心查看实名认证信息</Text>
				           	 </View>
				           }
				           buttonText='知道了'
				           onButtonClick={(e)=>{							   
							NavigationUtil.dispatch(this.props, 'Main')
				           }}
					 />
				}
				{
					this.state.type == 4 && <SuccessComponent
						title='支付成功'
				           message={
				           	 <View style={{ alignItems: 'center' }}>
				           	 	<Text style={{padding: 3, color: '#666666'}}></Text>
				           	 	<Text style={{padding: 3, color: '#666666'}}>点击返回首页</Text>
				           	 </View>
				           }
				           buttonText='知道了'
				           onButtonClick={(e)=>{							   
							NavigationUtil.dispatch(this.props, 'Main')
				           }}
					 />
				}
				{
					this.state.type == 5 && <SuccessComponent
						title='预约成功！'
						message={
							<View style={{ alignItems: 'center' }}>
								<Text style={{padding: 3, color: '#666666'}}>请按预约日期及时前往</Text>
								<Text style={{padding: 3, color: '#666666'}}>您还可以在个人中心随时查看预约记录</Text>
							</View>
						}
						buttonText='知道了'						
						onButtonClick={(e)=>{
							NavigationUtil.dispatch(this.props, 'Main')
						}}
					 />
				}
				{
					this.state.type == 6 && <SuccessComponent
						title='提交成功！'
						message={
							<View style={{ alignItems: 'center' }}>
							<Text style={{padding: 3, color: '#666666'}}>请耐心等待审核</Text>
							<Text style={{padding: 3, color: '#666666'}}>结果会通过推送消息通知，敬请留意</Text>
							</View>
						}
						buttonText='知道了'
						onButtonClick={(e)=>{
							NavigationUtil.dispatch(this.props, 'Main')
						}}
					 />
				}
				{
					this.state.type == 7 && <SuccessComponent
						title='提交成功！'
						buttonText='知道了'
						onButtonClick={(e)=>{
							NavigationUtil.dispatch(this.props, 'Main')
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