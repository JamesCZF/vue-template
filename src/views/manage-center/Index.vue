<template>
  <div class="content-wrap">
    <div class="siders">
      <div
        class="menu"
        :class="{active: activeRoute === '/profile'}"
        @click="toPage('/profile')"
      >个人信息</div>
      <div
        class="menu"
        :class="{active: activeRoute === '/blog-manage'}"
        @click="toPage('/blog-manage')"
      >博客管理</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from "@/components/Header";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "index",
  components: {
    MyHeader
  },
  setup() {
    const activeRoute = ref("");
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {
      activeRoute.value = route.path;
    });
    function toPage(path) {
      activeRoute.value = path;
      router.push(path);
    }
    return {
      activeRoute,
      toPage
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variables.less";

.content-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .siders {
    width: 160px;
    min-height: 400px;
    padding: 16px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    .menu {
      font-size: 14px;
      color: #555666;
      display: block;
      height: 35px;
      line-height: 35px;
      width: 128px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      margin: 0 auto;
      border-radius: 4px;
      cursor: pointer;
    }
    .active {
      background: @primary-color;
      color: #fff;
    }
  }
}
</style>
