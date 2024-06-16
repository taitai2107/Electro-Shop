<template>
  <div>
    <h2>Dashboard</h2>
    <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card elevation="0" class="pa-3" style="min-height: 80vh">
      <v-row class="ma-0" justify="center">
        <v-col cols="auto">
          <h1>Thống kê tổng quan</h1>
        </v-col>
      </v-row>
      <v-row class="ma-0" justify="end">
        <v-col cols="auto">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                density="default"
                variant="text"
                color="primary"
                icon="mdi-reload"
                @click="reload"
              ></v-btn>
            </template>
            <span>Tải lại</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row class="ma-0" justify="center">
        <v-col cols="6" md="4" lg="3">
          <v-card class="pa-2" variant="tonal" height="100%">
            <div class="text-center">
              <h2>Tổng tài khoản</h2>
              <p class="">
                <b>{{ lengthAccount }}</b>
              </p>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-card class="pa-2" variant="tonal" height="100%">
            <div class="text-center">
              <h2>Khách hàng</h2>
              <p class="">
                <b>{{ lengthUser }}</b>
              </p>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-card class="pa-2" variant="tonal" height="100%">
            <div class="text-center">
              <h2>Tổng đơn hàng</h2>
              <p class="">
                <b>{{ lengthOrder }}</b>
              </p>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-card class="pa-2" variant="tonal" height="100%">
            <div class="text-center">
              <h2>Tổng doanh thu</h2>
              <p class="text-error">
                <b>{{ $fv(revenue) }}</b>
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="12">
          <h2 class="">Top 10 sản phẩm bán chạy</h2>
          <div class="is-divider"></div>
        </v-col>
        <v-col cols="12">
          <v-table fixed-header height="400px" table-border="1px">
            <thead>
              <!-- <thead> -->
              <tr>
                <th class="text-uppercase font-weight-bold">Sản phẩm</th>
                <th class="text-uppercase font-weight-bold text-center">
                  Đã bán
                </th>
                <th class="text-uppercase font-weight-bold text-end">Giá</th>
                <th class="text-uppercase font-weight-bold text-center">
                  Tồn kho
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listTopSold" :key="i">
                <td>
                  <v-row class="ma-0">
                    <v-col cols="3">
                      <span>
                        <v-img
                          cover
                          v-bind:src="$gImgProduct + item.avatarPath"
                          width="76"
                          height="76"
                        ></v-img>
                      </span>
                    </v-col>
                    <v-col cols="9" align-self="center">
                      <p class="text-limit-2">
                        <span>
                          {{ item.productName }}
                        </span>
                      </p>
                    </v-col>
                  </v-row>
                </td>
                <td class="text-center">
                  <span>
                    <b>{{ item.sold }}</b>
                  </span>
                </td>
                <td class="text-end">
                  <span>
                    <span
                      v-if="item.saleOf"
                      class="text-decoration-line-through op-5 d-block"
                      >{{ $fv(item.price) }}</span
                    >
                    <b>{{ $fd(item.price, item.saleOf) }}</b>
                  </span>
                </td>
                <td class="text-center">
                  <span>
                    <b>{{ item.quantity }}</b>
                  </span>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    breadcrumbs: [
      {
        title: "Home",
        disabled: false,
        to: "/admin/",
      },
      {
        title: "Dashboard",
        disabled: true,
      },
    ],
    lengthAccount: null,
    lengthUser: null,
    lengthOrder: null,
    lengthRevenue: null,
    revenue: null,
    listTopSold: null,
  }),
  mounted() {
    this.getListAccount();
    this.getListUser();
    this.getListOrder();
    this.getListOrderSuccess();
    this.getListTopSold();
  },
  methods: {
    reload() {
      this.getListAccount();
      this.getListUser();
      this.getListOrder();
      this.getListOrderSuccess();
      this.getListTopSold();
      this.$notify({
        title: "Tải lại thành công",
        type: "success",
      });
    },
    getListTopSold() {
      this.$axios.get(`${this.$gAPI}/Product/GetAllTopSold`).then((res) => {
        if (res.status === 200) {
          if (res.data.length > 10) {
            this.listTopSold = res.data.slice(0, 5);
          } else {
            this.listTopSold = res.data;
          }
        }
      });
    },
    getListAccount() {
      this.$axios.get(`${this.$gAPI}/Account/List`).then((res) => {
        if (res.status === 200) {
          this.lengthAccount = res.data.length;
        }
      });
    },
    getListUser() {
      this.$axios
        .get(`${this.$gAPI}/Account/ListByRole?roleId=user`)
        .then((res) => {
          if (res.status === 200) {
            this.lengthUser = res.data.length;
          }
        });
    },
    getListOrder() {
      this.$axios.get(`${this.$gAPI}/Order/List`).then((res) => {
        if (res.status === 200) {
          this.lengthOrder = res.data.length;
        }
      });
    },
    getListOrderSuccess() {
      this.$axios
        .get(`${this.$gAPI}/Order/GetByStatus?status=4`)
        .then((res) => {
          if (res.status === 200) {
            this.lengthRevenue = res.data.length;
            if (this.lengthRevenue) {
              this.revenue = res.data.reduce(function (
                previousVal,
                currentVal
              ) {
                return previousVal + currentVal.totalFee;
              },
              0);
            } else {
              this.revenue = 0;
            }
          }
        });
    },
  },
};
</script>
<style></style>
