<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" style="width: 200px;" class="filter-item" placeholder="请输入标题" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :default-sort="{prop:'createTime',order:'descending'}"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column width="80" align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="车辆信息">
        <template slot-scope="scope">
          <span>{{ scope.row.vehicleId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="证件类型">
        <template slot-scope="scope">
          <span>{{ scope.row.idTypeId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="证件号码">
        <template slot-scope="scope">
          <span>{{ scope.row.idCode }}</span>
        </template>
      </el-table-column>
       <el-table-column min-width="150" align="center" label="申请方式">
        <template slot-scope="scope">
          <span>{{ scope.row.applyWayId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNo }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="营运类型">
        <template slot-scope="scope">
          <span>{{ scope.row.operatingTypeId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="车辆类型">
        <template slot-scope="scope">
          <span>{{ scope.row.modelTypeId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="车架号">
        <template slot-scope="scope">
          <span>{{ scope.row.vin }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="车管所">
        <template slot-scope="scope">
          <span>{{ scope.row.takeBranchId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="预约时间">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDate }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status | filtersStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" width="250" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.reviewer') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page.sync="listQuery.pageNum"
        :page-sizes="[10, 50, 100, 500]"
        :page-size="listQuery.pagesSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

  </div>
  
</template>

<script>
import { fetchRegistCertApplyList } from '@/api/car/car'
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
    },
    filtersTakeWay(value) {
      return ['', '邮寄', '网点自取'][value]
    },
    filtersStatus(value) {
      return ['', '待审核', '已处理'][value]
    },
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      categoryList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pagesSize: 10
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
    this.listQuery.pageNum = pages.page || 1
    this.listQuery.pagesSize = pages.pagesSize || 10
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchRegistCertApplyList(this.listQuery).then(response => {
        const { code, data } = response.data
        if (code === 0) {
          this.list = data.list || []
          this.total = data.total || 0
          this.listLoading = false
        }
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
      this.setPageSize()
    },
    handleSizeChange(val) {
      this.listQuery.pagesSize = val
      this.getList()
      this.setPageSize()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
      this.setPageSize()
    },
    setPageSize() {
      const pageSize = this.pageSize
      const path = this.$route.fullPath
      const data = {
        pagesSize: this.listQuery.pagesSize,
        pageNum: this.listQuery.pageNum
      }
      pageSize[path] = data
      this.$store.dispatch('pageSize', pageSize)
    },
    handleCreate() {
      
    },
  }
}
</script>
