<template>
  <div class="login-wrap">
    <div class="item">
      <div class="label">账号：</div>
      <a-input
        placeholder="请输入账号"
        v-model:value="account"
        class="input"
      >
      </a-input>
    </div>
    <div class="item">
      <div class="label">密码：</div>
      <a-input-password
        placeholder="请输入密码"
        v-model:value="password"
        class="input"
      >
      </a-input-password>
    </div>
    <a-button
      type="primary"
      class="login-btn"
      @click="onLoginClick"
    >
      登录
    </a-button>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

export default {
  name: "login",
  setup() {
    const account = ref("");
    const password = ref("");
    const router = useRouter();
    async function onLoginClick() {
      const postData = {
        account: account.value,
        password: password.value
      };
      const res = await login(postData);
      if (res.data.errno === 0) {
        //返回上一页
        router.go(-1);
      } else {
        //登录失败
        message.error(res.data.message);
      }
    }
    return {
      account,
      password,
      onLoginClick
    };
  }
};
</script>

<style lang="less" scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 400px;
  height: 400px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  z-index: 2;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .label {
      margin-right: 10px;
    }
    .input {
      width: 240px;
    }
  }
  .login-btn {
    margin-top: 50px;
  }
}
</style>
