/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

//Css
import "./assets/css/main.css";

// vue Editor
// import "./ckeditor-global";
import VueCkeditor from "@ckeditor/ckeditor5-vue";

// Vue notif
import Notifications from "@kyvg/vue3-notification";

// import axios
import axios from "axios";

// date-fns
import moment from "moment";

// Components
import YesNoAlert from "@/components/YesNoAlert.vue";
import ShowAlert from "@/components/ShowAlert.vue";

// Pinia
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

// components global
app.component("yes-no-alert", YesNoAlert);
app.component("show-alert", ShowAlert);

// Định dạng giá tiền và gán vào biến global
const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

// Format số trừ theo %
const mathDiscount = (val, dis) => {
  if (dis === 0) {
    return val;
  } else {

    const value = (val / 100) * dis;
    return formatCurrency(val - value);
  }
};
const notVMathDiscount = (val, dis) => {
  if (dis === 0) {
    return val;
  } else {
    const value = (val / 100) * dis;
    return val - value;
  }
};

// Format ngày có giờ
const formartDateTime = (date) => moment(date).format("DD/MM/YYYY HH:mm");

// Format ngày
const formartDate = (date) => moment(date).format("DD/MM/YYYY");
const formartDateNews = (date) => moment(date).format('DD MMM');

//
// import { useGlobalStore } from "@/store/global";
// const globalStore = useGlobalStore();
// app.provide("globalStore", globalStore);

// global
app.config.globalProperties.$gAPI = "https://localhost:44393/api";
app.config.globalProperties.$gImgProduct = "https://localhost:44393/api/Product/GetImageByPath?path=";
app.config.globalProperties.$gImgNews = "https://localhost:44393/api/Account/GetImageByPath?path=";
app.config.globalProperties.$linkINews = "D:\\Workspace\\GitHub\\project-vue_BE\\Project_BE\\DoAN_ChuoiCuaHangGiaDung_BE\\FolderNewsImage\\";
app.config.globalProperties.$linkIProduct = "D:\\Workspace\\GitHub\\project-vue_BE\\Project_BE\\DoAN_ChuoiCuaHangGiaDung_BE\\FolderProductImage\\";
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$fv = formatCurrency;
app.config.globalProperties.$fd = mathDiscount;
app.config.globalProperties.$nvfd = notVMathDiscount;
app.config.globalProperties.$fDateTime = formartDateTime;
app.config.globalProperties.$fDate = formartDate;
app.config.globalProperties.$fDateNews = formartDateNews;

registerPlugins(app);

app.use(pinia);
app.use(VueCkeditor);
app.use(Notifications);
app.mount("#app");
