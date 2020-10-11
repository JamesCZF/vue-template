
<template>
  <section class="container">
    <div ref="editor"></div>
    <input
      ref='file_click'
      type="file"
      accept="image/*"
      style="display:none;"
      @change="fileUpload"
    >
  </section>
</template>

<script>
/* eslint-disable vue/no-reserved-keys,vue/require-default-prop,no-unused-vars
,prefer-destructuring,no-underscore-dangle */

import axios from "axios";
import _Quill from "quill";

const Quill = window.Quill || _Quill;

let fontSizeStyle = Quill.import("attributors/style/size");
fontSizeStyle.whitelist = [
  "9px",
  "12px",
  "14px",
  false,
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "30px",
  "32px"
];
Quill.register(fontSizeStyle, true);

export default {
  data() {
    return {
      _value: "",
      uploadType: "",
      imgDomain: ""
      //七牛云水印
    };
  },
  props: {
    option: {
      type: Object,
      default: () => ({
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              // [{ direction: 'rtl' }], // text direction

              [{ size: fontSizeStyle.whitelist }], // custom dropdown
              // [{ size: ['14px',] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              // [{ font: [] }],
              [{ align: [] }],
              ["image"],
              ["clean"], // remove formatting button
              ["link"]
            ] // 工具栏
          },
          clipboard: {
            //不加这个 只要富文本中有换行符 每次提交会多出一个换行符
            matchVisual: false
          }
        }
      })
    },
    value: String
  },
  mounted() {
    // 初始富文本编辑器
    this.initialize();
  },

  unmounted() {
    // 销毁富文本编辑器
    this.quill = null;
    delete this.quill;
  },

  methods: {
    initialize() {
      // 注意不要使用ID选择来初始化编辑器，否则无法在同一个页面初始两个组件
      this.quill = new Quill(this.$refs.editor, this.option);

      // 为图片icon绑定事件
      this.quill.getModule("toolbar").addHandler("image", this.imgHandler);

      // 解析传入的值
      // if (this.value) {
      //   this.quill.pasteHTML(this.value);
      // }

      // API事件：https://quilljs.com/docs/api/#events
      // 监听文本的变化
      this.quill.on("text-change", (delta, olddelta, source) => {
        let html = this.$refs.editor.children[0].innerHTML;
        const quill = this.quill;
        const text = this.quill.getText();

        if (html === "<p><br></p>") html = "";

        this._value = html;

        this.$emit("input", html);

        // this.$emit('change', {
        //   html,
        //   text,
        //   quill,
        // });
      });
    },
    getContent() {
      return this._value;
    },
    // 点击图片ICON触发事件
    imgHandler(state) {
      this.file = "image/*";
      this.addRange = this.quill.getSelection();
      if (state) {
        this.$refs.file_click.click();
      }
      this.uploadType = "image";
    },
    // 获取图片流
    fileUpload(e) {
      const file = e.target.files[0];
      const that = this;
      if (!file) {
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.$notify({
          title: "警告",
          message: "上传图片不能超过5MB",
          type: "warning"
        });
        return;
      }
      this.onUploadImageMixins(file).then(() => {
        this.handle().onScuccess(this.hash);
      });
    },
    handle() {
      return {
        /** 当图片和token上传七牛成功后调用--把图片传入编辑器中 */
        onScuccess: fileHash => {
          let url = this.imgDomain + fileHash;
          if (fileHash != null && fileHash.length > 0) {
            // 将文件上传后的URL地址插入到编辑器文本中
            // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index
            // 即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
            const addRange = this.quill.getSelection(); // 这个是获取焦点，O(∩_∩)O

            // 调用编辑器的 insertEmbed 方法，插入URL
            this.quill.insertEmbed(
              addRange !== null ? addRange.index : 0,
              this.uploadType,
              url,
              Quill.sources.USER
            );

            // 调整光标位置
            this.quill.setSelection(addRange.index + 1);
          } else {
            this.$message.error(`${this.uploadType}插入失败`);
          }
        }
      };
    }
  },

  watch: {
    value(nv, ov) {
      if (!this.quill) return;
      if (nv && nv !== this._value) {
        this._value = nv;
        this.quill.clipboard.dangerouslyPasteHTML(nv);
        return;
      }

      if (!nv) {
        this.quill.setText("");
      }
    }
  }
};
</script>

<style lang="less" scoped>
html,
body,
div {
  overflow: initial;
}
.ql-toolbar ql-snow {
  overflow: initial;
}
.ql-container.ql-snow {
  min-height: 380px;
}
/deep/.ql-editor {
  min-height: 380px !important;
}

/deep/.ql-container {
  min-height: 360px;
  font-size: 16px;
}

.ql-snow .ql-editor img {
  max-width: 440px;
}

.ql-editor .ql-video {
  max-width: 440px;
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="9px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="9px"]::before {
  content: "9px";
  font-size: 9px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
  font-size: 12px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
  font-size: 14px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
  font-size: 16px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  content: "18px";
  font-size: 18px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
  font-size: 20px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="22px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="22px"]::before {
  content: "22px";
  font-size: 22px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
  font-size: 24px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="26px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="26px"]::before {
  content: "26px";
  font-size: 26px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
  content: "28px";
  font-size: 28px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="30px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="30px"]::before {
  content: "30px";
  font-size: 30px;
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
  content: "32px";
  font-size: 32px;
}

//默认的样式
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "16px";
  font-size: 16px;
}
</style>
