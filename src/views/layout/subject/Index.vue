<template>
  <div id="subject">
    <!-- 顶部搜索区域 -->
    <el-card class="box-card">
      <el-form
        :inline="true"
        class="demo-form-inline"
        ref="enterpriseRef"
        :model="subjectList"
        label-width="80px"
      >
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="subjectList.rid" style="width: 149px"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectList.name" style="width: 149px"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input
            v-model="subjectList.username"
            style="width: 149px"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            placeholder="请选择状态"
            v-model="subjectList.status"
            style="width: 149px"
          >
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="remove">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 企业列表区域 -->
    <el-card class="subjectlist">
      <!-- 企业列表区域 -->
      <el-table
        :data="subject"
        style="width: 100%"
        stripe
        class="table"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"> </el-table-column>
        <el-table-column prop="name" label="学科名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="remark" label="创建日期"> </el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽知识点 -->
          <template slot-scope="scope">
            <!-- 用户状态按钮 -->
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="subjectListStatus(scope.row)"
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
        :current-page="subjectList.page"
        :page-sizes="[1, 2, 3, 4, 5, 6, 10]"
        :page-size="subjectList.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <addorupdate ref="addorupdateRef"></addorupdate>
  </div>
</template>
<script>
import addorupdate from './Add-or-update'
export default {
  components: {
    addorupdate
  },
  data () {
    return {
      subjectList: {
        name: '', //  学科名称
        page: 1, //  页码默认为1
        limit: 10, //   页尺寸默认为10
        rid: '', //   学科id
        username: '', //  创建者用户名
        status: '' //   状态 1启用,0禁用
      },
      //  总页数
      total: 0,
      //  企业列表请求数据
      subject: []
    }
  },
  methods: {
    //  获取所有企业列表
    async getAllsubject () {
      const { data: res } = await this.$http.get('/subject/list', { params: this.subjectList })
      if (res.code === 200) {
        console.log(res);
        this.total = res.data.pagination.total
        this.subject = res.data.items
      }

    },
    //  页码改变事件
    handleCurrentChange (newpage) {
      //  页码重新赋值
      this.subjectList.page = newpage
      // 重新渲染
      this.getAllsubject()
    },
    //  页尺寸改变事件
    handleSizeChange (newpage) {
      //  页尺寸重新赋值
      this.subjectList.limit = newpage
      // 重新渲染
      this.getAllsubject()
    },
    //  用户状态切换
    async subjectListStatus (status) {
      const { data: res } = await this.$http.post('/subject/status', { id: status.id })
      if (res.code !== 200) {
        status.status = status.status === 0 ? 1 : 0
        return this.$message.error('学科状态更新失败!')
      }
      this.$message.success('学科状态更新成功!')
    },
    //  搜索按钮点击事件
    search () {
      this.subjectList.page = 1
      this.getAllsubject()

    },
    //  清除按钮点击事件
    remove () {
      this.$refs.enterpriseRef.resetFields()
      this.getAllsubject()

    },
    //  删除按钮点击事件
    del (row) {
      this.$confirm(`确认删除${row.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/subject/remove', { id: row.id })
        if (res.code === 200) {
          this.getAllsubject()
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
    //  添加企业按钮点击事件
    add () {
      this.$refs.addorupdateRef.dialogVisible = true
      this.$refs.addorupdateRef.model = 'add'
      this.$refs.addorupdateRef.form = {
        rid: '', // 企业标号
        name: '',//  企业名称
        short_name: '', //  简称
        intro: '',//   企业简介
        remark: '' //   备注
      }
    },
    //  编辑企业按钮点击事件
    update (data) {
      this.$refs.addorupdateRef.dialogVisible = true
      this.$refs.addorupdateRef.model = 'update'
      //  行数据深度拷贝
      this.$refs.addorupdateRef.form = { ...data }
    }
  },
  mounted () {
    this.getAllsubject()
  },
}
</script>
<style lang="less" scoped>
.subjectlist {
  margin-top: 20px;
}

.el-table th {
  align-items: center;
}
.el-pagination {
  margin-top: 30px;
  text-align: center;
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