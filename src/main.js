import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import Antd from "ant-design-vue";
import { createI18n } from "vue-i18n";
// import "ant-design-vue/dist/reset.css";
import "styles/bootstrap.min.css";
import "styles/all.min.css";
import "styles/style.css";
import "styles/index.scss";
import loadingComponents from "components/loading/index.vue";

// 引入更新后的 locales 文件
import messages from "./local";

// 创建 vue-i18n 实例，使用新的地区语言代码
const i18n = createI18n({
  locale: "en_US", // 设置默认语言为 en_US
  fallbackLocale: "zh_CN", // 如果当前语言没有对应翻译，使用 zh_CN
  messages, // 使用从 locales 引入的语言包
});

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 vue-router
app.use(router);

// 使用 ant-design-vue
app.use(Antd);

// 使用 vuex store
app.use(store);

// 使用 vue-i18n
app.use(i18n);
// 注册全局loading
app.component("loading", loadingComponents);

// 挂载应用
app.mount("#app");
