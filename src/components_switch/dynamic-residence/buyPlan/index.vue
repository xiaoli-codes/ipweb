<template>
  <a-col :span="24">
    <div class="card">
      <div class="card-body">
        <div class="card-header card-plan plan_box_edit">
          <h5 class="card-title">{{ $t("dynamic_buyPlan.title") }}</h5>
          <div class="switch_plan">
            <a-button
              size="large"
              :type="isActive === 'personal' ? 'primary' : 'default'"
              @click="onPersonPlan"
              >{{ $t("dynamic_buyPlan.personal_btn") }}</a-button
            >
            <a-button
              size="large"
              :type="isActive === 'enterprise' ? 'primary' : 'default'"
              @click="onEnterprisePlan"
              >{{ $t("dynamic_buyPlan.enterprise_btn") }}</a-button
            >
          </div>
        </div>
        <div class="card-plan-div pt-3 pb-3 table-plans">
          <div class="container mt-2">
            <div class="gridbox">
              <div v-for="item in database.dynamicIPData" :key="item.id">
                <div class="card product-card">
                  <div class="date">
                    <b>{{ item.name }}</b>
                    <p class="mt-1">
                      {{ $t("dynamic_buyPlan.detail_one") }}
                    </p>
                    <ul class="teacher-date-list vertical-list mt-1">
                      <li>
                        <CheckOutlined class="checkIcon" />
                        {{ $t("dynamic_buyPlan.detail_two") }}
                      </li>
                      <li><CheckOutlined class="checkIcon" />HTTP(S)/SOCKS5</li>
                      <li>
                        <CheckOutlined class="checkIcon" />
                        {{ $t("dynamic_buyPlan.detail_three") }}
                      </li>
                      <li>
                        <CheckOutlined class="checkIcon" />
                        {{ $t("dynamic_buyPlan.detail_four") }}
                      </li>
                    </ul>
                  </div>
                  <div class="lesson-confirm">
                    <span class="lesson-span">$ {{ item.amount }}</span>
                    <a-button
                      type="primary"
                      size="large"
                      class="buyPlanButton"
                      @click="onBuyButton(item)"
                    >
                      <ShoppingCartOutlined />
                      {{ $t("dynamic_buyPlan.buy_plan") }}
                    </a-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-modal
      v-model:open="active.open"
      :title="modal.payTitle"
      :footer="null"
      :zIndex="101"
      :maskClosable="false"
    >
      <div class="pay_box" v-if="modal.payModal">
        <a-row class="buyPlan_modal">
          <a-col :span="12">
            <div class="price">
              单价：${{ database.planItem ? database.planItem.price : "" }}
            </div>
            <div class="billing">
              流量：{{ database.planItem ? database.planItem.name : "" }}
            </div>
          </a-col>
          <a-col :span="12">
            <a-radio-group
              v-model:value="active.payType"
              class="radio_group"
              @change="changePayType"
            >
              <a-radio
                v-for="item in database.payListData"
                :key="item.id"
                :value="item.id"
                :class="active.payType === item.id ? 'active' : ''"
              >
                {{ item.name }}
              </a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="amount"
            >金额：<b>{{ active.currencySymbol + active.amount }}</b></a-col
          >
          <a-col :span="12" class="pay_btn">
            <a-button
              size="large"
              type="primary"
              @click="payIt"
              :disabled="modal.disabled"
            >
              <img src="assets/icons/magnifier.png" class="magnifier" />
              支付
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div class="usdt_box" v-if="modal.payUSDT">
        <QrcodeVue
          :value="qrcode.qrcodeValue"
          :size="qrcode.qrcodeSize"
          level="H"
        />
        <div class="qrcode_text">
          <AppstoreOutlined />
          <span>收款地址二维码</span>
        </div>
        <div class="usdt_price">
          <p>
            金额：<span>{{ active.currencySymbol + modal.amount }}</span>
          </p>
        </div>
        <div class="usdt_reciving">
          <span>收款地址：{{ active.receving }}</span>
          <a-button type="primary" @click="usdtCopy">复制</a-button>
        </div>
        <p class="usdt_tips">
          注意事项：请在20分钟内完成支付,支付网络请选择TRC20，并严格按照上述支付金额支付，如有疑问，请联系客服处理
        </p>
        <a-button
          size="large"
          type="primary"
          class="ustd_already_pay"
          @click="usdtAlreadyPay"
        >
          <img src="assets/icons/magnifier.png" class="magnifier" />
          已支付
        </a-button>
      </div>
    </a-modal>
  </a-col>
</template>

<script>
import buyPlanScript from "./index.js";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons-vue";

export default {
  components: { ShoppingCartOutlined, CheckOutlined },
  ...buyPlanScript,
};
</script>
