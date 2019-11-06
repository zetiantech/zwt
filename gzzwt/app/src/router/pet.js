//宠物业务办理
import DogProgressQuery from '../page/PetBusiness/DogProgressQuery' //申请进度查询
import DogProgressQueryResult from '../page/PetBusiness/DogProgressQueryResult' //申请进度查询


import DogRegistration from '../page/PetBusiness/DogRegistration' //养犬登记
import DogRegistration2 from '../page/PetBusiness/DogRegistration2' //养犬登记2
import DogRegistration3 from '../page/PetBusiness/DogRegistration3' //养犬登记3-信息确认

export default {
    DogProgressQuery: {
        screen: DogProgressQuery,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    DogProgressQueryResult: {
        screen: DogProgressQueryResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    DogRegistration: {
        screen: DogRegistration,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    DogRegistration2: {
        screen: DogRegistration2,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    DogRegistration3: {
        screen: DogRegistration3,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}