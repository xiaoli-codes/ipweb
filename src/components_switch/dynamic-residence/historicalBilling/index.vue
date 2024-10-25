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
              <template v-if="column.key === 'payType'">
                <a-tag color="green">{{ record.payType }}</a-tag>
              </template>
              <template v-if="column.key === 'orderState'">
                <a-tag
                  :color="record.orderState === '正常' ? 'green' : 'red'"
                  >{{ record.orderState }}</a-tag
                >
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
