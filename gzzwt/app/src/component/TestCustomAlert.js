/**
 * @description 列表弹出选择
 * @author 择天团队
 * 
 * **/


import React, {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View,Image} from 'react-native';
import CustomAlertDialog from "./CustomAlertDialog";

const typeArr = ["2019", "2014", "2015","2016","2017","2018"];

export default class TestCustomAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeName: '2019',
            selectName:'请选择',
            showTypePop: false,
            showImg:true
        }
    }
    _openTypeDialog() {
        this.setState({showTypePop: !this.state.showTypePop})
    }
   
    getValue(typeName){
        this.props.onPress(typeName)
    }
    render() {
        return (
            <View style={styles.warps}> 
                <TouchableHighlight onPress={() => this._openTypeDialog()} 
                                    underlayColor="#ccc">
                    <View style={styles.warp}>
                        <Text style={styles.typename}>{this.state.typeName}年</Text>
                        <Image source={require('../res/images/ic_tiaozhuan_down.png')}></Image>   
                    </View>
                </TouchableHighlight>
                    <CustomAlertDialog
                entityList={typeArr}  callback={(i) => {
                    this.setState({
                        typeName: typeArr[i],
                        showImg:false                       
                    })
                    this.getValue(typeArr[i])
                }} show={this.state.showTypePop} closeModal={(show) => {
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