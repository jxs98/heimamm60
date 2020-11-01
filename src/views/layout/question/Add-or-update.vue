    <template>
  <div id="add">
    <el-dialog
      :title="model === 'add' ? '新增题目' : '编辑题目'"
      :visible.sync="dialogVisible"
      fullscreen
      center
    >
      <!-- //  中部主要内容区域 -->
      <el-form
        :model="form"
        :rules="rules"
        label-position="left"
        ref="addupdateRef"
        size="normal"
        class="addorupdateform"
        label-width="80px"
      >
        <!-- 学科-->
        <el-form-item label="学科" prop="subject">
          <el-select placeholder="请选择学科" v-model="form.subject">
            <el-option
              v-for="item in subjectOpations"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 阶段-->
        <el-form-item label="阶段" prop="step">
          <el-select placeholder="请选择阶段" v-model="form.step">
            <el-option
              v-for="item in stepOpation"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 企业-->
        <el-form-item label="企业" prop="enterprise">
          <el-select placeholder="请选择企业" v-model="form.enterprise">
            <el-option
              v-for="item in enterpriseOpation"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 城市-->
        <!-- :props="{ value: 'label' }" 取值的时候，取label的值，不取value的值 -->
        <el-form-item label="城市" prop="city">
          <el-cascader
            size="large"
            v-model="form.city"
            :options="options"
            :props="{ value: 'label' }"
          ></el-cascader>
        </el-form-item>
        <!-- 题型-->
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="form.type" @change="typeChange">
            <el-radio
              v-for="item in typeOpation"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio
              v-for="item in difficultyOpation"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <hr class="hr" />
        <!-- 标题 -->
        <el-form-item label="标题" prop="title" class="addtitle">
          <div class="aaa">
            <quill-editor
              class="editor"
              v-model="form.title"
              ref="myQuillEditor"
              :options="{ placeholder: '请在这里输入试题标题...' }"
              @blur="onEditorBlur('title')"
            />
          </div>
        </el-form-item>
        <!-- 答案类型 -->
        <el-form-item
          :label="QuestionTypeObj[form.type]"
          :prop="PropsTypeObj[form.type]"
        >
          <question-type :form="form"></question-type>
        </el-form-item>
        <!-- 答案视频 -->
        <hr class="hr" />
        <el-form-item label="解析视频">
          <upload-file :obj="form" type="video" ref="uploadRef"></upload-file>
        </el-form-item>
        <!-- 答案解析 -->
        <el-form-item label="答案解析" prop="answer_analyze" class="addtitle">
          <div class="aaa">
            <quill-editor
              class="editor"
              v-model="form.answer_analyze"
              ref="myQuillEditor"
              :options="{ placeholder: '请在这里输入答案解析...' }"
              @blur="onEditorBlur('answer_analyze')"
            />
          </div>
        </el-form-item>
        <!-- 试题备注 -->
        <hr class="hr" style="margin-bottom: 30px" />
        <el-form-item label="试题备注" prop="remark">
          <el-input
            v-model="form.remark"
            placeholder="请输入内容"
            style="width: 650px"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer" center>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//  导入城市列表
import { regionData } from "element-china-area-data";
//  文件上传组件
import UploadFile from './Upload-file'
// 答案区域
import QuestionType from './Question-type'

export default {
  components: {
    UploadFile,
    QuestionType
  },
  props: {
    //  学科列表
    subjectOpations: {
      type: Array,
      defaule: function () {
        return []
      }
    },
    //  阶段列表
    stepOpation: {
      type: Array,
      defaule: function () {
        return []
      }
    },
    // 企业列表
    enterpriseOpation: {
      type: Array,
      defaule: function () {
        return []
      }
    },
    // 题型列表
    typeOpation: {
      type: Array,
      defaule: function () {
        return []
      }
    },
    // 难度列表
    difficultyOpation: {
      type: Array,
      defaule: function () {
        return []
      }
    },
  },
  data () {

    return {
      //  题目类型标题绑定
      QuestionTypeObj: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      PropsTypeObj: {
        1: 'single_select_answer',
        2: 'multiple_select_answer',
        3: 'short_answer'
      },
      options: regionData,//  城市列表
      //  控制添加/编辑对话框的显示与隐藏
      dialogVisible: false,
      //  判断是添加用户模式还是编辑用户模式---add/update两种模式
      model: '',
      //  用户数据
      form: {
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
        single_select_answer: '',//  单选题答案
        multiple_select_answer: [],//   多选题答案
      },
      rules: {
        subject: [{ required: true, message: '请选择学科', trigger: 'blur' }],
        step: [{ required: true, message: '请选择阶段', trigger: 'blur' }],
        enterprise: [{ required: true, message: '请选择企业', trigger: 'blur' }],
        city: [{ required: true, message: '请选择城市', trigger: 'blur' }],
        type: [{ required: true, message: '请选择题型', trigger: 'blur' }],
        difficulty: [{ required: true, message: '请选择难度', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        answer_analyze: [{ required: true, message: '请输入答案解析', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        single_select_answer: [{ required: true, message: '请输入单选题答案', trigger: 'change' }],
        multiple_select_answer: [{ required: true, message: '请输入多选题答案', trigger: 'change' }],
        short_answer: [{ required: true, message: '请输入简答题答案', trigger: 'change' }],
      }

    }
  },
  methods: {
    //  两个富文本编辑器失去焦点触发 单独校验
    onEditorBlur (fieldname) {
      this.$refs.addupdateRef.validateField(fieldname)
    },
    //  添加学科确定按钮
    submit () {
      //  表单预校验
      this.$refs.addupdateRef.validate(async valid => {
        if (!valid) return

        let url = ''
        let message = ''
        //  添加题目
        if (this.model === "add") {
          url = '/question/add'
          message = '添加成功~'
        } else {
          //  编辑题目
          url = '/question/edit'
          message = '修改成功~'
        }
        // 发送添加或者编辑请求
        const { data: res } = await this.$http.post(url, this.form)
        if (res.code === 200) {
          this.$message.success(message)
          this.dialogVisible = false
          this.$parent.getList()
        } else {
          this.$message.error(res.message)
        }

      })

    },
    //  题型单选框切换事件
    typeChange () {
      //  清空答案表单验证
      this.$refs.addupdateRef.clearValidate(['single_select_answer', 'multiple_select_answer', 'short_answer'])
    },
    // closed () {
    //   this.$refs.uploadRef.videoUrl = ''
    // }

  },

}
</script>
<style lang="less"  >
.addorupdateform {
  margin: 0 auto;
  width: 50%;
  > .el-form-item {
    width: 60%;
    > .el-select {
      width: 100%;
    }
  }
}
.addtitle {
  height: 400px;
}
.editor {
  margin-top: 50px;
  width: 750px;
  margin-left: 0;
  height: 200px;
  margin-left: -80px;
}
.aaa {
  height: 300px;
}
.hr {
  width: 100%;
}
</style>
