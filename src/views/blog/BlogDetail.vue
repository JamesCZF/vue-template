<template>
  <div class="content-wrap">
    <div class="title">{{detail.title}}</div>
    <div class="info-wrap">
      <div class="label">JavaScript/Vue</div>
      <div class="time">{{detail.createtime}}</div>
    </div>
    <div
      class="content"
      v-html="detail.content"
    ></div>
  </div>
</template>

<script>
import axios from "axios";
import { formatTime } from "@/utils";

export default {
  name: "blogdetail",
  components: {},
  data() {
    return {
      detail: {}
    };
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      this.getBlogDetail(id);
    }
  },
  methods: {
    getBlogDetail(id) {
      axios.get(`/api/blog/detail?id=${id}`).then(res => {
        const { data, errno } = res.data;
        if (errno === 0) {
          data.createtime = formatTime(data.createtime);
          this.detail = data;
        }
        console.log(res, "detail");
      });
    }
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
.content {
  margin-top: 30px;
}
</style>
