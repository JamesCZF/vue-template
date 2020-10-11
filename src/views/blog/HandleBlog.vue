<template>
  <div class="content-wrap">
    <a-input
      placeholder="请输入标题"
      class="title"
      v-model:value="title"
    />
    <a-textarea
      placeholder="请输入描述"
      :rows="4"
      class="desc"
      v-model:value="description"
    />
    <quill-editor ref="quill"></quill-editor>
    <a-button
      type="primary"
      class="save-btn"
      @click="onSaveClick"
    >
      保存
    </a-button>
  </div>
</template>

<script>
import axios from "axios";
import QuillEditor from "@/components/QuillEditor";

export default {
  name: "handleblog",
  components: {
    QuillEditor
  },
  data() {
    return {
      description: "",
      title: "",
      content: ""
    };
  },
  mounted() {},
  methods: {
    onSaveClick() {
      const content = this.$refs.quill.getContent();
      const postData = {
        title: this.title,
        description: this.description,
        content
      };
      console.log(postData, "postData");
      axios.post("/api/blog/new", postData).then(res => {
        console.log(res, "add res");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.title,
.desc {
  display: block;
  width: 400px;
  margin-bottom: 20px;
}
.save-btn {
  display: block;
  margin: 30px auto;
}
</style>
