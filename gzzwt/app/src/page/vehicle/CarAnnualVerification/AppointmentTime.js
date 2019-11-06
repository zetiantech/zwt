/**
 * @description 预约选择时段
 * @author 择天团队 Jonne 
*/
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    
} from 'react-native';
import { 
    Picker,
    Flex,List,Provider
 } from '@ant-design/react-native';

 import NavigationBar from '../../../common/NavigationBar'
 const Item = List.Item;
const  dataSource = [
    {
        value: '1',
        label: '08：00-12：00'
    },
    {
        value: '2',
        label: '转移确认'
    },

]



class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          type: [],
          surname: '周杰伦',
          statc:'正常',
          name: '',
          checked: false,
        };
      }
    render() {
        return (
                <View style={styles.warp}> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>广州市越秀区监测站</Text>
                        </View>                   
                    </View> 

                    <View style={styles.list}>    
                        <View style={styles.conname}>
                            <Text style={styles.text1}>
                                <Image style={styles.searchIcon} source={require('../../../res/images/ic_star.png') } />      
                                  地址</Text>             
                        </View> 
                        <View style={styles.conname}>
                            <Text style={styles.text}>广州市越秀区海珠中路72号</Text>             
                        </View>
                    </View>                
                </View>
           
        );
    }
}

//宫格
class FlexExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
          type: [],
          id: '',
          title:'',
          text: '',
        };
}
    render() {    
      return (       
        <View style={{  marginTop: 15}}>
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
        <List >
          <Item extra="没有箭头" arrow="empty">
            标题文字
          </Item>
        </List>    
        </View>
        
        
      );
    }



}

export default class NewVehicleMake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { 'id':1,'title':' ','text':'周一'},
                { 'id':2,'title':' ','text':'周一'},
                { 'id':3,'title':' ','text':'周一'},
                { 'id':4,'title':' ','text':'周一'},
                { 'id':5,'title':' ','text':'周一'},
                { 'id':6,'title':' ','text':'周一'},
                { 'id':7,'title':' ','text':'周一'}  
            ]
        }
      }
    render() {
        const navigationBar = <NavigationBar
            title='选择时段'
            hide={false}/>;
        const formView = <BaseInfo />
        const flexExample = <FlexExample {...this.state.data}/>
        return (
            <Provider>
            <View style={styles.container}>
                { navigationBar }
                { formView }
                { flexExample }
            </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    warp:{
        paddingVertical: 20,
        backgroundColor: '#f9f9f9',
        marginTop: 20,      
    },
    conname:{
        marginLeft:15,
        flexDirection:'row', 

    },
    list:{
        // flex:0,
        flexDirection:'row', 
    },
    text:{
        marginTop: 15,
    },
    text1:{
        marginTop: 15,
        color:'#ccc',
        fontSize:12,

    },
    title:{
        fontWeight:'bold'

    },

    name:{
        paddingLeft:100
    },
    searchIcon:{
        width:12,
        height:14,
        tintColor: '#CCC',
        marginRight: 10,
       
    },
    textTow:{
        marginBottom: 2,
        marginRight: 2,
        backgroundColor:'#fff',

        // flex:1,
        height:50
      }

});

