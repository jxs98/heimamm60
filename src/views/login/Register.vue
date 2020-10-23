<template>
  <div class="register">
    <el-dialog
      title="用户注册"
      :visible.sync="dialogVisible"
      width="40%"
      :center="true"
      class="dialog"
      @close="handleClose"
    >
      <!-- 中间表单 -->
      <el-form
        ref="registerRef"
        :model="registerRefform"
        label-width="70px"
        :rules="rules"
        label-position="left"
      >
        <!-- 用户头像上传 -->
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
          >
            <div class="userimg">
              <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>

            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png/gif/jpeg文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
        <!-- 用户昵称-->
        <el-form-item label="昵称" prop="username">
          <el-input v-model="registerRefform.username"></el-input>
        </el-form-item>
        <!-- 用户邮箱-->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerRefform.email"></el-input>
        </el-form-item>
        <!-- 用户手机-->
        <el-form-item label="手机" prop="phone">
          <el-input v-model="registerRefform.phone"></el-input>
        </el-form-item>
        <!-- 用户密码-->
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerRefform.password"></el-input>
        </el-form-item>
        <!-- 验证码输入框 -->
        <el-row>
          <el-col :span="17">
            <el-form-item prop="code" label="图形码">
              <el-input v-model="registerRefform.code"></el-input>
            </el-form-item>
          </el-col>
          <!-- 验证码图片 -->
          <el-col :span="6" :offset="6" class="captcha">
            <img :src="captchaUrl" alt="" @click="changeCaptchaCode" />
          </el-col>
        </el-row>
        <!-- 手机验证码输入框 -->
        <el-row>
          <el-col :span="17">
            <el-form-item prop="rcode" label="验证码">
              <el-input v-model="registerRefform.rcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button
              type="success"
              class="codebtn"
              @click="getRcode"
              :disabled="isbtndisabled"
              >{{ RcodeMsg }}</el-button
            >
          </el-col>
        </el-row>
      </el-form>

      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isbtndisabled: false,
      //  获取手机验证码
      RcodeMsg: '获取手机验证码',
      dialogVisible: false,
      //  注册表单的数据
      registerRefform: {
        avatar: '',//   头像地址
        username: '', //  用户昵称
        phone: '',   //   手机号
        email: '', //   邮箱
        password: '',
        code: '',  //  图形验证码
        rcode: '' //  手机验证码
      },
      //  图像验证码
      //  验证码地址
      captchaUrl: process.env.VUE_APP_BASEURL + 'captcha?type=sendsms',
      //  头像提交服务器地址
      uploadAction: process.env.VUE_APP_BASEURL + 'uploads',
      //  图片上传预览地址
      uploadImgUrl: '',
      rules: {
        avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
        username: [{ required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 3, max: 15, message: '昵称长度在3-15个字符', trigger: 'blur' }],
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
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式错误', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '密码长度在3-15个字符', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        rcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }

    }
  },
  methods: {
    //  点击更换图形验证码
    changeCaptchaCode () {
      this.captchaUrl = process.env.VUE_APP_BASEURL + 'captcha?type=sendsms&t=' + (new Date() - 0)
    },
    //  获取手机验证码
    getRcode () {

      //  对手机号和图片验证码预校验
      this.$refs.registerRef.validateField('phone', async (errorMessage) => {

        if (errorMessage.length) return this.$message.error('请输入手机号')

        const { data: res } = await this.$http.post('sendsms', { phone: this.registerRefform.phone, code: this.registerRefform.code })
        this.changeCaptchaCode()
        if (res.code !== 200) return this.$message.error(res.message)
        this.registerRefform.rcode = res.data.captcha
        this.isbtndisabled = true
        this.rcodetime()

      })

    },
    //  图片上传之前的回调
    beforeAvatarUpload (file) {
      //  设置图片上传类型
      const isImage = (file.type === "image/jpg" || file.type === "image/gif" || file.type === "image/jpeg" || file.type === "image/png")
      //  限制图片大小
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) this.$message.error('上传图片格式错误!')
      if (!isLt2M) this.$message.error('图片大小不得超过2M!')
      // 只有图片类型和大小都符合要求并且返回ture 图片才会上传
      return isImage && isLt2M
    },
    //  图片上传成功之后的回调
    handleAvatarSuccess (res) {
      // 给图片预览地址赋值
      this.uploadImgUrl = process.env.VUE_APP_BASEURL + res.data.file_path
      // 给avatar 头像地址赋值
      this.registerRefform.avatar = res.data.file_path
    },
    // 点击确定按钮最后开始注册
    submit () {
      // 登录之前表单预校验
      this.$refs.registerRef.validate(async valid => {
        if (!valid) return
        let obj = this.registerRefform
        delete obj.code
        const { data: res } = await this.$http.post('register', obj)
        if (res.code !== 200) return this.$message.error('注册失败!')
        this.$message.success('注册成功!')
        // 注册成功之后清空表单
        this.$refs.registerRef.resetFields()
        //  成功之后关闭注册对话框
        this.dialogVisible = false
      })
    },
    //  对话框关闭事件
    handleClose () {
      // 注册成功之后清空表单
      this.$refs.registerRef.resetFields()
      this.uploadImgUrl = ''
    },
    //  验证码获取成功之后按钮30秒禁用
    rcodetime () {
      let i = 30
      let time = setInterval(() => {
        i--;
        this.RcodeMsg = i + '秒之后重新获取'
        if (i === 0) {
          clearInterval(time)
          this.RcodeMsg = "获取手机验证码"
          this.isbtndisabled = false
        }
      }, 1000)

    }

  },



}
</script>
<style lang="less" scoped>
.avatar-uploader {
  width: 200px;
  height: 230px;
  margin: 0 auto;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.captcha {
  margin-left: 10px;
  img {
    width: 100%;
    height: 40px;
  }
}
.codebtn {
  width: 100%;
  margin-left: 10px;
}
.userimg {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-upload__tip {
  position: absolute;
  left: -20px;
  margin-top: -20px;
  width: 300px;
}
</style>