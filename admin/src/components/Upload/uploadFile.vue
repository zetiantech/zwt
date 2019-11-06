<template>
  <div class="upload-container">
    <el-upload
      v-loading="uploadLoading"
      :data="uploadData"
      :action="uploadImageUrl"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      class="uploader">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-upload uploader-icon">
        {{ uploadLabel }}
      </i>
      <div v-if="!imageUrl&&showWaringLabel" slot="tip" class="waring-label">似的发射点发{{ waringLabel }}</div>
    </el-upload>
  </div>
</template>

<script>
import defaultImg from '@/assets/img/default_img.jpg' // 水波纹指令
export default {
  name: 'UploadImage',
  components: { defaultImg },
  props: {
    value: {
      type: String,
      default: ''
    },
    extension: {
      type: String,
      default: 'jpg,png'
    },
    uploadLabel: {
      type: String,
      default: '上传文件'
    },
    limit: {
      type: Number,
      required: false,
      default: 2
    },
    basePath: {
      type: String,
      default: ''
    },
    showWaringLabel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadImageUrl: process.env.BASE_API + '/oss/upload',
      uploadData: { 'base_path': this.basePath },
      imageExtension: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
      extensions: [],
      uploadLoading: false,
      waringLabel: '只能上传' + this.extension + '文件，且不超过' + this.limit + 'M'
    }
  },
  computed: {
    imageUrl() {
      if (this.value) {
        const fileExtension = this.getFileExtension(this.value)
        if (fileExtension !== '' && this.imageExtension.includes(fileExtension)) {
          return this.value
        }
        return defaultImg
      }
      return ''
    }
  },
  created() {
    this.extension = this.extension.replace(/(^\s+)|(\s+$)/g, '')
    this.extension = this.extension.replace(/\s/g, '')
    this.extensions = this.extension.split(',')
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleSuccess(response, file) {
      this.uploadLoading = false
      this.value = response.attachment_list[0].filePath
      this.emitInput(this.value)
    },
    handleError(response) {
      console.log(response)
      this.uploadLoading = false
      if (response.msg) {
        this.$message.error(response.msg)
      } else {
        this.$message.error('上传失败')
      }
    },
    beforeUpload(file) {
      // 扩展名判断
      const fileExtension = this.getFileExtension(file.name)
      if (fileExtension === '') {
        this.$message.error('文件必须有扩展名')
        return false
      }
      const isFileExtension = this.extensions.includes(fileExtension)
      if (this.extensions.length === 0) {
        this.$message.error('请设置需要限制的文件')
        return false
      }
      if (!isFileExtension) {
        this.$message.error('上传文件只能是' + this.extension + '格式!')
      }
      // 判断文件大小
      const isLimitSize = file.size / 1024 / 1024 < this.limit
      if (!isLimitSize) {
        this.$message.error('上传头像图片大小不能超过 ' + this.limit + 'MB!')
      }
      if (isFileExtension && isLimitSize) {
        this.uploadLoading = true
      }
      return isFileExtension && isLimitSize
    },
    getFileExtension(fileName) {
      if (fileName.lastIndexOf('.') > 0) {
        return fileName.substring(fileName.lastIndexOf('.') + 1)
      }
      return ''
    }
  }
}
</script>

<style>
  .uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .waring-label {
    font-size: 14px;
    color: #9b9d07;
  }
</style>
