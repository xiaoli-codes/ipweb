<script setup>
import { RouterView } from "vue-router";
import loadingComponents from "components/loading/index.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const Global_loading = computed(() => store.getters.Global_loading);
</script>

<template>
  <section class="wrapper">
    <RouterView />
    <loadingComponents :loading="Global_loading" />
  </section>
</template>