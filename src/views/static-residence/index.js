import { ref, reactive, onMounted } from "vue";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const formState = reactive({});

    const commonState = reactive({});
    // 声明一级导航active
    const nowActive = "20";
    const nowActivePanel = ref("static_buyProxy");
    // 声明二级导航active
    // 声明全局语言容器
    // 使用 vue-i18n
    const { t, locale } = useI18n();
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

    const payOrder = [{}];
    // 切换组件
    const handleMessage = (value) => {
      nowActivePanel.value = value;
    };

    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });

    return {
      formState,
      commonState,
      columns,
      payOrder,
      nowActive,
      nowActivePanel,
      handleMessage,
    };
  },
};
