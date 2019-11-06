import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { 
    Provider,
    WhiteSpace,
    Modal,
 } from '@ant-design/react-native';

import GlobalStyles from 'src/res/styles/GlobalStyles'


/***
 *  visible 控制显隐
 *  type  1- 上午 2-下午
 *  timeDetail: [
 *    {
 *      week: 周几,
    *    am: [] 上午数据列表
    *    pm: [] 下午数据列表
    *    date：'日期'
 *    }
 * ]
 * ***/
const ModalComponent = ({visible, type, timeDetail, onSelectTime, onClose}) => {
    const ampm = type == 1 ? '上午':'下午'
    const timeList = type == 1 ? timeDetail.am : timeDetail.pm
    return (
        <Modal
            transparent={false}
            visible={visible}
            popup={true}
            maskClosable={true}
            closable={true}
            animationType="slide-up"
            onClose={onClose}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.optArea}>
                        <View style={styles.modalTitle}>
                            <Image source={require('src/res/images/common/date_icon.png')} style={styles.titleIcon} />
                            <Text style={styles.titleText}>{timeDetail.date} {timeDetail.week}{ampm}</Text>
                        </View>
                        <ModelItem timeList={timeList}  onPress={onSelectTime}/>
                    </View>
                </View>
            </Modal>
    )
}

const ModelItem = ({timeList, onPress}) => {
    return (
        <View style={styles.modalContent}>
            {
                timeList && timeList.map((item, index)=>(
                    <TouchableOpacity
                        onPress={onPress(item, index)}
                    >
                        <View style={styles.modalItem}>
                                <Text style={styles.date}>{item.startTimes}-{item.endTimes}</Text>
                                <Text style={styles.number}>可约号源: <Text style={styles.numberText}>{item.validNum}</Text></Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}


export default function TimeModal(props) {

    // 1-上午  2-下午
    const [type, setType] = useState(1)

    const [timeDetail, setTimeDetail] = useState({
        am: [],
        pm: [],
        date: '',
        week: ''
    })

    // 点击时间回调
    const onSelectTime = (item, index) => {
        // 
        if(!visible){

        }
    }

    // 关闭弹出框回调
    const onClose = () => {
        setVisible(false)
    };

    return (
        <View style={styles.container} >
            <ModalComponent visible={visible} type={type} timeDetail={timeDetail} onSelectTime={onSelectTime} onClose={onClose}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalStyle: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: GlobalStyles.window_width,
        height: 340,
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ffffff',
    },
    optArea: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 12,
        marginBottom: 12,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    modalTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleIcon: {
        width: 22,
        height: 22
    },
    titleText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#666'
    },
    modalContent: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
       
    },
    modalItem: {
        width: (GlobalStyles.window_width-60)/3,
        backgroundColor: '#F5F5F5',
        marginVertical: 5,
        marginRight: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    date: {
        paddingVertical: 3,
        color: '#333',
        fontSize: 16,
    },
    numberText: {
        paddingHorizontal: 5,
        fontSize: 14,
        color: '#2F74ED'
    },
    number: {
        color: '#666',
        fontSize: 12,
    }
})