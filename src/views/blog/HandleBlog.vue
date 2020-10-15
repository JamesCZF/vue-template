<template>
  <div class="content-wrap">
    <a-input
      placeholder="请输入标题"
      class="title"
      v-model:value="postData.title"
    />
    <a-textarea
      placeholder="请输入描述"
      :rows="4"
      class="desc"
      v-model:value="postData.description"
    />
    <quill-editor
      :ref="q => quill = q"
      :value="postData.content"
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
import { onMounted, ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";

export default {
  name: "handleblog",
  components: {
    QuillEditor
  },
  setup() {
    let type = "add";
    const id = ref("");
    const quill = ref(null);
    const router = useRouter();
    const postData = reactive({
      description: "",
      title: "",
      content: ""
    });
    const route = useRoute();

    async function _getBlogDetail() {
      const {
        data: { data, errno }
      } = await getBlogDetail(id.value);
      if (errno === 0) {
        postData.description = data.description;
        postData.title = data.title;
        postData.content = data.content;
      }
    }
    async function onSaveClick() {
      postData.content = quill.value.getContent();
      let res;
      if (type === "add") {
        res = await addBlog(postData);
      } else {
        res = await updateBlog(id.value, postData);
      }
      if (res && res.data.errno === 0) {
        router.push({
          path: "/blog/detail",
          query: {
            id: res.data.data.id
          }
        });
      } else {
        message.error(res.data.message);
      }
    }

    onMounted(() => {
      if (route.query.id) {
        id.value = route.query.id;
        type = "edit";
        _getBlogDetail();
      }
    });
    return {
      postData,
      onSaveClick,
      quill
    };
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
