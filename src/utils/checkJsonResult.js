import {message} from "ant-design-vue";

// 检查json返回结果
function checkJsonResult(data) {
  if (data == null || data.code == null) {
    return false;
  }
  if (data.code == "0" || data.code.indexOf("0") == 0) {
    return true;
  }
  if (data.code == "20001" || data.code == "20002") {
    message.error("登录超时! 请重新登录。");
    // if (confirm("登录超时。重新登录?")) {
    // message.login();
    // }
    var url = this.location;
    var path = url.substr(0, url.indexOf("/", 10));
    window.top.location.href = path;
    return false;
  }
  if (data.code.indexOf("10") == 0) {
    message.error("参数错误！\r\n" + data.msg);
    return false;
  }
  if (data.code.indexOf("20") == 0) {
    message.error("无权访问! " + data.msg);
    return false;
  }
  if (data.code.indexOf("99") == 0) {
    message.error("程序出错！\r\n" + data.msg);
    return false;
  }
  if (data.msg != null && data.msg != "") {
    message.error(data.msg);
  }
  return false;
}

export default checkJsonResult;