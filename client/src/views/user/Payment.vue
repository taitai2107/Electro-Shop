<template>
  <div class="mt-4">
    <div class="maxWidth">
      <div class="mt-2">
        <v-row class="ma-0 px-10">
          <v-col cols="12">
            <div>
              <p class="fs-13" @click="$router.push('/')">
                <span class="home-link">Trang chủ</span>
                <v-icon icon="mdi-menu-right" size="small"></v-icon>
                <span class="text-blue-green">Đặt hàng</span>
              </p>
              <h3 class="text-uppercase mt-2 title-breadcrumbs">Đặt hàng</h3>
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-0 px-10" justify="center">
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
                <li
                  class="cart active col-md-offset-3 col-sm-offset-0 col-xs-offset-0"
                >
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
  </div>

  <div>
    <div class="maxWidth">
      <div class="payment">
        <v-row class="ma-0 mt-3 px-10">
          <v-col cols="12" md="4" class="pb-0">
            <div class="col-payment">
              <div class="title">
                <h4>1. Địa chỉ thanh toán và giao hàng</h4>
              </div>
              <div class="mt-3 pa-2">
                <h4 class="text-blue-green">THÔNG TIN THANH TOÁN</h4>
                <p class="fs-14 mt-4"><b>Mua hàng không cần voucher</b></p>
              </div>
              <div class="pa-2">
                <v-form ref="form">
                  <v-row class="ma-0">
                    <v-col cols="12">
                      <h4 class="mb-1">
                        Người nhận <span class="required">*</span>
                      </h4>
                      <v-text-field
                        v-model="receiver"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        placeholder="Nhập họ tên người nhận"
                        :rules="[(v) => !!v || 'Không được để trống']"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <h4 class="mb-1">
                        Số điện thoại <span class="required">*</span>
                      </h4>
                      <v-text-field
                        v-model="phone"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        placeholder="Nhập số điện thoại"
                        :rules="[(v) => !!v || 'Không được để trống']"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <h4 class="mb-1">
                        Ghi chú đơn hàng <span class="required">*</span>
                      </h4>
                      <v-text-field
                        v-model="description"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        placeholder="Ghi chú về đơn hàng, "
                        :rules="[(v) => !!v || 'Không được để trống']"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <h4 class="mb-1">
                        Địa chỉ <span class="required">*</span>
                      </h4>
                      <v-textarea
                        v-model="address"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        placeholder="Nhập chi tiết địa chỉ giao hàng"
                        :rules="[(v) => !!v || 'Không được để trống']"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col cols="12"> </v-col>
                  </v-row>
                </v-form>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="pb-0">
            <div class="col-payment">
              <div class="title">
                <h4>2. THANH TOÁN VÀ VẬN CHUYỂN</h4>
              </div>
              <div class="mt-3 pa-2">
                <h4 class="text-blue-green">VẬN CHUYỂN</h4>
              </div>
              <div class="pa-2">
                <v-select
                  v-model="select"
                  item-value="value"
                  :items="[{ text: 'Giao hàng tận nơi - miễn phí', value: 1 }]"
                  item-title="text"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                >
                </v-select>
              </div>
              <div class="mt-3 pa-2">
                <h4 class="text-blue-green">THANH TOÁN</h4>
                <v-radio-group v-model="radio">
                  <v-radio label="Thanh toán khi giao hàng (COD)"></v-radio>
                </v-radio-group>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="pb-0">
            <div class="col-payment">
              <div class="title">
                <h4>3. THÔNG TIN ĐƠN HÀNG</h4>
              </div>
              <div class="mt-3 pa-2">
                <v-row justify="space-between">
                  <v-col cols="auto"><b>Thành tiền</b></v-col>
                  <v-col cols="auto">
                    <b>{{ $fv(totalMoneyCart) }}</b></v-col
                  >
                </v-row>
              </div>
              <v-divider class="mx-2"></v-divider>
              <div class="mt-3 pa-2">
                <v-row justify="space-between">
                  <v-col cols="auto"><b>Phí vận chuyển</b></v-col>
                  <v-col cols="auto"> <b>Miễn phí</b></v-col>
                </v-row>
              </div>
              <v-divider class="mx-2"></v-divider>
              <div class="mt-3 pa-2">
                <v-row justify="space-between">
                  <v-col cols="auto"
                    ><b class="text-uppercase">Thanh toán</b></v-col
                  >
                  <v-col cols="auto">
                    <b class="text-blue-green">{{
                      $fv(totalMoneyCart)
                    }}</b></v-col
                  >
                </v-row>
              </div>
              <v-divider class="mx-2"></v-divider>
              <div class="mt-3 pa-2">
                <v-row justify="end">
                  <v-col cols="auto" class="pr-0">
                    <v-btn
                      variant="outlined"
                      color="#4a90e2"
                      prepend-icon="mdi-arrow-left"
                      to="/gio-hang"
                      >Quay lại</v-btn
                    >
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      variant="elevated"
                      color="#01c4c4"
                      class="text-white"
                      @click="doOrder"
                      >Đặt hàng</v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <!-- <v-row>
      </v-row> -->
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { useCartStore } from "@/store/cart.js";

export default {
  data() {
    return {
      dataSession: null,
      listCart: null,
      lengthCart: null,
      listProduct: null,
      totalMoneyCart: null,
      receiver: null,
      phone: null,
      address: null,
      description: null,
      dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      status: 1,

      radio: true,
      select: 1,
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.dataSession = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$notify({
        title: "Vui lòng đăng nhập",
        type: "error",
      });
      this.$router.push("/dang-nhap");
    }
  },
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
    lengthCart(value) {
      if (!value) {
        this.$notify({
          title: "Không có sản phẩm trong giỏ! vui lòng kiểm tra lại",
          type: "warn",
        });
        this.$router.push("/gio-hang");
      }
    },
  },
  methods: {
    async doOrder() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;
      let data = {
        receiver: this.receiver,
        phone: this.phone,
        address: this.address,
        totalFee: this.totalMoneyCart,
        dateTime: this.dateTime,
        description: this.description,
        status: this.status,
        accountId: this.dataSession.accountId,
      };
      try {
        await this.$axios
          .post(`${this.$gAPI}/Order/Store`, data)
          .then((res) => {
            if (res.status === 200) {
              this.listCart.forEach((item) => {
                let dataCart = {
                  quantity: item.quantity,
                  status: true,
                  unitPrice: Number(item.totalFee / item.quantity),
                  orderId: res.data.orderId,
                  productId: item.productId,
                };

                this.$axios
                  .post(`${this.$gAPI}/OrderDetail/Store`, dataCart)
                  .then((res) => {
                    console.log(res);
                  });
              });

              this.$axios
                .delete(
                  `${this.$gAPI}/Cart/DeleteByAccountId?accountId=${this.dataSession.accountId}`
                )
                .then((res) => {
                  console.log(res);
                  this.$notify({
                    title: "Đặt hàng thành công",
                    type: "success",
                  });

                  this.cart.getCartByAccountId(this.dataSession.accountId);
                  this.$router.push("/dat-hang-thanh-cong");
                });
            }
          });
      } catch (error) {
        this.$notify({
          title: "Có lỗi sảy ra! vui lòng thử lại",
          type: "error",
        });
      }
    },

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
  },
};
</script>

<style scoped>
.here-divider {
  height: 3px;
  display: block;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
}
.here-divider-small {
  height: 1px;
  display: block;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
}

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

.payment .title h4 {
  margin-top: 0;
  padding: 10px;
  background-color: #01c4c4;
  font-size: 14px;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 0;
}

.col-payment {
  background-color: #ffffff;
  min-height: 580px;
  border: 1px solid #dddddd;
  height: 100%;
}
</style>
