<template>
  <aside class="aside_nav">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :inline-collapsed="isCollapsed"
      mode="inline"
    >
      <a-menu-item
        v-for="menu in menuState.asideDatas"
        :key="menu.id"
        @click="handleMenuClick(menu)"
      >
        <component :is="renderIcon(menu.iconCls)" />
        {{ menu.text }}
      </a-menu-item>
    </a-menu>

    <div class="student-personals-grp mt-5" v-if="!isCollapsed">
      <div class="card mb0">
        <div class="card-body">
          <div class="heading-detail">
            <h4>{{ $t("aside.title") }}</h4>
          </div>
          <router-link to="" class="skills-head">
            <h5>{{ $t("aside.product_one") }}</h5>
            <p>
              {{ $t("aside.remainder") }}
              <span class="ipweb_dynamicResidual">1024.00</span>
              G
            </p>
            <p><i class="eye"></i></p>
          </router-link>
          <p class="residential_progress">
            <a-progress
              :percent="progressState.init_precent"
              status="active"
            ></a-progress>
          </p>
          <router-link to="" class="skills-head">
            <h5>{{ $t("aside.product_two") }}</h5>
            <p>
              {{ $t("aside.remainder") }}
              <span class="ipweb_dynamicResidual">0</span>
              {{ $t("aside.day") }}
            </p>
            <p><i class="eye"></i></p>
          </router-link>
          <p class="residential_progress">
            <a-progress
              :percent="progressState.init_precent"
              status="active"
            ></a-progress>
          </p>
          <router-link to="" class="skills-head">
            <h5>{{ $t("aside.product_three") }}</h5>
            <p>
              <span class="ipweb_dynamicResidual">0</span>
              {{ $t("aside.valid_orders") }}
            </p>
            <p><i class="eye"></i></p>
          </router-link>
          <p class="residential_progress">
            <a-progress
              :percent="progressState.init_precent"
              status="active"
            ></a-progress>
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import asideScript from "./index.js";

export default {
  components: {},
  ...asideScript, // 使用展开语法合并逻辑
};
</script>
