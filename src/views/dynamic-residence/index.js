import { onMounted, ref } from "vue";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const isActive = ref("personal");
    // 声明一级导航active
    const nowActive = ref("10");
    // 声明二级导航active
    const nowActivePanel = ref("buyPlan");
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    const onPersonPlan = () => {
      isActive.value = "personal";
      console.log("个人计划被选中");
    };

    const onEnterprisePlan = () => {
      isActive.value = "enterprise";
      console.log("企业计划被选中");
    };

    // 获取当前选中的二级菜单key
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
      isActive,
      onPersonPlan,
      onEnterprisePlan,
      nowActive,
      nowActivePanel,
      handleMessage,
    };
  },
};
