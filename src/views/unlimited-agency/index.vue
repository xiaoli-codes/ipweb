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
        <buyProxyComponents v-if="nowActivePanel === 'buyProxy'" />
        <orderComponents v-if="nowActivePanel === 'unlimited_order'" />
      </div>
    </div>
  </section>
</template>

<script>
import unlimitedAgencyScript from "./index.js";
import headerComponents from "layouts/header/index.vue";
import navComponents from "layouts/nav/index.vue";
import asideComponents from "layouts/aside/index.vue";
import buyProxyComponents from "components_switch/unlimited-agency/buyProxy/index.vue";
import orderComponents from "components_switch/unlimited-agency/order/index.vue";

export default {
  components: {
    headerComponents,
    navComponents,
    asideComponents,
    buyProxyComponents,
    orderComponents,
  },
  ...unlimitedAgencyScript,
};
</script>
