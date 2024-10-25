import { reactive, ref, computed, onMounted } from "vue";
import { Session, Cache } from "@/utils/common.js";
import apiRequest from "@/services/api";
import { faker } from "@faker-js/faker"; // 引入faker
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 获取 local 中的用户数据
    const user = Session.getUser();
    // 写入数据，防止undefined的情况
    const useState = reactive({
      name: computed(() => user.name) || "",
      token: computed(() => user.token) || "",
    });
    // 声明当前导航
    const nowActive = ref("00");
    // 声明用户剩余动态流量容器
    const dynamic_billings = ref(null);
    // 声明页面内tabs的active
    const activeKey = ref(null);
    // 使用 vue-i18n
    const { t, locale } = useI18n();

    // 静态住宅代理部分
    const columns = ref([
      { title: "订单编号", dataIndex: "orderNo", key: "orderNo" },
      { title: "国家/地区", dataIndex: "country", key: "country" },
      { title: "城市", dataIndex: "city", key: "city" },
      { title: "IP质量", key: "IPQuality", dataIndex: "IPQuality" },
      { title: "代理服务器", key: "proxyServer", dataIndex: "proxyServer" },
      { title: "出口IP", key: "inputIP", dataIndex: "inputIP" },
      { title: "购买/到期时间", key: "payTime", dataIndex: "payTime" },
    ]);

    // 生成假数据 faker的date方法放回结果为object 不能直接使用
    const data = Array.from({ length: 100 }, () => ({
      orderNo: faker.number.int(),
      country: faker.location.country(),
      city: faker.location.city(),
      IPQuality: faker.helpers.arrayElement(["good", "bad"]),
      proxyServer: "gate1.ipweb.cc",
      inputIP: faker.internet.url(),
      payTime: `${faker.date.past().toISOString()} to: ${faker.date
        .future()
        .toISOString()}`, // 使用toISOString()转换数据类型
    }));

    // tabs切换回调函数
    const handleChange = (key) => {
      activeKey.value = key;
    };

    onMounted(() => {
      // 获取tabs第一个内容
      activeKey.value = "1";
      // 获取动态住宅代理流量
      apiRequest({
        url: "/dynamicip/get-residual-flow",
        isBody: true,
        onSuccess: (data) => {
          dynamic_billings.value = data;
        },
      });
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });

    // 返回至页面的数据
    return {
      useState,
      data,
      columns,
      nowActive,
      dynamic_billings,
      activeKey,
      handleChange,
    };
  },
};
