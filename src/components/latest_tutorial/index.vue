<template>
  <div class="card">
    <h2 class="page_title card-header">{{ $t("latest_tutorial.title") }}</h2>
    <div class="tutorial">
      <a-list item-layout="horizontal" :data-source="tutarial_data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a href="">{{ item.title }}</a>
              </template>
              <template #avatar>
                <a-avatar src="" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script>
import latest_tutorial from "./index.js";
export default {
  components: {},
  ...latest_tutorial,
};
</script>
