<template>
  <div class="mt-4">
    <div class="maxWidth">
      <div class="mt-2">
        <v-row class="ma-0 px-10">
          <v-col cols="12">
            <div>
              <p class="fs-13">
                <span class="home-link" @click="$router.push('/')"
                  >Trang chủ</span
                >
                <v-icon icon="mdi-menu-right" size="small"></v-icon>
                <span class="text-gray"> Kiểm tra đơn hàng </span>
                <v-icon icon="mdi-menu-right" size="small"></v-icon>
                <span class="text-gray"> Chi tiết đơn </span>
                <v-icon icon="mdi-menu-right" size="small"></v-icon>
                <span class="text-blue-green">
                  HDDH{{ detaiOrder.orderId }}
                </span>
              </p>
              <h3 class="text-uppercase mt-2 title-breadcrumbs">
                KIỂM TRA chi tiết ĐƠN HÀNG
              </h3>
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-0" justify="center">
          <v-col cols="6" md="4">
            <v-card variant="" height="100%">
              <div class="text-center">
                <h2>Thông tin</h2>
              </div>
              <div class="pa-3">
                <p>
                  Người nhận: <b>{{ detaiOrder.receiver }}</b>
                </p>
                <p>
                  Số điện thoại nhận: <b>{{ detaiOrder.phone }}</b>
                </p>
                <p>
                  Địa chỉ giao hàng: <b>{{ detaiOrder.address }}</b>
                </p>
                <p>
                  Ngày đặt hàng: <b>{{ $fDateTime(detaiOrder.dateTime) }}</b>
                </p>
                <p>
                  Trạng thái đơn hàng:
                  <span>
                    <v-chip
                      variant="elevated"
                      density="comfortable"
                      color="red"
                      v-if="detaiOrder.status === 1"
                    >
                      Chưa Duyệt</v-chip
                    >
                    <v-chip
                      variant="elevated"
                      density="comfortable"
                      color="#9E9D24"
                      v-if="detaiOrder.status === 2"
                    >
                      Đang xử lý</v-chip
                    >
                    <v-chip
                      variant="elevated"
                      density="comfortable"
                      color="warning"
                      v-if="detaiOrder.status === 3"
                    >
                      Đang Vận chuyển</v-chip
                    >
                    <v-chip
                      variant="elevated"
                      density="comfortable"
                      color="success"
                      v-if="detaiOrder.status === 4"
                    >
                      Thành công</v-chip
                    >
                    <v-chip
                      variant="elevated"
                      density="comfortable"
                      color="error"
                      v-if="detaiOrder.status === 5"
                    >
                      Đã hủy</v-chip
                    >
                  </span>
                </p>
              </div>
            </v-card>
          </v-col>
          <v-col cols="6" md="4">
            <v-card variant="" height="100%">
              <div class="text-center">
                <h2>Ghi chú</h2>
              </div>
              <div class="pa-3">
                <p>
                  Ghi chú: <b>{{ detaiOrder.description }}</b>
                </p>
              </div>
            </v-card>
          </v-col>
          <v-col cols="6" md="4">
            <v-card variant="" height="100%">
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
              <v-table fixed-header height="400px" table-border="1px">
                <thead>
                  <!-- <thead> -->
                  <tr>
                    <th class="text-uppercase font-weight-bold">Sản phẩm</th>
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
                            $fd(product.price * item.quantity, product.saleOf)
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
                      Tổng đơn: <b>{{ $fv(detaiOrder.totalFee) }}</b>
                    </p>
                    <p class="text-end">
                      Phí giao hàng: <b>Miễn phí giao hàng</b>
                    </p>
                    <p class="text-end">
                      Tổng cộng: <b>{{ $fv(detaiOrder.totalFee) }}</b>
                    </p>
                  </v-col>
                </v-row>
              </div>
              <div class="mt-3">
                <v-row>
                  <v-col cols="auto" class="pr-0">
                    <v-btn
                      variant="outlined"
                      color="#4cd0dc"
                      prepend-icon="mdi-arrow-left"
                      to="/kiem-tra-don-hang"
                      >Quay lại</v-btn
                    >
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      variant="elevated"
                      color="red"
                      @click="dialogCancel = true"
                      :disabled="
                        originStatus === 3 ||
                        originStatus === 4 ||
                        originStatus === 5
                      "
                      >Hủy Đơn hàng</v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0">
        <p class="font-weight-bold"></p>
        <!-- <v-divider class="my-5"></v-divider> -->
      </v-col>
    </v-row>
  </div>
  <yes-no-alert
    :open="dialogCancel"
    @toggle="dialogCancel = false"
    @confirm="confirmCancel"
    title="Xác nhận hủy"
    mess="Bạn có chắc chắn hủy đơn hàng này?"
  />
</template>

<script>
export default {
  data() {
    return {
      listByOrder: null,
      detaiOrder: {},
      listProduct: null,
      originStatus: null,
      dialogCancel: false,
      orderId: null,
    };
  },
  mounted() {
    this.getListByOrder(this.$route.params.id);
    this.getOrder(this.$route.params.id);
    this.getListProduct();
  },
  methods: {
    getListByOrder(id) {
      this.$axios
        .get(`${this.$gAPI}/OrderDetail/GetByOrderId?orderId=${id}`)
        .then((res) => {
          this.listByOrder = res.data;
        });
    },
    getOrder(id) {
      this.$axios.get(`${this.$gAPI}/Order/GetById/${id}`).then((res) => {
        this.detaiOrder = res.data;
        this.originStatus = res.data?.status;
        this.orderId = res.data?.orderId;
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
    async confirmCancel() {
      let data = {
        status: 5,
      };
      this.dialogCancel = false;
      try {
        const res = await this.$axios.put(
          `${this.$gAPI}/Order/Update/${this.orderId}`,
          data
        );
        if (res.status === 200) {
          this.getOrder(this.$route.params.id);
          this.$notify({
            title: "Hủy đơn hàng thành công",
            type: "success",
          });
        }
      } catch (err) {
        console.log(err);
        this.$notify({
          title: "Có lỗi sảy ra! vui lòng thử lại",
          type: "error",
        });
      }
    },
  },
};
</script>

<style></style>
