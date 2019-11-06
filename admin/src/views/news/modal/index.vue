<template>
  <div class="app-container calendar-list-container">
    <div>资讯列表</div>
  </div>
</template>

<script>
import { fetchNewsList } from '@/api/news/news'
import waves from '@/directive/waves' // 水波纹指令
import { formatDate } from '@/utils/date'
import { mapGetters } from 'vuex'

export default {
  name: 'NewsList',
  directives: {
    waves
  },
  filters: {
    filterDate(value, format = 'yyyy-MM-dd') {
      return formatDate(value, format)
    }
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'pageSize'
    ])
  },
  created() {
    const pages = this.pageSize[this.$route.fullPath] || {}
    this.listQuery.page = pages.page || 1
    this.listQuery.limit = pages.limit || 10
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchNewsList(this.listQuery).then(response => {
        const { code, data } = response.data
        if (code === 0) {
          this.list = data.list || []
          this.total = data.total || 0
          this.listLoading = false
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
      this.setPageSize()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
      this.setPageSize()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
      this.setPageSize()
    },
    setPageSize() {
      const pageSize = this.pageSize
      const path = this.$route.fullPath
      const data = {
        limit: this.listQuery.limit,
        page: this.listQuery.page
      }
      pageSize[path] = data
      this.$store.dispatch('pageSize', pageSize)
    }
  }
}
</script>
