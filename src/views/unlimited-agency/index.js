import { onMounted, ref } from "vue";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 声明当前一级菜单active
    const nowActive = ref("30");
    // 声明当前展示的panel容器
    const nowActivePanel = ref("buyProxy");
    // 使用 vue-i18n
    const { t, locale } = useI18n();

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

    return { handleMessage, nowActivePanel, nowActive };
  },
};
