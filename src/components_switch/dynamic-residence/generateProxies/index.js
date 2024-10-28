import { reactive, onMounted, nextTick, computed } from "vue";
import Prism from "prismjs";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/themes/prism-tomorrow.css";
import apiRequest from "@/services/api";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";
import { message } from "ant-design-vue";

export default {
  setup() {
    // 表单类数据声明
    const formState = reactive({
      continentId: null, // 洲id
      countryId: null, // 国id
      countryCode: null, // 国代码
      stateId: null, // 省id
      cityId: null, // 市id
      selectProxyServer: null, // 选中的代理服务器
      selectNumber: null, // 选中的数量
      selectAccount: null, // 选中的账号
      account: null, // 账号
      userPassword: null, // 使用者对应密码数据
      selectDuration: null, // 选中的持续时间
      port: null, // 端口
    });
    // 展示类数据声明
    const database = reactive({
      stateData: null, // 省数据
      cityData: null, // 市数据
      userAccountData: null, // 使用者数据
      proxyServerData: null, // 代理服务器数据
      proxyURLData: null, // 代理服务器URL数据
    });
    // 禁用类变量声明
    const disabled = reactive({
      stateDisabled: true,
      cityDisabled: true,
      userDisabled: false,
      genarateDisabled: false,
    });
    // 展示类变量声明
    const active = reactive({
      language: null,
    });
    // 省份数据暂存
    const cachedStateData = reactive([]);
    // 城市数据暂存
    const cachedCityData = reactive([]);
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 处理从子组件接收到的数据的方法
    const handleDataFetched = (params) => {
      if (params) {
        // 更新id
        formState.continentId = params.continentId;
        formState.countryId = params.countryId;
        formState.countryCode = params.countryCode;

        // 联动部分
        getStateList({ countryId: formState.countryId });
      }
    };

    // 用户选择省份回调函数
    const onUserChooseState = (selectedId) => {
      // 上锁
      disabled.cityDisabled = true;
      // 赋值
      formState.stateId = selectedId;
      // 更新市选项
      getCityList({ stateId: formState.stateId });
    };

    // 用户选择城市回调函数
    const onUserChooseCity = (selectedId) => {
      // 赋值
      formState.cityId = selectedId;
    };

    // 代理tabs切换展示账号、cURL等内容回调
    const onProxyTabsChange = () => {
      nextTick(() => {
        Prism.highlightAll(); // 切换更新内容则重新调用这个方法
      });
    };
    // 使用者选项点击事件
    const handleClickAccount = () => {
      // 临时存储判断 避免反复发送请求
      if (database.userAccountData) {
        return;
      } else {
        // 初始化使用者选择框的选项
        apiRequest({
          url: "/user/list-accounts",
          isBody: true,
          onSuccess: (data) => {
            if (data.data) {
              // 赋值
              database.userAccountData = data.data;
            }
          },
        });
      }
    };
    // 使用者选项框被选择的回调函数
    const handleSelectAccount = (value) => {
      if (value) {
        // 查找对应账号的密码并展示
        database.userAccountData.forEach((ele) => {
          if (ele.id === value) {
            // 更新密码
            formState.userPassword = ele.password;
            // 更新账号id
            formState.selectAccount = ele.id;
            // 更新账号
            formState.account = ele.name;
          }
        });
      }
    };
    // 代理服务器选项点击事件
    const handleClickProxyServer = () => {
      // 临时存储判断
      if (database.proxyServerData) {
        return;
      } else {
        // 初始化代理服务器列表
        apiRequest({
          url: "/dynamicip/get-proxy-server",
          isBody: true,
          onSuccess: (data) => {
            if (data.data) {
              // 赋值
              database.proxyServerData = data.data;
            }
          },
        });
      }
    };
    // 代理服务器选项框被选择的回调函数
    const handleSelectProxyServer = (value) => {
      if (value) {
        // 判断是否包含“:” split不会为false只会返回原字符串
        if (value.split(":").length > 1) {
          // 赋值
          formState.port = value.split(":")[1];
          formState.selectProxyServer = value.split(":")[0];
        } else {
          // 不包含port是 设置默认port为80
          formState.port = "80";
          formState.selectProxyServer = value;
        }
      }
    };
    // 数量选项框被选择的回调函数
    const handleSelectNumber = (value) => {
      if (value) {
        formState.selectNumber = value;
      }
    };
    // 生成按钮被点击
    const handleGenerate = () => {
      // 防抖
      disabled.genarateDisabled = true;
      if (
        formState.countryId &&
        formState.stateId &&
        formState.cityId &&
        formState.selectDuration &&
        formState.port &&
        formState.selectNumber &&
        formState.selectProxyServer &&
        formState.selectAccount &&
        formState.userPassword
      ) {
        // 提交生成代理url
        apiRequest({
          url: "/dynamicip/create-proxy-uris",
          params: {
            prefix: "",
            accountId: formState.selectAccount,
            password: formState.userPassword,
            countryCode: formState.countryCode,
            stateId: formState.stateId,
            cityId: formState.cityId,
            duration: formState.selectDuration,
            random: "",
            host: formState.selectProxyServer,
            port: formState.port - 0,
            count: formState.selectNumber,
          },
          isBody: true,
          showLoading: true,
          onSuccess: (data) => {
            if (data.data) {
              database.proxyURLData = data.data;
            }
          },
        });
      } else {
        message.error("请补充所有选项！");
        disabled.genarateDisabled = false;
      }
    };
    // 接收子组件单选数据
    const handleEligibleFetch = (item) => {
      // 接收并存储持续时间
      formState.selectDuration = item.value;
    };
    // 页面加载完成时
    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });
    // 获取省列表
    function getStateList(param) {
      if (param) {
        const cachedItem = cachedStateData.find(
          (item) => item.savaId === param.countryId
        );
        if (cachedItem) {
          // 更新
          formState.countryId = param.countryId;
          // 使用缓存数据
          database.stateData = cachedItem.data;
          // 默认选取
          formState.stateId = database.stateData[0].id;
          // 解锁
          disabled.stateDisabled = false;
          // 联动部分
          getCityList({ stateId: formState.stateId });
        } else {
          apiRequest({
            url: "/area/states",
            params: {
              countryId: param.countryId,
            },
            onSuccess: (data) => {
              if (data.data) {
                // 赋值操作
                database.stateData = data.data;
                // 初次默认选取第一个省
                formState.stateId = database.stateData[0].id;
                // 然后请求市的数据
                getCityList({ stateId: formState.stateId });
                // 解锁
                disabled.stateDisabled = false;
                // 数据存储
                cachedStateData.push({
                  savaId: formState.countryId,
                  data: data.data,
                });
              }
            },
          });
        }
      }
    }
    // 获取市列表
    function getCityList(param) {
      if (param) {
        const cachedItem = cachedCityData.find(
          (item) => item.savaId === param.stateId
        );
        if (cachedItem) {
          // 使用缓存数据
          database.cityData = cachedItem.data;
          // 默认选取
          formState.cityId = database.cityData[0].id;
          // 解锁
          disabled.cityDisabled = false;
        } else {
          apiRequest({
            url: "/area/citys",
            params: {
              stateId: param.stateId,
            },
            onSuccess: (data) => {
              if (data.data) {
                // 赋值操作
                database.cityData = data.data;
                // 初次默认选取第一个市
                formState.cityId = database.cityData[0].id;
                // 解锁
                disabled.cityDisabled = false;
                // 数据存储
                cachedCityData.push({
                  savaId: formState.stateId,
                  data: data.data,
                });
              }
            },
          });
        }
      }
    }
    // 发送单选部分组件所需数据
    const radioData = reactive({
      sendText: "持续时间",
      sendList: [
        {
          id: 0,
          value: 5,
          EN: "5 minute",
          ZH: "5分钟",
        },
        {
          id: 1,
          value: 10,
          EN: "10 minute",
          ZH: "10分钟",
        },
        {
          id: 2,
          value: 15,
          EN: "15 minute",
          ZH: "15分钟",
        },
        {
          id: 3,
          value: 30,
          EN: "30 minute",
          ZH: "30分钟",
        },
        {
          id: 4,
          value: 45,
          EN: "45 minute",
          ZH: "45分钟",
        },
        {
          id: 5,
          value: 60,
          EN: "60 minute",
          ZH: "60分钟",
        },
      ],
    });

    // 代码块部分的变量
    const proxyState = computed(() => ({
      isProxyDataActive: "proxy",
      cURLCode: `curl -x http://${formState.selectProxyServer} --proxy-user ${formState.account}:${formState.userPassword} https://www.instagram.com`,
      PythonCode: `import requests
    
      def fetch_url(url, proxy):
          try:
              response = requests.get(url, proxies=proxy)
              response.raise_for_status()
              return response.text
          except requests.exceptions.RequestException as e:
              return f"Error: {e}"
    
      proxy_config = {
          'http': 'http://${formState.account}:${formState.userPassword}@${formState.selectProxyServer}'
      }
    
      url = 'http://example.com'
      print(fetch_url(url, proxy_config))`,
      nodeJsCode: `import fetch from 'node-fetch';
      import createHttpsProxyAgent from 'https-proxy-agent'
    
      const username = '${formState.account}';
      const password = '${formState.userPassword}';
      const proxy = '${formState.selectProxyServer}';
    
      const agent = createHttpsProxyAgent(
          \`http://\${username}:\${password}@\${proxy}\`
      );
    
      const response = await fetch('https://ip.oxylabs.io/location', {
        method: 'get',
        agent: agent,
      });
    
      console.log(await response.text());`,
    }));

    return {
      formState,
      database,
      active,
      proxyState,
      radioData,
      disabled,
      onUserChooseState,
      onUserChooseCity,
      onProxyTabsChange,
      handleDataFetched,
      handleSelectAccount,
      handleSelectProxyServer,
      handleSelectNumber,
      handleGenerate,
      handleEligibleFetch,
      handleClickAccount,
      handleClickProxyServer,
    };
  },
};
