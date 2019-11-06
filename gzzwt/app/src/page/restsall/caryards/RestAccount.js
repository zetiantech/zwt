/**
 * @description 我的账户
 * @author 择天团队
*/
import React, { Component } from 'react';
import {
    ScrollView,
    View,
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
 } from '@ant-design/react-native';

 import NavigationBar from '../../../common/NavigationBar'

const dataSource = require('@bang88/china-city-data');

const passCauseSource = [
    { label: '小型汽车', value: 0 }
]

class EntryExitPassInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '李大华',
          payment:'微信免密支付',
          phone:'020-21107148'

        };
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
                    <List style={{marginTop:15}}>
                        <InputItem
                            type="text"
                            labelNumber="8"
                            textAlign='right'
                            value={this.state.username}
                            onChange={(value) => {
                                this.setState({
                                    phone: value,
                                });
                            }}
                            >
                            所有人
                        </InputItem>
                        <InputItem
                            type="text"
                            labelNumber="8"
                            textAlign='right'
                            value={this.state.payment}
                            onChange={(value) => {
                                this.setState({
                                    phone: value,
                                });
                            }}
                            >
                            扣款方式
                        </InputItem>
                        <InputItem
                            type="text"
                            labelNumber="8"
                            textAlign='right'
                            value={this.state.phone}
                            onChange={(value) => {
                                this.setState({
                                    phone: value,
                                });
                            }}
                            >
                            联系客服
                        </InputItem>
                    </List>
                
                </ScrollView>
            </Provider>
        );
    }
}

export default class EntryExitPassInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const navigationBar = <NavigationBar
            title='我的账户'
            hide={false} popEnabled = {true}  navigator ={this.props.navigation}/>;
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

