<template>
  <div class="mt-5">
    <div class="maxWidth">
      <div class="mt-2">
        <v-row class="ma-0 px-10">
          <v-col cols="12">
            <div>
              <p class="fs-13" @click="$router.push('/')">
                <span class="home-link">Trang chủ</span>
                <v-icon icon="mdi-menu-right" size="small"></v-icon>
                <span class="text-blue-green">Liên hệ</span>
              </p>
              <h3 class="text-uppercase mt-2 title-breadcrumbs">
                Thông tin liên hệ
              </h3>
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-0 px-10">
          <v-col cols="6">
            <v-card flat style="border: 1px solid #e0e0e0">
              <v-row class="ma-4">
                <v-col cols="12">
                  <p class="mb-2">Họ tên <span class="text-error">*</span></p>
                  <v-text-field
                    v-model="data.fullName"
                    density="comfortable"
                    hide-details="auto"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p class="mb-2">Email <span class="text-error">*</span></p>
                  <v-text-field
                    v-model="data.email"
                    density="comfortable"
                    hide-details="auto"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p class="mb-2">
                    Số điện thoại <span class="text-error">*</span>
                  </p>
                  <v-text-field
                    v-model="data.phone"
                    density="comfortable"
                    hide-details="auto"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p class="mb-2">Ghi chú <span class="text-error">*</span></p>
                  <v-textarea
                    v-model="data.comment"
                    density="comfortable"
                    hide-details="auto"
                    variant="outlined"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" align="end">
                  <v-btn color="#333333" @click="submit">Gửi liên hệ</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9664.544511685152!2d105.76472647621353!3d20.944825581338378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452eaa9c461c3%3A0x2a3e1c421f299adc!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyDEkOG6oWkgTmFt!5e0!3m2!1svi!2sus!4v1696155195037!5m2!1svi!2sus"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </v-col>
          <v-col cols="8">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

const initData = {
  fullName: null,
  email: null,
  phone: null,
  comment: null,
  dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  status: 1,
};

export default {
  data() {
    return {
      data: { ...initData },
    };
  },
  methods: {
    submit() {
      this.$axios
        .post(`${this.$gAPI}/Contact/Store`, {
          ...this.data,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$notify({
              title: "Gửi liên hệ thành công",
              type: "success",
            });
            this.data = { ...initData };
          }
        })
        .catch((err) => {
          this.$notify({
            title: "Có lỗi sảy ra! vui lòng thử lại",
            type: "warn",
          });
        });
    },
  },
};
</script>

<style></style>
