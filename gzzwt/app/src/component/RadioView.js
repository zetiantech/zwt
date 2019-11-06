import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { Checkbox, List, WhiteSpace } from '@ant-design/react-native';

export default class RadioView extends React.Component {

  static propTypes = {};

  constructor(props) {
      super(props);
      this.state = {
          bgc: 'blue',
          text: this.props.type,
      }
  }
  render() {
      let color = this.props.checked ? this.state.bgc : '#fff';
      return (
          <View >
              <TouchableOpacity onPress={this.pressed.bind(this)} style={{ 
               borderColor: '#d9d9d9', borderWidth: 1,
                borderRadius: 50,
                }}>
                <View style={{flexDirection:'row'}}>
                  <View style={{backgroundColor: color, width: 12, height: 12, borderRadius: 50, borderColor: '#d9d9d9',
                   marginHorizontal:1,marginVertical: 1,
                   }}>
                  </View>
                  <Text style={{position:'absolute',left:20,bottom:-3}}>{this.state.text}</Text>                
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
