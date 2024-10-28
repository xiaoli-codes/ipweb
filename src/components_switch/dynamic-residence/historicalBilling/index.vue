<template>
  <div class="col-sm-12">
    <div class="card card-table">
      <div class="card-body">
        <div class="card-header">
          <h5 class="card-title">{{ $t("dynamic_historical.title") }}</h5>
        </div>
        <div class="table-responsive mt-5">
          <a-table
            :columns="columns"
            :dataSource="getUserOrderData"
            @change="handleTableChange"
            class="payList"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'content'">
                {{ record.content }}GB
              </template>
              <template v-if="column.key === 'status'">
                <a-tag :color="record.status === 20 ? 'green' : 'red'">{{
                  record.status === 20 ? "已完成" :  (record.status === 0 ? "已取消" :  (record.status === 1 ?  "待支付" : record.status))
                }}</a-tag>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import historicalBillingScript from "./index.js";

export default {
  components: {},
  ...historicalBillingScript,
};
</script>
