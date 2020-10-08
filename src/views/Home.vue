<template>
  <div class="home-wrap">
    <div class="content">
      <div class="img-wrap">
        <img
          src="~@/assets/images/me.jpeg"
          class="avatar"
        />
      </div>
      <div class="desc">所有的开始都拥有神奇的力量，护卫和帮助我们的生活。</div>
      <a-button
        ghost
        @click="toBlogPage"
      >
        我的博客
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    toBlogPage() {
      this.$router.push("/blog");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variables.less";

.home-wrap {
  height: 100vh;
  width: 100vw;
  background: url("~@/assets/images/home_bg.jpg");
  background-size: cover;
  .content {
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-wrap {
      width: 128px;
      height: 128px;
      margin-bottom: 50px;
      .avatar {
        width: 100%;
        height: 100%;
        border: 4px solid #fff;
        border-radius: 50%;
      }
    }
    .desc {
      margin-bottom: 20px;
      font-weight: 400;
      font-size: 30px;
      line-height: 65px;
      color: #fff;
      font-family: "Nunito", sans-serif;
    }
  }
}
</style>
