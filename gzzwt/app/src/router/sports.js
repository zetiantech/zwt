


//场馆
import EnueBooking from '../page/liveAll/activity/EnueBooking'
import VenueDetails from '../page/liveAll/activity/VenueDetails'
import BookingSpace from '../page/liveAll/activity/BookingSpace'
//赛事
import ActivityEvents from '../page/liveAll/ActivityEvents/ActivityEvents'
import EventDetails from '../page/liveAll/ActivityEvents/EventDetails'
import Confirmation from '../page/liveAll/ActivityEvents/Confirmation'


export default {
    EnueBooking: {
        screen: EnueBooking,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    VenueDetails: {
        screen: VenueDetails,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    BookingSpace: {
        screen: BookingSpace,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ActivityEvents: {
        screen: ActivityEvents,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EventDetails: {
        screen: EventDetails,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Confirmation: {
        screen: Confirmation,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}