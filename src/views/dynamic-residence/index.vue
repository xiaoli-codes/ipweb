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
        <buyPlanComponents v-if="nowActivePanel === 'buyPlan'" />
        <generateProxiesComponents
          v-if="nowActivePanel === 'generateProxies'"
        />
        <trafficDetailsComponents v-if="nowActivePanel === 'trafficDetails'" />
        <historicalBillingComponents
          v-if="nowActivePanel === 'historicalBilling'"
        />
      </div>
    </div>
  </section>
</template>

<script>
import dynamicResidenceScript from "./index.js";
import navComponents from "layouts/nav/index.vue";
import asideComponents from "layouts/aside/index.vue";
import headerComponents from "layouts/header/index.vue";
import buyPlanComponents from "components_switch/dynamic-residence/buyPlan/index.vue";
import trafficDetailsComponents from "components_switch/dynamic-residence/trafficDetails/index.vue";
import generateProxiesComponents from "components_switch/dynamic-residence/generateProxies/index.vue";
import historicalBillingComponents from "components_switch/dynamic-residence/historicalBilling/index.vue";

export default {
  components: {
    navComponents,
    asideComponents,
    headerComponents,
    buyPlanComponents,
    trafficDetailsComponents,
    generateProxiesComponents,
    historicalBillingComponents,
  },
  ...dynamicResidenceScript,
};
</script>
