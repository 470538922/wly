<template>
  <div class="pilang_case">
    <el-row style="padding:12px;">
      <el-col :span="4" style="text-align:left">
        <el-button @click="toback">返回</el-button>
      </el-col>
      <el-col :span="16" style="text-align:center">
        <h1>批量统计</h1>
      </el-col>
      <el-col :span="4" style="text-align:right">
        <el-button @click="bijiao">对比分析</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="酒坛" min-width="120" align="center"></el-table-column>
        <el-table-column prop="volume" label="总容积L" min-width="100" align="center"></el-table-column>
        <el-table-column prop="realVolume" label="有效容积L" min-width="100" align="center"></el-table-column>
        <el-table-column prop="height" label="液位高度mm" min-width="120" align="center"></el-table-column>
        <el-table-column prop="temperature" label="温度℃" min-width="90" align="center"></el-table-column>
        <el-table-column prop="address" label="倾斜度°" min-width="90" align="center"></el-table-column>
        <el-table-column prop="nowVolume" label="当前容积L" min-width="120" align="center"></el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      :modal-append-to-body="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="酒坛对比"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <div id="main1" style="width:580px;;height:300px;"></div>
    </el-dialog>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    data: {
      default: null
    }
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false
    };
  },
  methods: {
    bijiao() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        let xData = this.data.map(item => item.name);
        let Ydata = this.data.map(item => item.nowVolume);
        var myChart = echarts.init(document.getElementById("main1"));
        let option = {
          title: {
            text: ""
          },
          tooltip: {},

          xAxis: {
            data: xData
          },
          yAxis: {},
          series: [
            {
              name: "酒量",
              type: "bar",
              data: Ydata,
              itemStyle: {
                normal: {
                  color: "#85cbff"
                }
              }
            }
          ]
        };

        myChart.setOption(option);
      });
    },
    toback() {
      this.$emit("changeShow", false);
    }
  },
  created() {
    this.tableData = this.data;
    console.log(this.tableData);
  },
  watch: {
    data() {
      if (this.data != null && this.data != []) {
        this.tableData = this.data;
      }
    }
  }
};
</script>
<style lang="less">
.pilang_case {
  overflow: hidden;
  .el-table {
    th,
    tr {
      background-color: #85cbff;
      color: black;
    }
  }
}
</style>