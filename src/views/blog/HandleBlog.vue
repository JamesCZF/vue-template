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
    <quill-editor
      ref="quill"
      :value="content"
    ></quill-editor>
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
import QuillEditor from "@/components/QuillEditor";
import { addBlog, updateBlog, getBlogDetail } from "@/api/blog";

export default {
  name: "handleblog",
  components: {
    QuillEditor
  },
  data() {
    return {
      description: "",
      title: "",
      content: "",
      type: "add",
      id: ""
    };
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      this.type = "edit";
      this.id = id;
      this.getBlogDetail(id);
    }
  },
  methods: {
    async onSaveClick() {
      const content = this.$refs.quill.getContent();
      const postData = {
        title: this.title,
        description: this.description,
        content
      };
      let res;
      if (this.type === "add") {
        res = await addBlog(postData);
      } else {
        res = await updateBlog(this.id, postData);
      }
      if (res && res.data.errno === 0) {
        this.$router.push({
          path: "/blog/detail",
          query: {
            id: res.data.data.id
          }
        });
      }
    },
    async getBlogDetail(id) {
      const {
        data: { data, errno }
      } = await getBlogDetail(id);
      if (errno === 0) {
        this.description = data.description;
        this.title = data.title;
        this.content = data.content;
      }
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
