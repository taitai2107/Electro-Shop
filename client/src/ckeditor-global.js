import Vue from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import VueCkeditor from "@ckeditor/ckeditor5-vue";

Vue.use(VueCkeditor, {
  name: "ckeditor",
  editor: ClassicEditor,
  config: {
    plugins: [Essentials, Bold, Italic],
    toolbar: ["bold", "italic"],
  },
});
