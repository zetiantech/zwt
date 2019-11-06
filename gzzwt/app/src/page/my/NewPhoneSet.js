/**
 * @description 设置新手机号码
 * @author 择天团队 Jonne 
*/
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet 
} from 'react-native';

import { 
    Button,
    List,
    InputItem,
 } from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';

class NewPhoneComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone: '',
            shortCode: '',
            time: 60,
            checked: false,
            codeText: '点击获取'
        };
    }
    onSendCode() {
        const  { phone } = this.state 

        if(!validator.isMobilePhone(phone, 'zh-CN')){
			ToastUtil.toast('请输入正确格式的手机号码')
 	 		return;
		}
        this.getCode();
        HttpUtil.post(API.SEND_CODE, {
            phone: phone
        }).then((responseJson) => {
            if(responseJson.code === 0){
                ToastUtil.toast('发送成功！')
            }else{
                LogUtil.debug('验证码:' + responseJson.msg);
            }
        }).
        catch((error) => {

        });
     }

     getCode (){
        const _this = this
        let time = this.state.time
        let codeText = this.state.codeText
        time--;
        this.setState({
            time: time,
            codeText: time + 's后重新获取',
            checked: true
        });
        setTimeout(function(){
            if(time <= 1){
                _this.setState({
                    time: 60,
                    checked: false,
                    codeText: '点击获取'
                });
            }else{
                _this.getCode()
            }
        }, 1000)
     }

     onSubmitLogin() {
        const { phone, shortCode} = this.state
        if(!validator.isMobilePhone(phone, 'zh-CN')){
			ToastUtil.toast('请输入正确格式的手机号码')
 	 		return;
		}
		if (validator.isEmpty(shortCode)) {
            ToastUtil.toast("验证码不能为空");
            return false;
		}
        HttpUtil.post(API.MODIFY_PHONE, {
            phone: phone,
            shortCode: shortCode
        }).then((responseJson) => {
            const { data, code, msg } = responseJson.data;
            if(code === 0){
                DeviceEventEmitter.emit("refresh", '1');
                NavigationUtil.navigate(this.props, "PersonalInfo")
            }else{
                ToastUtil.toast(msg)
            }
        }).
        catch((error) => {

        });
     }
    render() {
        return (
           <View style={{marginTop: 15,}}>
                <List>
                    <InputItem
                        type="number"
                        value={this.state.phone}
                        textAlign='right'
                        onChange={(value) => {
                            this.setState({
                                phone: value,
                            });
                        }}
                        placeholder="请输入"
                    >
                    新手机号
                    </InputItem>
                    <InputItem
                        style={styles.inputBox}
                        type="number"
                        value={this.state.shortCode}
                        textAlign='right'
                        extra={
                            <Button 
                                style={styles.codeBtn}
                                disabled={this.state.checked}
                                onPress={()=> this.onSendCode()}
                            >
                                <Text style={{fontSize: 14, color: '#92B5F5'}}>{this.state.codeText}</Text>
                            </Button>
                        }
                        onChange={(value) => {
                            this.setState({
                                shortCode: value,
                            });
                        }}
                        placeholder="请输入验证码"
                    >
                    验证码
                    </InputItem>
                </List>
                <List style={{margin: 15, marginTop: 30}}>
                    <Button type="primary" onPress={() => this.onSubmitLogin()}>确认</Button>
                </List>
           </View>
        );
    }
}

export default class NewPhoneSet extends Component {
    constructor(props) {
        super(props);
        const phone = this.props.navigation.state.params ? this.props.navigation.state.params.phone : null
        this.state = {
            phone: phone
        };
    }
    render() {
        const navigationBar = <NavigationBar
            navigator={this.props.navigation}
            popEnabled={true}
            title='设置新号'
            statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
            hide={false}/>;
        let nickNameView = <NewPhoneComponent {...this.props} phone={this.state.phone}/>
        return (
            <View style={styles.container}>
                { navigationBar }
                { nickNameView }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    codeBtn: {
        height: 32,
        borderColor: '#92B5F5',
    },
    inputBox: {
        paddingRight: 20
    }
});