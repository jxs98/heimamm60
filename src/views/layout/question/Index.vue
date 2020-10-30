<template>
  <div>
    <!-- 顶部搜索区域 -->
    <el-card class="box-card">
      <el-form
        :inline="true"
        class="demo-form-inline"
        ref="questionRef"
        :model="QuestionList"
        label-width="80px"
      >
        <el-form-item label="学科" prop="subject">
          <el-select
            placeholder="请选择学科"
            v-model="QuestionList.subject"
            style="width: 149px"
          >
            <el-option
              v-for="item in subjectOpations"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 阶段 -->
        <el-form-item label="阶段" prop="step">
          <el-select
            placeholder="请选择阶段"
            v-model="QuestionList.step"
            style="width: 149px"
          >
            <el-option
              v-for="item in stepOpation"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 企业 -->
        <el-form-item label="企业" prop="enterprise">
          <el-select
            placeholder="请选择企业"
            v-model="QuestionList.enterprise"
            style="width: 149px"
          >
            <el-option
              v-for="item in enterpriseOpation"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 题型 -->
        <el-form-item label="题型" prop="type">
          <el-select
            placeholder="请选择题型"
            v-model="QuestionList.type"
            style="width: 220px"
          >
            <el-option
              v-for="item in typeOpation"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度" prop="difficulty">
          <el-select
            placeholder="请选择难度"
            v-model="QuestionList.difficulty"
            style="width: 149px"
          >
            <el-option
              v-for="item in difficultyOpation"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 作者 -->
        <el-form-item label="作者" prop="username">
          <el-input
            v-model="QuestionList.username"
            style="width: 149px"
          ></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" prop="status">
          <el-select
            placeholder="请选择状态"
            v-model="QuestionList.status"
            style="width: 149px"
          >
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期 -->
        <el-form-item label="日期" size="create_date">
          <el-date-picker
            v-model="QuestionList.create_date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 标题  -->
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="QuestionList.title"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="remove">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格列表渲染 -->
    <el-card class="list">
      <!-- 题目列表区域 -->
      <el-table
        :data="list"
        style="width: 100%"
        stripe
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="题目">
          <template v-slot="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" :formatter="subjectAndStep">
        </el-table-column>
        <el-table-column label="题型" :formatter="questionType" width="60px">
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>

        <el-table-column label="状态" width="70px">
          <!-- 作用域插槽知识点 -->
          <template slot-scope="scope">
            <!-- 题目状态按钮 -->
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="questionStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量" width="65px">
        </el-table-column>
        <el-table-column label="操作">
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
                size="mini"
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
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部分页器区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2, 3, 4, 5, 6, 10]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 子组件 -->
    <addOrupdate
      ref="addOrupdateRef"
      :subjectOpations="subjectOpations"
      :stepOpation="stepOpation"
      :enterpriseOpation="enterpriseOpation"
      :typeOpation="typeOpation"
      :difficultyOpation="difficultyOpation"
    ></addOrupdate>
  </div>
</template>
<script>
import addOrupdate from '../question/Add-or-update'
export default {
  name: 'Question',
  components: {
    addOrupdate
  },
  data () {
    return {
      subjectOpations: [],// 学科列表
      enterpriseOpation: [],//  企业列表 
      //  阶段列表
      stepOpation: [
        {
          label: '初级',
          value: 1
        }, {
          label: '中级',
          value: 2
        }, {
          label: '高级',
          value: 3
        },
      ],
      //  题型列表
      typeOpation: [
        { label: '单选', value: 1 },
        { label: '多选', value: 2 },
        { label: '简答', value: 3 }
      ],
      //  难度列表
      difficultyOpation: [
        { label: '简单', value: 1 },
        { label: '一般', value: 2 },
        { label: '困难', value: 3 }
      ],
      QuestionList: {
        subject: '', //  学科id
        step: '',// 题目阶段 1.初级 2.中级 3.高级
        enterprise: '', //  企业id
        type: '', //   	题目类型:1(单选),2(多选),3(简答)
        difficulty: '',//   题目难度: 1(简单),2(一般),3(困难)
        username: '',//  作者
        status: '',// 状态:0(禁用),1(启用)
        create_date: '', //  创建日期
        title: ''//   标题名称
      },
      page: 1,//  页码
      limit: 2,//   页尺寸
      total: 0,
      //  题目列表
      list: []
    }
  },
  methods: {
    //  获取所有学科列表
    async getsubjectList () {
      const { data: res } = await this.$http.get('/subject/list')
      this.subjectOpations = res.data.items
    },
    //  获取企业列表
    async getenterpriseList () {
      const { data: res } = await this.$http.get('/enterprise/list')
      this.enterpriseOpation = res.data.items
    },
    //  获取所有的题目
    async getList () {
      const { data: res } = await this.$http.get('/question/list', {
        params: {
          ...this.QuestionList,
          page: this.page,
          limit: this.limit
        }
      })
      this.list = res.data.items
    },
    //  学科阶段格式化
    subjectAndStep (row) {
      let step_name = ''
      switch (row.step) {
        case 1:
          step_name = '初级'
          break
        case 2:
          step_name = '中级'
          break
        case 3:
          step_name = '高级'
          break
      }
      return `${row.subject_name}.${step_name}`
    },
    //题型格式化
    questionType (row) {
      let type_name = ''
      switch (row.type) {
        case 1:
          type_name = '单选'
          break
        case 2:
          type_name = '多选'
          break
        case 3:
          type_name = '简答'
          break
      }
      return type_name
    },
    //  题目状态更新
    async questionStatus (status) {
      const { data: res } = await this.$http.post('/question/status', { id: status.id })
      if (res.code !== 200) {
        status.status = status.status === 0 ? 1 : 0
        return this.$message.error('题目状态更新失败!')
      }
      this.$message.success('题目状态更新成功!')
    },
    //  页码改变事件
    handleCurrentChange (newpage) {
      //  页码重新赋值
      this.page = newpage
      // 重新渲染
      this.getList()
    },
    //  页尺寸改变事件
    handleSizeChange (newpage) {
      //  页尺寸重新赋值
      this.limit = newpage
      // 重新渲染
      this.getList()
    },
    //  搜索按钮点击事件
    search () {
      this.page = 1
      this.getList()

    },
    //  清除按钮点击事件
    remove () {
      this.$refs.questionRef.resetFields()
      this.getList()

    },
    //  删除按钮点击事件
    del (row) {
      this.$confirm(`确认删除该题目?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/question/remove', { id: row.id })
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
    //  新增按钮点击事件
    add () {
      this.$refs.addOrupdateRef.model = 'add'
      this.$refs.addOrupdateRef.dialogVisible = true
      this.$refs.addOrupdateRef.form = {
        subject: '',//   学科id
        step: '',// 阶段阶段1、初级 2、中级 3、高级
        enterprise: '',// 企业id标识
        city: [],// 城市
        type: 1,// 题型题型 1单选 、2多选 、3简答
        difficulty: 1, //  题目难度 1简单 、2一般 、3困难
        title: '',//  试题标题
        // 试题选项答案以及图片地址  //  多选题答案
        select_options: [
          { label: 'A', text: '', image: '' },
          { label: 'B', text: '答案B', image: '' },
          { label: 'C', text: '答案C', image: '' },
          { label: 'D', text: '答案D', image: '' },
        ],
        //  简答题答案
        short_answer: '',
        video: '',//  答案视频解析
        answer_analyze: '', //   答案解析
        remark: '',//   备注
        single_select_answer: 'A',//  单选题答案
        multiple_select_answer: [],//   多选题
      }
    },
    update (row) {
      this.$refs.addOrupdateRef.model = 'update'
      this.$refs.addOrupdateRef.dialogVisible = true
      //  因为数据每一行有多层需要用json方式进行深拷贝,点语法深拷贝只能拷到对象一层
      this.$refs.addOrupdateRef.form = JSON.parse(JSON.stringify(row))
      // 城市和多选需要单独处理
      this.$refs.addOrupdateRef.form.city = row.city.split(',')
      this.$refs.addOrupdateRef.form.multiple_select_answer = row.multiple_select_answer.split(',')

    }
  },
  mounted () {
    this.getsubjectList()
    this.getenterpriseList()
    this.getList()
  },

}
</script>
<style lang="less" scoped>
.list {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>