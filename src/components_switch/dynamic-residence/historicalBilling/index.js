import { computed, ref, onMounted } from "vue";
import apiRequest from "@/services/api";
import { Cache } from "@/utils/common";
import { faker } from "@faker-js/faker";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    const columns = ref([
      {
        title: "订单编号",
        dataIndex: "orderNo",
        key: "orderNo",
        width: "29%",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: "23%",
      },
      {
        title: "流量",
        dataIndex: "content",
        key: "content",
        width: "20%",
      },
      {
        title: "金额",
        dataIndex: "amountDisplay",
        key: "amountDisplay",
        width: "12%",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        width: "12%",
      },
    ]);

    const getUserOrderData = ref(null);

    apiRequest({
      url: "/order/paged-order",
      isBody: true,
      onSuccess: (data) => {
        if (data.data) {
          console.log(data)
          getUserOrderData.value = data.data.results;
        }
      },
    });

    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });

    const handleTableChange = () => {};
    return { columns, handleTableChange, getUserOrderData };
  },
};
