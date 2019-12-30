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
        <el-table-column prop="angle" label="倾斜度°" min-width="90" align="center"></el-table-column>
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
      <el-button class="remove" type="primary" size="small" @click="exportHistoryExcel">导出Excel</el-button>
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
    exportHistoryExcel() {
      let nowTime = new Date().toLocaleString("chinese", { hour12: false });
      this.$axios
        .post(this.global + "/history/exportExcel", this.data, {
          responseType: "blob", // 设置响应数据类型
          headers: { "Content-Type": "application/json" }
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            var blob = new Blob([res.data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            var downloadElement = document.createElement("a");
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            // let fileName = this.options.find(item => item.id == this.jiutan)
            //   .name;
            downloadElement.download =
              "五粮液酒坛酒量统计 " + nowTime + ".xlsx"; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
          }
        });
    },
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
            data: xData,
            axisLabel: {
              interval: 0,
              rotate: xData.length > 9 ? 45 : 0 //倾斜度 -90 至 90 默认为0
            }
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