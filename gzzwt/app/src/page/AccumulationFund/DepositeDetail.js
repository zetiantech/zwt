/**
 * @description 公积金缴存明细
 * @author 择天团队
*/
import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {API} from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'

 import NavigationBar from 'src/common/NavigationBar'
 import TestCustomAlert from 'src/component/TestCustomAlert'

class AccountBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year:'',    
            typeId:this.props.typeId,
            data:[],
        };
      }
    componentWillMount (){     
        this.AccountDetailList()
    }   
    AccountDetailList(typeName) { 
        let _this = this 
        const data = {    
            typeId:this.props.navigation.getParam('typeId'),
            accountId:1,
            year: typeName || 2019,
        }  
        HttpUtil.get(API.AccountDetailList,             
            data     
        ).then(responseJson => {    
            console.log(responseJson,'公积金信息')   
            const { code, data, msg } = responseJson.data    
            if(code == 0){ 
                console.log(data,'公积金信息')   
                _this.setState({  
                    data:data        
                    }         
                )                                              
            }      
        }).catch(error => {
            console.log(error,'error')
        });
    }
    onselect(typeName){
        this.AccountDetailList(typeName)
    }
    _renderView () {
        let data = this.state.data
        let rederView = data.map((item,i)=> {
            return (
                    <View style={styles.cardView}>
                        <View>
                            <Text style={styles.cardyear}>2019年8月5日</Text>
                            <Text style={styles.cardtext}>托收汇款</Text>
                        </View>
                        <View>
                            <Text>￥3100.00</Text>                          
                        </View>
                    </View>
            )
        })
        return rederView 
    }
    render() {
        return (
          <View>
              <View style={styles.herd}>
                    <TestCustomAlert onPress={this.onselect.bind(this)}  />
              </View>
              <View style={styles.warp}>
                { this._renderView()}
              </View>
          </View>
        );
    }
}

export default class DepositeDetail extends Component {
    render() {
        const navigationBar = <NavigationBar
                title='缴存明细'
                hide={false}
                popEnabled = {true}
                navigator ={this.props.navigation}
                statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
            />; 
            const accountBalance = <AccountBalance {...this.props}/>
            return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
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
    herd:{
        flexDirection:'row',
        paddingLeft:30,
        paddingTop: 19,
    },
    warp:{
        margin:30,
        marginBottom: 10,
        marginTop: 15,
        backgroundColor:'#fff',
        borderRadius:5,
        // elevation:2,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        flex:1
 
    },
    cardView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin: 15,
        borderBottomWidth:0.5,
        borderBottomColor:'#E5E5E5'
    },
    cardyear:{
        color:'#333',
        fontSize:16
    },
    cardtext:{
        paddingTop:15,
        paddingBottom:15,
        color:'#666'
    }

})
