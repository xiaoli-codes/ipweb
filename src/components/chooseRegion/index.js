import apiRequest from "@/services/api.js";
import { reactive, ref, onMounted, nextTick } from "vue";
import { Cache } from "@/utils/common.js";
import { useI18n } from "vue-i18n";

export default {
  emits: ["dataFetched"],
  setup(props, { emit }) {
    // 声明加载类变量
    const loading = reactive({
      tabTopSpinning: true, // 洲数据的加载状态
      tabContentSpinning: true, // 国家数据的加载状态
    });
    // 声明展示类变量
    const active = reactive({
      isShowRegion: false, // 是否展示地区对应的内容
      continentId: 1, // 洲选择tabs的active
      showText: null, // 选中文本 -> 地区
      language: null, // 全局语言容器
    });
    // 声明展示数据类变量
    const database = reactive({
      continentsData: [], // 洲数据
      countryData: [], // 国数据
    });
    // 国家数据存储单独声明 方便实现按需加载 根据continentsId进行数据缓存
    const cachedCountryData = reactive([]);
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 点击洲选项的回调函数
    const onTabChange = (key) => {
      active.continentId = key; // 更新当前选中的选项卡
      loading.tabContentSpinning = true; // 更新country的loading状态
      getCountryList({ continentId: key });
      console.log(cachedCountryData);
    };

    // 点击地区部分时 显示可选洲和国家
    const toggleRegion = () => {
      active.isShowRegion = !active.isShowRegion;
      // panel显示时请求数据
      if (active.isShowRegion) {
        getContinentList();
        getCountryList();
        nextTick(() => {
          loading.tabTopSpinning = false; // 更新continent的loading状态
          loading.tabContent = false; // 更新country的loading状态
        });
      } else {
        loading.tabTopSpinning = true; // 更新continent的loading状态
        loading.tabContent = true; // 更新country的loading状态
      }
    };

    // 点击国家选项 触发对应结果
    const onChooseCountry = (item) => {
      if (item) {
        emit("dataFetched", {
          continentId: item.continentId,
          countryId: item.id,
          countryCode: item.code,
        });
        // 关闭展示panel
        active.isShowRegion = false;
        // 修改显示地区文本
        active.showText = item.name;
      }
    };

    // 动态加载图片
    const getImageSrc = (code) => {
      try {
        // 使用动态导入来获取图片
        const images = import.meta.glob("@/assets/country/*.svg", {
          eager: true,
        });
        const imagePath = `/src/assets/country/${code.toLowerCase()}.svg`;
        return images[imagePath]?.default || "";
      } catch (error) {
        console.error("加载图片出错:", error);
        return ""; // 当图片不存在时返回空字符串
      }
    };

    // 页面加载完成时
    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });

    // 获取洲列表
    function getContinentList() {
      if (sessionStorage.getItem("continentsData")) {
        database.continentsData = JSON.parse(
          sessionStorage.getItem("continentsData")
        );
        loading.tabTopSpinning = false;
      } else {
        apiRequest({
          url: "/area/continents",
          isBody: true,
          onSuccess: (data) => {
            if (data.data) {
              // 会话级数据存储
              sessionStorage.setItem(
                "continentsData",
                JSON.stringify(data.data)
              );
              database.continentsData = data.data;
              loading.tabTopSpinning = false;
            }
          },
        });
      }
    }

    // 获取国家列表，可以不填参数。
    function getCountryList(param = null) {
      param = param || {
        continentId: active.continentId,
      };
      const cachedItem = cachedCountryData.find(
        (item) => item.savaId === active.continentId
      );
      if (cachedItem) {
        database.countryData = cachedItem.data;
        nextTick(() => {
          loading.tabContentSpinning = false;
        });
      } else {
        apiRequest({
          url: "/area/countries",
          // isBody: true,
          params: param,
          onSuccess: (data) => {
            if (data.data) {
              database.countryData = data.data;
              cachedCountryData.push({
                savaId: active.continentId,
                data: data.data,
              });
              nextTick(() => {
                loading.tabContentSpinning = false;
              });
            }
          },
        });
      }
    }

    return {
      loading,
      active,
      database,
      cachedCountryData,
      onChooseCountry,
      onTabChange,
      toggleRegion,
      getImageSrc,
    };
  },
};
