<template>
  <div class="content">
    <div class="header-wrap">
      <div
        class="name"
        @click="toHandleBlog"
      >程振福</div>
      <div class="profession">前端工程师</div>
      <div class="social">
        <div class="item">
          <i class="iconfont icon">&#xe671;</i>
          <div>13028902971</div>
        </div>
        <div class="item">
          <i class="iconfont icon">&#xe668;</i>
          <div>568345219@qq.com</div>
        </div>
        <div class="item">
          <i class="iconfont icon">&#xe620;</i>
          <div>深圳</div>
        </div>
      </div>
    </div>
    <div class="desc">
      <div>
        是一个毅力很强，能坚持学习的人。在web前端岗位工作了两年多，主要vue技术栈，开发过web网站、h5、小程序、管理后台等各类型项目。
      </div>
    </div>
  </div>
</template>

<script>
// import PreviewFile from "@/components/PreviewFile.vue";

export default {
  name: "about",
  components: {
    // PreviewFile
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onPreviewClose() {
      this.visible = false;
    },
    onMoreClick() {
      this.visible = true;
    },
    toHandleBlog() {
      this.$router.push("/handleblog");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variables.less";

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  .header-wrap {
    text-align: center;
    padding-bottom: 20px;

    border-bottom: 1px solid #d3d3d3;
    .name {
      margin-bottom: 10px;
      font-size: 35px;
      font-weight: 300;
      color: #333;
    }
    .profession {
      margin-bottom: 10px;
      font-size: 14px;
      color: #bebdbd;
      font-weight: 700;
    }
    .social {
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        margin-right: 30px;
        .icon {
          margin-right: 10px;
        }
      }
      .item:last-child {
        margin-right: 0;
      }
    }
  }
  .desc {
    margin-top: 30px;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.2;
  }
}
</style>
