/**
 * @description 预约信息确认
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
    Switch,Flex
 } from '@ant-design/react-native';

 import NavigationBar from '../../../common/NavigationBar'

class PersonalWorkBaseInfoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <ScrollView
                style={{ flex: 1,}}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
            >
                <View style={styles.infoBox}>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>所有人</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>周杰伦</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>机动车登记证书编号</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>2-14654135135132</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>号牌号码</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>粤B88888</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>车辆类型</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>小型汽车</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>预约时间</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>2019-12-24</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>监测站名称</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>无锡南城区监测站</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>检测时段</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>08：00 - 12：00</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>检测地址</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>无锡市南城区滨江中路</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>检测站联系人</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>李大妈</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>联系电话</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>13088870731</Text>
                        </Flex.Item>
                    </Flex>
                </View>
                <View style={{margin: 20,}}>
                    <Button  type="primary" >确认</Button>
                </View>

            </ScrollView>
        );
    }
}

export default class PersonalWorkBaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    render() {
        const navigationBar = <NavigationBar
            title='信息确认'
            hide={false}/>;
        const content = <PersonalWorkBaseInfoComponent {...this.props}/>
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
    titleBox: {
        paddingTop: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
       
    },
    titleText: {
        fontSize: 14,
        color: '#999999'
    },
    infoBox: {
        padding: 15,
        backgroundColor: '#ffffff'
    },
    infoBoxItem: {
        paddingTop: 10,
        paddingBottom: 10
    },
    infoLabel: {
       color: '#999999'
    },
    infoContent: {
        color: '#333333'
    }
});