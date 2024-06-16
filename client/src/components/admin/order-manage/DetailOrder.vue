<template>
  <v-dialog
    transition="dialog-top-transition"
    width="900"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar
          color="primary"
          :title="`Chi tiết Đơn hàng HDDH-${detail.orderId}`"
        ></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="ma-0" justify="center">
              <v-col cols="12">
                <v-chip
                  variant="elevated"
                  color="red"
                  v-if="detail.status === 1"
                >
                  Chưa Duyệt</v-chip
                >
                <v-chip
                  variant="elevated"
                  color="#9E9D24"
                  v-if="detail.status === 2"
                >
                  Đang xử lý</v-chip
                >
                <v-chip
                  variant="elevated"
                  color="warning"
                  v-if="detail.status === 3"
                >
                  Đang Vận chuyển</v-chip
                >
                <v-chip
                  variant="elevated"
                  color="success"
                  v-if="detail.status === 4"
                >
                  Thành công</v-chip
                >
                <v-chip
                  variant="elevated"
                  color="error"
                  v-if="detail.status === 5"
                >
                  Đã hủy</v-chip
                >
              </v-col>
              <v-col cols="6" md="4">
                <v-card variant="tonal" height="100%">
                  <div class="text-center">
                    <h2>Thông tin</h2>
                  </div>
                  <div class="pa-3">
                    <p>
                      Tài khoản đặt:
                      <b
                        ><span v-for="(account, i) in listAccount" :key="i">
                          <span v-if="account.accountId === detail.accountId">{{
                            account.userName
                          }}</span>
                        </span></b
                      >
                    </p>
                    <p>
                      Người nhận: <b>{{ detail.receiver }}</b>
                    </p>
                    <p>
                      Số điện thoại nhận: <b>{{ detail.phone }}</b>
                    </p>
                    <p>
                      Địa chỉ giao hàng: <b>{{ detail.address }}</b>
                    </p>
                    <p>
                      Ngày đặt hàng:
                      <b>{{ $fDateTime(detail.dateTime) }}</b>
                    </p>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="6" md="4">
                <v-card variant="tonal" height="100%">
                  <div class="text-center">
                    <h2>Ghi chú</h2>
                  </div>
                  <div class="pa-3">
                    <p>
                      Ghi chú: <b>{{ detail.description }}</b>
                    </p>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="6" md="4">
                <v-card variant="tonal" height="100%">
                  <div class="text-center">
                    <h2>Hình thức thanh toán</h2>
                  </div>
                  <div class="pa-3">
                    <p>Thanh toán khi nhận hàng</p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col cols="12" class="pt-0">
                <div>
                  <v-table fixed-header height="300px" table-border="1px">
                    <thead>
                      <!-- <thead> -->
                      <tr>
                        <th class="text-uppercase font-weight-bold">
                          Sản phẩm
                        </th>
                        <th class="text-uppercase font-weight-bold text-center">
                          Giá
                        </th>
                        <th class="text-uppercase font-weight-bold text-center">
                          Số Lượng
                        </th>
                        <th class="text-uppercase font-weight-bold text-end">
                          Tổng cộng
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in listByOrder" :key="i">
                        <td>
                          <v-row class="ma-0">
                            <v-col cols="3">
                              <span
                                v-for="(product, i) in listProduct"
                                :key="i"
                              >
                                <span
                                  v-if="product.productId === item.productId"
                                >
                                  <v-img
                                    cover
                                    v-bind:src="
                                      $gImgProduct + product.avatarPath
                                    "
                                    width="76"
                                    height="76"
                                  ></v-img>
                                </span>
                              </span>
                            </v-col>
                            <v-col cols="9" align-self="center">
                              <p>
                                <span
                                  v-for="(product, i) in listProduct"
                                  :key="i"
                                >
                                  <span
                                    v-if="product.productId === item.productId"
                                  >
                                    {{ product.productName }}
                                  </span>
                                </span>
                              </p>
                            </v-col>
                          </v-row>
                        </td>
                        <td>
                          <span v-for="(product, i) in listProduct" :key="i">
                            <span v-if="product.productId === item.productId">
                              <span
                                v-if="product.saleOf"
                                class="text-decoration-line-through op-5 d-block"
                                >{{ $fv(product.price) }}</span
                              >
                              <b>{{ $fd(product.price, product.saleOf) }}</b>
                            </span>
                          </span>
                        </td>
                        <td class="text-center">
                          <b>x{{ item.quantity }}</b>
                        </td>
                        <td class="text-end">
                          <span v-for="(product, i) in listProduct" :key="i">
                            <span v-if="product.productId === item.productId">
                              <b>{{
                                $fd(
                                  product.price * item.quantity,
                                  product.saleOf
                                )
                              }}</b>
                            </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                  <div class="mt-3">
                    <v-row justify="end">
                      <v-col cols="auto">
                        <p class="text-end">
                          Tổng đơn: <b>{{ $fv(detail.totalFee) }}</b>
                        </p>
                        <p class="text-end">
                          Phí giao hàng: <b>Miễn phí giao hàng</b>
                        </p>
                        <p class="text-end">
                          Tổng cộng: <b>{{ $fv(detail.totalFee) }}</b>
                        </p>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- <div class="mt-3">
                    <v-row>
                      <v-col cols="auto" class="pr-0">
                        <v-btn
                          variant="outlined"
                          color="#4a90e2"
                          prepend-icon="mdi-arrow-left"
                          to="/kiem-tra-don-hang"
                          >Quay lại</v-btn
                        >
                      </v-col>
                      <v-col cols="auto">
                        <v-btn variant="elevated" color="red" @click="reload"
                          >Hủy Đơn hàng</v-btn
                        >
                      </v-col>
                    </v-row>
                  </div> -->
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="outlined" color="success" @click="$emit('toggle')"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    detail: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      listByOrder: null,
      listProduct: null,
      listAccount: null,
    };
  },
  methods: {
    getListByOrder(id) {
      this.$axios
        .get(`${this.$gAPI}/OrderDetail/GetByOrderId?orderId=${id}`)
        .then((res) => {
          this.listByOrder = res.data;
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
    getListAccount() {
      this.$axios
        .get(`${this.$gAPI}/Account/List`)
        .then((res) => {
          this.listAccount = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.getListProduct();
        this.getListAccount();
        this.getListByOrder(this.detail.orderId);
      }
    },
  },
};
</script>

<style></style>
