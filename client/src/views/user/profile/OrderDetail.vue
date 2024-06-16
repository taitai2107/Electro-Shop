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
                <span class="text-blue-green">Đơn hàng</span>
              </p>
              <h3 class="text-uppercase mt-2 title-breadcrumbs">
                Kiểm tra đơn hàng
              </h3>
            </div>
          </v-col>
          <v-col cols="12">
            <div>
              <v-table fixed-header height="400px" table-border="1px">
                <thead>
                  <!-- <thead> -->
                  <tr>
                    <th class="text-uppercase font-weight-bold">
                      Thông tin chung
                    </th>
                    <th class="text-uppercase font-weight-bold">
                      Thông tin đơn
                    </th>

                    <th class="text-uppercase font-weight-bold text-center">
                      Trạng thái
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in listOrder" :key="i" class="py-5">
                    <td>
                      <div>
                        <p>
                          Mã đơn hàng: <b>HDDH{{ item.orderId }}</b>
                        </p>
                        <p>
                          Người nhận: <b>{{ item.receiver }}</b>
                        </p>
                      </div>
                    </td>
                    <td>
                      <p>
                        Thời gian đặt: <b>{{ $fDateTime(item.dateTime) }}</b>
                      </p>
                      <p>
                        Tổng đơn: <b>{{ $fv(item.totalFee) }}</b>
                      </p>
                    </td>
                    <td class="text-center">
                      <v-chip
                        variant="elevated"
                        color="#FF7043"
                        v-if="item.status === 1"
                      >
                        Chưa duyệt đơn
                      </v-chip>
                      <v-chip
                        variant="elevated"
                        color="#9E9D24"
                        v-if="item.status === 2"
                      >
                        Đang xử lý
                      </v-chip>
                      <v-chip
                        variant="elevated"
                        color="# FFB74D"
                        v-if="item.status === 3"
                      >
                        Đang vận chuyển
                      </v-chip>
                      <v-chip
                        variant="elevated"
                        color="success"
                        v-if="item.status === 4"
                      >
                        Giao thành công
                      </v-chip>
                      <v-chip
                        variant="elevated"
                        color="error"
                        v-if="item.status === 5"
                      >
                        Hủy đơn
                      </v-chip>
                    </td>
                    <td>
                      <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            icon
                            v-bind="props"
                            variant="text"
                            @click="
                              $router.push(
                                `/kiem-tra-don-hang/chi-tiet-don/${item.orderId}`
                              )
                            "
                          >
                            <v-icon color="primary"> mdi-eye </v-icon>
                          </v-btn>
                        </template>
                        <span>Chi tiết</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      dataSession: null,
      listOrder: null,
      listProduct: null,
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
  watch: {
    dataSession(value) {
      if (value.accountId) {
        this.getOrderByAccountId(value.accountId);
      }
    },
  },
  methods: {
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
    getOrderByAccountId(accountId) {
      this.$axios
        .get(`${this.$gAPI}/Order/GetByAccountId?accountId=${accountId}`)
        .then((res) => {
          this.listOrder = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
