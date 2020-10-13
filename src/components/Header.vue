<template>
  <div
    class="header"
    :class="{'home-header': isHomeHeader}"
  >
    <div class="menu-wrap">
      <div
        class="logo"
        @click="toPage('/')"
      >福不服</div>
      <div class="menu-list">
        <div
          class="menu"
          :class="{active: activeRoute === '/home'}"
          @click="toPage('/')"
        >首页</div>
        <div
          class="menu"
          :class="{active: activeRoute === '/blog' || activeRoute === '/blog/detail'}"
          @click="toPage('/blog')"
        >博客</div>
        <div
          class="menu"
          :class="{active: centerRoutes.includes(activeRoute)}"
          @click="toPage('/profile')"
        >个人中心</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-header",
  components: {},
  data() {
    return {
      isHomeHeader: true,
      activeRoute: "/home",
      centerRoutes: ["/profile", "/blog-manage", "/handle-blog"]
    };
  },
  methods: {
    toPage(path) {
      this.$router.push(path);
    }
  },
  watch: {
    $route(to) {
      console.log(to.path, "path");
      this.activeRoute = to.path;
      this.isHomeHeader = to.path === "/home" ? true : false;
    }
  },
  mounted() {
    this.activeRoute = this.$route.path;
    this.isHomeHeader = this.$route.path === "/home" ? true : false;
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
  padding: 15px 0;
  height: 66px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(26, 66, 70, 0.1);
  z-index: 1;
  .menu-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 1140px;
    .logo {
      cursor: pointer;
      // color: #fff;
      font-weight: bold;
      font-size: 36px;
      padding: 0;
      font-family: "Nunito", sans-serif;
    }
    .menu-list {
      display: flex;
      position: relative;
      top: 5px;
      .menu {
        padding: 0 20px 10px;
        // color: #fff;
        cursor: pointer;
      }
      .menu:hover {
        color: @primary-color;
      }
      .active {
        border-bottom: 1px solid @primary-color;
      }
    }
  }
}
.home-header {
  background: rgba(0, 0, 0, 0.15);
  .logo,
  .menu {
    color: #fff;
  }
}
</style>
