/**
 * 环境
 */
var Env = {
  _env: null,
  _apiHost: "",
  _init: function () {
    if (Env._env != null) {
      return;
    }
    const domain = window.location.hostname.split(":")[0];
    let apiDomain;
    if ("user.ipweb.cc" == domain) {
      Env._env = "prod";
      apiDomain = "ipapi.ipweb.cc";
    } else if ("test.ipweb.cc" == domain) {
      Env._env = "test";
      apiDomain = "test-ipapi.ipweb.cc";
    } else {
      Env._env = "dev";
      apiDomain = "test-ipapi.ipweb.cc";
    }
    Env._apiHost = window.location.protocol + "//" + apiDomain + "/admin";
  },
  /**
     * API域名
     */
  apiHost: function () {
    Env._init();
    return Env._apiHost;
  },
  /**
     *
     * 是否为生产环境
     */
  isProd: function () {
    Env._init();
    return "prod" == Env._env;
  }
};

export {
  Env
};