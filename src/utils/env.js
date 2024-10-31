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
    if ("user.ipweb.cc" == domain) {
      Env._env = "prod";
    } else if ("test.ipweb.cc" == domain) {
      Env._env = "test";
    } else {
      Env._env = "dev";
    }
    Env._apiHost = window.location.protocol + "//" + domain + "/api/admin";
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