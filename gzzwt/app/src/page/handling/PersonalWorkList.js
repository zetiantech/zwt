/**
 * @description 出境入境列表
 * @author 择天团队
 * 
 * **/

import React, { Component } from 'react';
import { 
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableHighlight,
    DeviceEventEmitter,
    FlatList,
    Image,
    StyleSheet 
} from 'react-native';

import {    
    List,
    Flex
 } from '@ant-design/react-native';

import { Theme, Drawer, Button } from 'teaset'

import GlobalStyles from '../../res/styles/GlobalStyles'
import NavigationBar from '../../common/NavigationBar'
import TargetButton from '../../component/TargetButtom'
import NavigationUtil from '../../util/NavigationUtil'


class PersonalWorkContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            animating: false,
            pageNo: 1, // 页数
            showFooter: 0, // 0-隐藏 1-已加载完成，没有更多数据 2: 显示加载中
            isRefreshing: false, // 下拉刷新
        }
    }
    componentDidMount() {
        this._fetchData(1);
    }
    /**
     * 列表布局
     * **/
    _renderItemView = ({item}) => {
        return (
            <View style={item==''?styles.hidden:''}>
                <TouchableHighlight
                    ref='button'
                    underlayColor='transparent'
                   >
                        <List.Item arrow="horizontal"  onPress={()=>
                            this.onListClick(item.id)
                        }>
                            {item.title}
                        </List.Item>
                    </TouchableHighlight>
            </View>
        )
    }
    /**
     *  
     **/
    _separator() {
        return <View style={{ height: 1,}} />
    }
    /**
     * 加载时动画
     * **/
    _renderFooter() {
        if (this.state.showFooter === 1) {
            return (
                <View style={styles.footer} >
                    <Text style={{color: '#cccccc',}} >
                        没有更多数据
                    </Text>
                </View>
            )
        } else if (this.state.showFooter === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.footer}>
                    <Text>下拉查看更多</Text>
                </View>
            )
        }
    }
    _getDataList = () => {
        let _this = this
        
        _this.state.pageNo = 1
        _this.setState({
            list: [],
            showFooter: 0,
            isRefreshing: false
        })
    }
    _onRefresh = () => {
        if(!this.state.isRefreshing){
            this.page = 1
            // this._getDataList()
        }
    }
    /**
     * 上拉触底事件
     */
    _onEndReached = () => {
        let _this = this
        if(this.state.showFooter != 0){
            return
        } else {
            let page = _this.state.pageNo
            let pages = page + 1
            _this.setState({
                pageNo: pages
            })
            _this.fetchData(pages)
        }
        // 底部显示正在加载更多数据
        _this.setState({ showFooter: 2 });
    }
    _fetchData(page) {
        var list = [
            {id: 1,title: '外国人来华工作许可'},
            {id: 2, title: '延期X2字签证'},
            {id: 3, title: '延期J2字签证'},
            {id: 4, title: '换发M字签证'},
            {id: 5, title: '办理中国人民共和国入籍证书'},
            {id: 6, title: '换发F字签证'},
            {id: 7, title: '换发X2字签证'},
            {id: 8, title: '延期R字签证'}
        ]
        this.setState({
            list: list
        });
    }
    //列表跳转
    onListClick (index) {
        console.log(index)
        NavigationUtil.navigate(this.props,'PersonalWorkDetail')
        
    }
    render() {
        return (
            <View style={styles.bigbox}>
                <FlatList
                    data={this.state.list}
                    renderItem={this._renderItemView}
                    /**
                     * 添加尾巴布局
                     */
                    ItemSeparatorComponent={this._separator}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    /**
                     * 从下往上拉去的时候加载更多
                     */
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={0.2}
                    /**
                     * 关于下拉刷新
                     */
                    onRefresh={this._onRefresh.bind(this)}
                    refreshing={this.state.isRefreshing}
                />
                <View style={this.state.animating == true ? styles.animating : styles.hidden}>
                    <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, {height: 80}]}
                    size="small" />
                </View>
                <View style={this.state.animating == true ? styles.animating : styles.hidden}>
                    <Text>加载中...</Text>
                </View>        
                <View style={this.state.status == 1 ? styles.zanwu  : styles.hidden}>
                    <Text style={{fontSize:20,color:'#ccc'}}>暂无更多数据...</Text>
                </View>

            </View>
        )
    }
}

class PersonWorkContent extends Component {
    render() {
        const { data, navigation } = this.props

        let targetView = data && data.map((item, i) => {
            item.handler = () => {
                let params = {id: item.id}
            }
            item.style = {
                width: 110,
                paddingTop: 6,
                paddingBottom: 6,
                fontSize: 14
            }
            return (
                <TargetButton {...item} />
            )
        });
        return (
            <ScrollView style={styles.scrollViewStyle}>
                <Text style={styles.drawerTitle}>办事指南</Text>
                <View style={{ display:'flex', flexDirection: 'row',  flexWrap: 'wrap'}}>

                    { targetView }
                </View>
            </ScrollView>
        );
    }
}

export default class PersonalWorkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme,
            rootTransform: 'none',
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
        };
    }
    renderMoreButton() {
        return (
            <View style={{flexDirection: 'row',}}>
                <TouchableHighlight
                    ref='button'
                    underlayColor='transparent'
                    onPress={() => this._toggleMenu('right') }>
                    <View style={{paddingRight: 15}}>
                        <Text>全部</Text>
                    </View>
                </TouchableHighlight>
            </View>)
    }
    _toggleMenu(side) {
        let { rootTransform } = this.state
        this.drawer = Drawer.open(this._renderDrawerMenu(), side, rootTransform)
    }
    _renderDrawerMenu() {
        return (
            <View style={{backgroundColor: Theme.defaultColor, width: 260, flex: 1, padding: 10}}>
                
                <View style={styles.drawerBody}>
                    <PersonWorkContent {...this.state} />
                </View>
                {/* <View style={{flex: 1}} /> */}
                <Button type='link' size='sm' title='关闭' onPress={() => this.drawer && this.drawer.close()} />
            </View>
        )
    }
    render() {
        const navigationBar = <NavigationBar
            title='出境入境'
            rightButton={this.renderMoreButton()}
            hide={false} popEnabled = {true}  navigator ={this.props.navigation}/>;
        const content = <PersonalWorkContent  {...this.props}/>
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
    listItem: {
        padding: 20,
        backgroundColor: '#ffffff',
        textAlign: 'left',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1
    },
    itemText: {
        fontSize: 16,
    },
    IconImage: {
        height:20,
        width:20,
        tintColor:'#ccc',
        position: 'absolute',
        top: 18,
        right: 10,
        alignItems: 'center'
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    zanwu:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 30,
    },
    hidden:{
        display:'none'
    },  
    animating:{
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    bigbox:{
        display: 'flex',
    },
    // drawerBox: {
    //     marginTop: 40,
    // },
    drawerBody: {
        position: "relative",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        height: GlobalStyles.window_height-40
    },
    drawerTitle: {
        fontSize: 16,
        paddingTop:20,
        paddingBottom:20
    },
    scrollViewStyle: {
        flex: 1,
    },
});
