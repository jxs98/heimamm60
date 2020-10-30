<template>
  <!-- 视频或图片上传组件 
    :data  上传的额外参数
    before-upload 上传之前的回调
    :on-success   成功之后的回调
    -->
  <el-upload
    class="avatar-uploader"
    :action="uploadUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :data="uploadObj"
  >
    <img
      v-if="obj.image"
      :src="'http://127.0.0.1/heimamm/public/' + obj.image"
      class="avatar"
    />
    <video v-else-if="videoUrl" :src="videoUrl" class="avatar" controls />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
export default {
  name: 'uploadFile',
  props: {
    // 文件类型 video/image
    type: String,
    obj: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      uploadUrl: process.env.VUE_APP_BASEURL + 'question/upload',//   上传的地址
      uploadObj: {
        file: ''// 上传的额外参数
      },
      imageUrl: '', //  图片地址
      videoUrl: '', //  视频地址
    }
  },
  methods: {
    // 上传文件之前的函数
    beforeAvatarUpload (file) {
      //  把file赋值给上传文件需要的参数
      this.uploadObj.file = file
      if (this.type === 'image') {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' ||
          file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/jpeg/png/gif 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      } else {
        const isVideo = file.type === 'video/mp4' || file.type === 'video/avi';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isVideo) {
          this.$message.error('上传视频只能是 mp4/avi 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 2MB!');
        }
        return isVideo && isLt2M;

      }


    },
    //  成功之后的回调  做图片或者视频预览
    handleAvatarSuccess (res) {
      if (this.type === 'image') {
        // this.imageUrl = process.env.VUE_APP_BASEURL + res.data.url
        // 传递过来的模型赋值
        this.obj.image = res.data.url
      } else {
        this.videoUrl = process.env.VUE_APP_BASEURL + res.data.url
        // 传递过来的模型赋值
        this.obj.video = res.data.url
      }


    }

  },
}
</script>
<style lang="less" scoped>
.avatar-uploader {
  display: inline-block;
  width: 178px;
  height: 135px;
  margin-top: 30px;
  margin-left: 190px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 135px;
  line-height: 135px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 135px;
  display: block;
}
</style>