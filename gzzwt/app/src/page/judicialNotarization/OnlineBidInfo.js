/**
 * @description 公证申办
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {
  WhiteSpace,
  WingBlank,
  Button,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import Form, {validate} from 'src/component/FormComponent.js'; // 表单
import dayjs from 'dayjs';

export default function OnlineBidSubList(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="申办信息"
      hide={false}
    />
  );
  const info = props.navigation.getParam('info', ''); // 获取参数
  const [useForData, setUseForData] = useState({
    // 使用地数据
    placeId: {
      label: '使用地',
      type: 'Picker',
      validator: [
        {
          rule: 'require',
          tip: '请选择使用地',
        },
      ],
      data: [],
      attr: {
        title: '请选择',
      },
    },
    languageId: {
      label: '翻译语言',
      type: 'Picker',
      validator: [
        {
          rule: 'require',
          tip: '请选择语言',
        },
      ],
      data: [],
      attr: {
        title: '请选择',
      },
    },
  });
  const [kosekiData, setKosekiData] = useState({
    // 户籍信息
    typeId: {
      label: '户口所在地',
      type: 'Picker',
      validator: [
        {
          rule: 'require',
          tip: '请选择户口所在地',
        },
      ],
      data: [
        {
          value: 1,
          label: '本地户口',
        },
        {
          value: 2,
          label: '外地户口(有居住证明)',
        },
        {
          value: 3,
          label: '外地户口(无居住证明)',
        },
      ],
      attr: {
        title: '请选择',
      },
    },
  });
  const [personalData, setPersonalData] = useState({
    // 个人信息
    bider: {
      label: '姓名',
      type: 'InputItem',
      validator: [
        {
          rule: 'require',
          tip: '请填写姓名',
        },
      ],
      attr: {
        textAlign: 'right',
        placeholder: '请输入姓名',
      },
    },
    documentId: {
      label: '证件类型',
      type: 'Picker',
      validator: [
        {
          rule: 'require',
          tip: '请选择证件类型',
        },
      ],
      data: [],
      attr: {
        title: '请选择',
      },
    },
    documentCode: {
      label: '证件号',
      type: 'InputItem',
      validator: [
        {
          rule: 'require',
          tip: '请输入证件号',
        },
      ],
      attr: {
        textAlign: 'right',
        placeholder: '请输入证件号',
      },
    },
    gender: {
      label: '性别',
      type: 'Picker',
      validator: [
        {
          rule: 'require',
          tip: '请选择性别',
        },
      ],
      data: [
        {
          value: 1,
          label: '男',
        },
        {
          value: 2,
          label: '女',
        },
      ],
      attr: {
        title: '请选择',
      },
    },
    birthday: {
      label: '出生日期',
      type: 'DatePicker',
      validator: [
        {
          rule: 'require',
          tip: '请选择出生日期',
        },
      ],
      height: 50,
      attr: {
        defaultDate: new Date(1990, 1, 1),
        minDate: new Date(1920, 1, 1),
        maxDate: new Date(),
      },
    },
  });
  const [contactData, setContactData] = useState({
    // 联系信息
    phone: {
      label: '联系电话',
      type: 'InputItem',
      validator: [
        {
          rule: 'require',
          tip: '请输入联系电话',
        },
      ],
      attr: {
        textAlign: 'right',
        placeholder: '用于接收受理进度通知',
      },
    },
    unitName: {
      label: '领取机构',
      type: 'Picker',
      validator: [
        {
          rule: 'require',
          tip: '请选择领取机构',
        },
      ],
      data: [],
      attr: {
        title: '请选择',
        borderBottom: false,
      },
    },
    unitAddress: {
      label: '领取地点',
      height: 50,
      type: 'text',
      valueTemplate: item => {
        return <Text style={{fontSize: 16}}>{item}</Text>;
      },
      attr: {
        textAlign: 'right',
        editable: false,
        multipleLine: true,
        wrap: true,
      },
    },
    descLabel: {
      label: '备注',
      type: 'text',
      attr: {
        multipleLine: true,
        borderBottom: false,
      },
    },
    remarks: {
      type: 'textarea',
      attr: {
        clear: true,
        style: {paddingHorizontal: 15},
        placeholder: '如果您要提供额外信息, 请在此填写',
      },
    },
  });
  const [useForParams, setUseForParams] = useState({}); // 使用地和译文参数
  const [kosekiParams, setKosekiParams] = useState({}); // 户籍信息参数
  const [personalParams, setPersonalParams] = useState({}); // 个人信息参数
  const [contactParams, setContactParams] = useState({
    descLabel: ' ',
    phone: '',
  }); // 联系参数
  const [canDeal, setCanDeal] = useState('first'); // 是否能办理
  useEffect(() => {
    HttpUtil.get(API.GETUSEPLACES, {}).then(data => {
      data = data.data;
      if (data.code === 0) {
        let copier = {...useForData};
        copier.placeId.data = data.data.map(item => ({
          value: item.id + 'hot' + item.hot,
          label: item.place,
        }));
        setUseForData(copier);
      } else {
        ToastUtil.toast('获取数据使用地失败', 'center');
      }
    });
    HttpUtil.get(API.GETCERTIFICATES, {}).then(data => {
      data = data.data;
      if (data.code === 0) {
        let copier = {...personalData};
        copier.documentId.data = data.data.map(item => ({
          value: item.id,
          label: item.name,
        }));
        setPersonalData(copier);
      } else {
        ToastUtil.toast('获取证件类型失败', 'center');
      }
    });
    HttpUtil.get(API.GETUNITNAME, {}).then(data => {
      data = data.data;
      if (data.code === 0) {
        let copier = {...contactData};
        copier.unitName.data = data.data.map(item => ({
          value: item.name,
          label: item.name,
          address: item.address,
        }));
        setContactData(copier);
      } else {
        ToastUtil.toast('获取领取地点失败', 'center');
      }
    });
  }, []);
  // 领取地点改变
  useEffect(() => {
    contactParams.unitName && unitNameChange(contactParams.unitName);
  }, [contactParams.unitName]);
  // 使用地改变时
  useEffect(() => {
    useForParams.placeId && getLanguages(useForParams.placeId);
  }, [useForParams.placeId]);
  // 户口所在地改变时
  useEffect(() => {
    kosekiParams.typeId && changePermanentType(kosekiParams.typeId);
  }, [kosekiParams.typeId]);
  // 证明出具地改变时
  useEffect(() => {
    kosekiParams.provedId && provedChange(kosekiParams.provedId);
  }, [kosekiParams.provedId]);

  /**
   * 获取语言
   * @param {*} val id
   */
  function getLanguages(val) {
    HttpUtil.post(API.GETLANGUAGES, {
      id: val[0].split('h')[0],
    }).then(data => {
      data = data.data;
      if (data.code === 0) {
        let copier = {...useForData};
        copier.languageId.data = data.data.map(item => ({
          value: item.id,
          label: item.language,
        }));
        setUseForData(copier);
      } else {
        ToastUtil.toast('获取语言失败', 'center');
      }
    });
  }
  // 户口所在地改变时
  function changePermanentType(val) {
    if (val[0] === 3) {
      setKosekiData({
        ...kosekiData,
        provedId: {
          label: '证明出具地',
          type: 'Picker',
          validator: [
            {
              rule: 'require',
              tip: '请选择证明出具地',
            },
          ],
          data: [
            {
              value: 1,
              label: '事实发生地为本地',
            },
            {
              value: 2,
              label: '事实发生地为非本地',
            },
          ],
          attr: {
            title: '请选择',
          },
        },
      });
    } else {
      setCanDeal('true');
      const copier = {...kosekiData};
      delete copier.provedId;
      setKosekiData({...copier});
    }
  }

  // 证明出具地改变时
  function provedChange(val) {
    if (val[0] === 2) {
      setCanDeal('false');
    } else {
      setCanDeal('true');
    }
  }
  // 领取地点改变时
  function unitNameChange(val) {
    const copier = {...contactParams};
    const address = contactData.unitName.data.filter(
      item => item.value === val[0],
    );
    address.length &&
      setContactParams({
        ...copier,
        unitAddress: address[0].address,
      });
  }
  // 保存基本资料
  function saveInfo() {
    return new Promise((resolve, reject) => {
      validate({
        showData: useForData,
        setShowData: setUseForData,
        data: useForParams,
      })
        .then(() => {
          validate({
            showData: kosekiData,
            setShowData: setKosekiData,
            data: kosekiParams,
          })
            .then(() => {
              validate({
                showData: personalData,
                setShowData: setPersonalData,
                data: personalParams,
              })
                .then(() => {
                  validate({
                    showData: contactData,
                    setShowData: setContactData,
                    data: contactParams,
                  })
                    .then(() => {
                      let params = Object.assign(
                        useForParams,
                        kosekiParams,
                        personalParams,
                        contactParams,
                      );
                      HttpUtil.post(API.ADDJUSTICEAPPLY, {
                        placeId: params.placeId[0].split('h')[0],
                        languageId: params.languageId[0],
                        phone: params.phone,
                        documentId: params.documentId[0],
                        bider: params.bider,
                        documentCode: params.documentCode,
                        gender: params.gender[0],
                        birthday: dayjs(params.birthday).format(
                          'YYYY-MM-DD HH:mm:ss',
                        ),
                        foreignJusticeId: info.foreignJusticeId
                          ? info.foreignJusticeId
                          : '',
                        justiceSonId: info.materialCopies
                          ? Object.keys(info.materialCopies).join(',')
                          : '',
                        unitName: params.unitName[0],
                        unitAddress: params.unitAddress,
                        remarks: params.remarks,
                        typeId: params.typeId[0],
                        provedId: params.provedId
                          ? params.provedId[0]
                          : undefined,
                      })
                        .then(data => {
                          resolve(data);
                        })
                        .catch(error => {
                          reject(error);
                        });
                    })
                    .catch(error => {
                      ToastUtil.error(error);
                      reject('');
                    });
                })
                .catch(error => {
                  ToastUtil.error(error);
                  reject('');
                });
            })
            .catch(error => {
              ToastUtil.error(error);
              reject('');
            });
        })
        .catch(error => {
          ToastUtil.error(error);
        });
    });
  }
  // 保存公证份数
  function saveMaterial(applyId) {
    let costArr = [];
    info.materialCopies &&
      Object.keys(info.materialCopies).forEach(justiceSonId => {
        costArr.push({
          applyId,
          justiceSonId,
          additional: info.materialCopies[justiceSonId],
        });
      });
    HttpUtil.post(API.ADDCOST, {list: costArr}).then(data => {
      data = data.data;
      if (data.code === 0) {
        NavigationUtil.navigate(props, 'OnlineBidMaterial', {
          applyId,
        });
      } else {
        ToastUtil.toast('提交数据失败', 'center');
      }
    });
  }
  // 触发下一步
  async function handleNext() {
    try {
      const saveInfoResult = await saveInfo();
      if (saveInfoResult.data.code === 0) {
        saveMaterial(saveInfoResult.data.data);
      } else {
        ToastUtil.toast('提交数据失败', 'center');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Form
            showData={useForData}
            setShowData={setUseForData}
            data={useForParams}
            setData={setUseForParams}
            header="使用地与译文"
          />
          <Form
            showData={kosekiData}
            setShowData={setKosekiData}
            data={kosekiParams}
            setData={setKosekiParams}
            header="户籍信息"
          />
          {canDeal === 'first' ? (
            <></>
          ) : canDeal === 'true' ? (
            <>
              <Form
                showData={personalData}
                setShowData={setPersonalData}
                data={personalParams}
                setData={setPersonalParams}
                header="个人信息"
              />
              <Form
                showData={contactData}
                setShowData={setContactData}
                data={contactParams}
                setData={setContactParams}
                header="联系信息"
              />
              <WingBlank>
                <WhiteSpace />
                <Button type="primary" onPress={() => handleNext()}>
                  下一步
                </Button>
                <WhiteSpace />
              </WingBlank>
            </>
          ) : (
            <View style={styles.cantDealBox}>
              <WingBlank>
                <WhiteSpace />
                <Text style={styles.cantDealText}>
                  根据您的情况，建议您到户口所在地申请办理公证书。
                </Text>
                <WhiteSpace />
              </WingBlank>
            </View>
          )}
        </ScrollView>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  cantDealBox: {
    backgroundColor: '#fff',
  },
  cantDealText: {
    fontSize: 16,
    color: '#333333',
  },
});
