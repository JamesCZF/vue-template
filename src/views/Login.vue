<template>
  <div class="login-wrap">
    <div class="item">
      <div class="label">账号：</div>
      <a-input
        placeholder="请输入账号"
        v-model:value="account"
        class="input"
      >
        <template v-slot:prefix>
          <user-outlined type="user" /></template>
      </a-input>
    </div>
    <div class="item">
      <div class="label">密码：</div>
      <a-input-password
        placeholder="请输入密码"
        v-model:value="password"
        class="input"
      >
        <template v-slot:prefix>
          <LockOutlined />
        </template>
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
import axios from "axios";

export default {
  name: "login",
  components: {},
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    onLoginClick() {
      const postData = {
        username: this.account,
        password: this.password
      };
      axios.post("/api/user/login", postData).then(res => {
        const { message, errno } = res.data;
        if (errno === 0) {
          //返回上一页
        } else {
          //登录失败
          this.$message.error(message);
        }
        console.log(res, "login res");
      });
    }
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
