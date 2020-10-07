<template>
  <div class="header">
    <div
      class="logo"
      @click="toPage('/')"
    >福不服</div>
    <div class="menu-list">
      <div
        class="menu"
        @click="toPage('/')"
      >首页</div>
      <div
        class="menu"
        @click="toPage('/blog')"
      >博客</div>
      <div
        class="menu"
        @click="toPage('/about')"
      >个人简介</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "eader",
  components: {},
  methods: {
    toPage(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variables.less";

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 200px;
  background: rgba(0, 0, 0, 0.2);
  .logo {
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    font-size: 36px;
    padding: 0;
    font-family: "Nunito", sans-serif;
  }
  .menu-list {
    display: flex;
    .menu {
      margin-right: 40px;
      color: #fff;
      cursor: pointer;
    }
    .menu:hover {
      color: @primary-color;
    }
  }
}
</style>
