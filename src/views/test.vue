<template>
  <div>
    <qrcode-vue :value="value" :size="size" level="H" />
  </div>
</template>
<script setup>
import apiRequest from "@/services/api";
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";

const value = "https://www.runoob.com";
const size = 300;

apiRequest({
  url: "/order/paged-order",
  isBody: true,
  onSuccess: (data) => {
    console.log(data);
  },
  onFail: (code, status, msg) => {
    console.log(msg);
  },
});
</script>
