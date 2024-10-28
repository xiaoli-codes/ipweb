<template>
  <headerComponents></headerComponents>

  <asideComponents
    :nowActive="nowActive"
    :dynamic_billings="dynamic_billings"
  ></asideComponents>

  <a-layout class="content_container">
    <a-layout-content class="content">
      <h2>Welcome {{ useState.name }} !</h2>

      <article class="row">
        <div class="col-xl-3 col-sm-6 col-12">
          <section class="list padding_box">
            <div class="top_box inovices-widget-header">
              <img
                src="assets/icons/home.png"
                :alt="$t('main.dynamic')"
                :title="$t('main.dynamic')"
              />
              <h3>{{ $t("main.dynamic") }}</h3>
              <div class="datas">
                <p>
                  {{ $t("main.remainder") }}：<b>{{ dynamic_billings }}</b
                  ><span class="color_change"> GB</span>
                </p>
                <p class="have_icon">
                  总流量：<span>{{ dynamic_billings }}GB&emsp;</span
                  ><i class="eye"></i>
                </p>
              </div>
            </div>
            <a-progress
              :size="[50, 18]"
              :percent="dynamic_billings"
              type="line"
              status="active"
            ></a-progress>
          </section>
        </div>

        <div class="col-xl-3 col-sm-6 col-12">
          <section class="list padding_box">
            <div class="top_box inovices-widget-header">
              <img
                src="assets/icons/home.png"
                :alt="$t('main.dynamic')"
                :title="$t('main.dynamic')"
              />
              <h3>{{ $t("main.unlimited") }}</h3>
              <div class="datas">
                <p>
                  {{ $t("main.remainder") }}：<b>1024.00</b
                  ><span class="color_change"> GB</span>
                </p>
                <p class="have_icon">
                  {{ $t("main.total_flow") }}：<span>1024.00 GB&emsp;</span
                  ><i class="eye"></i>
                </p>
              </div>
            </div>
            <a-progress
              :size="[50, 18]"
              :percent="100"
              type="line"
              status="active"
            ></a-progress>
          </section>
        </div>

        <div class="col-xl-3 col-sm-6 col-12">
          <section class="list padding_box">
            <div class="top_box inovices-widget-header">
              <img
                src="assets/icons/home.png"
                :alt="$t('main.dynamic')"
                :title="$t('main.dynamic')"
              />
              <h3>{{ $t("main.static") }}</h3>
              <div class="datas">
                <p>
                  {{ $t("main.effective") }}：<b>0.00</b
                  ><span class="color_change"> IPs</span>
                </p>
                <p class="have_icon">
                  {{ $t("main.total") }}：<span>$50.00 &emsp;</span
                  ><i class="eye"></i>
                </p>
              </div>
            </div>
            <div class="div" style="height: 30px"></div>
          </section>
        </div>

        <div class="col-xl-3 col-sm-6 col-12">
          <section class="list user_card padding_box">
            <div class="left_content">
              <h4>Email</h4>
              <p>{{ useState.name }}</p>
              <h4>api_token</h4>
              <p>{{ useState.token }}</p>
            </div>
            <div class="user_icons">
              <img src="assets/icons/dash.svg" alt="icons" />
            </div>
          </section>
        </div>
      </article>

      <div class="row">
        <section class="col-xl-9">
          <div class="card card-body col-xl-12">
            <h2 class="page_title card-header">
              {{ $t("main.residual_flow") }}
            </h2>

            <a-tabs v-model:activeKey="activeKey" @change="handleChange">
              <a-tab-pane key="1" :tab="$t('main.dynamic')">
                <echartComponent></echartComponent>
              </a-tab-pane>
              <a-tab-pane key="2" :tab="$t('main.unlimited')">{{
                $t("main.noData")
              }}</a-tab-pane>
              <a-tab-pane key="3" :tab="$t('main.static')">
                <a-table :columns="columns" :data-source="data" class="payList">
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'IPQuality'">
                      <a-tag
                        :color="
                          record.IPQuality === 'good' ? 'green' : 'volcano'
                        "
                      >
                        {{ record.IPQuality }}
                      </a-tag>
                    </template>
                  </template>
                </a-table>
              </a-tab-pane>
            </a-tabs>
          </div>
        </section>
        <section class="col-xl-3">
          <latestTutorialComponents />
        </section>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import mainScript from "./index.js";
import asideComponents from "layouts/aside/index.vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import echartComponent from "components/mainEchart/index.vue";
import headerComponents from "layouts/header/index.vue";
import latestTutorialComponents from "components/latest_tutorial/index.vue";

export default {
  components: {
    asideComponents,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    echartComponent,
    headerComponents,
    latestTutorialComponents,
  },
  ...mainScript, // 使用展开语法合并逻辑
};
</script>
