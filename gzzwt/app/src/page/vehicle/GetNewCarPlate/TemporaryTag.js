/**
 * @description 临时车牌
 * @author 择天团队
*/
import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet 
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Switch,
    Provider,
    Modal,
    Card,
    DatePicker,
    Checkbox
 } from '@ant-design/react-native';

 import NavigationBar from '../../../common/NavigationBar'
import RadioView from '../../../component/RadioView'
const dataSource = require('@bang88/china-city-data');

const passCauseSource = [
    { label: '小型汽车', value: 0 },
    { label: '小型汽车', value: 1 }
]

class EntryExitPassInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isValid: true,
          ApplyCause: '',
          date: undefined,
          business: '',
          forensics: [1],
          
        };
    }
    onButtonClick = () => {
        let _this = this
        // _this.setState({
        //     forensics: [1],
        // });
        if (_this.state.isValid) {
            // _this.props._setData(1);
            console.log(111)
        } else { 
            Modal.alert('', '信息审核不通过，请检查填写的信息是否正确', [
            {
                text: '暂不预约',
                onPress: () => console.log('cancel'),
                style: {color:'#999999'},
            },
            { text: '返回修改', onPress: () => console.log('ok') },
            ]);
        }

    // _onPickerDateChange = (value) => {
    //   this.setState({ 
    //     date: value
    //   });
    // };
};
    checkCallBack = (id) => {
        this.setState({
            flag: id
        });
        // if (id === 1) {      
        // } else if (id === 2) {        
        // }
    };
    ColorLineRed = () =>{
        console.log(11)
    }
    render() {
        return (
            <Provider>
                <View
                    style={{ flex: 1,}}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    
                        <View style={{flexDirection:'row',backgroundColor:'#fff'}}>
                            <View  style={{paddingVertical:15,paddingLeft:15,}} ><Text style={{fontSize:18}}>是否需要临牌</Text></View>    
                            <View style={{marginHorizontal:25,paddingVertical:20}}>    
                                <RadioView type='需要'   id={1} onCheck={this.checkCallBack} radius={16}checked={this.state.flag === 1}/>                                
                            </View>
                            <View style={{paddingVertical:20,marginLeft:70,}}>    
                                <RadioView type='不需要'  id={2} onCheck={this.checkCallBack} radius={16}checked={this.state.flag === 2}/>                                
                            </View>
                        </View> 
                        <View style={{flexDirection:'row',backgroundColor:'#fff'}}>
                            <View  style={{paddingVertical:15,paddingLeft:15,}} ><Text style={{fontSize:18}}>获取方式</Text></View>    
                            <View style={{marginHorizontal:25,paddingVertical:20}}>    
                                <RadioView  id={3} onCheck={this.checkCallBack} radius={16}checked={this.state.flag === 3}/>                                
                            </View>
                            <View style={{paddingVertical:20,marginLeft:70,}}>    
                                <RadioView  id={4} onCheck={this.checkCallBack} radius={16}checked={this.state.flag === 4}/>                                
                            </View>
                        </View>                       
                    {
                       this.state.forensics[0] === 1 && <View>               
                            <View style={{ marginTop: 20 }}>
                                <Card full>
                                    <Card.Header title="寄送地址" style={{paddingTop: 15, paddingBottom: 15}}/>
                                    <Card.Body 
                                     >
                                         
                                        <List styles={{Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0}}}>
                                          <List.Item arrow="horizontal" >
                                            李筱思
                                            <List.Item.Brief style={{marginTop: 8}}>广州市荔湾区龙华大道C栋1010号</List.Item.Brief>
                                          </List.Item>
                                        </List>
                                    </Card.Body>
                                </Card>
                            </View>
                           
                        </View>
                    }
                    
                    <List style={styles.buttonStyles}>
                        <Button type="primary" onPress={() => this.onButtonClick()}>下一步</Button>
                    </List>

                   



                </View>     
            </Provider>
        );
    }
}

export default class TemporaryTag extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const navigationBar = <NavigationBar
            title='临时车牌'
            hide={false}/>;
        const content = <EntryExitPassInfoComponent {...this.props}/>
        return (
            <View style={styles.container}>
                { navigationBar }
                { content }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    buttonBox: {
        height: 48,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30
    },
    buttonStyles: {
        marginTop: 30,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15
    },
    courierContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,  
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    courierText: {
        color: '#999',
        fontSize: 14
    },
    courierText1: {
        color: '#333',
        fontSize: 16
    }
});

