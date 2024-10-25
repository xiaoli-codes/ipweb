import { ref, onMounted } from "vue";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 声明订单数据
    const IPdetailData = ref([]);
    // 声明订单表头
    const columns = ref([
      {
        title: "订单编号",
        dataIndex: "orderNo",
        key: "orderNo",
      },
      {
        title: "国家/地区",
        dataIndex: "country",
        key: "country",
      },
      {
        title: "地区",
        dataIndex: "state",
        key: "state",
      },
      {
        title: "城市",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "IP质量",
        dataIndex: "IPQuality",
        key: "IPQuality",
      },
      {
        title: "代理服务器",
        dataIndex: "proxyServer",
        key: "proxyServer",
      },
      {
        title: "代理服务器IP",
        dataIndex: "proxyServerIP",
        key: "proxyServerIP",
      },
      {
        title: "出口IP",
        dataIndex: "inputIP",
        key: "inputIP",
      },
      {
        title: "端口",
        dataIndex: "port",
        key: "port",
      },
      {
        title: "账号",
        dataIndex: "account",
        key: "account",
      },
      {
        title: "密码",
        dataIndex: "password",
        key: "password",
      },
      {
        title: "UDP",
        dataIndex: "UDP",
        key: "UDP",
      },
      {
        title: "购买时间/到期时间",
        dataIndex: "buyExpireTime",
        key: "buyExpireTime",
      },
      {
        title: "节点域名",
        dataIndex: "nodeDomain",
        key: "nodeDomain",
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
    return { IPdetailData, columns };
  },
};
