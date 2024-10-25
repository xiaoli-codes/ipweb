<template>
  <div class="main-wrapper login-body">
    <div class="login-wrapper">
      <div class="container">
        <div class="loginbox">
          <div class="login-left">
            <div class="left_form">
              <img src="assets/img/logo.png" alt="LOGO" />
              <h2>{{ $t("register.h2") }}</h2>
              <p>
                {{ $t("register.p") }}
              </p>
            </div>
          </div>
          <div class="login-right">
            <div class="container">
              <h1>{{ $t("register.register") }}</h1>
              <p class="account-subtitle">{{ $t("register.tips") }}</p>

              <a-form
                :model="formState"
                :rules="rules"
                name="normal_register"
                class="register-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <a-form-item class="form-group" name="Email">
                  <label
                    >{{ $t("register.tips") }}
                    <span class="login-danger">*</span></label
                  >
                  <a-input
                    v-model:value="formState.Email"
                    :placeholder="$t('register.input_email')"
                    size="large"
                  ></a-input>
                </a-form-item>

                <a-form-item class="form-group" name="emailCaptcha">
                  <div class="align-items">
                    <a-input
                      v-model:value="formState.emailCaptcha"
                      :placeholder="$t('register.input_captcha')"
                      :disabled="commonState.isDisabled"
                      size="large"
                    ></a-input>
                    <a-button
                      type="primary"
                      @click="onSeedCaptcha"
                      size="large"
                      >{{ $t("register.get_captcha") }}</a-button
                    >
                  </div>
                </a-form-item>

                <a-form-item class="form-group" name="password">
                  <label
                    >{{ $t("register.password") }}
                    <span class="login-danger">*</span></label
                  >
                  <a-input-password
                    v-model:value="formState.password"
                    size="large"
                    :placeholder="$t('register.input_password')"
                  ></a-input-password>
                </a-form-item>

                <a-form-item class="form-group" name="checkPassword">
                  <label
                    >{{ $t("register.check_password") }}
                    <span class="login-danger">*</span></label
                  >
                  <a-input-password
                    v-model:value="formState.checkPassword"
                    :placeholder="$t('register.input_check_password')"
                    size="large"
                  ></a-input-password>
                </a-form-item>

                <a-form-item class="form-group" name="inviteCode">
                  <label>{{ $t("register.invite") }}</label>
                  <a-input
                    v-model:value="formState.inviteCode"
                    size="large"
                    :placeholder="$t('register.input_invite')"
                  ></a-input>
                </a-form-item>

                <a-form-item class="btn_box">
                  <a-button
                    type="primary"
                    html-type="submit"
                    block
                    size="large"
                    >{{ $t("register.register") }}</a-button
                  >
                </a-form-item>
              </a-form>
              <div class="login-or">
                <div class="dont-have">
                  {{ $t("register.onReady_register") }}
                  <router-link to="/login">{{
                    $t("register.login")
                  }}</router-link>
                </div>
              </div>
            </div>
            <a-modal
              v-model:open="commonState.openModal"
              :title="$t('register.modal_title')"
              :okText="$t('register.ok')"
              :cancelText="$t('register.cancel')"
              :maskClosable="false"
              @ok="sendImageCaptcha"
            >
              <div class="h30"></div>
              <a-form>
                <a-form-item name="changeImageCode" :rules="imageRules">
                  <div class="input-group form-group image_box">
                    <img
                      src=""
                      id="captchaImage"
                      :alt="$t('register.image_captcha')"
                      :title="$t('register.switch_captch')"
                      ref="imageBox"
                      @click="changeImage"
                    />
                    <a-input
                      v-model:value="formState.verifyCode"
                      size="large"
                      class="form-control"
                      :placeholder="$t('register.success')"
                    ></a-input>
                  </div>
                </a-form-item>
              </a-form>
            </a-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import registerFormValidation from "./index.js";

export default {
  components: {},
  ...registerFormValidation, // 使用展开语法合并逻辑
};
</script>
