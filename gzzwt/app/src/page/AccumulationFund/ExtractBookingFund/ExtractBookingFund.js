/**
 * @description 公积金前台提取预约
 * @author 择天团队 
*/
import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,Image
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Provider,
    Flex

 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import { TouchableOpacity } from 'react-native-gesture-handler';

const dataSource = require('@bang88/china-city-data');
const Item = List.Item;


const sexSource = [
    { label: '工商银行', value: '0' },
    { label: '农业银行', value: '1' }
]

const paperworkSource = [
    { label: '白云区', value: '0' }
]


class PersonalStayReportComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          enSurname: '',
          enName: '',
          sex: ['0'],
          city: ['44', '4401', '440103'],
          birthday: undefined,
          paperwork: ['0'],
          pageindex:1

        };
      }
      onChange = (value) => {
        this.setState({
            city: value
        });
      }
      onPickerDateChange = (value) => {
          this.setState({ 
            birthday: value
          });
        };
    onbutton(index){
        this.setState({
            pageindex:index
        })
    }
    render() {
        return (
            <Provider>
                <ScrollView
                    style={{ flex: 1 }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >

                {
                    this.state.pageindex == 1 && <View>
                    <List style={{marginTop:15}}>
                        <Picker
                            cols={1}
                            title="请选择网点"
                            itemStyle={{padding: 10}}
                            data={paperworkSource}
                            value={this.state.paperwork}
                            onChange={(value) => {
                                this.setState({
                                    paperwork: value,
                                });
                            }}
                            onOk={(value) => {
                                this.setState({
                                    paperwork: value,
                                });
                            }}
                        >
                            <List.Item arrow="horizontal">网点区域</List.Item>
                        </Picker>
                        <Picker
                            cols={1}
                            title="请选择银行"
                            itemStyle={{padding: 10}}
                            data={sexSource}
                            value={this.state.sex}
                            onChange={(value) => {
                                this.setState({
                                    sex: value,
                                });
                            }}
                            onOk={(value) => {
                                this.setState({
                                    sex: value,
                                });
                            }}
                        >
                            <List.Item arrow="horizontal">受理银行</List.Item>
                        </Picker>
                        <Picker
                            title="请选择网点"
                            cols={3}
                            itemStyle={{padding: 10}}
                            data={dataSource} //
                            value={this.state.city}
                            onChange={this.onChange}
                            onOk={this.onChange}
                        >
                            <List.Item arrow="horizontal">网点名称</List.Item>
                        </Picker>
                    </List>
                </View>
                } 
                {  this.state.pageindex == 2 &&
                <View>
                    
                    <View style={{backgroundColor:'#fff',marginTop:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{padding: 20,marginTop: 5}} >
                            <View style={{borderRightWidth:0.3,}}>
                                <View style={{marginRight:1}}>
                                    <Text>中行广州远景路支行</Text>
                                </View>
                                <View style={{flexDirection:'row',paddingVertical:10,marginRight:80}}>
                                    <Image style={{width:15,height:15,marginRight:10}}  source={require('src/res/images/tab1.png')}></Image>
                                    <Text style={{color:'#333'}}>广州市小北路65号华宇大厦</Text>
                                </View> 
                            </View>
                        </View>
                        <TouchableOpacity style={{marginRight:30}} >
                            <Image source={require('src/res/images/tab1.png')}></Image>
                        </TouchableOpacity>
                    </View>
                                
                    <View style={{marginTop:15}}>
                    <Flex>
                        <Flex.Item style={styles.textTow}>
                        <Text style={{textAlign:'center',lineHeight:60}}></Text>
                        </Flex.Item>
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>           
                    </Flex>
                    <Flex>
                        <Flex.Item style={styles.textTow}>
                        <Text style={{textAlign:'center',lineHeight:60}}>上午</Text>
                        </Flex.Item>
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>           
                    </Flex>
                    <Flex>
                        <Flex.Item style={styles.textTow}>
                        <Text style={{textAlign:'center',lineHeight:60}}>下午</Text>
                        </Flex.Item>
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                        <Flex.Item style={styles.textTow}>
                        <Text  style={{textAlign:'center',lineHeight:30}}>{this.state.text}周一</Text>
                        <Text  style={{textAlign:'center',color:'#ccc'}}>9-23</Text>
                        </Flex.Item>  
                            <Flex.Item style={styles.textTow}>  
                                <Picker
                                    cols={1}
                                    itemStyle={{padding: 10}}
                                    data={dataSource}
                                    value={this.state.type}
                                    onChange={this.onChange}
                                    onOk={this.onChange}
                                >
                                    <Text  style={{lineHeight:20,paddingLeft:21,paddingTop:10}}>点击预约</Text>
                                </Picker>    
                            </Flex.Item>           
                    </Flex> 
                        
                </View> 
                 
                </View>
                }
                    <List style={{margin: 20, marginTop: 30}}>
                        <Button type="primary" onPress={()=> this.onbutton(2)} >下一步</Button>
                    </List>      
                </ScrollView>
            </Provider>
        );
    }
}

export default class ExtractBookingFund extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const formView = <PersonalStayReportComponent />
        return (
            <View style={styles.container}>
                <NavigationBar
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                    title='前台提取预约'
                    hide={false}
                    popEnabled = {true}
                    navigator ={this.props.navigation}
                />
                { formView }
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
        color: '#ffffff',
        backgroundColor: '#2F74ED'
    },
    textTow:{
        marginBottom: 2,
        marginRight: 2,
        backgroundColor:'#fff',

        // flex:1,
        height:50
      }

});

