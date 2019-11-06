/**
 * @description 乘车记录
 * @author 择天团队 Jonne 
*/
import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet ,TouchableOpacity,Image,alert
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    
 } from '@ant-design/react-native';

 import NavigationBar from '../../../common/NavigationBar'

class AccountBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SelecTheYear: ''| 0,
            showCar:true,
        };
      }
    onButtonClick(showCar) {
        let _this = this
        _this.setState({
            showCar: !this.state.showCar
        })     
               
    }
    render() {
        return (
          <View>
              <View>
                <View style={{flexDirection:'row',paddingLeft:30,paddingTop: 19,}}>
                        <Text>2019年9月</Text>
                        <TouchableOpacity onPress={() => this.onButtonClick()}>
                            <Image source={require('../../../res/images/ic_tiaozhuan_down.png')}></Image>
                        </TouchableOpacity>
                </View>
                {  this.state.showCar &&
                <View style={{margin:30,marginBottom: 10,marginTop: 15, backgroundColor:'#fff',borderRadius:5,
                            shadowOffset: {width: 0, height: 5}, shadowOpcacity: 0.5,shadowRadius: 5,shadowColor: '#ddd',                           
                    }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin: 15,
                        borderBottomWidth:0.5,borderBottomColor:'#E5E5E5'}}>
                            <View>
                                <Text style={{color:'#333',fontSize:16}}>M242</Text>
                                <Text style={{paddingTop:15,paddingBottom:15,color:'#666'}}>2019-09-01 11:20:28</Text>
                            </View>
                            <View>
                                <Text>2.40元</Text>                          
                            </View>
                        </View>      
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin: 15,
                        borderBottomWidth:0.5,borderBottomColor:'#E5E5E5'}}>
                            <View>
                                <Text style={{color:'#333',fontSize:16}}>M286</Text>
                                <Text style={{paddingTop:15,paddingBottom:15,color:'#666'}}>2019-10-20 16:20:56</Text>
                            </View>
                            <View>
                                <Text>2.40元</Text>                          
                            </View>
                        </View> 
                </View>
                }
            </View> 
          </View>  
        );
    }
}

export default class Deposite extends Component {
    render() {
        const navigationBar = <NavigationBar
            title='我的账户'
            hide={false} popEnabled = {true}  navigator ={this.props.navigation}/>;
            const accountBalance = <AccountBalance/>
            return (
            <View style={styles.container}>
                <ScrollView>
                { navigationBar }
                { accountBalance }
               
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
 
});

