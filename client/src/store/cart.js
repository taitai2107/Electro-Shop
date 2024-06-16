import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    totalMoneyCart: 0,
    lengthProductCart: 0,
    listCart: null,
    isAccount: false,
  }),
  actions: {
    getCartByAccountId(id) {
      axios
        .get(`https://localhost:44393/api/Cart/listByAccountId?accountId=${id}`)
        .then((res) => {
          this.lengthProductCart = res.data.length;
          this.totalMoneyCart = res.data.reduce(function (
            previousVal,
            currentVal
          ) {
            return previousVal + currentVal.totalFee;
          },
          0);
        });
    },
  },
});
