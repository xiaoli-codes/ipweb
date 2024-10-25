<template>
  <headerComponents />
  <asideComponents :nowActive="nowActive"></asideComponents>
  <section class="content_container">
    <div class="content content-fluid">
      <div class="card">
        <div class="card-body">
          <navComponents @updateActivePanel="handleMessage" />
        </div>
      </div>
      <div class="row">
        <staticBuyProxyComponents v-if="nowActivePanel === 'static_buyProxy'" />
        <IPdetailComponents v-if="nowActivePanel === 'IPdetail'" />
        <staticOrderComponents v-if="nowActivePanel === 'static_order'" />
      </div>
    </div>
  </section>
</template>

<script>
import staticResidenceScript from "./index.js";
import headerComponents from "layouts/header/index.vue";
import asideComponents from "layouts/aside/index.vue";
import navComponents from "layouts/nav/index.vue";
import staticBuyProxyComponents from "components_switch/static-residence/buyProxy/index.vue";
import IPdetailComponents from "components_switch/static-residence/IPdetail/index.vue";
import staticOrderComponents from "components_switch/static-residence/order/index.vue";

export default {
  components: {
    headerComponents,
    asideComponents,
    navComponents,
    staticBuyProxyComponents,
    IPdetailComponents,
    staticOrderComponents,
  },
  ...staticResidenceScript,
};
</script> 
