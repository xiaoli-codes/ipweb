<template>
  <div class="col-sm-12">
    <div class="card card-table">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">
              <span class="ipweb_dynamicTotal">1024.00</span>
              GB / {{ $t("dynamic_traffic.total_flow") }}
              <span class="ipweb_dynamicResidual">1024.00</span>
              GB
            </h3>
          </div>
          <div class="col-auto text-end float-end ms-auto download-grp">
            <a-button type="primary" size="large">{{
              $t("dynamic_traffic.upgrade_plan")
            }}</a-button>
          </div>
          <a-progress
            class="mt-4"
            :size="[300, 20]"
            status="active"
            :percent="100"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="card-body">
    <mainEchart />
  </div>
</template>

<script>
import trafficDetailsScripts from "./index.js";
import mainEchart from "components/mainEchart/index.vue";

export default {
  components: { mainEchart },
  ...trafficDetailsScripts,
};
</script>
