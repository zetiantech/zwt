import React, { Component } from 'react';

import { 
    StyleSheet,
    TextInput,
    Platform,
    Image,
    View,
    ScrollView,
    RefreshControl,
} from 'react-native';

import GlobalStyles from '../../res/styles/GlobalStyles'

import NavigationBar from '../../common/NavigationBar'
import TargetButton from '../../component/TargetButtom'

//搜索框
class SearchInput extends Component {
    render() {
        let inputView =
            <View style={styles.searchInputBox}>
                <Image style={styles.searchIcon} source={require('../../res/images/ic_searc.png')} />
                <TextInput
                    ref="input"
                    style={styles.textInput}
                    autoFocus={true}
                    underlineColorAndroid="white"
                    placeholder="搜索业务"
                    placeholderTextColor="#999"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    onChangeText={(inputKey) => this.setState({inputKey})}
                ></TextInput>
            </View>;
        return (
            <View style={styles.searchInputBody}>
                {inputView}
            </View>
        );
    }
}
//
class PersonWorkContent extends Component {
    render() {
        const { data, navigation } = this.props
        let targetView = data && data.map((item, i) => {
            item.handler = () => {
                let params = {id: item.id} 
            }
            return (
                <TargetButton {...item} />
            )
        });
        return (
            <ScrollView style={styles.scrollViewStyle}>

            <View style={styles.contentBody}>
                { targetView }
            </View>
            </ScrollView>

        );
    }
}

export default class PersonalWorkGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [
            {id: 1, title: '全部业务'},
            {id: 2, title: '生育收养'},
            {id: 3, title: '户籍办理'},
            {id: 4, title: '教育科研'},
            {id: 5, title: '入伍服役'},
            {id: 6, title: '就业创业'},
            {id: 7, title: '纳税服务'},
            {id: 8, title: '社会保障'},
            {id: 9, title: '婚姻登记'},
            {id: 10, title: '医疗卫生'},
            {id: 11, title: '出境入境'},
            {id: 12, title: '社会救助'},
            {id: 13, title: '住房保障'},
            {id: 14, title: '司法公证'},
            {id: 15, title: '死亡殡葬'},
            {id: 16, title: '职业资格'},
            {id: 17, title: '消费维权'},
            {id: 18, title: '交通出行'},
            {id: 19, title: '文化体育'},
            {id: 20, title: '知识产权'},
            {id: 21, title: '民族宗教'},
            {id: 22, title: '行政缴费'},
            {id: 23, title: '优待抚恤'},
            {id: 24, title: '规划建设'},
            {id: 25, title: '证件办理'},
            {id: 26, title: '旅游观光'},
            {id: 27, title: '公共安全'},
            {id: 28, title: '证件办理'},
            {id: 29, title: '公用事业'},
            {id: 30, title: '城市综合执法'},
            {id: 31, title: '养老服务'},
            {id: 32, title: '涉农补贴'},
            {id: 33, title: '义务教育'},
            {id: 34, title: '准营准办'},
            {id: 35, title: '设立变更'},
            {id: 36, title: '环保绿化'},
            {id: 37, title: '抵押质押'},
            {id: 38, title: '离职退休'},
            {id: 39, title: '其他服务'}
        ]
    }
  }
  render() {
    const navigationBar = <NavigationBar
            title='个人办事指南'
            hide={false} popEnabled = {true}  navigator ={this.props.navigation}/>;
    const SearchInputBar = <SearchInput />
    const content = <PersonWorkContent {...this.state}/>
    return (
      <View style={styles.container}>
          { navigationBar }
          { SearchInputBar }
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
    searchInputBody: {
        position: "relative",
        padding: 15,
        backgroundColor: '#ffffff'
    },
    searchIcon: {
        position: "absolute",
        top: 8,
        left: 12,
        width: 20,
        height: 20,
        tintColor:'#ccc'
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 30:40,
        lineHeight: (Platform.OS === 'ios') ? 30:40,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 3,
        opacity: 0.8,
        fontSize: 14,
        color: '#999',
    },
    searchInputBox: {
        height: (Platform.OS === 'ios') ? 30:40,
        lineHeight: (Platform.OS === 'ios') ? 30:40,
        borderColor: '#E5E5E5',
        borderStyle: 'solid',
        borderRadius: (Platform.OS === 'ios') ? 15:20,
        borderWidth: 1,
    },
    contentBody: {
        position: "relative",
        flexDirection: "row",
        flexWrap: 'wrap',
        marginTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#ffffff'
    },
    scrollViewStyle: {
        flex: 1,
    },
});
