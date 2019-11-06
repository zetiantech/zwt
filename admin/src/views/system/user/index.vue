<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input v-model="listQuery.realname" style="width: 200px;" class="filter-item" placeholder="请输入姓名" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.username" style="width: 200px;" class="filter-item" placeholder="请输入用户名" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.phone" style="width: 200px;" class="filter-item" placeholder="请输入手机号码" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.roleId" clearable class="filter-item" placeholder="请选择用户分组" keyup.enter.native="handleFilter">
        <el-option
          v-for="item in roleList2"
          :key="'form-roles_'+item.id"
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
      <el-table-column min-width="150" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" min-width="340" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
          <el-button size="mini" type="primary" style="width: 80px;" @click="handleModifyPassword(scope.row)">重置密码</el-button>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 600px; margin-left:30px;">
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="temp.realname"/>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username"/>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="realname">
          <el-input v-model="temp.phone"/>
        </el-form-item> -->
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="temp.remarks"/>
        </el-form-item>
        <el-form-item v-if="temp.id==undefined" label="初始密码" prop="password">
          <el-input v-model="temp.password" type="password"/>
        </el-form-item>
        <el-form-item label="过期时间" prop="wicExpireDate">
          <el-date-picker
            v-model="temp.wicExpireDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width: 100%;" />
        </el-form-item>
        <el-form-item label="用户分组" prop="roleId">
          <el-radio-group v-model="temp.roleId" size="medium">
            <el-radio
              v-for="item in roleList2"
              :key="'form-role_'+item.id"
              :label="item.id"
              border
              style="margin-left:0px; margin-right: 10px; margin-bottom: 10px;">
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormPasswordVisible" title="修改密码">
      <el-form ref="dataModifyForm" :rules="modifyPasswordRules" :model="modifyPassword" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="初始密码" prop="password">
          <el-input v-model="modifyPassword.password" type="password"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormPasswordVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="postModifyPassword">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, createUser, deleteUser, updateUser, modifyPassword } from '@/api/sys/user'
import waves from '@/directive/waves' // 水波纹指令
import { formatDate } from '@/utils/date'
import { mapGetters } from 'vuex'

export default {
  name: 'SysUserList',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    filterDate(value, format = 'yyyy-MM-dd') {
      return formatDate(value, format)
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        roleId: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        realname: '',
        username: '',
        email: '',
        password: '',
        remarks: '',
        roleId: '',
        wicExpireDate: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑用户',
        create: '创建用户'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择用户分组', trigger: 'blur' }]
      },
      roleList: [],
      roleList2: [],
      userRoleIds: [],
      modifyPassword: {
        id: undefined,
        password: undefined
      },
      dialogFormPasswordVisible: false,
      modifyPasswordRules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
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
      fetchList(this.listQuery).then(response => {
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
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        realname: '',
        username: '',
        email: '',
        password: '',
        remarks: '',
        roleId: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(response => {
            console.log(response, 111111111111111)
            // if (response.data.code === 0) {
            //   const data = response.data ? response.data.user : {}
            //   this.dialogFormVisible = false
            //   this.getList()
            //   this.$notify({
            //     title: '成功',
            //     message: response.data.msg,
            //     type: 'success',
            //     duration: 2000
            //   })
            // } else {
            //   this.$notify.error({
            //     title: '失败',
            //     message: response.data.msg,
            //     duration: 2000
            //   })
            // }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          delete tempData.children
          updateUser(tempData).then(response => {
            if (response.data.code === 0) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: response.data.msg,
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify.error({
                title: '失败',
                message: response.data.msg,
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleModifyPassword(row) {
      this.modifyPassword.id = row.id // copy obj
      this.dialogFormPasswordVisible = true
      this.$nextTick(() => {
        this.$refs['dataModifyForm'].clearValidate()
      })
    },
    postModifyPassword() {
      this.$refs['dataModifyForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.modifyPassword)
          modifyPassword(tempData).then(response => {
            if (response.data.code === 0) {
              this.dialogFormPasswordVisible = false
              this.$notify({
                title: '成功',
                message: response.data.msg,
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify.error({
                title: '失败',
                message: response.data.msg,
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleDelete(row) {
      deleteUser(row.id).then(response => {
        if (response.data.code === 0) {
          this.getList()
          this.$notify({
            title: '成功',
            message: response.data.msg,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: response.data.msg,
            duration: 2000
          })
        }
      })
    },
    handleCountFilter(roleId) {
      this.listQuery.roleId = roleId
      this.getList()
    }
  }
}
</script>
