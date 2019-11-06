<template>
  <el-upload
    :headers="headers"
    :data="uploadData"
    :action="uploadVideoUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeAvatarUpload"
    class="inline">
    <el-button slot="trigger" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-upload2">上传视频</el-button>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'UploadVideoButton',
  props: {
    value: {
      type: String,
      default: ''
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uploadVideoUrl: process.env.BASE_API + '/oss/upload',
      uploadData: { 'base_path': this.basePath },
      headers: { 'ACCESS_TOKEN': getToken() }
    }
  },
  computed: {
    imageUrl() {
      console.log(this.value)
      return this.value
    }
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleAvatarSuccess(response, file) {
      if (response.code !== 0) {
        this.$notify.error({
          title: '错误',
          message: response.msg
        })
        return
      }
      const value = response.attachment_list[0]
      this.emitInput(value)
    },
    handleAvatarError(err, file) {
      this.$notify.error({
        title: '错误',
        message: err.msg
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'video/mp4')
      const isLtTenM = file.size / 1024 / 1024 < 10
      console.log(file)
      if (!isJPG) {
        this.$message.error('上传视频只能是 MP4 格式!')
      }
      if (!isLtTenM) {
        this.$message.error('上传视频大小不能超过 10MB!')
      }
      return isJPG && isLtTenM
    }
  }
}
</script>

<style>
.inline {
  display: inline;
}
</style>
