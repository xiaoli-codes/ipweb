import { reactive, ref, onMounted } from "vue";
import apiRequest from "@/services/api.js";
import { useRouter } from "vue-router";
import { Session, Cache } from "@/utils/common.js";
import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const formState = reactive({
      account: "",
      password: "",
      verifyCode: "",
      verifyKey: "",
      remember: false,
    });

    // 声明router
    const router = useRouter();

    const captcha_img = ref(null);
    // 使用 vue-i18n
    const { t, locale } = useI18n();

    // 页面渲染完成后，执行一次切换图片。
    onMounted(() => {
      changeCaptchImg();
    });

    // 验证成功的回调函数
    const onFinish = (value) => {
      onLogin();
    };

    // 验证失败的回调函数
    const onFinishFailed = (errorInfo) => {
      console.log("验证失败", errorInfo);
      onLoading();
    };

    // 登录完成并跳转首页
    const onLogin = () => {
      apiRequest({
        url: "/main/login",
        params: {
          username: formState.account,
          password: formState.password,
          verifyCode: formState.verifyCode,
          verifyKey: formState.verifyKey,
        },
        isBody: true,
        useToken: false,
        onSuccess: (data) => {
          // 更新用户data
          Session.setUser(data);
          // 验证完成，跳转到首页
          router.push("/");
        },
        checkFailCode: (code, msg) => {
          if (code === "10001") {
            message.error(msg);
            changeCaptchImg();
            return true;
          }
          return false;
        },
      });
    };

    // 切换图片
    const changeCaptchImg = () => {
      // 清空验证码输入框
      formState.verifyCode = "";
      apiRequest({
        url: "/main/captcha-image",
        onSuccess: (data) => {
          // 更新页面上的图片路径
          captcha_img.value.src = data.image;
          // 更新formState的key值
          formState.verifyKey = data.key;
        },
      });
    };

    const rules = {
      account: [
        {
          required: true,
          message: "账号不能为空！",
          trigger: "change",
        },
        {
          type: "string",
          max: 200,
          message: "账号长度不能超过200个字符",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "密码不能为空！",
          trigger: "change",
        },
        {
          type: "string",
          max: 100,
          message: "密码长度不能超过100个字符",
          trigger: "change",
        },
      ],
      // 此处不能定义成captcha 会验证不通过
      verifyCode: [
        {
          required: true,
          message: "验证码不能为空！",
          trigger: "change",
        },
      ],
    };

    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });

    return {
      formState,
      rules,
      captcha_img,
      changeCaptchImg,
      onFinish,
      onFinishFailed,
    };
  },
};
