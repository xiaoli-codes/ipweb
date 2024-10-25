import { ref, onMounted } from "vue";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 订单主体数据容器
    const unlimitedOrder = ref([]);

    // 订单表头数据
    const columns = ref([
      {
        title: "订单编号",
        dataIndex: "orderNo",
        key: "orderNo",
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
        title: "金额",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "付款时间",
        dataIndex: "payTime",
        key: "payTime",
      },
      {
        title: "到期",
        dataIndex: "expire",
        key: "expire",
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
    return { columns, unlimitedOrder };
  },
};
