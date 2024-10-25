import { ref, computed, onMounted } from "vue";
import { Cache } from "@/utils/common";
import * as Icons from '@ant-design/icons-vue';

export default {
  emits: ["updateActivePanel"], // 声明事件
  setup(proprs, { emit }) {
    const current = ref([]);
    // 声明一个显示
    const nowActivePanel = ref(null);
    // 获取当前二级导航
    const navData = Cache.getObj("secondChildrenNav");
    // 声明当前一级菜单文本
    const navText = ref(null);
    // 声明当前一级菜单图标
    const navIcon = ref(null);
    // 点击切换二级导航
    const updateActivePanel = target => {
      nowActivePanel.value = target;
      current.value = [target]; // 更新 current 的值
      emit("updateActivePanel", nowActivePanel.value);
    };
    // 动态加载图标
    const renderIcon = (iconName) => {
      return Icons[iconName] || null; // 从 Icons 中查找图标组件
    };
    // 页面挂载完成回调
    onMounted(() => {
      // 必须有值
      if (Cache.get("secondChildrenNav")) {
        const active = Cache.getObj("secondChildrenNav");
        // 更新当前二级导航current
        current.value = [active[0].activeName];
      }

      if (Cache.get("firstNavText")) {
        navText.value = Cache.get("firstNavText");
      }

      if (Cache.get("navTextIcon")) {
        navIcon.value = Cache.get("navTextIcon");
      }

    });

    return { current, navData, updateActivePanel, nowActivePanel, navText, navIcon, renderIcon };
  }
};
