<template class="row">
  <div class="col-lg-7">
    <div class="card">
      <div class="card-body">
        <div class="card-header">
          <h5 class="card-title">{{ $t("dynamice_generateProxies.title") }}</h5>
        </div>
        <div class="card-body">
          <a-form>
            <a-form-item>
              <chooseRegionComponents @dataFetched="handleDataFetched" />
            </a-form-item>

            <div class="d-flex">
              <a-form-item class="col-md-5">
                <label>{{ $t("dynamice_generateProxies.state") }}</label>
                <div class="col-lg-9 mt-2">
                  <a-select
                    @change="onUserChooseState"
                    v-model:value="formState.stateId"
                    size="large"
                    :disabled="disabled.stateDisabled"
                  >
                    <a-select-option
                      v-for="item in database.stateData"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.name }}</a-select-option
                    >
                  </a-select>
                </div>
              </a-form-item>
              <a-form-item class="col-md-5">
                <label>{{ $t("dynamice_generateProxies.city") }}</label>
                <div class="col-lg-9 mt-2">
                  <a-select
                    @change="onUserChooseCity"
                    v-model:value="formState.cityId"
                    size="large"
                    :disabled="disabled.cityDisabled"
                  >
                    <a-select-option
                      v-for="item in database.cityData"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.name }}</a-select-option
                    >
                  </a-select>
                </div>
              </a-form-item>
            </div>

            <a-form-item>
              <radioButtonComponents
                :radioData="radioData.sendList"
                :radioText="radioData.sendText"
                @eligibleItem="handleEligibleFetch"
              />
            </a-form-item>

            <div class="row mt-5">
              <a-form-item class="col-md-5 form-group">
                <label>{{ $t("dynamice_generateProxies.user") }}</label>
                <a-select
                  size="large"
                  :disabled="disabled.userDisabled"
                  @change="handleSelectAccount"
                  @click="handleClickAccount"
                >
                  <a-select-option
                    v-for="item in database.userAccountData"
                    :value="item.id"
                    :key="item.userId"
                    >{{ item.name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
              <a-form-item class="col-md-6 form-group">
                <label>{{ $t("dynamice_generateProxies.password") }}</label>
                <a-input-password
                  size="large"
                  :value="formState.userPassword"
                ></a-input-password>
              </a-form-item>
            </div>

            <a-form-item>
              <div class="text-end">
                <a-button
                  type="primary"
                  size="large"
                  @click="handleGenerate"
                  :disabled="disabled.genarateDisabled"
                  >{{ $t("dynamice_generateProxies.generate") }}</a-button
                >
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-5">
    <div class="card bg-white">
      <div class="card-header">
        <h5 class="card-title">
          {{ $t("dynamice_generateProxies.request_method") }}
        </h5>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card-body">
            <div class="form-group">
              <label>{{ $t("dynamice_generateProxies.number") }}</label>
              <a-select
                class="col-lg-12"
                size="large"
                @change="handleSelectNumber"
              >
                <a-select-option value="10">10</a-select-option>
                <a-select-option value="50">50</a-select-option>
                <a-select-option value="100">100</a-select-option>
              </a-select>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <div class="form-group">
              <label>{{ $t("dynamice_generateProxies.proxyServer") }}</label>
              <a-select
                class="col-lg-12"
                size="large"
                @change="handleSelectProxyServer"
                @click="handleClickProxyServer"
              >
                <a-select-option
                  v-for="item in database.proxyServerData"
                  :value="item.host"
                  >{{ item.host + " | " + item.area }}</a-select-option
                >
              </a-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card bg-white">
      <textarea
        row="5"
        cols="5"
        class="form-control"
        placeholder="Enter text here"
        style="height: 17px"
      >
            account-US_texas-30:123456789:gate1.ipweb.cc:12233
            account-US_texas-30:123456789:gate1.ipweb.cc:12233
            account-US_texas-30:123456789:gate1.ipweb.cc:12233
            account-US_texas-30:123456789:gate1.ipweb.cc:12233
            account-US_texas-30:123456789:gate1.ipweb.cc:12233
            account-US_texas-30:123456789:gate1.ipweb.cc:12233
            account-US_texas-30:123456789:gate1.ipweb.cc:12233
        </textarea
      >
    </div>
    <div class="card-body card-height-500">
      <a-tabs
        v-model:activeKey="active.isProxyDataActive"
        class="proxyDataClass"
        @change="onProxyTabsChange"
      >
        <a-tab-pane key="proxy" :tab="$t('dynamice_generateProxies.account')">
          <div class="span-alignment">
            <p class="mt-4">
              {{ $t("dynamice_generateProxies.proxy_address") }}：
              <span class="badge bg-light text-dark">gate2.ipweb.cc</span>
            </p>
            <p class="mt-4">
              {{ $t("dynamice_generateProxies.port") }}:
              <span class="badge bg-light text-dark">9500</span>
            </p>
            <p class="mt-4">
              {{ $t("dynamice_generateProxies.account") }}:
              <span class="badge bg-light text-dark">account-US_texas-30</span>
            </p>
            <p class="mt-4">
              {{ $t("dynamice_generateProxies.password") }}:
              <span class="badge bg-light text-dark">123456789</span>
            </p>
          </div>
        </a-tab-pane>
        <a-tab-pane key="cURL" tab="cURL">
          <pre
            class="numbers"
          ><code class="language-bash">{{ proxyState.cURLCode }}</code></pre>
        </a-tab-pane>
        <a-tab-pane key="Python" tab="Python">
          <pre
            class="numbers"
          ><code class="language-python">{{ proxyState.PythonCode }}</code></pre>
        </a-tab-pane>
        <a-tab-pane key="NodeJs" tab="Node.js">
          <pre
            class="numbers"
          ><code class="language-javascript">{{ proxyState.nodeJsCode }}</code></pre>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import generateProxiesScript from "./index.js";
import chooseRegionComponents from "components/chooseRegion/index.vue";
import radioButtonComponents from "components/radioButton/index.vue";

export default {
  components: { chooseRegionComponents, radioButtonComponents },
  ...generateProxiesScript,
};
</script>
