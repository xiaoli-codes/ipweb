import { ref, onMounted } from "vue";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });
    return {};
  },
};
