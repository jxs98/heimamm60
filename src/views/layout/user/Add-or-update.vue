<template>
  <div id="add">
    <el-dialog
      :title="model === 'add' ? '新增用户' : '编辑用户'"
      :visible.sync="dialogVisible"
      width="40%"
      @close="closed"
    >
      <!-- //  中部主要内容区域 -->
      <el-form
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="70px"
        ref="addupdateRef"
      >
        <!-- 用户昵称-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 用户邮箱-->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <!-- 用户手机-->
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 用户角色-->
        <el-form-item label="角色" prop="role_id">
          <el-select placeholder="请输入" v-model="form.role_id">
            <el-option
              v-for="item in roleList"
              :label="item.name"
              :value="item.role_id"
              :key="item.role_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户状态 -->
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请输入" v-model="form.status">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- 备注-->
        <el-form-item label="备注" prop="remark">
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
        // username: '', // 用户名
        // email: '',//   用户邮箱
        // phone: '', //  手机号
        // role_id: '',//   角色id
        // status: '',//  用户状态
        // remark: ''//   备注
      },
      //  角色列表
      roleList: [
        { name: '超级管理员', role_id: 1 },
        { name: '管理员', role_id: 2 },
        { name: '老师', role_id: 3 },
        { name: '学生', role_id: 4 }
      ],
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ type: 'email', message: '邮箱不合法', trigger: 'blur' },
        { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
        {
          validator: (rule, value, callback) => {
            const reg = /^1[3456789][0-9]{9}$/;
            if (!reg.test(value)) {
              return callback(new Error('手机号错误!'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }],
        role_id: [{ required: true, message: '请选择角色', trigger: 'blur' }],
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
          url = '/user/add'
          message = '添加成功~'
          // this.$refs.addupdateRef.resetFields()
        } else {
          //  编辑用户
          url = '/user/edit'
          message = '修改成功~'
        }
        // 发送添加或者编辑请求
        const { data: res } = await this.$http.post(url, this.form)
        if (res.code === 200) {
          this.$message.success(message)
          // this.$refs.addupdateRef.resetFields()
          this.dialogVisible = false
          this.$parent.getAllUserInfo()
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
<style lang="less" scoped>
</style>