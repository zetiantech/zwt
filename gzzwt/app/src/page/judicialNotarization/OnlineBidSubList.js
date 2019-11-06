/**
 * @description 公证申办
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  List,
  Stepper,
  WhiteSpace,
  WingBlank,
  Button,
} from '@ant-design/react-native';

import {IconOutline} from '@ant-design/icons-react-native';

import NavigationBar from '../../common/NavigationBar';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

const Item = List.Item;

const Explain = () => {
  return (
    <Text style={styles.explain}>
      <IconOutline name="exclamation-circle" style={styles.explainIcon} />
      <Text>
        公证书前1份为正本，第2份起为副本；如您需要副本，数量请选择2份或以上。正本与副本具有同样的法律效力。
      </Text>
    </Text>
  );
};

export default function OnlineBidSubList(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="公证申办"
      hide={false}
    />
  );
  const id = props.navigation.getParam('id', ''); // 获取参数
  const [list, setList] = useState([]); // 子项列表数据
  const [materialCopies, setMaterialCopies] = useState({}); // 子项列表数据

  useEffect(() => {
    HttpUtil.post(API.GETFOREIGNJUSTICESON, {typeId: id}).then(data => {
      data = data.data;
      if (data.code === 0) {
        setList(data.data);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }, []);
  /**
   * 触发份数修改
   * @param {Number} justiceSonId 公证id
   * @param {Number} additional 份数
   */
  function handleChange(justiceSonId, additional) {
    const obj = JSON.parse(JSON.stringify(materialCopies));
    if (additional === 0) {
      delete obj[justiceSonId];
      setMaterialCopies(obj);
    } else {
      setMaterialCopies({
        ...obj,
        [justiceSonId]: additional,
      });
    }
  }
  /**
   * 触发查看描述
   * @param {String} html 网页字符串
   */
  function handleDesc(html) {
    NavigationUtil.navigate(props, 'HtmlWebview', {
      title: '办证说明',
      html,
    });
  }

  return (
    <View style={styles.container}>
      {navigationBar}
      <ScrollView showsVerticalScrollIndicator={false}>
        <WhiteSpace size="lg" />
        <Explain />
        <WhiteSpace size="lg" />
        <List>
          {list.map((item, index) => {
            return (
              <Item
                key={index}
                extra={
                  <Stepper
                    key="0"
                    min={0}
                    defaultValue={0}
                    styles={{
                      stepText: {
                        width: 20,
                        height: 20,
                        lineHeight: 22,
                        color: '#fff',
                        backgroundColor: '#2F74ED',
                        borderColor: '#2F74ED',
                        borderRadius: 11,
                      },
                      stepWrap: {
                        width: 20,
                        height: 20,
                        lineHeight: 20,
                        borderRadius: 12,
                        borderWidth: 0,
                      },
                      container: {
                        justifyContent: 'flex-end',
                      },
                      disabledStepTextColor: {
                        backgroundColor: '#fff',
                        color: '#CCCCCC',
                        borderWidth: 1,
                        borderColor: '#CCCCCC',
                      },
                    }}
                    upStyle={{
                      borderRadius: 11,
                      width: 20,
                      height: 20,
                      lineHeight: 22,
                    }}
                    downStyle={{
                      borderRadius: 11,
                      width: 20,
                      height: 20,
                      lineHeight: 22,
                    }}
                    inputStyle={{
                      fontSize: 16,
                      height: 30,
                      lineHeight: 24,
                      color: '#333333',
                      width: 40,
                      overflow: 'hidden',
                      flex: 0,
                    }}
                    onChange={val => handleChange(item.id, val)}
                  />
                }>
                {
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={styles.questionIcon}
                      onPress={() => handleDesc(item.describe)}>
                      <IconOutline name="question" style={{color: '#ccc'}} />
                    </TouchableOpacity>
                    <Text>{item.name}</Text>
                  </View>
                }
              </Item>
            );
          })}
        </List>
      </ScrollView>
      {Object.keys(materialCopies).length !== 0 && (
        <WingBlank>
          <WhiteSpace />
          <Button
            type="primary"
            onPress={() =>
              NavigationUtil.navigate(props, 'OnlineBidInfo', {
                info: {
                  materialCopies,
                  foreignJusticeId: id,
                },
              })
            }>
            下一步
          </Button>
          <WhiteSpace />
        </WingBlank>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  explain: {
    lineHeight: 25,
    padding: 15,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  explainIcon: {
    color: '#2F74ED',
    marginRight: 10,
  },
  questionIcon: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    marginRight: 5,
  },
});
