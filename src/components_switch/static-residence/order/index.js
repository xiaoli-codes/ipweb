import { ref, onMounted } from "vue";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 表格数据容器
    const staticOrderData = ref(null);
    // 静态订单表头数据
    const columns = ref([
      {
        title: "订单编号",
        dataIndex: "orderNo",
        key: "orderNo",
      },
      {
        title: "时间",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "数量",
        dataIndex: "num",
        key: "num",
      },
      {
        title: "金额",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "付款/到期",
        dataIndex: "payTime",
        key: "payTime",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
      },
    ]);
    // 页面渲染完成
    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });
    return { columns, staticOrderData };
  },
};
