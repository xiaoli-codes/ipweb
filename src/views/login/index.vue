<template>
  <div class="main-wrapper login-body">
    <div class="login-wrapper">
      <div class="container">
        <div class="loginbox">
          <div class="login-left">
            <div class="left_form">
              <img src="assets/img/logo.png" alt="LOGO" />
              <h2>{{ $t("login.h2") }}</h2>
              <p>
                {{ $t("login.p") }}
              </p>
            </div>
          </div>
          <div class="login-right">
            <div class="container">
              <h2>{{ $t("login.login") }}</h2>
              <a-form
                :model="formState"
                :rules="rules"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <a-form-item class="form-group" name="account">
                  <label
                    >{{ $t("login.username") }}
                    <span class="login-danger">*</span></label
                  >
                  <a-input
                    v-model:value="formState.account"
                    :placeholder="$t('login.input_username')"
                    size="large"
                  ></a-input>
                </a-form-item>
                <a-form-item class="form-group" name="password">
                  <label
                    >{{ $t("login.password") }}
                    <span class="login-danger">*</span></label
                  >
                  <a-input-password
                    v-model:value="formState.password"
                    :placeholder="$t('login.input_password')"
                    size="large"
                  ></a-input-password>
                </a-form-item>
                <a-form-item class="captcha_box" name="verifyCode">
                  <div class="input-group form-group">
                    <img
                      id="captchaImage"
                      ref="captcha_img"
                      @click="changeCaptchImg"
                      src=""
                      :alt="$t('login.captcha')"
                      :title="$t('login.switch_captcha')"
                    />
                    <a-input
                      v-model:value="formState.verifyCode"
                      class="form-control"
                      :placeholder="$t('login.input_captcha')"
                    ></a-input>
                  </div>
                </a-form-item>
                <div class="forgotpass">
                  <div class="remember-me">
                    <a-form-item name="remember" no-style>
                      <a-checkbox v-model:checked="formState.remember">{{
                        $t("login.remember")
                      }}</a-checkbox>
                    </a-form-item>
                  </div>
                </div>
                <a-form-item class="btn_box">
                  <a-button
                    type="primary"
                    html-type="submit"
                    block
                    size="large"
                    class="login-form-button"
                    >{{ $t("login.login") }}</a-button
                  >
                </a-form-item>
              </a-form>
              <div class="login-or">
                <div class="dont-have">
                  {{ $t("login.no_account") }}
                  <router-link to="/register">{{
                    $t("login.register")
                  }}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import loginFormValidation from "./index.js";

import loadingComponent from "components/loading/index.vue";

export default {
  components: { loadingComponent },
  ...loginFormValidation, // 使用展开语法合并逻辑
};
</script>
