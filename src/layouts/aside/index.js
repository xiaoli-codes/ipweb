import { reactive, computed, onMounted, ref } from "vue";
import { MenuData } from "@/utils/menuData";
import { useRouter } from "vue-router";
import { Session, Cache, Common } from "@/utils/common";
import * as Icons from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";

export default {
  props: {
    collapsed: {
      type: Boolean,
      require: true,
    },
    nowActive: {
      type: String,
      require: true,
    },
  },

  setup(props, { emit }) {
    // 菜单数据
    const menuState = reactive({ asideDatas: [] });

    // 获取实例
    const router = useRouter();

    // 根据ID排序datas
    menuState.asideDatas = getMenuData();

    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 进度条相关参数
    const progressState = reactive({
      init_precent: 0,
      init_infinite: 0,
      init_statical: 0,
      target_precent: 100,
      target_infinite: 100,
      target_statical: 100,
    });

    // 在组件挂载时启动进度动画
    onMounted(() => {
      var timer = setInterval(() => {
        progressState.init_precent !== progressState.target_precent &&
        progressState.init_precent < progressState.target_precent
          ? (progressState.init_precent += 1)
          : clearInterval(timer);
      }, 20);
    });

    const isCollapsed = computed(() => props.collapsed);

    // 将 nowActive 转换为数组
    const selectedKeys = computed(() => {
      return Array.isArray(props.nowActive)
        ? props.nowActive
        : [props.nowActive];
    });

    // 导航菜单点击回调
    const handleMenuClick = (item) => {
      // 过滤掉没有children的菜单
      if (item.children) {
        // 存储二级导航
        Cache.setObj("secondChildrenNav", item.children);
        // 存储一级导航文本
        Cache.set("firstNavText", item.text);
        // 存储一级导航图标
        Cache.set("navTextIcon", item.iconCls);
      }

      router.push(item.url);
    };

    // 动态加载图标
    const renderIcon = (iconName) => {
      return Icons[iconName] || null; // 从 Icons 中查找图标组件
    };

    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });

    // 获取当前用户菜单;
    function getMenuData() {
      var user = Session.getUser();
      if (user == null || Common.isEmpty(user.roles)) {
        return [];
      }

      function filterData(arr) {
        if (arr == null || arr.length == 0) {
          return;
        }
        for (let i = arr.length - 1; i > -1; i--) {
          let item = arr[i];
          if (!Common.isEmpty(item.role) && !Session.hasRole(item.role)) {
            arr.splice(i, 1);
          } else {
            filterData(item.children);
          }
        }
      }
      var data = MenuData;
      filterData(data);
      return data;
    }

    return {
      menuState,
      isCollapsed,
      progressState,
      handleMenuClick,
      selectedKeys,
      renderIcon,
    };
  },
};
