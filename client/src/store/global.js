import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
    state: () => ({
        gAPI: 'https://localhost:44393/api',
    }),
    actions: {


    },
});
