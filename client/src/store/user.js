import { defineStore } from "pinia";

export const cartPinia = defineStore("user", {
    state: () => ({
        islogin: false,
        userAccount: {}
    }),
    actions: {
    
        getAccount(id) {
            if (id) {
                const res = this.$axios.get(`${this.$gAPI}/Account/GetByName/${id}`)
                if(res){
                    this.userAccount = res.data
                }
            }
        }
    },
});
