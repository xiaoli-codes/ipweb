import { ref, onMounted } from "vue";
import * as echarts from "echarts";

export default {
  setup() {
    const echartDom = ref(null);
    onMounted(() => {
      const today = new Date();
      const dates = [];
      const charts = echarts.init(echartDom.value);
      // 测试用函数;
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formatedDate = date.toISOString().split("T")[0];
        dates.push(formatedDate);
      }

      const echartsOption = {
        // title: {
        //   text: "剩余流量/IP"
        // },
        grid: {
          left: "0%", // 左边距
          right: "0%", // 右边距
          bottom: "0%", // 下边距
          containLabel: true, // 包含坐标轴标签
        },
        // 提示框设置
        tooltip: {
          trigger: "axis",
        },
        // X轴设置
        xAxis: {
          type: "category",
          data: dates,
          //   boundaryGap: false // 取消两端的空白
        },
        // Y轴设置
        yAxis: {
          type: "value",
        },
        // 数据走势设置
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
          //   虚线设置
          {
            type: "line",
            datasetId: "dataset_of_germany",
            showSymbol: false,
            lineDash: [5, 5], // 设置虚线
            encode: {
              x: "Year",
              y: "Income",
              itemName: "Year",
              tooltip: ["Income"],
            },
          },
        ],
      };

      charts.setOption(echartsOption);
    });
    return { echartDom };
  },
};
