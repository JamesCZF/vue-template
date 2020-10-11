<template>
  <div class="content-wrap">
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
        <div class="time">{{item.createtime}}</div>
      </div>
    </div>
    <div class="right">
      <a-input-search
        placeholder="搜索文章"
        enter-button
        :allowClear="true"
        @search="onSearch"
      />
      <div class="category-wrap">
        <div class="category-title">分类</div>
        <ul class="category">
          <li>JavaScript（20）</li>
          <li>Vue（66）</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QuillEditor from "@/components/QuillEditor";
import { formatTime } from "@/utils";
export default {
  name: "Home",
  components: {
    QuillEditor
  },
  data() {
    return {
      blogList: [],
      keyword: ""
    };
  },
  mounted() {
    this.getBlogList();
  },
  methods: {
    onSearch(keyword) {
      this.keyword = keyword;
      this.getBlogList();
    },
    toDetail(blog) {
      this.$router.push({
        path: "/blog/detail",
        query: {
          id: blog.id
        }
      });
    },
    getBlogList() {
      axios.get(`/api/blog/list?keyword=${this.keyword}`).then(res => {
        const { data, errno } = res.data;
        if (errno === 0) {
          data.forEach(item => {
            item.createtime = formatTime(item.createtime);
          });
          this.blogList = data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content-wrap {
  display: flex;
  justify-content: space-between;
}
.blog-list {
  width: 60%;
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
    .time {
      color: #5f6471;
      line-height: 24px;
    }
  }
}
.right {
  width: 30%;
}
.category-wrap {
  margin-top: 20px;
  padding: 20px;
  min-height: 400px;
  border-radius: 20px;
  border: 1px solid #d3d3d3;
  .category-title {
    font-size: 18px;
    padding: 0 0 5px 0;
    color: #000;
    font-weight: 500;
    border-bottom: 1px solid #d3d3d3;
  }
  .category {
    cursor: pointer;
    font-size: 16px;
    line-height: 25px;
  }
}
</style>
