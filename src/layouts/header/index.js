import { Cache, Session } from "@/utils/common";
import { useRouter } from "vue-router";
import apiRequest from "@/services/api.js";
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 从local上获取用户信息
    const useState = Session.getUser();
    // 实例化router
    const router = useRouter();
    // 声明提示框
    const open = ref(false);
    // 语言选项
    const languageData = ref([
      { id: 0, code: "zh_CN", name: "中文" },
      { id: 1, code: "en_US", name: "English" },
    ]);
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 当前语言
    const nowLanguage = ref(locale.value); // 从i18n上获取当前语言
    // 语言切换回调
    const onChangeLanguage = (value) => {
      // 切换 i18n 语言
      locale.value = value;
      nowLanguage.value = value;
      // 存储
      Cache.set("GlobalLanguage", value);
    };
    // 用户头像框部分菜单
    const menuClick = ({ key }) => {
      switch (key) {
        // 编辑选项
        case "editor":
          break;
        // 个人页面选项
        case "personal":
          break;
        // 注销选项
        case "logout":
          // 开启提示框
          open.value = true;
          break;
      }
    };
    // 提示框确认操作
    const handleOk = (e) => {
      apiRequest({
        url: "/main/logout",
        method: "POST",
        isBody: true,
        onSuccess: (data) => {
          // 关闭提示框
          open.value = false;
          message.success(t("logoutSuccess")); // 使用 i18n 翻译
          // 清空本地缓存
          Session.clear();
          // 跳转至登录页
          router.push("/login");
        },
      });
    };

    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
        nowLanguage.value = globalLang;
      }
    });

    return {
      useState,
      open,
      languageData,
      nowLanguage,
      menuClick,
      onChangeLanguage,
      handleOk,
    };
  },
};
