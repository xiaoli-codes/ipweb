import axios from "axios";
import { message } from "ant-design-vue";
import router from "@/router/index.js";
import { Session, Cache } from "@/utils/common.js";
import { Env } from "@/utils/env.js";
import { store } from "@/store/index.js";

// 创建 Axios 实例
const axiosInstance = axios.create({ baseURL: Env.apiHost() });

function isSuccess(code) {
  return code != null && ("0" == code || code.startsWith("0"));
}

const errorMessages = {
  20001: "未登录！请完成登录。",
  20002: "登录过期! 请重新登录。",
};

function whenError(code, msg, checkFailCodeFunc) {
  if (checkFailCodeFunc) {
    if (checkFailCodeFunc(code, msg)) {
      return;
    }
  }
  if (errorMessages[code]) {
    message.error(errorMessages[code] || "登录过期! 请重新登录.");
    router.push("/login");
  } else if (code.startsWith("10")) {
    message.error(`参数错误！\r\n${msg}`);
  } else if (code.startsWith("20")) {
    message.error(`无权访问! ${msg}`);
  } else if (code.startsWith("99")) {
    message.error(`程序出错！\r\n${msg}`);
  } else {
    message.error(msg || "未知错误");
  }
}

function checkRespStatus(status, errMsg) {
  if (status == null || 200 == status) {
    return true;
  }
  if (respStatus == 404) {
    message.error("请求资源不存在！");
  } else if (respStatus == 403) {
    message.error("无权限! 请联系管理员.");
  } else if (respStatus == 401) {
    message.error("未授权，请先登录！");
    router.push("/login");
  } else if (respStatus == 500) {
    message.error("服务出错！稍后再试或联系管理员.");
  } else if (respStatus == 502) {
    message.error("服务正在维护，请稍后再试！");
  } else if (respStatus == 504) {
    message.error("请求超时，请稍后再试！");
  } else {
    let msg = errMsg || "请求出错";
    message.error(`${msg}(${respStatus})`);
  }
  return false;
}

axiosInstance.interceptors.response.use((response) => {
  // 在成功响应时刷新 Session
  Session.refresh();
  return response;
});

// 封装请求函数
const apiRequest = async ({
  url, // 请求地址
  method = "POST", // 请求方法，默认为 POST
  params = {}, // 请求参数
  headers = {}, //请求头
  useToken = true, // 是否使用 token
  isBody = false, // 是否为请求体方式
  showLoading = false, // 是否显示加载
  async = true, // 是否同步执行
  language = "zh_CN", // 国际化
  timeout = 10000, // 请求超时时间
  onSuccess, // 成功回调
  checkFailCode = false, //响应错误码自定义处理 function(code,msg){ return true; //false表示往下执行使用默认判断逻辑,true反之}
  onFail = function (respStatus, code, errMsg) {
    if (!checkRespStatus(respStatus, errMsg)) {
      return;
    }
    if (code != null) {
      whenError(code, errMsg, checkFailCode);
    } else {
      message.error(errMsg || "未知错误");
    }
  }, // 失败回调
}) => {
  if (showLoading) {
    store.dispatch("setLoading", true);
  }

  if (headers["Content-Type"] == null) {
    if (isBody) {
      headers["Content-Type"] = "application/json;charset=utf-8";
    } else if ("POST" == method) {
      headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=utf-8";
    }
  }

  if (useToken) {
    headers["token"] = Session.getToken();
  }

  if (language) {
    switch (language) {
      case "en_US":
        headers["Accept-Language"] = "en_US";
        break;
      default:
        headers["Accept-Language"] = "zh_CN";
    }
  }

  const config = {
    url,
    method,
    headers,
    timeout,
    data: isBody ? params : null,
    params: !isBody ? params : null,
  };

  try {
    const response = async
      ? await axiosInstance(config)
      : await axiosInstance(config).then((res) => res); // 同步执行时不等待，直接返回结果
    if (response.data == null) {
      if (onFail) {
        onFail(200, null, "不合法的数据格式");
      }
    } else if (isSuccess(response.data.code)) {
      // 如果返回成功，调用 onSuccess 回调
      if (onSuccess) onSuccess(response.data);
    } else if (onFail) {
      // 如果返回不成功，调用 onFail 回调
      onFail(200, response.data.code, response.data.msg || "未知错误");
    }
    return response;
  } catch (error) {
    // 解构状态码和报错信息
    const { status: statusCode } = error.response || {};
    const { code: errorCode, message: errorMessage = "未知错误" } =
      error.response?.data || {};
    if (onFail) {
      onFail(statusCode, null, errorMessage); // 处理失败状态
    }
  } finally {
    if (showLoading) {
      store.dispatch("setLoading", false);
    }
  }
};

export default apiRequest;
