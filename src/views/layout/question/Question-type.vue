<template>
  <div class="question-type">
    <!-- 单选 -->
    <div v-if="form.type === 1">
      <div class="item" v-for="item in form.select_options" :key="item.label">
        <el-radio v-model="form.single_select_answer" :label="item.label">{{
          item.label
        }}</el-radio>
        <el-input v-model="item.text" placeholder="请输入内容"></el-input>
        <upload-file
          :obj="item"
          type="image"
          class="imageupload"
          ref="uploadImage"
        ></upload-file>
      </div>
    </div>
    <!-- 多选 -->
    <div v-else-if="form.type === 2">
      <div class="item" v-for="item in form.select_options" :key="item.label">
        <el-checkbox
          v-model="form.multiple_select_answer"
          :label="item.label"
          >{{ item.label }}</el-checkbox
        >
        <el-input v-model="item.text" placeholder="请输入内容"></el-input>
        <upload-file :obj="item" type="image" class="imageupload"></upload-file>
      </div>
    </div>
    <!-- 简答 -->
    <div v-else-if="form.type === 3">
      <div>
        <el-input
          type="textarea"
          rows="10"
          v-model="form.short_answer"
          class="textarea"
        ></el-input>
      </div>
    </div>
  </div>
</template>
<script>
// 导入文件上传模块
import UploadFile from './Upload-file'
export default {
  components: {
    UploadFile
  },
  props: {
    form: {
      type: Object,
      defaule: function () {
        return {}
      }
    }
  },
  watch: {
    form (val) {
      if (val.subject === '') {
        this.$refs.uploadImage.imageUrl = ''
      }
    }
  },

}
</script>
<style lang="less" scoped>
.question-type {
  .el-input {
    color: #606266;
    cursor: pointer;
  }
  .item {
    width: 800px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .el-input {
      width: 45%;
      margin-left: 10px;
      // margin-left: -300px;
    }
    .imageupload {
      margin-left: 20px;
      margin-bottom: 20px;
    }
  }
}
.textarea {
  width: 650px;
}
</style>