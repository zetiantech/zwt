/**
 * @description 新闻页面
 * @author 择天团队
 * 
 * **/

import React, { useState, useEffect } from 'react'
import  {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity
} from 'react-native'

import {
    Tabs,
    WhiteSpace,
    ListView
 } from '@ant-design/react-native';

import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';



/**
 * 分页列表
 * @param {Function} getData 获取数据方法
 * @param {Function} setListView 用来接收列表元素
 */

const ScrollViewer = ({
    getData,
    setListView,
    props,
  }) => {
    return (
        <ListView
          ref={ref => setListView(ref)}
          onFetch={getData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={(item, index) => {
            return (
                <ListItemView item={item} props={props} />
            );
          }}
          numColumns={1}
        />
    );
  };

const ListItemView = ({item, props}) => {
    return (
        <View>
            {
                item.templateId == 0 && <TouchableOpacity key={`${item.id}`} style={styles.content}
                    activeOpacity={0.8}
                    onPress={()=>{
                        NavigationUtil.navigate(props, 'newsDetail', {id: item.id})
                    }}
                >
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.contentBox}>
                            <View style={styles.contentTitle}>
                                <Text style={styles.contentTitleText}>{item.title}</Text>
                            </View>
                            <View style={styles.footBox}>
                                <Text style={styles.dateBox}>{item.createTime}</Text>
                            </View>
                        </View>
                        <View style={styles.newsImgBox}>
                            <ImgView url={item} number={1} />
                        </View>
                    </View>
                </TouchableOpacity>
            }
            {
                item.templateId == 1 && <TouchableOpacity 
                    activeOpacity={0.8}
                    key={`${item.id}`}
                    onPress={()=>{
                        NavigationUtil.navigate(props, 'newsDetail', {id: item.id})
                    }}
                    style={styles.content1}
                >
                    <Text style={styles.contentTitleText}>{item.title}</Text>
                    <ImgView url={item} number={3} />
                    <Text style={styles.dateBox}>{item.createTime}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const ImgView = ({url, number}) => {
    const picArr = url.thumbnail && url.thumbnail.split(",")
    return (
        <View style={styles.picBox} >
            {
                picArr && picArr.map((item, i) => {
                    if(i < number){
                        return (<Image resizeMode="cover" source={{uri: item}} style={styles.itemPic} />)
                    }
                })
            }
        </View>
    )
}

export default function NewsPage(props){
    
    const [categoryId, setCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        getNewsCategoryList()
    }, [])

    const [listView, setListView] = useState([]); 

    /**
   * 获取数据
   * @param {Number} size 条数
   */
    function getNewsCategoryList(size= 100){
        HttpUtil.get(API.NEWS_CATEGORY_LIST, {
            size: size
        }).then((responseJson)=>{
            const { code, data, msg} = responseJson.data
            if(code === 0){
                let list = data.list || []
                list = list.map((item, i)=>({index: item.id, title: item.name}));
                list.unshift({
                    index: '',
                    title: '全部'
                });
                setCategoryList(list)
                listView && listView.refresh();
            }else{
                ToastUtil.toast(msg)
            }
        }).catch(error => {
           LogUtil.debug(error)
        });
   }

   /**
   * 获取数据
   * @param {Number} page 页码
   * @param {Function} startFetch 设置数据
   * @param {Function} abortFetch 获取数据出错时回调
   */
   function getNewsList(page=1, startFetch, abortFetch){
        HttpUtil.get(API.NEWS_LIST, {
            categoryId: categoryId,
            page: page,
            size: 10
        }).then((responseJson)=>{
            const { code, data, msg} = responseJson.data
            if(code == 0){
                startFetch(data.list||[], 10)
            }else{
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        }).catch(error => {
            abortFetch();
        });
    }

    const onTabsChange = (tab) => {
        setCategoryId(tab.index)
    }

    return (
        <View style={styles.container} >
            <NavigationBar
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'drak-content', translucent: false}}
                title='资讯列表'
                hide={true}
            />
            <Tabs
                tabs={categoryList}
                initialPage="1"
                onChange={onTabsChange}
                onTabClick={onTabsChange}
                swipeable={false}
                usePaged={false}
                prerenderingSiblingsNumber={false}
                tabBarActiveTextColor="#2F74ED"
                tabBarUnderlineStyle={{width: 20, marginLeft: 25}}>
                <ScrollViewer
                    props={props}
                    getData={getNewsList}
                    setListView={setListView}>
                </ScrollViewer>
            </Tabs> 
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 60
    },
    content: {
        padding: 15,
    },
    contentBox: {
        width: GlobalStyles.window_width-135,
        paddingRight: 10,
        height: 90,
    },
    newsImgBox: {
        width: 140,
        height: 90,
    },
    newsImg: {
        width: '100%',
        height: '100%'
    },
    contentTitle: { 
        height: 70,
    },
    contentTitleText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24
    },
    footBox: {
        height: 30,
        fontSize: 12
    },
    content1: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    picBox: {
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    itemPic: {
        width: (GlobalStyles.window_width-40)/3,
        height: 90,
    },
    dateBox: {
        fontSize: 14,
        color: '#666'
    },
    bottomLine: {
        position: 'absolute',
        width: 24,
        height: 3,
        bottom: 0,
        left: '50%',
        marginLeft: -12,
        borderRadius: 2,
        backgroundColor: '#2F74ED'
    },
    noData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        color: '#999'
    }
});