<template>
  <div class="login">
    <!-- 登录表单区域 -->
    <div class="left">
      <!-- 定不补标题 -->
      <div class="title-box">
        <img src="img/login_icon.994effcc.png" alt="" /><span class="title"
          >黑马面面</span
        >
        <span class="line"></span><span class="sub-title">用户登录</span>
      </div>

      <!-- 表单输入区域 -->
      <el-form
        :model="userLoginForm"
        :rules="rules"
        ref="userLoginFormRef"
        class="login_form"
      >
        <!-- 手机号输入框 -->
        <el-form-item prop="phone">
          <el-input
            v-model.number="userLoginForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="userLoginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码输入框 -->
        <el-row>
          <el-col :span="17">
            <el-form-item prop="code">
              <el-input
                v-model="userLoginForm.code"
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- 验证码图片 -->
          <el-col :span="6" :offset="6" class="captcha">
            <img :src="captchaUrl" alt="" @click="getCaptcha" />
          </el-col>
        </el-row>
        <!-- 用户协议栏 -->

        <el-form-item prop="isChecked">
          <el-checkbox v-model="isChecked"></el-checkbox>&nbsp;我已阅读并同意
          <el-link type="primary" :underline="false">用户协议</el-link>和
          <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <!-- 登录和注册按钮 -->
        <el-button type="primary" style="width: 100%" @click="userLogin"
          >登录</el-button
        >
        <el-button
          type="primary"
          style="width: 100%; margin-top: 20px; margin-left: 0px"
          @click="RegisterShow"
        >
          注册</el-button
        >
      </el-form>
    </div>
    <div class="right"><img src="@/assets/img/login_bg.png" alt="" /></div>
    <register ref="RegisterRef"></register>
  </div>
</template>
<script>
//  按需导入保存token到本地
import { setToken } from '../../untils/token'
import Register from './Register'
export default {
  components: {
    Register
  },
  data () {
    return {
      //  表单用户输入数据
      userLoginForm: {
        phone: '18511111111',
        password: '12345678',
        code: ''
      },
      //  用户协议是否选中
      isChecked: false,
      //  验证码地址
      captchaUrl: process.env.VUE_APP_BASEURL + 'captcha?type=login',
      //  表单规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error('手机号错误!'))
              } else {
                callback()

              }
            }, trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '请输入6-15位密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        isChecked: [{
          validator: (rule, value, callback) => {
            if (!this.isChecked) {
              return callback(new Error('请勾选用户协议!'))
            } else {
              callback()
            }
          }, trigger: 'change'
        }]
      },
    }
  },

  methods: {
    //  点击重新获取验证码
    getCaptcha () {
      this.captchaUrl = process.env.VUE_APP_BASEURL + 'captcha?type=login&t=' + (new Date() - 0)
    },
    // 用户登录
    userLogin () {
      //  登录前进行预校验
      this.$refs.userLoginFormRef.validate(async valid => {
        if (!valid) return
        //  发送登录请求
        const { data: res } = await this.$http.post('login', this.userLoginForm)
        //  如果密码或者验证码错误
        if (res.code !== 200) {
          //  提示框
          this.$message.error(res.message)
          //  刷新验证码
          this.getCaptcha()
          return
        }
        //  提示框
        this.$message.success('登录成功')
        //  保存token
        setToken(res.data.token)
        //  表单重置
        this.$refs.userLoginFormRef.resetFields()
        //  跳转到后台
        this.$router.push('/layout')
      })
    },
    //  注册按钮点击注册表单弹出
    RegisterShow () {
      //  更改注册组件的 dialogVisible 值使注册组件显示
      this.$refs.RegisterRef.dialogVisible = true
    }
  },
}
</script>
<style lang="less"  scoped>
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .sub-title {
        font-size: 22px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
    }
    .login_form {
      margin-top: 20px;
      .captcha {
        margin-left: 10px;
        img {
          width: 100%;
          height: 40px;
        }
      }
    }
  }
}
</style>