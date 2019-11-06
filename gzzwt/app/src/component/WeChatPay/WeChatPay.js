/**
 * @description 列表弹出选择
 * @author 择天团队
 * 
 * **/


import React, {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View,Image} from 'react-native';
import CustomAlertDialogSS from "./touteng";

const typeArr = ["2019年", "2014年", "2015年","2016年","2017年","2018年"];

export default class WeChatPay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeName: '2019年',
            selectName:'请选择',
            showTypePop: false,
            showImg:true
        }
    }
    _openTypeDialog() {
        this.setState({showTypePop: !this.state.showTypePop})
    }
    render() {
        return (
            <View style={styles.warps}>
                <TouchableHighlight onPress={() => this._openTypeDialog()} 
                                    underlayColor="#ccc">
                    <View style={styles.warp}>
                        <Text style={styles.typename}>{this.state.typeName}</Text>
                    </View>
                </TouchableHighlight>

                <CustomAlertDialogSS  show={this.state.showTypePop} closeModal={(show) => {
                    this.setState({
                        showTypePop: show
                    })
                }}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    warps:{
        flex:0.3
    },
    warp:{
         flexDirection:'row',
    },
    typename: {
        color:'#333333' ,
        fontSize:16
    },


});