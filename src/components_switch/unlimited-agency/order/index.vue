<template>
  <div class="col-sm-12">
    <div class="card card-table">
      <div class="card-body">
        <div class="card-header">
          <h5 class="card-title">{{ $t("unlimited_order.title") }}</h5>
        </div>
        <div class="table-responsive mt-5">
          <a-table
            :columns="columns"
            :dataSource="unlimitedOrder"
            :pagination="false"
            class="payList"
          >
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderScript from "./index.js";

export default {
  components: {},
  ...orderScript,
};
</script>
