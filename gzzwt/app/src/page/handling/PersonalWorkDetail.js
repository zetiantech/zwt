/**
 * @description 办事详情
 * @author 择天团队
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { 
    Button,
    List,
    Provider,
    Modal,
    Tabs,
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import NavigationUtil from '../../util/NavigationUtil'


const TabsComponent = ({type, tabs, onTabsChange}) => {
    return (
        <Tabs
          initialPage={0}
          tabs={tabs}
          swipeable={true}
          useOnPan={true}
          onTabClick={(tab, index) => onTabsChange(tab,index) }
          renderTabBar={tabProps => (
            <View
                style={{
                paddingHorizontal: 16,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: '#FFFFFF'
                }}
             >
             { tabProps.tabs.map((tab, i) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        key={tab.key || i}
                        style={{
                            paddingVertical: 12,
                            paddingHorizontal: 10
                        }}
                        onPress={() => {
                            const { goToTab, onTabClick } = tabProps;
                            onTabClick && onTabClick(tabs[i], i);
                            goToTab && goToTab(i);
                        }}
                    >
                        {
                            type == 1 && <Text
                            style={{
                                color: tabProps.activeTab === i ? '#ffffff' : undefined,
                                backgroundColor: tabProps.activeTab === i ? '#2F74ED' : undefined,
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                textAlign: 'center',
                                borderRadius: 20,
                            }}
                            >
                            {tab.name}
                            </Text>
                        }
                        {
                           (type == 0 || !type) && <Text
                                style={{
                                    color: tabProps.activeTab === i ? '#2F74ED' : undefined
                                }}
                                >
                                {tab.name}
                            </Text>
                        }
                        {
                          !type && tabProps.activeTab === i && <Text style={styles.bottomLine}></Text>
                        }
                    </TouchableOpacity>
                ))}
            </View>
          )}
        >
        </Tabs>
    )
}


const WorksPassComponent = ({}) => {
    return (
        <>
            <View style={styles.WorksPassBody}>
                <View style={styles.WorksPassHead}>
                    <Text style={styles.WorksPassTitle}>办理Q2字签证</Text>
                    <Button style={styles.entryExitBtn}>
                        <Text style={{color: '#2F74ED', fontSize: 14}}>出境入境</Text>
                    </Button>
                </View>
                <List styles={{Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0}}}>
                    <List.Item arrow="horizontal">
                       <View style={{flexDirection: 'row'}}>
                            <Text style={{paddingRight: 20}}>实施主体</Text>
                            <Text style={{color: '#2F74ED'}}>广州市公安局</Text>
                       </View>
                    </List.Item>
                </List>
                <View style={styles.WorksPassContent}>
                    <View style={styles.WorksPassContentBox}>
                       <View style={[styles.WorksPassContentItem, styles.lineStyle]}>
                            <Text style={styles.WorksPassContentTText}>1工作日</Text>
                            <Text style={styles.WorksPassContentBText}>法定办结</Text>
                       </View>
                       <View style={[styles.WorksPassContentItem, styles.lineStyle]}>
                            <Text style={styles.WorksPassContentTText}>0工作日</Text>
                            <Text style={styles.WorksPassContentBText}>承诺办结</Text>
                       </View>
                       <View style={[styles.WorksPassContentItem]}>
                            <Text style={styles.WorksPassContentTText}>马上办</Text>
                            <Text style={styles.WorksPassContentBText}>审批服务形式</Text>
                       </View>
                    </View>
                </View>
            </View>
        </>
    );
}


const PersonalWorkContent = ({props}) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    

    const tabs = [
        { name: '受理条件', id: 0 },
        { name: '办理流程', id: 1 },
        { name: '申请资料', id: 2 }
    ]

    const applyList = [
        { id: 1, name: '《外国人口岸签证申请表》', handler: (id)=>{ 
            NavigationUtil.navigate(props, 'MaterialDetail', {id: id})
         }},
        { id: 2, name: '有效护照或者其他国际旅行证件', handler: (id)=>{ 
            NavigationUtil.navigate(props, 'MaterialDetail', {id: id})
        }},
        { id: 3, name: '本人相片', handler: (id)=>{ 
            NavigationUtil.navigate(props, 'MaterialDetail', {id: id})
         }},
        { id: 4, name: '邀请函件', handler: (id)=>{ 
            NavigationUtil.navigate(props, 'MaterialDetail', {id: id})
         }},
        { id: 5, name: '邀请人的身份证明', handler: (id)=>{ 
            NavigationUtil.navigate(props, 'MaterialDetail', {id: id})
         }}
    ]

    const onTabsChange = (tab, index) => {
        setCurrentIndex(index)
    }

    return (
        <View style={styles.WorksContentBox}>
            <TabsComponent tabs={tabs} onTabsChange={onTabsChange} />
            {
                currentIndex == 0 && <ConditionComponent />
            }
            {
                currentIndex == 1 && <ProcessComponent />
            }
            {
                currentIndex == 2 && <ApplyComponent applyList={applyList}/>
            }
        </View>
    )

}

//申请资料
const ApplyComponent = ({applyList}) => {
    return (
        <View style={[styles.conditionBox, {paddingLeft: 15}]}>
            <List styles={{Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0}}}>
            {
                applyList && applyList.map((item, index)=>(
                    <List.Item
                        key={`${item.id}-${index}`}
                        styles={{Line: {borderBottomWidth: 0}}} 
                        arrow="horizontal"
                        extra={
                            <Text style={{color: '#2F74ED'}}>详情</Text>
                        }
                        onPress={()=>item.handler(item.id)}>
                        <Text>{item.name}</Text>
                    </List.Item>
                ))
            }
            </List>
        </View>
    )
}


//受理条件
const ConditionComponent = () => {
    return (
        <View style={styles.conditionBox}>
            <View style={styles.conditionBody}>
                <Text style={styles.descript}>
                   出于人道原因需要紧急入境的
                </Text>
            </View>
        </View>
    );
}

//办理流程
const ProcessComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const tabs = [
        { name: '网上办理', id: 1 },
        { name: '窗口办理', id: 2 }
    ]

    const onTabsChange = (tab, index) => {
        setCurrentIndex(index)
    }

    return (
        <View style={styles.conditionBox}>
            <TabsComponent tabs={tabs} type={1}  onTabsChange={onTabsChange} />
            { currentIndex == 0 && 
              <View style={styles.conditionBody}>
                <View style={styles.descript}>
                   <Text>无</Text>
                </View>
              </View> }
            { currentIndex == 1 && 
              <View style={styles.conditionBody}>
                <View style={styles.descript}>
                   <Text style={styles.contentText}>1、申请，申请人到口岸签证机关提出申请，填写《外国人口岸签证申请表》，按要求提交申请材料，缴纳签证费;</Text>
                   <Text style={styles.contentText}>2、受理，接受口岸签证机关相关询问，拍摄现场人像;</Text>
                   <Text style={styles.contentText}>3、审批，口岸签证机关审核申请材料，符合签发条件的给予签发，不符合条件的不予签发;</Text>
                   <Text style={styles.contentText}>4、发证，到发证窗口领取签证。</Text>
                   <View style={styles.showLiuChen} ><Text style={{color: '#2F74ED', fontSize: 14}}>查看流程图</Text></View>
                </View>
              </View> }
        </View>
    );
}

//办事列表
const WorksListComponent = ({listData}) => {
    return (
        <View style={{backgroundColor: '#ffffff'}}>
            <List styles={{Body: {borderTopWidth: 0}}}>
                {
                    listData && listData.map((item, index)=>(
                        <List.Item 
                            key={`${item.id}-${index}`}
                            arrow="horizontal" 
                            onPress={item.handler}
                        >
                            {item.name}
                        </List.Item>
                    ))
                }
            </List>
        </View>
    )
}



export default function PersonalWorkDetail(props){

    const listData = [
        { id: 1, name: '办理窗口', handler: ()=>{  }},
        { id: 2, name: '咨询监督', handler: ()=>{  }},
        { id: 3, name: '许可收费', handler: ()=>{  }},
        { id: 4, name: '中介服务', handler: ()=>{  }},
        { id: 5, name: '设定依据', handler: ()=>{  }},
        { id: 6, name: '法律救济', handler: ()=>{  }}
    ]

    function onMakeWorks(){
        NavigationUtil.navigate(props, 'ApplicationAgreement')
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <NavigationBar title='办事详情' hide={false} popEnabled={true}  navigator ={props.navigation}/>
                <WorksPassComponent />
                <PersonalWorkContent props={props} />
                <WorksListComponent listData={listData}/>
                <Button style={styles.btnBox} type="primary" onPress={onMakeWorks}>立即办理</Button>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    WorksPassBody: {
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#ffffff'
    },
    WorksPassHead: {
        marginLeft: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        borderBottomColor: '#E5E5E5'
    },
    WorksPassTitle: {
        fontSize: 18,
        color: '#333'
    },
    entryExitBtn: {
        marginRight: 15,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 3,
        height: 28,
        paddingBottom: 3,
        backgroundColor: '#D5E3FB',
        borderRadius: 2,
        borderWidth: 0
    },
    WorksPassContent: {
        margin: 15,
        shadowColor: 'red',
        borderRadius: 4,
        shadowOffset:{h:2, w:3},
        shadowRadius: 4,
        shadowOpacity: 1,
    },
    WorksPassContentBox: {
        flexDirection: 'row'
    },
    WorksPassContentItem: {
        flex: 1,
        alignItems:'center'
    },
    WorksPassContentTText: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 16,
        color: '#333'
    },
    WorksPassContentBText: {
        paddingTop: 5,
        fontSize: 14,
        color: '#999999'
    },
    lineStyle: {
        borderRightColor: '#E5E5E5',
        borderRightWidth: 0.6,
        borderStyle: 'solid'
    },
    WorksContentBox: {
        flex: 1,
        marginTop: 15,
        backgroundColor: '#ffffff'
    },
    conditionBox: {
        paddingTop: 15,
        backgroundColor: '#ffffff'
    },
    conditionBody: {
        padding: 15,
    },
    descript: {
        borderRadius: 4,
        backgroundColor: '#F2F2F2',
        padding: 20
    },
    contentText: {
        lineHeight: 22,
        fontSize: 14
    },
    showLiuChen: {
        borderWidth: 0,
        fontSize: 12,
        paddingTop: 15,
        alignItems: 'center'
    },
    bottomLine: {
        position: 'absolute',
        width: 20,
        height: 1,
        bottom: 0,
        left: '90%',
        marginLeft: -30,
        backgroundColor: '#2F74ED'
    },
    btnBox: {
        marginVertical: 30,
        marginHorizontal: 20
    }
});