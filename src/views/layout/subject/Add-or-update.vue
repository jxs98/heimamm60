<template>
  <div id="add">
    <el-dialog
      :title="model === 'add' ? '新增企业' : '编辑企业'"
      :visible.sync="dialogVisible"
      width="40%"
      @close="closed"
    >
      <!-- //  中部主要内容区域 -->
      <el-form
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="80px"
        ref="addupdateRef"
      >
        <!-- 学科编号-->
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <!-- 学科名称-->
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 学科简称-->
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <!-- 学科简介-->
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <!-- 备注-->
        <el-form-item label="学科备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            height="200px"
            resize="none"
            :rows="2"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {

    return {
      //  控制添加/编辑对话框的显示与隐藏
      dialogVisible: false,
      //  判断是添加用户模式还是编辑用户模式---add/update两种模式
      model: '',
      //  用户数据
      form: {

      },
      rules: {
        rid: [{ required: true, message: '请输入学科编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入学科名称', trigger: 'blur' }],
      }

    }
  },
  methods: {
    //  添加学科确定按钮
    adduser () {
      //  表单预校验
      this.$refs.addupdateRef.validate(async valid => {
        if (!valid) return

        let url = ''
        let message = ''
        //  添加学科
        if (this.model === "add") {
          url = '/subject/add'
          message = '添加成功~'
        } else {
          //  编辑学科
          url = '/subject/edit'
          message = '修改成功~'
        }
        // 发送添加或者编辑请求
        const { data: res } = await this.$http.post(url, this.form)
        if (res.code === 200) {
          this.$message.success(message)
          this.dialogVisible = false
          this.$parent.getAllsubject()
        } else {
          this.$message.error(res.message)
        }

      })

    },
    closed () {
      this.$refs.addupdateRef.resetFields()
    }

  },

}
</script>
