<template>
  <div class="header-title mb-4 d-flex icons_title">
    <component :is="renderIcon(navIcon)" />
    <h4>{{ navText }}</h4>
  </div>
  <a-menu v-model:selectedKeys="current" mode="horizontal" class="useNavTag">
    <a-menu-item v-for="item in navData" :key="item.activeName" @click="updateActivePanel(item.activeName)">
      <component :is="renderIcon(item.iconCls)" />
      {{ item.text }}
    </a-menu-item>
  </a-menu>
</template>

<script>
import navScript from "./index.js";
export default {
  components: {},
  ...navScript,
};
</script>
