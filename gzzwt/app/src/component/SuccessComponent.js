/**
 * @description  统一成功或失败组件
 * @author 择天团队 Jonne
 * @datetime 2019-10-03
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
	View,
	Text,
	Image,
	StyleSheet,
} from 'react-native'

import { Result } from '@ant-design/react-native';

export default class SuccessComponent extends Component {
    
	static propTypes = {
        style: PropTypes.object, // 结果页面样式
        title: PropTypes.string, // 标题
        message: PropTypes.element, // 内容
        buttonText: PropTypes.string, // 按钮文本
        buttonBgColor: PropTypes.string, // 按钮颜色
        buttonType: PropTypes.string, // 按钮类型
        img: PropTypes.element, // 图片
        onButtonClick: PropTypes.func // 点击按钮回调事件
    }

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Result 
					style={[styles.resultBox, this.props.style]}
					styles={{
						message: {marginTop: 25},
						buttonWrap: {marginTop: 30},
						button: {backgroundColor: this.props.buttonBgColor||'#2F74ED', borderColor: this.props.buttonBgColor||'#2F74ED'}
					}}
					img={
						this.props.img || <Image source={require('../res/images/common/success.png')} style={{ width: 60, height: 60 }}/>
					} 
					title={this.props.title} 
					message={this.props.message}
					buttonText={this.props.buttonText}
					buttonType={this.props.buttonType||'primary'} 
					onButtonClick={this.props.onButtonClick}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	resultBox: {
		marginTop: 120
	}
});