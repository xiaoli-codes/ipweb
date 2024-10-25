import { onMounted } from "vue";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 最新教程部分
    const tutarial_data = [
      {
        title: `1st place in "Chess”`,
        description: `John Doe won 1st place in "Chess"`,
        icon: "",
        time: "1 Day ago",
      },
      {
        title: `Participated in "Carrom"`,
        description: `Justin Lee participated in "Carrom"`,
        icon: "",
        time: "1 Day ago",
      },
      {
        title: `Internation conference in "St.John School"`,
        description: `Justin Leeattended internation conference in "St.John School"`,
        icon: "",
        time: "1 Day ago",
      },
      {
        title: `Won 1st place in "Chess"`,
        description: `John Doe won 1st place in "Chess"`,
        icon: "",
        time: "1 Day ago",
      },
    ];
    // 页面渲染完成
    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });
    return { tutarial_data };
  },
};
