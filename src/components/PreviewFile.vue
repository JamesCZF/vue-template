<!--
  预览PDF文件
-->
<template>
  <div
    class="filePreview"
    v-if="visible"
  >
    <div class="filePreview_center">
      <div class="center_header">
        <div class="header_left">文件预览</div>
        <div
          class="header_right"
          @click="filePreviewClose"
        >关闭</div>
      </div>
      <div class="center_center">
        <iframe
          :src="src"
          frameborder="0"
          id="frame"
          style="width: 100%; height: 100%"
        ></iframe>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    src: {
      type: String,
      require: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    filePreviewCancel() {
      this.$emit("preview-close");
    }
  },
  watch: {
    // visible(val) {
    //   if (val) {
    //     this.$nextTick(() => {
    //       const frame = document.getElementById("frame");
    //       console.log(frame.contentWindow.document.title, "frame");
    //       frame.contentWindow.document.title = "";
    //     });
    //   }
    // }
  }
};
</script>
 
<style lang="less" scoped>
.filePreview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  // background: rgba(0, 0, 0, 0.4);
  min-height: 500px;
  overflow: auto;
  .filePreview_center {
    width: 50%;
    height: 100%;
    left: 25%;
    background: white;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    position: relative;
    transform: translateY(-50% -50%);
    padding: 16px;
    .center_header {
      padding-bottom: 10px;
      border-bottom: 1px solid #dee2ed;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 3px;
      .header_left {
        font-weight: bold;
      }
      .header_right {
        cursor: pointer;
        color: #99a1ad;
      }
    }
    .center_center {
      border-radius: 3px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
 