<template>
  <div id="user">
    <!-- 顶部搜索区域 -->
    <el-card class="box-card">
      <el-form
        :inline="true"
        class="demo-form-inline"
        ref="user"
        :model="userInfodata"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userInfodata.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userInfodata.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select placeholder="请输入" v-model="userInfodata.role_id">
            <el-option
              v-for="item in roleList"
              :label="item.name"
              :value="item.role_id"
              :key="item.role_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="remove">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="userist">
      <!-- 用户列表区域 -->
      <el-table
        :data="userList"
        style="width: 100%"
        stripe
        class="table"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <!-- 用户头像区域 -->
        <el-table-column label="头像" width="80px">
          <!-- 使用作用域插槽 -->
          <template slot-scope="scope">
            <img
              v-if="scope.row.avatar"
              class="userPic"
              :src="'http://127.0.0.1/heimamm/public/' + scope.row.avatar"
              alt=""
            />
            <span v-else class="userhead">{{
              scope.row.username.substring(0, 1)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽知识点 -->
          <template slot-scope="scope">
            <!-- 用户状态按钮 -->
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="userStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮  -->
            <el-tooltip
              effect="dark"
              content="编辑用户"
              placement="top"
              :open-delay="1000"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="update(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              effect="dark"
              content="删除用户"
              placement="top"
              :open-delay="1000"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="del(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页器区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userInfodata.page"
        :page-sizes="[1, 2, 3, 4, 5, 6, 10]"
        :page-size="userInfodata.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加或者编辑用户子组件 -->
    <addorupdate ref="addorupdateRef" class="addorupdate"></addorupdate>
  </div>
</template>
<script>
//  引入添加/编辑用户子组件
import addorupdate from './Add-or-update'
export default {
  components: {
    addorupdate
  },
  data () {
    return {
      //  用户头像
      avatar: '',
      userInfodata: {
        username: '',//   昵称
        email: '', //   邮箱
        role_id: '', //   角色id
        page: 1, //  页码 默认1
        limit: 10, //   每页数据条数默认10
        id: '' //   用户id
      },
      userList: [],// 用户列表
      total: 0,//  总页数
      //  角色列表
      roleList: [
        { name: '超级管理员', role_id: 1 },
        { name: '管理员', role_id: 2 },
        { name: '老师', role_id: 3 },
        { name: '学生', role_id: 4 }
      ],
    }
  },
  mounted () {
    //  页面打开获取所有的用户列表
    this.getAllUserInfo()
  },
  methods: {
    //  获取所有用户列表
    async getAllUserInfo () {
      const { data: res } = await this.$http.get('/user/list', { params: this.userInfodata })
      if (res.code === 200) {
        this.total = res.data.pagination.total
        this.userList = res.data.items
      }

    },
    //  用户状态切换
    async userStatus (status) {
      console.log(status);
      const { data: res } = await this.$http.post('/user/status', { id: status.id })
      if (res.code !== 200) {
        status.status = status.status === 0 ? 1 : 0
        return this.$message.error('用户状态更新失败!')
      }
      this.$message.success('用户状态更新成功!')
    },
    //  页码改变事件
    handleCurrentChange (newpage) {
      //  页码重新赋值
      this.userInfodata.page = newpage
      // 重新渲染
      this.getAllUserInfo()
    },
    //  页尺寸改变事件
    handleSizeChange (newpage) {
      //  页尺寸重新赋值
      this.userInfodata.limit = newpage
      // 重新渲染
      this.getAllUserInfo()
    },
    //  搜索按钮点击事件
    search () {
      this.userInfodata.page = 1
      this.getAllUserInfo()

    },
    //  清除按钮点击事件
    remove () {
      this.$refs.user.resetFields()
      this.getAllUserInfo()

    },
    //  删除按钮点击事件
    del (row) {
      this.$confirm(`确认删除${row.username}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/user/remove', { id: row.id })
        if (res.code === 200) {
          this.getAllUserInfo()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    //  添加用户按钮点击事件
    add () {
      this.$refs.addorupdateRef.dialogVisible = true
      this.$refs.addorupdateRef.model = 'add'
      this.$refs.addorupdateRef.form = {
        username: '', // 用户名
        email: '',//   用户邮箱
        phone: '', //  手机号
        role_id: '',//   角色id
        status: '',//  用户状态
        remark: ''
      }
    },
    //  编辑按钮点击事件
    update (data) {
      this.$refs.addorupdateRef.dialogVisible = true
      this.$refs.addorupdateRef.model = 'update'
      //  行数据深度拷贝
      this.$refs.addorupdateRef.form = { ...data }
    }
  },
}
</script>
<style lang="less" scoped>
.userist {
  margin-top: 20px;
}
.userPic {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.el-table th {
  align-items: center;
}
.el-pagination {
  margin-top: 30px;
  text-align: center;
}
.demo-form-inline {
  .el-form-item {
    margin-left: 20px;
  }
  .el-button {
    margin-left: 20px;
  }
}
.userhead {
  display: inline-block;
  height: 50px;
  width: 50px;
  background-color: rgb(98, 172, 249);
  border-radius: 50%;
  color: #fff;
  line-height: 50px;
  font-weight: 700;
  font-size: 26px;
}
</style>