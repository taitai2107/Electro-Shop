<template>
  <div class="mt-4">
    <div class="maxWidth" v-if="lengthCart">
      <div class="mt-2">
        <v-row class="ma-0 px-10">
          <v-col cols="12">
            <div>
              <p class="fs-13" @click="$router.push('/')">
                <span class="home-link">Trang chủ</span>
                <v-icon icon="mdi-menu-right" size="small"></v-icon>
                <span class="text-blue-green">Giỏ hàng</span>
              </p>
              <h3 class="text-uppercase mt-2 title-breadcrumbs">
                Giỏ hàng của tôi
              </h3>
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-0" justify="center">
          <v-col cols="auto">
            <div class="steps clearfix">
              <ul class="clearfix">
                <li
                  class="cart active col-md-offset-3 col-sm-offset-0 col-xs-offset-0"
                >
                  <span
                    ><v-icon
                      class="glyphicon glyphicon-shopping-cart"
                      icon="mdi-cart"
                      size="x-large"
                    ></v-icon></span
                  ><span>Giỏ hàng của tôi</span
                  ><span class="step-number"><a>1</a></span>
                </li>
                <li class="payment">
                  <span
                    ><v-icon
                      class="glyphicon glyphicon-shopping-cart"
                      icon="mdi-currency-usd"
                      size="x-large"
                    ></v-icon></span
                  ><span>Đặt hàng</span
                  ><span class="step-number"><a>2</a></span>
                </li>
                <li class="finish">
                  <span
                    ><v-icon
                      class="glyphicon glyphicon-shopping-cart"
                      icon="mdi-check"
                      size="x-large"
                    ></v-icon></span
                  ><span>Hoàn tất</span
                  ><span class="step-number"><a>3</a></span>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="maxWidth">
      <div>
        <v-row class="ma-0 mt-3" v-if="lengthCart">
          <v-col cols="12">
            <div>
              <v-table fixed-header height="400px" table-border="1px">
                <thead style="background-color: #f6f6f6 !important">
                  <!-- <thead> -->
                  <tr>
                    <th class="text-uppercase font-weight-bold">
                      Tên sản phẩm
                    </th>
                    <th class="text-uppercase font-weight-bold text-center">
                      Giá
                    </th>
                    <th class="text-uppercase font-weight-bold text-center">
                      Số Lượng
                    </th>
                    <th class="text-uppercase font-weight-bold text-center">
                      Thành tiền
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in listCart" :key="i">
                    <td>
                      <v-row class="ma-0">
                        <v-col cols="3">
                          <span v-for="(product, i) in listProduct" :key="i">
                            <span v-if="product.productId === item.productId">
                              <v-img
                                cover
                                v-bind:src="$gImgProduct + product.avatarPath"
                                width="76"
                                height="76"
                              ></v-img>
                            </span>
                          </span>
                        </v-col>
                        <v-col cols="9" align-self="center">
                          <p
                            class="text-a-primary text-limit-2"
                            @click="
                              $router.push(`/chi-tiet-sp/${item.productId}`)
                            "
                          >
                            <span v-for="(product, i) in listProduct" :key="i">
                              <span v-if="product.productId === item.productId">
                                {{ product.productName }}
                              </span>
                            </span>
                            <span
                              v-for="(Category, i) in listCategory"
                              :key="i"
                            >
                              <span
                                v-if="Category.CategoryId === item.CategoryId"
                              >
                                {{ Category.CategoryName }}
                              </span>
                            </span>
                          </p>
                        </v-col>
                      </v-row>
                    </td>
                    <td>
                      <span v-for="(product, i) in listProduct" :key="i">
                        <span v-if="product.productId === item.productId">
                          <b>{{ $fd(product.price, product.saleOf) }}</b>
                        </span>
                      </span>
                    </td>
                    <td class="text-center">
                      <center>
                        <v-text-field
                          v-model="item.quantity"
                          density="compact"
                          variant="outlined"
                          prepend-inner-icon="mdi-minus"
                          append-inner-icon="mdi-plus"
                          single-line
                          hide-details
                          @change="
                            changeCart(
                              item.quantity,
                              item.totalFee,
                              item.cartId,
                              item.productId
                            )
                          "
                          @click:prepend-inner="
                            if (item.quantity > 1) {
                              item.quantity--,
                                reduceQuantity(
                                  item.quantity,
                                  item.totalFee,
                                  item.cartId,
                                  item.productId
                                );
                            }
                          "
                          @click:append-inner="
                            item.quantity++,
                              increaseQuantity(
                                item.quantity,
                                item.totalFee,
                                item.cartId,
                                item.productId
                              )
                          "
                          style="width: 130px"
                          rounded="0"
                          class=""
                          type="number"
                        ></v-text-field>
                      </center>
                      <!-- type="number" -->
                    </td>
                    <td class="text-center">
                      <span v-for="(product, i) in listProduct" :key="i">
                        <span v-if="product.productId === item.productId">
                          <b>{{
                            $fd(product.price * item.quantity, product.saleOf)
                          }}</b>
                        </span>
                      </span>
                    </td>
                    <td class="text-center">
                      <v-btn
                        color="red"
                        icon="mdi-close-circle-outline"
                        variant="text"
                        @click="removeItemCart(item.cartId, item.accountId)"
                      >
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
              <div class="mt-3">
                <v-row class="ma-0" justify="end">
                  <v-col cols="auto" class="pr-0">
                    Tổng thanh toán:
                    <span class="text-blue-green fs-22">
                      <b>{{ $fv(cart.totalMoneyCart) }}</b></span
                    >
                  </v-col>
                </v-row>
                <v-row class="ma-0" justify="end">
                  <v-col cols="auto" class="pr-0">
                    <v-btn
                      variant="elevated"
                      color="#01c4c4"
                      prepend-icon="mdi-arrow-left"
                      class="text-white"
                      to="/san-pham"
                      >Tiếp tục mua hàng</v-btn
                    >
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      variant="elevated"
                      class="text-white"
                      color="#ff0000"
                      to="/dat-hang"
                      >Tiến hành thanh toán</v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row
          class="ma-0"
          justify="center"
          v-if="!lengthCart"
          style="min-height: 40vh"
        >
          <v-col cols="auto" align-self="center" class="d-block" align="center">
            <p>Chưa có sản phẩm nào trong giỏ hàng.</p>

            <v-btn
              variant="elevated"
              color="#4a90e2"
              prepend-icon="mdi-arrow-left"
              class="mt-5"
              to="/san-pham"
              >Tiếp tục mua sắm</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/store/cart.js";

export default {
  data: () => ({
    value: 1,
    dataSession: null,
    listCart: null,
    lengthCart: null,
    listProduct: null,
    totalMoneyCart: null,
    listCategory: null,
  }),
  // created() {
  //   if (JSON.parse(localStorage.getItem("user"))) {
  //     this.dataSession = JSON.parse(localStorage.getItem("user"));
  //   } else {
  //     this.$notify({
  //       title: "Vui lòng đăng nhập",
  //       type: "error",
  //     });
  //     this.$router.push("/dang-nhap");
  //   }
  // },
  mounted() {
    this.getListProduct();
  },
  computed: {
    cart() {
      return useCartStore();
    },
  },
  watch: {
    dataSession(value) {
      if (value.accountId) {
        this.getCartByAccountId(value.accountId);
      }
    },
    listCart: {
      deep: true, // Watch sâu vào các phần tử trong danh sách
      handler(newVal) {
        // Lặp qua danh sách và đảm bảo rằng giá trị không nhỏ hơn 1
        for (const item of newVal) {
          if (item.quantity < 1) {
            item.quantity = 1;
          }
        }
      },
    },
  },
  methods: {
    getCartByAccountId(id) {
      this.$axios
        .get(`${this.$gAPI}/Cart/listByAccountId?accountId=${id}`)
        .then((res) => {
          this.listCart = res.data;
          this.lengthCart = res.data.length;
          this.totalMoneyCart = res.data.reduce(function (
            previousVal,
            currentVal
          ) {
            return previousVal + currentVal.totalFee;
          },
          0);
        });
    },
    getListProduct() {
      this.$axios
        .get(`${this.$gAPI}/Product/List`)
        .then((res) => {
          this.listProduct = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListCategory() {
      this.$axios
        .get(`${this.$gAPI}/Category/List`)
        .then((res) => {
          this.listCategory = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeItemCart(cartId, accountId) {
      this.$axios
        .delete(`${this.$gAPI}/Cart/Delete/${cartId}`)
        .then((res) => {
          if (res.status === 200) {
            this.$notify({
              title: "Xóa thành công",
              type: "success",
            });
            this.getCartByAccountId(this.dataSession.accountId);
            // this.getCartByAccountId(accountId);
            this.reload();
          } else {
            this.$notify({
              title: "Có lỗi sảy ra",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeCart(quantity, value, cartId, productId) {
      this.$axios
        .get(`${this.$gAPI}/Product/GetById/${productId}`)
        .then((res) => {
          const unitPrice = this.$nvfd(res.data.price, res.data.saleOf);
          if (unitPrice) {
            let data = {
              quantity: quantity,
              totalFee: Number(quantity * unitPrice),
            };
            this.$axios
              .put(`${this.$gAPI}/Cart/Update/${cartId}`, data)
              .then((res) => {
                if (res.status === 200) {
                  this.$notify({
                    title: "Cập nhật thành công",
                    type: "success",
                  });
                  this.reload();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    },
    increaseQuantity(quantity, value, cartId, productId) {
      this.$axios
        .get(`${this.$gAPI}/Product/GetById/${productId}`)
        .then((res) => {
          const unitPrice = this.$nvfd(res.data.price, res.data.saleOf);
          if (unitPrice) {
            let data = {
              quantity: quantity,
              totalFee: Number(value + unitPrice),
            };
            this.$axios
              .put(`${this.$gAPI}/Cart/Update/${cartId}`, data)
              .then((res) => {
                if (res.status === 200) {
                  this.$notify({
                    title: "Cập nhật thành công",
                    type: "success",
                  });
                  this.reload();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    },
    reduceQuantity(quantity, value, cartId, productId) {
      this.$axios
        .get(`${this.$gAPI}/Product/GetById/${productId}`)
        .then((res) => {
          const unitPrice = this.$nvfd(res.data.price, res.data.saleOf);
          if (unitPrice) {
            let data = {
              quantity: quantity,
              totalFee: Number(value - unitPrice),
            };
            this.$axios
              .put(`${this.$gAPI}/Cart/Update/${cartId}`, data)
              .then((res) => {
                if (res.status === 200) {
                  this.$notify({
                    title: "Cập nhật thành công",
                    type: "success",
                  });
                  this.reload();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    },
    reload() {
      this.cart.getCartByAccountId(this.dataSession.accountId);
    },
    reloadBonus() {
      this.cart.getCartByAccountId(this.dataSession.accountId);
      this.$notify({
        title: "Cập nhật thành công",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.steps {
  margin-bottom: 30px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

.steps li {
  margin-bottom: 5px;
  float: left;
  text-align: center;
  font-size: 13px;
  border-bottom: 2px solid #aaaaaa;
  padding-bottom: 15px;
  margin-bottom: 15px;
  position: relative;
  font-weight: bold;
  min-width: 200px;
}

.steps li span {
  display: block;
  color: #aaaaaa;
  padding: 5px 0;
}

.steps li.active span {
  color: #01c4c4;
}

.steps li span {
  display: block;
  /* color: #aaaaaa; */
  padding: 5px 0;
}

.steps li span.step-number {
  display: block;
  text-align: center;
  left: 0;
  position: absolute;
  z-index: 9999;
  font-weight: bold;
  width: 100%;
}

.glyphicon {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: "Glyphicons Halflings";
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.steps li span.step-number a {
  padding: 3px 7px;
  background-color: #d0d0d0;
  border: 1px solid #aaaaaa;
  color: #ffffff;
  border-radius: 20px;
}

.steps li.active span.step-number a {
  border-color: #01c4c4;
  color: #ffffff;
  background-color: #01c4c4;
}
</style>
