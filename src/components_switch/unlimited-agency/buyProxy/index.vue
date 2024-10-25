<template>
  <div class="row">
    <div class="col-md-7">
      <div class="card">
        <div class="card-body">
          <a-form
            :model="formState"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item>
              <chooseRegionComponents />
            </a-form-item>
            <a-form-item>
              <radioButtonComponents
                :radioData="radioData.sendCityData"
                :radioText="radioData.sendCityText"
              />
            </a-form-item>
            <a-form-item>
              <radioButtonComponents
                :radioData="radioData.sendTimeData"
                :radioText="radioData.sendTimeText"
              />
            </a-form-item>
            <a-form-item>
              <radioButtonComponents
                :radioData="radioData.sendTypeData"
                :radioText="radioData.sendTypeText"
              />
            </a-form-item>
            <a-form-item>
              <radioButtonComponents
                :radioData="radioData.sendIpData"
                :radioText="radioData.sendIpText"
              />
            </a-form-item>
            <a-form-item>
              <radioButtonComponents
                :radioData="radioData.sendUDPData"
                :radioText="radioData.sendUDPText"
                :radioActive="radioData.sendUDPActive"
              />
            </a-form-item>
            <a-form-item>
              <radioButtonComponents
                :radioData="radioData.sendProtocolData"
                :radioText="radioData.sendProtocolText"
              />
            </a-form-item>
            <a-form-item>
              <div class="dropdown-container drop-container">
                <label>{{ $t("unlimited_buyProxy.number") }}</label>
                <a-input size="large" v-model:value="formState.num"></a-input>
              </div>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                class="unlimited_submit_button"
                size="large"
                >{{ $t("unlimited_buyProxy.add") }}</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
    <div class="col-md-5">
      <div class="invoice-total-card card">
        <div class="card-body">
          <div class="card-header">
            <h4 class="card-title">{{ $t("unlimited_buyProxy.order") }}</h4>
          </div>
          <div class="invoice-total-box">
            <a-table
              :columns="columns"
              :dataSource="unlimitedPayOrder"
              :pagination="false"
              class="payList"
            >
              <template #footer>
                <div class="invoice-total-footer">
                  <h4>
                    {{ $t("unlimited_buyProxy.total_price") }}<span>$0.00</span>
                  </h4>
                </div>
              </template>
            </a-table>
          </div>
          <div class="text-end mt-4">
            <a-button size="large" @click="onClearOrders" class="clear_btn">{{
              $t("unlimited_buyProxy.clear")
            }}</a-button>
            <a-button size="large" type="primary" @click="onPayModal">{{
              $t("unlimited_buyProxy.pay")
            }}</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buyProxyScript from "./index.js";
import chooseRegionComponents from "components/chooseRegion/index.vue";
import radioButtonComponents from "components/radioButton/index.vue";

export default {
  components: { chooseRegionComponents, radioButtonComponents },
  ...buyProxyScript,
};
</script>
