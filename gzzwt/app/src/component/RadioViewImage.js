import React from 'react';
import { Text, View,TouchableOpacity,StyleSheet,Image } from 'react-native';
import { Checkbox, List, WhiteSpace } from '@ant-design/react-native';

export default class RadioViewImage extends React.Component {
  static propTypes = {};
  constructor(props) {
      super(props);
      this.state = {
          bgc: true,
          text: this.props.type,
      }
  }

  render() {
      let color = this.props.checked ? this.state.bgc : false;
      return (  
          <View >
              <TouchableOpacity onPress={this.pressed.bind(this)} style={styles.touch}>
                <View style={{flexDirection:'row'}}>
                {   color==false ?
                    <View style={{ width: 16, height: 16, borderColor: '#d9d9d9',marginHorizontal:1,marginVertical: 1,}}>
                    </View>:
                    <Image style={{width:18,height:18}} source={require('../res/images/dagou.png')}/>
                } 
                  {/* <Text style={{position:'absolute',left:20,bottom:-3}}>{this.state.text}</Text>                 */}
                </View>                   
              </TouchableOpacity>
          </View>
      )
  }
  pressed() {
      let {id, onCheck} = this.props;
      onCheck(id);
  }
}

const styles = StyleSheet.create({
    touch: {
        borderColor: '#d9d9d9', borderWidth: 1,
        
    },
  
    

})
