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
        dataIndex: "orderId",
        key: "orderId",
        width: "29%",
      },
      {
        title: "付款时间",
        dataIndex: "payDate",
        key: "payDate",
        width: "23%",
      },
      {
        title: "流量",
        dataIndex: "billing",
        key: "billing",
        width: "11%",
      },
      {
        title: "金额",
        dataIndex: "amount",
        key: "amount",
        width: "12%",
      },
      {
        title: "支付方式",
        dataIndex: "payType",
        key: "payType",
        width: "13%",
        sorter: true,
      },
      {
        title: "状态",
        dataIndex: "orderState",
        key: "orderState",
        width: "12%",
      },
    ]);

    // faker
    const getUserOrderData = Array.from({ length: 100 }, () => ({
      orderId: faker.number.int(),
      payDate: faker.date.anytime().toISOString(),
      billing:
        faker.helpers.arrayElement(["2", "10", "100", "300", "1000"]) + "GB",
      amount:
        "$" + faker.helpers.arrayElement(["10", "40", "300", "750", "2000"]),
      payType: faker.helpers.arrayElement(["Alipay", "Card", "USDT(TRC2.0)"]),
      orderState: faker.helpers.arrayElement(["正常", "过期"]),
    }));

    // /order/paged-order 和 /payment/paged-record接口内暂时没有数据
    // apiRequest("/payment/paged-record", "POST", {}, {
    //   isBody: true,
    //   onSuccess: data => {
    //     console.log(data)
    //   }
    // });

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
