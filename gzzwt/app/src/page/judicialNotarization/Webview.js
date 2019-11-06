/**
 * @description webview
 * @author heweifeng
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';

import {WhiteSpace} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import {WebView} from 'react-native-webview';

export default function Webview(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title={props.navigation.getParam('title', '')}
      hide={false}
    />
  );
  const html = props.navigation.getParam('html', null);

  return (
    <View style={styles.container}>
      {navigationBar}
      <WebView
        originWhitelist={['*']}
        source={{html: html}}
        injectedJavaScript={`for(i=0;i < document.getElementsByTagName('a').length;i++){document.getElementsByTagName('a')[i].style.display = 'none';};document.body.style.fontSize = '40px';document.body.style.padding = '40px';true;`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
});
