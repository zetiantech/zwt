<template>
  <el-upload
    :headers="headers"
    :data="uploadData"
    :action="uploadImageUrl"
    :show-file-list="false"
    :on-success="handleChatroomQrcodeSuccess"
    :on-error="handleChatroomQrcodeError"
    :before-upload="beforeChatroomQrcodeUpload"
    multiple
    class="inline">
    <el-button slot="trigger" :type="uploadType" class="filter-item">上传群二维码图片</el-button>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'
import CommonMixin from '@/views/layout/mixin/CommonMixin'
import '@/assets/font_inon_ali/iconfont.css'

export default {
  name: 'UploadImageQrcodeButton',
  mixins: [CommonMixin],
  props: {
    value: {
      type: String,
      default: ''
    },
    basePath: {
      type: String,
      default: ''
    },
    wxid: {
      type: String,
      default: ''
    },
    uploadType: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      uploadImageUrl: process.env.BASE_API + '/wic/targetChatroom/upload',
      uploadData: { 'base_path': this.basePath, 'wxid': this.wxid, 'to_cdn': 'true' },
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
    handleChatroomQrcodeSuccess(response, file) {
      this.hideFullScreenLoading()
      if (!(response.code === 0 || response.code === 200)) {
        this.$notify.error({
          title: '错误',
          message: response.msg
        })
        return
      } else {
        const value = response.attachment_list && response.attachment_list.length > 0 ? response.attachment_list[0] : ''
        this.emitInput(value)
      }
    },
    handleChatroomQrcodeError(err, file) {
      this.hideFullScreenLoading()
      this.$notify.error({
        title: '错误',
        message: err.msg
      })
    },
    beforeChatroomQrcodeUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      const res = isJPG && isLt2M
      if (res) {
        this.showFullScreenLoading()
      }
      return res
    }
  }
}
</script>

<style>
.inline {
  display: inline;
}
</style>
