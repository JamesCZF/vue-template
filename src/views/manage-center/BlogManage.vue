<template>
  <div class="content">
    <div class="header-wrap">
      <a-input-search
        placeholder="搜索文章"
        enter-button
        :allowClear="true"
        class="search-box"
        @search="onSearch"
      />
      <a-button
        type="primary"
        class="add-btn"
        @click="onAddClick"
      >新增</a-button>
    </div>
    <div class="blog-list">
      <div
        class="blog"
        v-for="item of blogList"
        :key="item.id"
      >
        <div
          class="up"
          @click="toDetail(item)"
        >
          <div class="label">JavaScript/Vue</div>
          <div class="title">{{item.title}}</div>
        </div>
        <div class="desc">
          {{item.description}}
        </div>
        <div class="footer">
          <div class="time">{{item.createtime}}</div>
          <div class="right-wrap">
            <span
              class="item"
              @click="onEditClick(item.id)"
            >编辑</span>
            <a-popconfirm
              title="你想删除这篇博客吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirmDelete(item.id)"
            >
              <span class="item delete">删除</span>
            </a-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuillEditor from "@/components/QuillEditor";
import { deleteBlog } from "@/api/blog";
import { getBlogListLogic } from "@/common/blog";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  name: "Home",
  components: {
    QuillEditor
  },
  setup() {
    const keyword = ref("");
    const router = useRouter();
    const { blogList, getBlog } = getBlogListLogic();

    function onSearch(key) {
      keyword.value = key;
      getBlog(keyword);
    }
    function toDetail(blog) {
      router.push({
        path: "/blog/detail",
        query: {
          id: blog.id
        }
      });
    }
    function onEditClick(id) {
      router.push({
        path: "/handle-blog",
        query: {
          id
        }
      });
    }
    async function confirmDelete(id) {
      const {
        data: { errno }
      } = await deleteBlog(id);
      if (errno === 0) {
        getBlog();
      }
    }
    function onAddClick() {
      router.push("/handle-blog");
    }
    onMounted(() => {
      getBlog();
    });

    return {
      blogList,
      onSearch,
      onEditClick,
      onAddClick,
      confirmDelete,
      toDetail
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variables.less";

.content {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 80%;
  .header-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .search-box {
      width: 300px;
    }
  }
  .blog-list {
    // background: #fff;
    .blog {
      padding: 16px 24px 12px 24px;
      border-bottom: 1px solid #d3d3d3;
      .up {
        display: flex;
        cursor: pointer;
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
        .title {
          word-break: break-all;
          color: #222226;
          font-size: 18px;
          line-height: 20px;
          font-weight: 500;
        }
      }
      .desc {
        margin: 6px 0;
        font-size: 14px;
        line-height: 22px;
        white-space: normal;
        color: #909090;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        .right-wrap {
          .item {
            margin-right: 20px;
            cursor: pointer;
          }
          .delete {
            color: @danger-color;
          }
        }
      }
      .time {
        color: #5f6471;
        line-height: 24px;
      }
    }
  }
}
</style>
