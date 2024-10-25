import { onMounted, ref } from "vue";
import { Cache } from "@/utils/common.js";

export default {
  // 定义父组件传递的数据
  props: {
    radioData: {
      type: Array,
      required: true,
    },
    radioText: {
      type: String,
      required: true,
    },
    radioActive: {
      type: Number,
      required: false,
    },
  },
  emits: ["eligibleItem"],
  setup(props, { emit }) {
    // 声明接收父组件传递的datas
    const radioData = props.radioData;
    // 声明接收文本
    const radioText = props.radioText;
    // 声明active部分
    const active = ref(props.radioActive || props.radioData[0].id);
    // 发送默认数值给父组件
    emit("eligibleItem", props.radioData[0]);
    // 声明全局语言容器
    const language = ref(null);
    // 单选回调事件
    const onChangeButton = (item) => {
      // 更新单选的active
      active.value = item.id;
      // 发送关键数值给父组件
      emit("eligibleItem", item);
    };

    onMounted(() => {
      // 获取全局语言
      if (Cache.get("GlobalLanguage")) {
        const lang = Cache.get("GlobalLanguage");
        if (lang === "ZH") {
          language.value = false;
        } else if (lang === "EN") {
          language.value = true;
        }
      } else {
        language.value = false;
      }
    });
    return { radioData, radioText, active, language, onChangeButton };
  },
};
