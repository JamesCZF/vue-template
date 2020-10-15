import { ref } from "vue";
import { getBlogList } from "@/api/blog";
import { formatTime } from "@/utils";

//获取博客相关的数据和逻辑封装到一起
export function getBlogListLogic() {
  const blogList = ref([]);
  async function getBlog(keyword) {
    const {
      data: { data, errno }
    } = await getBlogList({ keyword: keyword && keyword.value });
    if (errno === 0) {
      data.forEach(item => {
        item.createtime = formatTime(item.createtime);
      });
      blogList.value = data;
    }
  }
  return { blogList, getBlog };
}