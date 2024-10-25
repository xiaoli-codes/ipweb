<template>
  <a-col :span="24">
    <div class="card">
      <div class="card-body">
        <div class="card-header">
          <h5 class="card-title">{{ $t("static_IPdetail.title") }}</h5>
        </div>
        <div class="mt-5">
          <a-table :columns="columns" :dataSource="IPdetailData" class="payList"> </a-table>
        </div>
      </div>
    </div>
  </a-col>
</template>

<script>
import IPdetailScript from "./index.js";
export default {
  components: {},
  ...IPdetailScript,
};
</script>
