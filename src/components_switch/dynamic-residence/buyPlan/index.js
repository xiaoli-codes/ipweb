import { ref, onMounted, reactive } from "vue";
import apiRequest from "@/services/api";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";
import QrcodeVue from "qrcode.vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

export default {
  // 作用于 antd的modal内的组件 需要在js内注册 不然无效 具体原因不明
  components: { QrcodeVue, AppstoreOutlined },
  setup() {
    const isActive = ref("personal");
    // 使用 vue-i18n
    const { t, locale } = useI18n();
    // 声明展示类数据
    const database = reactive({
      dynamicIPData: null,
      payListData: null,
      planItem: null,
    });
    // 二维码生成用数据
    const qrcode = {
      qrcodeValue: null,
      qrcodeSize: null,
    };
    // 声明展示类变量
    const active = reactive({
      open: false,
      payType: null,
      amountHK: null,
      amount: null,
      amountUSD: null,
      currency: null,
      currencySymbol: null,
      productId: null, // 产品ID 用户创建接口
      receving: null,
    });
    // modal用变量
    const modal = reactive({
      payModal: true,
      payUSDT: false,
      payTitle: null,
      orderId: null,
      amount: null,
      disabled: false,
    });

    const onPersonPlan = () => {};

    const onEnterprisePlan = () => {};
    // 购买计划被点击
    const onBuyButton = (item) => {
      // 存储产品ID
      active.productId = item.id;
      // 存储产品的原价 => 美元
      active.amountUSD = item.amount;
      // 更新显示的价格
      active.amount = active.amountUSD;
      // 支付界面title
      modal.payTitle = "订单描述";
      // 关闭usdt界面
      modal.payUSDT = false;
      // 开启支付界面
      modal.payModal = true;
      // 获取支付列表数据
      apiRequest({
        url: "/order/list-pay",
        isBody: true,
        onSuccess: (data) => {
          if (data.data) {
            database.payListData = data.data;
            // 查找当前选中的支付方式货币
            database.payListData.forEach((ele) => {
              if (ele.code === "usdt") {
                // 更新当前的货币
                active.currency = ele.currency;
                // 更新当前的货币符号
                active.currencySymbol = ele.currencySymbol;
                // 更新当前的支付方式
                active.payType = ele.id;
              }
            });
            // 动态计算当前产品的金额
            apiRequest({
              url: "/dynamicip/calc-amount",
              isBody: true,
              params: {
                amount: active.amountUSD,
                payType: data.data[0].id,
              },
              onSuccess: (data) => {
                if (data.data) {
                  // 存储金额
                  active.amountHK = data.data.amount;
                  active.amountUSD = data.data.amountUsd;
                }
              },
            });
          }
        },
      });

      // 开启弹窗
      active.open = true;
      // 存储当前产品的信息
      database.planItem = item;
    };

    // 切换支付方式
    const changePayType = (event) => {
      // 声明当前选中的支付方式code
      var code = event.target.value;
      // 更新对应支付方式的货币形式
      database.payListData.forEach((item) => {
        if (item.id === code) {
          // 更新货币
          active.currency = item.currency;
          // 更新货币符号
          active.currencySymbol = item.currencySymbol;
          // 更新支付方式
          active.payType = item.id;
          if (item.code === "usdt") {
            active.amount = active.amountUSD;
          } else {
            active.amount = active.amountHK;
          }
        }
      });
    };

    // 用户点击支付
    const payIt = () => {
      // 防抖
      modal.disabled = true;
      apiRequest({
        url: "/dynamicip/create-order",
        isBody: true,
        showLoading: true,
        params: {
          productId: active.productId,
          payType: active.payType,
        },
        onSuccess: (data) => {
          if (data.data) {
            // 存储modal用amount
            modal.amount = data.data.amount;
            // 判断是否为usdt
            if (data.data.payLink.includes("https://")) {
              // 开启支付界面
              modal.payModal = true;
              // 关闭USDT界面（防BUG）
              modal.payUSDT = false;
              // 以完成支付请求提交 跳转至支付页面
              window.open(data.data.payLink, "_blank");
            } else {
              // 存储订单号
              modal.orderId = data.data.orderNo;
              // 存储收款地址
              active.receving = data.data.payLink;
              // 设置二维码内容
              qrcode.qrcodeValue = active.receving;
              // 设置二维码尺寸
              qrcode.qrcodeSize = 132;
              // USDT界面独享title
              modal.payTitle = "订单号" + "：" + modal.orderId;
              // 关闭支付界面
              modal.payModal = false;
              // 开启USDT独享界面
              modal.payUSDT = true;
            }
            // 防抖
            modal.disabled = false;
          }
        },
      });
    };

    // usdt 复制功能
    const usdtCopy = () => {
      // 复制
      navigator.clipboard.writeText(active.receving);
      // 提示
      message.success("已复制到剪切板");
    };

    // usdt 已支付按钮点击事件
    const usdtAlreadyPay = () => {
      // 支付界面title
      modal.payTitle = "订单描述";
      // 开启支付界面
      modal.payModal = true;
      // 关闭USDT界面（防BUG）
      modal.payUSDT = false;
      // 关闭弹窗
      active.open = false;
    };

    // 页面挂载完成回调函数
    onMounted(() => {
      // 请求动态IP产品列表
      apiRequest({
        url: "/dynamicip/products",
        method: "POST",
        isBody: true,
        onSuccess: (data) => {
          if (data.data) {
            // 赋值
            database.dynamicIPData = data.data;
          }
        },
      });
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });

    return {
      isActive,
      database,
      active,
      qrcode,
      modal,
      onPersonPlan,
      onEnterprisePlan,
      onBuyButton,
      changePayType,
      payIt,
      usdtCopy,
      usdtAlreadyPay,
    };
  },
};
