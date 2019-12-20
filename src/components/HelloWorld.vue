<template>
  <div class="home_case">
    <div v-if="showDetails==1">
      <el-row>
        <div style="text-align: center; padding: 8px 0px 0px;">
          <img src="../assets/wly.svg" alt style="width:200px;" />
          <h2 style="text-align: center; padding: 4px 0px;">五粮液陶坛定容定量测试系统</h2>
        </div>
      </el-row>
      <el-row>
        <div class="content_case">
          <h3>单坛统计</h3>
          <el-row>
            <el-col :span="12">
              <el-form label-position="top" style="padding-left: 32px;">
                <el-form-item label="选择酒坛">
                  <el-select
                    v-model="jiutan"
                    @change="handleChangejiutan"
                    placeholder="请选择"
                    style="width: 270px;"
                    filterable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="总容积">
                  <el-input readonly placeholder v-model="volume" style="width: 270px;">
                    <template slot="append">L</template>
                  </el-input>
                  <el-tooltip placement="right" effect="light">
                    <div slot="content">
                      <img src="../assets/sum.jpg" alt style="width: 300px;" />
                    </div>
                    <i class="el-icon-question icon_style1"></i>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="有效容积">
                  <el-input readonly placeholder v-model="realVolume" style="width: 270px;">
                    <template slot="append">L</template>
                  </el-input>
                  <el-tooltip placement="right" effect="light">
                    <div slot="content">
                      <img src="../assets/real.jpg" alt style="width: 300px;" />
                    </div>
                    <i class="el-icon-question icon_style2"></i>
                  </el-tooltip>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form label-position="top" style="padding-left: 24px;">
                <div style="overflow:hidden;">
                  <el-col :span="12">
                    <el-form-item label="液位高差">
                      <el-input
                        oninput="if(value.length>10)value=value.slice(0,10)"
                        type="number"
                        placeholder
                        :readonly="jiutan==''||jiutan==null"
                        v-model="yeweigaocha"
                        style="width: 155px;"
                      >
                        <template slot="append">mm</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="倾斜度">
                      <el-input
                        oninput="if(value.length>10)value=value.slice(0,10)"
                        type="number"
                        placeholder
                        :readonly="jiutan==''||jiutan==null"
                        v-model="angle"
                        style="width: 104px;"
                      >
                        <template slot="append">°</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </div>

                <el-form-item style="margin-bottom: 0px;">
                  <el-button
                    @click="getheight"
                    type="primary"
                    style="width: 270px;"
                    :disabled="yeweigaocha==''||yeweigaocha==null"
                  >查看酒量</el-button>
                </el-form-item>
                <el-form-item label="当前酒量">
                  <el-input readonly placeholder v-model="jiuliang" style="width: 270px;">
                    <template slot="append">L</template>
                  </el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;">
                  <el-button
                    @click="getHistory"
                    type="primary"
                    style="width: 270px;"
                    :disabled="jiutan==''||jiutan==null"
                  >历史统计</el-button>
                </el-form-item>
                <el-dialog
                  :modal-append-to-body="false"
                  :append-to-body="true"
                  :close-on-click-modal="false"
                  :title="dialogTitle"
                  :visible.sync="dialogVisible"
                  width="600px"
                >
                  <div id="main" style="width:580px;;height:300px;"></div>
                </el-dialog>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row>
        <div class="btn_case">
          <el-upload
            class="upload-demo"
            :on-success="handleSuccess"
            :show-file-list="false"
            :action="api()"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button style="width: 270px;" type="primary">批量统计</el-button>
          </el-upload>
        </div>
      </el-row>
      <el-row>
        <div class="foot_case">
          <span>技术支持</span>
          <br />
          <img src="../assets/changhong_logo.png" alt style="width: 200px;" />
          <br />
          <span>四川长虹电子控股集团有限公司</span>
        </div>
      </el-row>
    </div>
    <div v-if="showDetails==2">
      <add :data="tableData" v-on:changeShow="changeShow"></add>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import add from "./details";
export default {
  name: "HelloWorld",
  data() {
    return {
      angle: "",
      showDetails: "1",
      dialogVisible: false,
      realVolume: "",
      volume: "",
      yeweigaocha: null,
      jiuliang: null,
      jiutan: "",
      options: [],
      fileList: [],
      dialogTitle: "",
      tableData: []
    };
  },
  methods: {
    changeShow() {
      this.showDetails = 1;
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.tableData = response.data;
        this.showDetails = 2;
      }
    },
    api() {
      return this.global + "/jiutan/piliang";
    },
    handleChangejiutan(value) {
      this.dialogTitle =
        this.options.find(item => item.id == value).name + " 历史数据折线图";
      this.volume = this.options.find(item => item.id == value).volume;
      this.realVolume = this.options.find(item => item.id == value).realVolume;
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },
    getjiutanList() {
      this.$axios
        .get(this.global + "/jiutan/jiutanlist")
        .then(result => {
          this.options = result.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getheight() {
      if (
        /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/.test(this.yeweigaocha) ==
        false
      ) {
        this.$message.error(`液位高差必须大于0，且只能保留两位小数！`);
      } else {
        this.$axios
          .get(
            this.global +
              "/jiutan/getHeight?jiutanId=" +
              this.jiutan +
              "&height=" +
              this.yeweigaocha +
              "&angle=" +
              (this.angle != "" && this.angle != null ? this.angle : 0)
          )
          .then(result => {
            if (result.data.code === 200) {
              this.jiuliang = result.data.data;
            } else {
              this.$message.error(result.data.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getHistory() {
      this.$axios
        .get(this.global + "/jiutan/history?jiutanId=" + this.jiutan)
        .then(result => {
          if (result.data.code === 200) {
            this.dialogVisible = true;
            console.log(result);
            this.$nextTick(() => {
              let xData = result.data.data.map(item => item.gmtCreate);
              let Ydata = result.data.data.map(item => item.volume);
              var myChart = echarts.init(document.getElementById("main"));
              let option = {
                title: {
                  text: ""
                },
                tooltip: {
                  trigger: "axis",
                  formatter: function(params) {
                    // console.log(params);
                    let topTip =
                      "<div style='padding:0 8px;'>" +
                      xData[params[0].dataIndex] +
                      "<br/>" +
                      "酒量:" +
                      params[0].data +
                      "L" +
                      "</div>";
                    return topTip;
                  }
                },
                toolbox: {},
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true
                },
                xAxis: [
                  {
                    type: "category",
                    boundaryGap: false,
                    data: xData.map(item => {
                      return (
                        item.split(" ")[1].split(":")[0] +
                        ":" +
                        item.split(" ")[1].split(":")[1]
                      );
                    })
                  }
                ],
                yAxis: [
                  {
                    type: "value"
                  }
                ],
                series: [
                  {
                    name: "酒量",
                    type: "line",
                    stack: "总量",
                    data: Ydata
                  }
                ]
              };

              myChart.setOption(option);
            });
          } else {
            this.$message.error(result.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getjiutanList();
  },
  components: {
    add
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.home_case {
  font-size: 14px;
  width: 800px;
  height: 730px;
  margin: auto;
  background-color: #85cbff;
  .content_case {
    .el-input-group__append,
    .el-input-group__prepend {
      padding: 0 12px;
    }
    width: 90%;
    height: 340px;
    border: 1px solid #fff;
    margin: 40px auto auto;
    border-radius: 5px;
    color: #34373a;
    h3 {
      position: relative;
      top: -12px;
      left: 28px;
      background-color: #85cbff;
      display: inline-block;
      padding: 0 4px;
    }
    .el-form-item__label {
      color: #34373a;
      padding: 0;
      font-size: 16px;
    }
    .icon_style1 {
      position: relative;
      top: -38px;
      left: -220px;
      font-size: 16px;
    }
    .icon_style2 {
      position: relative;
      top: -38px;
      left: -205px;
      font-size: 16px;
    }
  }
  .btn_case {
    text-align: center;
    line-height: 120px;
    border-bottom: 1px solid #fff;
  }
  .el-button--primary {
    color: #fff;
    background-color: #2a87c9;
    border-color: #2a87c9;
  }
  .el-button--primary:hover,
  .el-button--primary:active {
    background: #439ddc;
    border-color: #439ddc;
    color: #fff;
  }
  .foot_case {
    text-align: center;
    margin-top: 20px;
    span {
      font-size: 16px;
      color: #1688be;
    }
  }
  .el-button--primary.is-disabled,
  .el-button--primary.is-disabled:active,
  .el-button--primary.is-disabled:focus,
  .el-button--primary.is-disabled:hover {
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
  }
}
input[type="number"] {
  -moz-appearance: textfield;
}
　　input[type="number"]::-webkit-inner-spin-button,
　　input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.el-dialog__body {
  padding-top: 0;
}
</style>
