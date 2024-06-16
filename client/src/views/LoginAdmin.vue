<template>
  <div>
    <div class="maxWidth">
      <div>
        <v-row class="ma-0" justify="center" style="min-height: 90vh">
          <v-col cols="8" align-self="center">
            <div class="">
              <v-row class="ma-0" justify="center">
                <v-col cols="auto">
                  <h2 class="text-uppercase">Đăng nhập vào hệ thống</h2>
                </v-col>
              </v-row>
              <v-row class="ma-0 mt-3" justify="center">
                <v-col cols="12" md="10" lg="8">
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
                      <v-btn width="100%" color="#4a90e2" @click="checkAccount">
                        Đăng nhập</v-btn
                      >
                    </div>
                  </v-form>
                </v-col>
              </v-row>
              <v-row class="ma-0" justify="center">
                <v-col cols="auto">
                  <p class="op-5 fs-12">Hoặc đăng nhập với</p>
                </v-col>
              </v-row>
              <v-row class="ma-0" justify="center">
                <v-col cols="auto" class="pt-0">
                  <p class="op-5 fs-10">Đang cập nhật...</p>
                </v-col>
              </v-row>
              <v-row class="ma-0" justify="center">
                <v-col cols="12" md="10" lg="8">
                  <p class="">Tổng đài hỗ trợ khách hàng: <b>1200 1212</b></p>
                  <p>
                    Hỗ trợ khách hàng các ngày trong tuần từ Thứ Hai đến Chủ
                    nhật (từ 8h00 – 22h00 hàng ngày)
                  </p>
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
export default {
  data() {
    return {
      valueInput: "",
      password: "",
    };
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

      try {
        // Bắt đầu quá trình đăng nhập
        const loginResponse = await this.$axios.post(
          "http://localhost:9091/api/v1/auth/login",
          {
            valueInput: this.valueInput.trim(),
            password: this.password.trim(),
          }
        );
        console.log(loginResponse.data.EC);
        if (loginResponse.data.EC !== 0) {
          this.$notify({
            title:
              "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.",
            type: "error",
          });
          return;
        }

        const token = loginResponse.data.token;
        localStorage.setItem("token", token);

        // Lấy thông tin người dùng sử dụng token để xác thực
        const userResponse = await this.$axios.get(
          "http://localhost:9091/api/v1/auth/userinfo",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );

        const userData = userResponse.data.EM;
        const user = {
          accountId: userData.userId,
          userName: userData.userName,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          // avatar: userData.avatar,
          roleId: userData.role,
        };

        localStorage.setItem("user", JSON.stringify(user));

        if (user.roleId === 1) {
          this.$notify({
            title: "Đăng nhập thành công",
            type: "success",
          });
          // this.cart.isAccount = true;
          this.$router.push("/admin");
        } else {
          // Xử lý logic khác nếu không phải roleId là 1, ví dụ:
          this.$notify({
            title: "Bạn không có quyền truy cập vào trang quản trị",
            type: "warn",
          });
          // Có thể chuyển hướng hoặc thực hiện hành động khác tùy yêu cầu
        }
      } catch (error) {
        console.error(
          "Login failed:",
          error.response ? error.response.data : error
        );
        this.$notify({
          title:
            "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập2.",
          type: "error",
        });
      }
    },

    forwardPass() {
      alert("Gọi  0999 27 27 27 để được hỗ trợ");
    },
  },
};
</script>

<style></style>
