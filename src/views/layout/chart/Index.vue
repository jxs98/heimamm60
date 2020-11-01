<template>
  <div class="chart">
    <el-card>
      <ul class="list">
        <li>
          <div class="itemContent color1">{{ titleObj.increment_users }}</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div class="itemContent color1">{{ titleObj.total_users }}</div>
          <p>总用户数</p>
        </li>
        <li>
          <div class="itemContent color2">
            {{ titleObj.increment_questions }}
          </div>
          <p>新增试题</p>
        </li>
        <li>
          <div class="itemContent color2">{{ titleObj.total_questions }}</div>
          <p>总试题量</p>
        </li>
        <li>
          <div class="itemContent color3">
            {{ titleObj.total_done_questions }}
          </div>
          <p>总刷题量</p>
        </li>
        <li>
          <div class="itemContent color3">
            {{ titleObj.personal_questions }}
          </div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card>
      <div class="echarts" ref="echartsRef"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      titleObj: {}//  标题部分数据
    }
  },
  methods: {
    //  获取标题数据
    async getTitleObjData () {
      const { data: res } = await this.$http.post('/data/title')
      this.titleObj = res.data
    },
    //  图标数据
    async getStatisticsData () {
      //  获取企业题目数据
      const { data: res } = await this.$http.post('/data/statistics')
      var myChart = echarts.init(this.$refs.echartsRef);
      // 指定图表的配置项和数据
      var option = {
        backgroundColor: '#fff',

        title: {
          text: '企业题量统计',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#111',
            fontSize: 34,
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 'right',
          data: res.data
        },
        series: [
          {
            name: '题目数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: res.data,
            roseType: 'radius',
            label: {
              color: '#111',
              fontSize: 24,
              fontWeight: 700
            },
            labelLine: {
              lineStyle: {
                color: '#111',

              },
              smooth: 0.3,
              length: 50,
              length2: 30
            },


            animationType: 'scale',
            animationEasing: 'elasticOut',

          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted () {
    this.getTitleObjData()
    this.getStatisticsData()
  },
}
</script>
<style lang="less">
.chart {
  .list {
    //弹性例子布局
    display: flex;
    //主轴分布
    justify-content: space-around;
    //侧轴分布
    align-items: center;
    //文本居中
    text-align: center;
    p {
      margin-top: 10px;
      font-weight: 700;
      font-size: 14px;
    }
    //颜色处理
    .color1 {
      border: 10px solid #0086fa;
      color: #0086fa;
    }
    .color2 {
      border: 10px solid #f76137;
      color: #f76137;
    }
    .color3 {
      border: 10px solid #55cd78;
      color: #55cd78;
    }
    //画圈圈
    .itemContent {
      border-radius: 50%;
      width: 120px;
      height: 120px;
      line-height: 100px;
      font-size: 24px;
      font-weight: 700;
    }
  }
  .echarts {
    height: 500px;
  }
}
.el-card {
  margin-bottom: 20px;
}
</style>
