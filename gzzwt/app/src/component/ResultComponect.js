/**
 * @description 预约业务查询结果
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
    List,
    Modal,
    Flex,
 } from '@ant-design/react-native';

import NavigationBar from '../common/NavigationBar'

class ResultSearchComponent extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        return (
            <View style={styles.infoBox}>
                <Flex style={[styles.infoBoxItem, {justifyContent: 'space-between'}]}>
                    <Flex.Item>
                       <Text style={styles.infoFristLabel}>来往港澳通行证办理</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoFristContent}>正在受理</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>办证流水号</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>1245454541212</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>身份证号码</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>44454575454545454545</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>受理日期</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>2019-09-12</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>受理机构</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>广州出入境机构</Text>
                    </Flex.Item>
                </Flex>
            </View>
        );
    }
}

export default class ResultComponect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    render() {
        const navigationBar = <NavigationBar
            title='查询结果'
            hide={false}/>;
        const content = <ResultSearchComponent {...this.props}/>
        return (
            <View style={styles.container}>
                { navigationBar }
                <ScrollView
                    style={{ flex: 1,}}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    { content }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    infoBox: {
        marginTop: 15,
        padding: 15,
        backgroundColor: '#ffffff'
    },
    infoBoxItem: {
        paddingTop: 10,
        paddingBottom: 10
    },
    infoFristLabel: {
        fontSize: 18,
        color: '#333'
    },
    infoFristContent: {
        fontSize: 14,
        color: '#2F74ED',
        textAlign: 'right'
    },
    infoLabel: {
       color: '#999999'
    },
    infoContent: {
        color: '#333333'
    }
});