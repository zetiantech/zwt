/**
 * @description 选择办证大厅
 * @author 择天团队 Jonne 
*/
import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image 
} from 'react-native';
import { 
    Button,
    InputItem,
    List,
    Picker,
    Switch,
    Provider,Toast,WingBlank,Modal
 } from '@ant-design/react-native';
 import { Grid } from '@ant-design/react-native';

 import NavigationBar from '../../../common/NavigationBar'

const  dataSource = [
    {
        value: '1',
        label: '转移登记'
    },
    {
        value: '2',
        label: '转移确认'
    },
    {
        value: '3',
        label: '移魂大法'
    },
]


//提交弹出
class BasicModalExample extends Component {
    render () {
        onButtonClick = () => {
            Modal.alert('提示', '车辆信息不存在' , [
              { text: 'OK', onPress: () => console.log('ok') },
            ]);
        };
        return onButtonClick
    }
}

class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          type: [],
          surname: '周杰伦',
          statc:'正常',
          name: '',
          checked: false,
        };
      }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.warp}> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>广州市越秀区监测站</Text>
                        </View>                   
                    </View> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>                         
                            <Text style={styles.text}>办理日期：2019-12-24</Text>
                            <Image style={styles.searchIcon} source={require('../../../res/images/ic_tiaozhuan.png') } />      
                        </View>                  
                    </View> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Image style={styles.text}></Image>
                            <Text style={styles.text}>广州市越秀区海珠中路72号</Text>             
                        </View>
                    </View>                
                </View> 
                <View></View>
           </View>
           
        );
    }
}

export default class NewVehicleMake extends Component {
    render() {
        const navigationBar = <NavigationBar
            title='选择办证大厅'
            hide={false}/>;
        const formView = <BaseInfo />
        return (
            <View style={styles.container}>
                { navigationBar }
                { formView }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    warp:{
        paddingVertical: 20,
        backgroundColor: '#f9f9f9',
        marginTop: 20,      
    },
    conname:{
        marginLeft:15,
        flexDirection:'row', 

    },
    list:{
        // flex:0,
        flexDirection:'row', 
    },
    text:{
        marginTop: 15,
    },
    title:{
        fontWeight:'bold'

    },

    name:{
        paddingLeft:100
    },
    searchIcon:{
        width:12,
        height:14,
        tintColor: '#CCC',
        position:'absolute',
        left:400,
        top:20
    }

});

