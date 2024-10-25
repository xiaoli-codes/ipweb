import { reactive, ref, onMounted } from "vue";
import apiRequest from "@/services/api.js";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { Cache } from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    // 表单变量管理
    const formState = reactive({
      Email: "",
      emailCaptcha: "",
      password: "",
      checkPassword: "",
      inviteCode: "",
      verifyCode: "",
      verifyKey: "",
    });

    // 公共变量管理
    const commonState = reactive({
      errorMessage: "",
      isDisabled: false,
      openModal: false,
    });

    // 操作元素变量
    const imageBox = ref("");

    // 使用 vue-i18n
    const { t, locale } = useI18n();

    // 声明路由
    const router = useRouter();

    // 验证码框验证规则
    const imageRules = {
      changeImageCode: [
        {
          required: true,
          message: "请输入验证码！",
          trigger: "blur",
        },
        {
          type: "string",
          max: 20,
          message: "请检查验证码书写是否正确！",
        },
      ],
    };

    // 密码一致性验证
    const validatorPassword = (rule, value) => {
      if (value !== formState.password) {
        // 更新错误信息
        commonState.errorMessage = "两次密码输入不一致，请重新输入！";
        return Promise.reject(new Error(commonState.errorMessage));
      } else {
        // 清空存储提示信息
        commonState.errorMessage = "";
      }
      return Promise.resolve();
    };

    // 用户点击发送验证码
    const onSeedCaptcha = () => {
      if (
        new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/).test(
          formState.Email
        )
      ) {
        // 验证通过，唤出图形验证框。
        commonState.openModal = true;
        // 先加载一次图片验证码。
        changeImage();
      } else {
        message.error("请检查邮箱格式是否正确！");
      }
    };

    // 验证成功回调函数
    const onFinish = () => {
      const params = {
        email: formState.Email,
        password: formState.password,
        verifyCode: formState.emailCaptcha,
        inviteCode: formState.inviteCode || "",
      };
      apiRequest({
        url: "/main/register",
        params: params,
        isBody: true,
        onSuccess: (data) => {
          console.log(data);
          if (data.code === "0") {
            router.push("/login");
          }
        },
      });
    };

    // 验证失败回调函数
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    // 验证码框验证图片点击事件
    const changeImage = () => {
      // 清空验证码的输入内容
      formState.verifyCode = "";
      apiRequest({
        url: "/main/captcha-image",
        onSuccess: (data) => {
          // 刷新验证码
          imageBox.value.src = data.image;
          // 存储验证码key
          formState.verifyKey = data.key;
        },
      });
    };

    // 验证码框提交事件
    const sendImageCaptcha = () => {
      if (formState.verifyCode !== "") {
        const params = {
          email: formState.Email,
          verifyCode: formState.verifyCode,
          verifyKey: formState.verifyKey,
        };
        apiRequest({
          url: "/main/send-email-code",
          params: params,
          useToken: false,
          isBody: true,
          onSuccess: (data) => {
            if (data) {
              message.success("已发送验证码至您的邮箱！");
              // 关闭验证码框
              commonState.openModal = false;
              // 存储验证码key
              formState.emailCaptcha = data;
            }
          },
        });
      } else {
        message.error("验证码为空，请重新输入！");
        changeImage();
      }
    };

    onMounted(() => {
      // 获取全局语言
      const globalLang = Cache.get("GlobalLanguage");
      if (globalLang) {
        locale.value = globalLang; // 缓存设置语言
      }
    });

    // 表单验证规则
    const rules = {
      Email: [
        {
          required: true,
          message: "邮箱不能为空！",
          trigger: "change",
        },
        {
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: "请输入正确的邮箱地址！",
          trigger: "change",
        },
        {
          type: "string",
          max: 50,
          message: "邮箱长度不能超过50个字符",
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
          pattern: /^[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~\-]{6,20}$/,
          message: "请设置6-20位的密码！",
          trigger: "change",
        },
        {
          type: "string",
          max: 20,
          message: "密码长度不能超过20个字符",
          trigger: "change",
        },
      ],
      checkPassword: [
        {
          required: true,
          message: "确认密码不能为空！",
          trigger: "change",
        },
        {
          validator: validatorPassword,
          trigger: "change",
        },
        {
          type: "string",
          max: 20,
          message: "密码长度不能超过20个字符",
          trigger: "change",
        },
      ],
      emailCaptcha: [
        {
          required: true,
          message: "邮箱验证码不能为空！",
          trigger: "blur",
        },
        {
          type: "string",
          max: 6,
          message: "验证码最长为6位，请核对验证码！",
        },
      ],
      inviteCode: [
        {
          type: "string",
          max: 20,
          message: "请检查邀请码是否正确！",
          trigger: "blur",
        },
      ],
    };
    return {
      formState,
      commonState,
      rules,
      imageRules,
      imageBox,
      onFinish,
      onFinishFailed,
      onSeedCaptcha,
      changeImage,
      sendImageCaptcha,
    };
  },
};
