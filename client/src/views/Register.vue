<template>
  <div class="mt-4">
    <div class="maxWidth">
      <div class="mt-3">
        <v-row class="ma-0 px-10">
          <v-col cols="12" md="3">
            <div class="menu-account">
              <h3>
                <span> Tài khoản </span>
              </h3>
              <ul>
                <li>
                  <router-link class="text-login-a" to="/dang-nhap">
                    <v-icon
                      class="mr-2"
                      icon="mdi-login"
                      size="x-small"
                    ></v-icon>
                    Đăng nhập</router-link
                  >
                </li>
                <li>
                  <router-link class="text-login-a" to="/dang-ky">
                    <v-icon
                      class="mr-2"
                      icon="mdi-key-outline"
                      size="x-small"
                    ></v-icon>
                    Đăng ký</router-link
                  >
                </li>
                <li>
                  <router-link class="text-login-a" to="#" @click="forwardPass">
                    <v-icon
                      class="mr-2"
                      icon="mdi-help"
                      size="x-small"
                    ></v-icon>
                    Quên mật khẩu
                  </router-link>
                </li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" md="9">
            <div>
              <p class="fs-13" @click="$router.push('/')">
                <span class="home-link">Trang chủ</span>
                <v-icon icon="mdi-menu-right" size="small"></v-icon>
                <span class="text-blue-green">Đăng ký tài khoản</span>
              </p>
              <h3 class="text-uppercase mt-2 title-login">Đăng ký tài khoản</h3>
            </div>
            <div class="mt-3">
              <v-row class="ma-0" justify="center">
                <v-col cols="12" sm="10" md="5" align="center" class="pb-0">
                  <h2 class="">THÔNG TIN CÁ NHÂN</h2>
                </v-col>
              </v-row>
              <v-row class="ma-0" justify="center">
                <v-col cols="12" sm="10" md="5">
                  <v-form ref="form">
                    <div>
                      <p class="mb-2 font-weight-bold">
                        Họ tên <span class="text-error">*</span>
                      </p>
                      <v-text-field
                        density="compact"
                        v-model="data.fullname"
                        hide-details="auto"
                        variant="outlined"
                        :rules="[(v) => !!v || 'Vui lòng nhập họ tên']"
                        placeholder="Họ tên"
                      ></v-text-field>
                    </div>
                    <div class="mt-3">
                      <p class="mb-2 font-weight-bold">
                        Số điện thoại <span class="text-error">*</span>
                      </p>
                      <v-text-field
                        density="compact"
                        v-model="data.phone"
                        hide-details="auto"
                        variant="outlined"
                        :rules="[(v) => !!v || 'Vui lòng nhập số điện thoại']"
                        placeholder="Số điện thoại"
                      ></v-text-field>
                    </div>
                    <div class="mt-3">
                      <p class="mb-2 font-weight-bold">
                        Email <span class="text-error">*</span>
                      </p>
                      <v-text-field
                        density="compact"
                        v-model="data.email"
                        hide-details="auto"
                        variant="outlined"
                        :rules="[(v) => !!v || 'Vui lòng nhập email']"
                        placeholder="Email"
                      ></v-text-field>
                    </div>
                    <div class="mt-3">
                      <p class="mb-2 font-weight-bold">
                        Tên đăng nhập <span class="text-error">*</span>
                      </p>
                      <v-text-field
                        density="compact"
                        v-model="data.username"
                        hide-details="auto"
                        variant="outlined"
                        :rules="[(v) => !!v || 'Vui lòng nhập tên đăng nhập']"
                        placeholder="Tên đăng nhập"
                      ></v-text-field>
                    </div>
                    <div class="mt-3">
                      <p class="mb-2 font-weight-bold">
                        Mật khẩu <span class="text-error">*</span>
                      </p>
                      <v-text-field
                        density="compact"
                        v-model="data.password"
                        hide-details="auto"
                        variant="outlined"
                        :rules="[(v) => !!v || 'Vui lòng nhập mật khẩu']"
                        placeholder="Mật khẩu"
                        :append-inner-icon="isPass ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="isPass = !isPass"
                        :type="isPass ? 'text' : 'password'"
                      ></v-text-field>
                    </div>
                    <div class="mt-3">
                      <p class="mb-2 font-weight-bold">
                        Xác nhận mật khẩu <span class="text-error">*</span>
                      </p>
                      <v-text-field
                        density="compact"
                        v-model="confirmPassword"
                        hide-details="auto"
                        variant="outlined"
                        :rules="[
                          (v) => !!v || 'Xác nhận mật khẩu không được để trống',
                          (v) =>
                            v === data.password ||
                            'Xác nhận mật khẩu không trùng khớp',
                        ]"
                        placeholder="Xác nhận mật khẩu"
                        :append-inner-icon="
                          isConfirmPass ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        @click:append-inner="isConfirmPass = !isConfirmPass"
                        :type="isConfirmPass ? 'text' : 'password'"
                      ></v-text-field>
                    </div>
                  </v-form>
                  <div class="mt-4">
                    <v-btn color="#01c4c4" class="text-white" @click="register">
                      Đăng ký</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

const initData = {
  fullname: null,
  username: null,
  email: null,
  phone: null,
  avartar: null,
  password: null,
  purchase: 0,
  roleId: "user",
  dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
};
export default {
  data() {
    return {
      data: { ...initData },
      isPass: false,
      confirmPassword: null,
      isConfirmPass: false,
    };
  },
  methods: {
    forwardPass() {
      alert("Gọi  0999 27 27 27 để được hỗ trợ");
    },
    async register() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) return;

      this.$axios
        .post(`http://localhost:9091/api/v1/user/register`, {
          ...this.data,
        })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            this.$notify({
              title: "Đăng ký thành công",
              type: "success",
            });
            this.data = { ...initData };
            this.confirmPassword = null;
            this.isPass = false;
            this.isConfirmPass = false;
            this.$router.push("/dang-nhap");
          }
        })
        .catch((err) => {
          this.$notify({
            title: "Tên đăng nhập hoặc số điện thoại đã tồn tại",
            type: "warn",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-account {
  margin-bottom: 15px;
  h3 {
    background-color: #373737;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    padding: 15px 10px;
    text-transform: uppercase;
    margin: 0;
    border-left: 5px solid #01c4c4;
  }
  ul {
    border: 1px solid #dddddd;
    padding: 10px;
    list-style-type: none;
  }
  a {
    color: #6a6a6a;
    font-weight: normal;
    border-bottom: 1px dotted #c3c3c3;
    display: block;
    position: relative;
    padding: 10px 15px;
    text-decoration: none;
  }
}

.title-login {
  border-bottom: 2px solid #01c4c4;
  padding-bottom: 5px;
}
</style>
