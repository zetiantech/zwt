import NewsPage from '../page/NewsPage'
import newsDetail from '../page/news/detail'


export default {
    NewsPage: {
        screen: NewsPage,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    newsDetail: {
        screen: newsDetail,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}