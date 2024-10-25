// common 类
var Common = {
  isEmpty: function (value) {
    if (value === null)
      return true; // 检查 null 和 undefined
    if (typeof value === "string" || Array.isArray(value)) {
      return value.length === 0; //检查字符串和数组
    }
    if (typeof value === "object") {
      return Object.keys(value).length === 0; // 检查对象
    }
    return false; // 其他值不为空
  },
};

// session 操作类
var Session = {
  _user: null,
  setUser: function (user) {
    Session._user = user;
    localStorage.setItem("_user", JSON.stringify(user));
    Session.refresh();
  },
  getUser: function () {
    if (Session._user == null) {
      let s = localStorage.getItem("_user");
      if (s != null) {
        Session._user = JSON.parse(s);
      }
    }
    return Session._user;
  },
  getToken: function () {
    var user = Session.getUser();
    if (user == null) {
      return null;
    }
    return Session.isExpired()
      ? null
      : user.token;
  },
  hasRole: function (roles) {
    var user = Session.getUser();
    if (user == null) {
      return false;
    }
    if (Array.isArray(roles)) {
      for (var i in roles) {
        if (user.roles.indexOf(roles[i]) != -1) {
          return true;
        }
      }
      return false;
    } else {
      return user.roles.indexOf(roles) != -1;
    }
  },
  refresh: function () {
    if (Session.getUser() == null) {
      return;
    }
    localStorage.setItem("_time", new Date().getTime());
  },
  isExpired: function () {
    let time = localStorage.getItem("_time");
    if (time == null || time < new Date().getTime() - 1800000) {
      return true;
    }
    return false;
  },
  clear: function () {
    Session._user = null;
    localStorage.clear();
  }
};

// 全局数据数据缓存
var Cache = {
  _timeoutKey: function (name) { return name + "_timeout"; },
  set: function (name, data, timeout) {
    localStorage.setItem(name, data);
    if (timeout != null && timeout > 0) {
      localStorage.setItem(Cache._timeoutKey(name), new Date().getTime() + timeout);
    }
  },
  get: function (name, checkTimeout) {
    if (checkTimeout) {
      let t = localStorage.getItem(Cache._timeoutKey(name));
      if (t != null && new Date().getTime() > t) {
        Cache.remove(name);
        return null;
      }
    }
    return localStorage.getItem(name);
  },
  remove: function (name) {
    localStorage.removeItem(name);
    localStorage.removeItem(Cache._timeoutKey(name));
  },
  setObj: function (name, data, timeout) {
    if (data != null) {
      Cache.set(name, JSON.stringify(data), timeout);
    } else {
      Cache.remove(name);
    }
  },
  getObj: function (name, checkTimeout) {
    let v = Cache.get(name, checkTimeout);
    return v == null || v.length == 0 ? null : JSON.parse(v);
  }
};

export {
  Session,
  Cache,
  Common
};
