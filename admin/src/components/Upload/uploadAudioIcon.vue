<template>
  <el-upload
    :headers="headers"
    :data="uploadData"
    :action="uploadAudioUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeAvatarUpload"
    class="inline">
    <i class="icon iconfont icon-ali-mic" style="margin:10px"/>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'UploadAudioIcon',
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
      uploadAudioUrl: process.env.BASE_API + '/oss/upload',
      uploadData: { 'base_path': this.basePath, 'to_mp3': 'true' },
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
      const nameArray = file.name.split('.')
      const isSILK = (nameArray[nameArray.length - 1] === 'silk')
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isSILK) {
      //   this.$message.error('上传音频只能是 SILK 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传音频大小不能超过 2MB!')
      }
      return isSILK && isLt2M
    }
  }
}
</script>

<style>
.inline {
  display: inline;
}
.icon:hover{
  color: #5FB878;
}
</style>
