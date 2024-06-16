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
                <span class="text-blue-green">Đăng nhập</span>
              </p>
              <h3 class="text-uppercase mt-2 title-login">
                Đăng nhập hệ thống
              </h3>
            </div>
            <div>
              <v-row class="ma-0" justify="center">
                <v-col cols="12" sm="10" md="5">
                  <v-form ref="form">
                    <div>
                      <p class="mb-2 font-weight-bold">
                        Tên đăng nhập <span class="text-error">*</span>
                      </p>
                      <v-text-field
                        v-model="valueInput"
                        density="compact"
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
                        v-model="password"
                        density="compact"
                        hide-details="auto"
                        variant="outlined"
                        type="password"
                        :rules="[(v) => !!v || 'Vui lòng nhập mật khẩu']"
                        placeholder="Mật khẩu"
                      ></v-text-field>
                    </div>
                    <div class="mt-4">
                      <v-btn
                        color="#01c4c4"
                        class="text-white"
                        @click="checkAccount"
                      >
                        Đăng nhập</v-btn
                      >
                      <span class="ml-2 fs-12 text-login-a"
                        >Quên mật khẩu ?</span
                      >
                    </div>
                  </v-form>
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
// import { useCartStore } from "@/store/cart.js";
import { useCartStore } from "@/store/cart.js";

export default {
  components: {},
  data() {
    return {
      valueInput: "",
      password: "",
      dataSession: null,
    };
  },

  beforeCreate() {},
  computed: {
    cart() {
      return useCartStore();
    },
  },
  methods: {
    async checkAccount() {
      if (!this.valueInput || !this.password) {
        this.$notify({
          title: "Vui lòng nhập tên người dùng và mật khẩu",
          type: "warn",
        });
        return;
      }

      console.log("Value Input:", this.valueInput);
      console.log("Password:", this.password);

      try {
        // Bắt đầu quá trình đăng nhập
        const loginResponse = await this.$axios.post(
          "http://localhost:9091/api/v1/auth/login",
          {
            valueInput: this.valueInput.trim(),
            password: this.password.trim(),
          }
        );

        const token = loginResponse.data.token;
        localStorage.setItem("token", token);

        const userResponse = await this.$axios.get(
          "http://localhost:9091/api/v1/auth/userinfo",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        console.log(userResponse);
        const user = {
          accountId: userResponse.data.EM.userId,
          userName: userResponse.data.EM.userName,
          fullName: userResponse.data.EM.fullName,
          email: userResponse.data.EM.email,
          phone: userResponse.data.EM.phone,
          // avartar: userResponse.data.avartar,
          roleId: userResponse.data.EM.role,
        };
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));

        this.$notify({
          title: "Đăng nhập thành công",
          type: "success",
        });
        this.cart.isAccount = true;
        this.$router.push("/").then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error(
          "Login failed:",
          error.response ? error.response.data : error
        );
        this.$notify({
          title:
            "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.",
          type: "error",
        });
      }
    },
    forwardPass() {
      alert("Gọi  0999 27 27 27 để được hỗ trợ");
    },
  },
  // async checkAccount() {
  //   const { valid } = await this.$refs.form.validate();
  //   if (!valid) return;

  //   this.$axios
  //     .get(`${this.$gAPI}/Account/GetByName/${this.userName}`)
  //     .then((res) => {
  //       if (res.data.password === this.password) {
  //         let user = {
  //           accountId: res.data.accountId,
  //           userName: res.data.userName,
  //           fullName: res.data.fullName,
  //           email: res.data.email,
  //           phone: res.data.phone,
  //           address: res.data.address,
  //           avartar: res.data.avartar,
  //           roleId: res.data.roleId,
  //         };
  //         // alert("Đăng nhập thành công");
  //         localStorage.setItem("user", JSON.stringify(user));

  //         this.dataSession = JSON.parse(localStorage.getItem("user"));

  //         if (this.dataSession) {
  //           this.$notify({
  //             title: "Đăng nhập thành công",
  //             type: "success",
  //           });
  //           this.cart.getCartByAccountId(this.dataSession.accountId);
  //           this.cart.isAccount = true;
  //           this.$router.push("/");
  //         }
  //         // window.location.href = "/";
  //       } else {
  //         this.$notify({
  //           title: "Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản",
  //           type: "warn",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },
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
