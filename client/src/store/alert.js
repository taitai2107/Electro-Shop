import { defineStore } from "pinia";

export const alertStore = defineStore({
  id: "alert",
  state: () => ({
    isShow: false,
  }),
  actions: {
    toggle() {
      this.isShow = !this.isShow;
    },
  },
});
