<template>
  <div id="layout">
    <el-container class="userindex">
      <!-- 顶部导航 -->
      <el-header class="header" style="height: 60px">
        <!-- 顶部左侧 -->
        <div class="left">
          <i
            class="el-icon-s-fold setheight"
            @click="isShoeMenu = !isShoeMenu"
          ></i
          ><img src="" alt="" class="marginlr" /><span class="title"
            >黑马面面</span
          >
        </div>
        <!-- 顶部右侧 -->
        <div class="right">
          <img :src="avatar" alt="" /><span class="name">{{ username }}</span
          ><el-button type="primary" @click="layout">退出 </el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="auto"
          ><el-menu
            :collapse="isShoeMenu"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            router
            :collapse-transition="true"
          >
            <el-menu-item index="/layout/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据预览</span>
            </el-menu-item>
            <el-menu-item index="/layout/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/enterprise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <!-- 路由出口 -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { removeToken } from '../../untils/token'
export default {
  data () {
    return {
      //  菜单是否折叠
      isShoeMenu: false,
      //  默认激活的菜单 页面刚加载默认第一个
      defaultActive: "/layout/chart",
      //  用户名
      username: '',
      //  头像地址
      avatar: ''
    }

  },
  mounted () {
    //  页面刷新加载菜单选中的值
    this.defaultActive = this.$route.path
    //  页面加载完成获取用户信息
    this.getUserInfo()


  },
  methods: {
    //  获取用户信息
    async getUserInfo () {
      const { data: res } = await this.$http.get('/info')
      //  进行赋值操作
      this.username = res.data.username
      this.avatar = process.env.VUE_APP_BASEURL + res.data.avatar
    },
    //  退出登录按钮点击事件
    layout () {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //  确定退出 发送退出请求
        const { data: res } = await this.$http.get('/logout')
        if (res.code === 200) {
          //  清除本地token
          removeToken()
          //    跳转登录页面
          this.$router.push('/')

        }
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        });
      });
    }
  },
}
</script>
<style lang="less" scoped>
#layout {
  height: 100%;
  width: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(249, 249, 249);
  padding: 0 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .name {
      margin-right: 20px;
      font-size: 18px;
      font-weight: 500;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
.userindex {
  height: 100%;
  width: 100%;
  .el-container {
    height: 91%;
  }
}
.el-main {
  background-color: #ccc;
  height: 100%;
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-main::-webkit-scrollbar {
  width: 0;
}
</style>