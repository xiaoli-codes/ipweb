<template>
  <a-col :span="24">
    <div class="card">
      <div class="card-body">
        <div class="card-header">
          <h5 class="card-title">{{ $t("static_order.title") }}</h5>
        </div>
        <div class="mt-5">
          <a-table
            :columns="columns"
            :dataSource="staticOrderData"
            class="payList"
          >
          </a-table>
        </div>
      </div>
    </div>
  </a-col>
</template>

<script>
import staticOrderScript from "./index.js";

export default {
  components: {},
  ...staticOrderScript,
};
</script>
