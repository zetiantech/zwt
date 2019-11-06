/**
 * @description 修改地址
 * @author 择天团队 Jonne 
*/
import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Provider,
    Modal
 } from '@ant-design/react-native';

import NavigationBar from '../common/NavigationBar'

const dataSource = require('@bang88/china-city-data');


class AddressContentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '李筱思',
            phone: '18818562134',
            city: ['44', '4401', '440103'],
            address: '龙华大道C2栋1018号'
        }
    }
    _onCityChange = (value) => {
        console.log(value, 11111);
        this.setState({
            type: value
        });
    }
    render() {
        return (
            <Provider>
                <ScrollView
                    style={{ flex: 1,}}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <List>
                        <InputItem
                            type="text"
                            labelNumber="8"
                            textAlign='right'
                            value={this.state.name}
                            onChange={(value) => {
                                this.setState({
                                    name: value,
                                });
                            }}
                            placeholder="请输入"
                        >
                        姓名
                        </InputItem>
                        <InputItem
                            type="phone"
                            labelNumber="8"
                            textAlign='right'
                            value={this.state.phone}
                            onChange={(value) => {
                                this.setState({
                                    phone: value,
                                });
                            }}
                            placeholder="请输入"
                        >
                        联系电话
                        </InputItem>
                        <Picker
                            cols={3}
                            itemStyle={{padding: 10}}
                            data={dataSource}
                            value={this.state.city}
                            onChange={this._onCityChange}
                            onOk={this._onCityChange}
                        >
                            <List.Item arrow="horizontal">所在地区</List.Item>
                        </Picker>
                        <InputItem
                            clear
                            type="text"
                            labelNumber="8"
                            textAlign='right'
                            value={this.state.address}
                            onChange={(value) => {
                            this.setState({
                                address: value,
                            });
                            }}
                            placeholder="请输入"
                        >
                        详细地址
                        </InputItem>
                    </List>
                </ScrollView>
            </Provider>
        );
    }
}

export default class AddressComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    _onSaveData() {
         Modal.alert('温馨提示', '修改成功', [
            { text: '确认', onPress: () => console.log('ok') },
        ]);
    }
    renderMoreButton() {
        return (
            <View style={{flexDirection: 'row',}}>
                <TouchableHighlight
                    ref='button'
                    underlayColor='transparent'
                    onPress={() => this._onSaveData() }>
                    <View style={{paddingRight: 15}}>
                        <Text style={{color: '#2F74ED'}}>保存</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    render() {
        const navigationBar = <NavigationBar
            title='修改地址'
            rightButton={this.renderMoreButton()}
            hide={false}/>;
        const content = <AddressContentComponent {...this.props}/>
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
    }
});