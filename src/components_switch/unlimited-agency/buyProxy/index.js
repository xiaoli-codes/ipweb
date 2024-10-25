import { reactive, onMounted, ref } from "vue";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 发送到组件的数据
    const radioData = reactive({
      sendCityData: [],
      sendCityText: "城市",
      sendTimeData: [],
      sendTimeText: "时间",
      sendTypeData: [],
      sendTypeText: "类型",
      sendIpData: [],
      sendIpText: "IP特性",
      sendUDPData: [],
      sendUDPText: "UDP",
      sendUDPActive: 1,
      sendProtocolData: [],
      sendProtocolText: "协议",
    });
    // 声明表单类数据
    const formState = reactive({
      city: null,
      time: null,
      type: null,
      IP: null,
      UDP: null,
      protocol: null,
      num: null,
    });
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 表单验证通过
    const onFinish = () => {};
    // 表单验证失败
    const onFinishFailed = () => {};
    // 订单界面 清空按钮
    const onClearOrders = () => {};
    // 订单界面 付款按钮
    const onPayModal = () => {};
    // 订单数据容器
    const unlimitedPayOrder = ref([]);
    // 表格参数
    const columns = ref([
      {
        title: "地区",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "时间",
        dataIndex: "orderTime",
        key: "orderTime",
      },
      {
        title: "端口",
        dataIndex: "port",
        key: "port",
      },
      {
        title: "价钱",
        dataIndex: "price",
        key: "price",
      },
    ]);

    // 赋值数据
    radioData.sendCityData = [
      {
        id: 0,
        value: 2701,
        EN: "State of New Jersey",
        ZH: "新泽西州",
      },
      {
        id: 1,
        value: 2702,
        EN: "Maryland",
        ZH: "马里兰州",
      },
      {
        id: 2,
        value: 2703,
        EN: "Georgia",
        ZH: "佐治亚州",
      },
      {
        id: 3,
        value: 2704,
        EN: "Wyoming",
        ZH: "怀俄明州",
      },
      {
        id: 4,
        value: 2705,
        EN: "State of Oregon",
        ZH: "俄勒冈州",
      },
    ];

    radioData.sendTimeData = [
      {
        id: 0,
        value: 7,
        EN: "7 Day",
        ZH: "7天",
      },
      {
        id: 1,
        value: 30,
        EN: "30 Day",
        ZH: "30天",
      },
      {
        id: 2,
        value: 60,
        EN: "60 Day",
        ZH: "60天",
      },
    ];

    radioData.sendTypeData = [
      {
        id: 0,
        value: "foundation",
        EN: "foundation",
        ZH: "基础",
      },
      {
        id: 1,
        value: "standard",
        EN: "standard",
        ZH: "标准",
        discount: true,
        discountText: "+$0.5",
      },
      {
        id: 2,
        value: "high-end",
        EN: "high-end",
        ZH: "高端",
      },
    ];

    radioData.sendIpData = [
      {
        id: 0,
        value: "Exclusive",
        EN: "Exclusive",
        ZH: "独享",
      },
    ];

    radioData.sendUDPData = [
      {
        id: 0,
        value: "close",
        EN: "close",
        ZH: "关闭",
      },
      {
        id: 1,
        value: "open",
        EN: "open",
        ZH: "开启",
      },
    ];

    radioData.sendProtocolData = [
      {
        id: 0,
        value: "HTTP/SONCK5",
        EN: "HTTP/SONCK5",
        ZH: "HTTP/SONCK5",
      },
    ];

    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });

    return {
      radioData,
      formState,
      unlimitedPayOrder,
      columns,
      onFinish,
      onFinishFailed,
      onClearOrders,
      onPayModal,
    };
  },
};
