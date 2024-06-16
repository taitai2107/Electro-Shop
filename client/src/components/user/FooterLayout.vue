<template>
  <div class="mt-5">
    <div class="maxWidth">
      <div>
        <v-card class="" rounded="0" elevation="0">
          <v-row class="ma-0 my-3 fs-14">
            <v-col cols="12" align-self="center">
              <h3 class="text-uppercase">Đối tác</h3>
              <div style="border: 1px solid #dddddd; border-radius: 2px">
                <v-row class="ma-0">
                  <v-col cols="auto">
                    <v-img
                      src="@/assets/doi_tac1.jpg"
                      alt="Dối tác"
                      width="auto"
                      height="auto"
                    />
                  </v-col>
                  <v-col cols="auto">
                    <v-img
                      src="@/assets/doi_tac2.jpg"
                      alt="Dối tác"
                      width="auto"
                      height="auto"
                    />
                  </v-col>
                  <v-col cols="auto">
                    <v-img
                      src="@/assets/doi_tac3.jpg"
                      alt="Dối tác"
                      width="auto"
                      height="auto"
                    />
                  </v-col>

                  <v-col cols="auto">
                    <v-img
                      src="@/assets/doi_tac5.jpg"
                      alt="Dối tác"
                      width="auto"
                      height="auto"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </div>
  <div class="mt-5 bg-bottom">
    <div class="maxWidth">
      <div>
        <v-row class="ma-0 pa-5">
          <v-col cols="12" md="3">
            <p class="text-uppercase text-white fs-16">Về chúng tôi</p>
            <v-divider class="text-white mt-3"></v-divider>
            <div class="ml-4 mt-4 text-header fs-13">
              <ul style="line-height: 300%">
                <li>Giới thiệu</li>
                <li>Giao hàng - đổi trả</li>
                <li>Chính sách bảo mật</li>
                <li>Liên hệ</li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <p class="text-uppercase text-white fs-16">Trợ giúp</p>
            <v-divider class="text-white mt-3"></v-divider>
            <div class="ml-4 mt-4 text-header fs-13">
              <ul style="line-height: 300%">
                <li>Hướng dẫn mua hàng</li>
                <li>Hướng dẫn thanh toán</li>
                <li>Tài khoản giao dịch</li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <p class="text-uppercase text-white fs-16">Thông tin công ty</p>
            <v-divider class="text-white mt-3"></v-divider>
            <div class="ml-4 mt-4 text-header fs-13">
              <ul style="line-height: 200%">
                <p>CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ RUNTIME</p>
                <p>
                  <v-icon icon="mdi-map-marker" size="x-small"></v-icon> Số 1.
                  P.Phú Lãm, Q.Hà Đông, Hà Nội
                </p>
                <p>
                  <v-icon icon="mdi-email" size="x-small"></v-icon>
                  info@sunshop.vn
                </p>
                <p>
                  <v-icon icon="mdi-phone" size="x-small"></v-icon>
                  Phone: (08) 66 85 85 38
                </p>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <p class="text-uppercase text-white fs-16">Facebook</p>
            <v-divider class="text-white mt-3"></v-divider>
            <div class="mt-5">
              <v-btn
                density="default"
                class="pa-0 pt-4 ml-2"
                height="45"
                color="#01c4c4"
                style="min-width: 46px"
                ><v-icon
                  icon="mdi-google-plus"
                  class="text-white"
                  size="30"
                ></v-icon
              ></v-btn>
              <v-btn
                density="default"
                class="pa-0 pt-4 ml-2"
                height="45"
                color="#01c4c4"
                style="min-width: 46px"
                ><v-icon
                  icon="mdi-facebook"
                  class="text-white"
                  size="30"
                ></v-icon
              ></v-btn>
              <v-btn
                density="default"
                class="pa-0 pt-4 ml-2"
                height="45"
                color="#01c4c4"
                style="min-width: 46px"
                ><v-icon
                  icon="mdi-youtube"
                  class="text-white"
                  size="30"
                ></v-icon
              ></v-btn>
              <v-btn
                density="default"
                class="pa-0 pt-4 ml-2"
                height="45"
                color="#01c4c4"
                style="min-width: 46px"
                ><v-icon
                  icon="mdi-twitter"
                  class="text-white"
                  size="30"
                ></v-icon
              ></v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
    loading: false,
    email: null,
  }),

  methods: {
    async onClick() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) return;

      let data = {
        email: this.email,
        status: 1,
        fullName: "By Home contact",
        phone: "updating...",
      };

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;

        this.$axios
          .post(`${this.$gAPI}/Contact/Store`, data)
          .then((res) => {
            if (res.status === 200) {
              this.$notify({
                title: "Gửi thành công",
                type: "success",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "Có lỗi sảy ra! vui lòng thử lại",
              type: "warn",
            });
          });
      }, 1000);
    },
  },
};
</script>

<style scoped>
.bg-bottom {
  background-color: #373737;
}
</style>
