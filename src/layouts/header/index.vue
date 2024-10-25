<template>
  <header class="header">
    <div class="header-left">
      <a href="" class="logo">
        <img src="assets/img/logo-block.png" alt="Logo" />
      </a>
      <a href="" class="logo logo-small">
        <img
          src="assets/img/logo-small.png"
          alt="Logo"
          width="30"
          height="30"
        />
      </a>
    </div>
    <a-dropdown class="nav user-menu">
      <div class="nav-item dropdown has-arrow new-user-menus">
        <a class="dropdown-toggle nav-link" @click.prevent>
          <div class="user-img">
            <img
              class="rounded-circle"
              src="assets/default_head/avatar-01.jpg"
              width="31"
              alt="用户头像"
            />
            <div class="user-text">
              <h6>
                <span class="ipweb_username">{{ useState.name }}</span>
              </h6>
              <p class="text-muted mb-0">{{ useState.nickname }}</p>
            </div>
          </div>
        </a>
      </div>
      <template #overlay overlayClassName="dropdown-menu">
        <a-menu @click="menuClick">
          <a-menu-item>
            <div class="user-img">
              <img
                class="rounded-circle"
                src="assets/default_head/avatar-01.jpg"
                width="31"
                alt="用户头像"
              />
              <div class="user-text">
                <h6>
                  <span class="ipweb_username">{{ useState.name }}</span>
                </h6>
                <p class="text-muted mb-0">{{ useState.nickname }}</p>
              </div>
            </div>
          </a-menu-item>
          <a-menu-item key="editor">
            <a href="javascript:;">{{ $t("header.edit") }}</a>
          </a-menu-item>
          <a-menu-item key="personal">
            <a href="javascript:;">{{ $t("header.personal") }}</a>
          </a-menu-item>
          <a-menu-item key="logout">
            <a href="javascript:;">{{ $t("header.logout") }}</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <div class="language_box">
      <label>{{ $t("header.languageText") }}</label>
      <a-select
        @change="onChangeLanguage"
        class="language_select"
        :value="nowLanguage"
      >
        <a-select-option
          v-for="item in languageData"
          :key="item.id"
          :value="item.code"
          >{{ item.name }}</a-select-option
        >
      </a-select>
    </div>
    <a-modal
      v-model:open="open"
      centered
      title="提示"
      okText="确定"
      okType="danger"
      cancelText="取消"
      :zIndex="101"
      @ok="handleOk"
    >
      <p>{{ $t("header.modalText") }}</p>
    </a-modal>
  </header>
</template>

<script>
import headerScripts from "./index.js";
export default {
  components: {},
  ...headerScripts,
};
</script>
