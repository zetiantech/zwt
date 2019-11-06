/**
 * @description 公证申办
 * @author heweifeng
 */
import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  List,
  Button,
  WhiteSpace,
  WingBlank,
  Flex,
  Checkbox,
} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';
import GlobalStyles from 'src/res/styles/GlobalStyles';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import Form from 'src/component/FormComponent'; // 表单

const Item = List.Item;

const MaterialInfo = ({data}) => {
  const [showImg, setShowImg] = useState(false);
  return (
    <>
      <Item
        arrow={showImg ? 'down' : 'horizontal'}
        onPress={() => setShowImg(!showImg)}>
        <Text style={styles.fs16}>材料信息</Text>
      </Item>
      {showImg && (
        <View>
          {data.map(item => {
            return (
              <View key={item.id}>
                <Text style={styles.imageTitle}>{item.dimName}</Text>
                <Flex style={styles.itemBox}>
                  {item.materialUrl.split(',').map((url, index) => {
                    return (
                      <Flex.Item style={styles.item} key={url + index}>
                        <Image
                          source={{
                            uri:
                              'http://dummyimage.com/200x100/79f2b7/FFF&text=EasyMock',
                          }}
                          style={styles.img}
                        />
                      </Flex.Item>
                    );
                  })}
                </Flex>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};

const Cost = ({data}) => {
  const showData = {
    justiceCost: {
      label: '公证费',
      type: 'text',
      inheritAll: true,
      labelStyle: styles.costLabel,
      valueStyle: styles.costValue,
      attr: {
        last: true,
        labelNumber: 10,
        multipleLine: true, // 多行
        textAlign: 'right',
      },
      valueTemplate: val => {
        return <Text style={styles.costValue}>{val || '待定'}</Text>;
      },
    },
    duplicateCost: '副本费',
    notarialDeedCost: '公证书翻译费',
    textCost: '文本翻译费',
    addedServiceCost: '增值服务',
  };
  return (
    <List
      renderHeader="公证费用"
      styles={{Header: {backgroundColor: 'transparent'}}}>
      {data.map(item => {
        return (
          <View key={item.id}>
            <Item>
              <Text
                style={{
                  fontSize: 16,
                  color: '#333',
                }}>{`${item.justiceSonName}(${item.additional}份)`}</Text>
            </Item>
            <Form showData={showData} data={item} />
          </View>
        );
      })}
      <Item extra={<Text style={{color: '#333', fontSize: 16}}>待定</Text>}>
        费用总计
      </Item>
    </List>
  );
};

export default function OnlineBidDetail(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="信息确认"
      hide={false}
    />
  );
  const id = props.navigation.getParam('applyId', '44'); // 获取参数
  const [list, setList] = useState({});
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    HttpUtil.post(API.GETAPPLY, {id}).then(data => {
      data = data.data;
      if (data.code === 0) {
        setList(data.data);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }, []);

  const showData = {
    bidCode: {
      label: '申办号',
      type: 'text',
      inheritAll: true,
      valueStyle: styles.value,
      attr: {
        align: 'middle',
        borderBottom: false, //不显示下边框线, 设置了multipleLine时用
        multipleLine: true, // 多行
      },
    },
    bidTime: '申办时间',
    foreignJusticeName: '申办用途',
    justiceDim: '使用地',
    language: '翻译语言',
    phone: '联系方式',
    bider: '申办人',
    documentType: '证件类型',
    documentCode: '证件号',
  };

  const showAdress = {
    unitName: {
      label: '领取地点',
      type: 'text',
      inheritAll: true,
      valueStyle: styles.value,
      attr: {
        align: 'middle',
        borderBottom: false, //不显示下边框线, 设置了multipleLine时用
        multipleLine: true, // 多行
        wrap: true,
      },
    },
    unitAddress: '地址',
  };

  function handleNext() {
    NavigationUtil.navigate(props, 'OnlineBidSuccess');
  }

  return (
    <View style={styles.container}>
      {navigationBar}
      <ScrollView>
        <WhiteSpace size="lg" />
        <Form
          style={styles.form}
          data={list.justiceApply ? list.justiceApply[0] : {}}
          showData={showData}
        />
        <WhiteSpace size="lg" />
        <MaterialInfo data={list.materialList ? list.materialList : []} />
        <Cost data={list.justiceCost ? list.justiceCost : []} />
        <WhiteSpace size="lg" />
        <Form
          style={styles.form}
          data={list.justiceApply ? list.justiceApply[0] : {}}
          showData={showAdress}
        />
        <WhiteSpace size="xl" />
        <Checkbox.AgreeItem
          checked={agree}
          onChange={event => setAgree(event.target.checked)}>
          我同意《申办须知》《在线受理服务使用规则》
        </Checkbox.AgreeItem>
        <WhiteSpace size="xl" />
        <WingBlank>
          <Button type="primary" disabled={!agree} onPress={() => handleNext()}>
            确定
          </Button>
        </WingBlank>
        <WhiteSpace size="xl" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 2,
  },
  itemBox: {
    padding: 7.5,
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  item: {
    height: 80,
    minWidth: (GlobalStyles.window_width - 15) / 3,
    maxWidth: (GlobalStyles.window_width - 15) / 3,
    padding: 7.5,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  imageTitle: {
    padding: 15,
    paddingBottom: 0,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  costLabel: {
    fontSize: 14,
    color: '#999',
  },
  costValue: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'right',
    flex: 2,
  },
  fs16: {
    fontSize: 16,
  },
});
