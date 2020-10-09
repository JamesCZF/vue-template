<template>
  <div class="container">
    <div class="title">前端实现预览word、excel、pdf、ppt文件</div>
    <div class="info-wrap">
      <div class="label">JavaScript/Vue</div>
      <div class="time">2020-06-19 21:12:15</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "blogdetail",
  components: {
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 28px;
  word-wrap: break-word;
  color: #222226;
  font-weight: 600;
  margin: 0;
  word-break: break-all;
}
.info-wrap {
  display: flex;
  margin-top: 20px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #d3d3d3;
  .label {
    height: 20px;
    padding: 0 5px;
    margin-right: 10px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    border-radius: 2px;
    color: #e33e33;
    background-color: rgba(227, 62, 51, 0.1);
  }
  .time {
    color: #5f6471;
    line-height: 24px;
  }
}
</style>
