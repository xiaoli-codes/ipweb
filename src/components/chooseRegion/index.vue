<template>
  <div class="dropdown-container drop-container">
    <label>{{ $t("chooseRegion.region") }}</label>
    <div class="dropdown-button" @click.prevent="toggleRegion">
      {{ active.showText ? active.showText : $t("chooseRegion.placeholder") }}
    </div>
    <div class="region_content_box" v-if="active.isShowRegion">
      <!-- <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
                <a-tab-pane v-for="item in commonState.continentsData" :key="item.id" :tab="item.name">
                    <a-list :grid="{ column: 5, gutter: 0, xxxl: 6, xxl: 5, xl: 4 }"
                        :data-source="commonState.countryData">
                        <template #renderItem="{ item }">
                            <a-list-item @click="onChooseCountry(item.id)" class="countryList">
                                <div class="countryIconsBox">
                                    <img :src="getImageSrc(item.code)" :alt="item.description"
                                        :title="item.description" />
                                    {{ item.name }}
                                    <a-tag color="#ebebff">250 IPs</a-tag>
                                </div>
                            </a-list-item>
                        </template>
</a-list>
</a-tab-pane>
</a-tabs> -->

      <div class="tab-content">
        <a-spin :spinning="loading.tabTopSpinning">
          <div class="tab-links">
            <div
              class="tab-link"
              :class="active.continentId === item.id ? 'active' : ''"
              v-for="item in database.continentsData"
              :key="item.id"
              @click.prevent="onTabChange(item.id)"
            >
              {{ item.name }}
            </div>
          </div>
        </a-spin>
        <a-spin :spinning="loading.tabContentSpinning">
          <div class="dropdown-list">
            <ul class="tab-links-ul">
              <li
                @click="onChooseCountry(item)"
                v-for="item in database.countryData"
                :key="item.id"
              >
                <img
                  :src="getImageSrc(item.code)"
                  :alt="item.description"
                  :title="item.description"
                />
                {{ item.name }}
                <a-tag color="#ebebff">250 IPs</a-tag>
              </li>
            </ul>
          </div>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
import chooseRegionScript from "./index.js";

export default {
  components: {},
  ...chooseRegionScript,
};
</script>
