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
        <!-- 企业编号-->
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <!-- 企业名称-->
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 企业简称-->
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <!-- 企业简介-->
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <!-- 备注-->
        <el-form-item label="企业备注" prop="remark">
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
        eid: [{ required: true, message: '请输入企业编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        short_name: [{ required: true, message: '请输入企业简称', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入企业简介', trigger: 'blur' }],
      }

    }
  },
  methods: {
    //  添加用户确定按钮
    adduser () {
      //  表单预校验
      this.$refs.addupdateRef.validate(async valid => {
        if (!valid) return

        let url = ''
        let message = ''
        //  添加用户
        if (this.model === "add") {
          url = '/enterprise/add'
          message = '添加成功~'
          // this.$refs.addupdateRef.resetFields()
        } else {
          //  编辑用户
          url = '/enterprise/edit'
          message = '修改成功~'
        }
        // 发送添加或者编辑请求
        const { data: res } = await this.$http.post(url, this.form)
        if (res.code === 200) {
          this.$message.success(message)
          this.dialogVisible = false
          this.$parent.getAllEnterprise()
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
