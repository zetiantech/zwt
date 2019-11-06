import { formatDate } from '@/utils/date'
import { getDictLabel, getDictList } from '@/utils/dict'
import defaultHeadImg from '@/assets/img/default_wechat.jpg'

export default {
  inject: ['reload'],
  filters: {
    filterDatetime(value, format = 'yyyy-MM-dd h:m:s') {
      return formatDate(value, format)
    },
    filterPercent(value) {
      if (typeof value === 'number' && isFinite(value)) {
        return (value * 100).toFixed(2) + '%'
      } else {
        return value
      }
    },
    filterInviteResult(value) {
      if (value === '0') {
        return '邀请失败'
      } else if (value === '1') {
        return '已邀请'
      } else if (value === '2') {
        return '已添加'
      } else {
        return value
      }
    },
    genderFilter(value) {
      return getDictLabel('wicgender', value)
    }
  },
  data() {
    return {
      genderOptions: getDictList('wicgender'),
      defaultAvatar: defaultHeadImg
    }
  },
  methods: {
    showFullScreenLoading() {
      this.notify = this.$notify.info({
        title: '消息',
        dangerouslyUseHTMLString: true,
        message: '<p><i class="el-icon-loading"></i>正在载入中,请稍等...</p>',
        duration: 0
      })
    },
    hideFullScreenLoading() {
      if (this.notify) {
        this.notify.close()
      }
    }
  }
}
