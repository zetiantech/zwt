<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" style="width: 200px;" class="filter-item" placeholder="请输入标题" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.categoryId" clearable class="filter-item" placeholder="请选择分类" keyup.enter.native="handleFilter">
        <el-option
          v-for="item in categoryList"
          :key="'form-category_'+item.id"
          :label="item.name"
          :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
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
      <el-table-column width="120" align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="分类名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.reamks }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" width="250" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.reviewer') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 50, 100, 500]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
import { fetchNewsCategoryList } from '@/api/news/news'
import waves from '@/directive/waves' // 水波纹指令
import { formatDate } from '@/utils/date'
import { mapGetters } from 'vuex'

export default {
  name: 'NewsCategoryList',
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
      fetchNewsCategoryList(this.listQuery).then(response => {
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
