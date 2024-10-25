<template>
  <div class="form-group mt-3">
    <label>{{ radioText }}</label>
    <div class="form-time-group form-group">
      <div class="col-lg-9">
        <a-list :data-source="radioData" class="ipTimeList">
          <template #renderItem="{ item }">
            <a-list-item class="ipTimeItem">
              <a-button
                class="ipTimeButton"
                @click="onChangeButton(item)"
                :class="active === item.id ? 'ipTimeActive' : ''"
                type="primary"
                size="large"
                ghost
                >{{ item.ZH }}</a-button
              >
              <a-tag v-if="item.discount" color="#e84646" class="discount">{{
                item.discount ? item.discountText : ""
              }}</a-tag>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script>
import radioButtonScript from "./index.js";

export default {
  components: {},
  ...radioButtonScript,
};
</script>
