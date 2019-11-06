/**
 * @description 车辆转入地
 * @author 择天团队 Jonne 
*/
import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet 
} from 'react-native';
import { 
    Button,
    InputItem,
    List,
    Picker,
    Switch,
    Provider,Toast,WingBlank,Modal
 } from '@ant-design/react-native';

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
          idcard: '',
          surname: '周杰伦',
          statc:'正常',
          name: '',
          platetype:'小型汽车',
          checked: false,
        };
      }
      onChange = (value) => {
            this.setState({
                type: value
            });
        }
    render() {
        return (
            <Provider>
                <ScrollView
                    style={{ flex: 1, marginTop: 20 }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <List>
                        <InputItem
                            clear
                            type="text"
                            value={this.state.surname}
                            onChange={() => {
                            this.setState({
                                surname: value,
                            });
                            }}
                            labelNumber={8}
                            textAlign='right'
                            
                        >
                            所有人
                        </InputItem>
                        <InputItem
                            textAlign='right'
                            clear
                            type="text"
                            value={this.state.platetype}
                            onChange={() => {
                            this.setState({
                                platetype: value,
                            });
                            }}l
                            
                        >
                        号牌种类
                        </InputItem>
                        <InputItem
                            textAlign='right'
                            clear
                            type="text"
                            value={this.state.surname}
                            onChange={( ) => {
                            this.setState({
                                surname: '',
                            });
                            }}
                        >
                        号牌号码
                        </InputItem>
                        <Picker
                            cols={2}
                            title={'请选择地区'}
                            itemStyle={{padding: 10}}
                            data={dataSource}
                            value={this.state.type}
                            onChange={this.onChange}
                            onOk={this.onChange}
                        >
                            <List.Item >转入地</List.Item>
                        </Picker>
                    </List>

                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={BasicModalExample.onButtonClick}>下一步</Button>
                    </List>
                    
                </ScrollView>
            </Provider>
        );
    }
}

export default class PlaceOfVehicleTransfer extends Component {
    render() {
        const navigationBar = <NavigationBar
            title='车辆转入地'
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
    input: {
        width:200,
        fontSize:16,
        marginRight: 100,
    },
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
        color: '#ffffff',
        backgroundColor: '#2F74ED'
    },
});

