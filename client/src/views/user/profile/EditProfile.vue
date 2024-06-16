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
                <span class="text-blue-green">Hồ sơ cá nhân</span>
              </p>
              <h3 class="text-uppercase mt-2 title-breadcrumbs">
                Hồ sơ của tôi
              </h3>
            </div>
          </v-col>
          <v-col cols="12">
            <v-row class="ma-0">
              <v-col cols="12">
                <v-form ref="form_profile">
                  <v-row class="ma-0">
                    <v-col class="px-0" cols="4" align-self="center">
                      <div class="d-flex justify-content-end">
                        <span class="op-7">Tên đăng nhập</span>
                      </div>
                    </v-col>
                    <v-col class="px-0" cols="8">
                      <p>{{ userName }}</p>
                    </v-col>
                    <v-col class="px-0" cols="4" align-self="center">
                      <div class="d-flex justify-content-end">
                        <span class="op-7">Mật khẩu</span>
                      </div>
                    </v-col>
                    <v-col class="px-0" cols="8">
                      <v-tooltip v-model="show" location="top">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            v-bind="props"
                            variant="text"
                            color="#01c4c4"
                            density="default"
                            icon="mdi-pencil-box-multiple-outline"
                            @click="dialogPassword = true"
                          ></v-btn>
                        </template>
                        <span>Cập nhật mật khẩu</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
              <v-col cols="12" md="4"> </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
  <v-dialog
    transition="dialog-top-transition"
    width="600"
    v-model="dialogPassword"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="#01c4c4" title="Cập nhật mât khẩu"></v-toolbar>
        <v-card-text>
          <v-form ref="form_password">
            <v-row class="ma-0">
              <v-col class="px-0" cols="12" align-self="center">
                <v-text-field
                  v-model="currentPass"
                  placeholder="Mật khẩu cũ"
                  hide-details="auto"
                  density="comfortable"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  variant="outlined"
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col class="px-0" cols="12" align-self="center">
                <v-text-field
                  v-model="newPassword"
                  placeholder="Mật khẩu mới"
                  hide-details="auto"
                  density="comfortable"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  :append-inner-icon="isPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="isPass = !isPass"
                  variant="outlined"
                  :type="isPass ? 'text' : 'password'"
                ></v-text-field>
              </v-col>
              <v-col class="px-0" cols="12" align-self="center">
                <v-text-field
                  v-model="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  hide-details="auto"
                  density="comfortable"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  :append-inner-icon="isComfirmPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="isComfirmPass = !isComfirmPass"
                  variant="outlined"
                  :type="isComfirmPass ? 'text' : 'password'"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="outlined" color="#01c4c4" @click="changePassword"
            >Xác nhận</v-btn
          >
          <v-btn variant="outlined" color="red" @click="closeDialogPass"
            >Đóng</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isPass: false,
      isComfirmPass: false,
      currentPass: "",
      newPassword: "",
      confirmPassword: "",
      account: null,
      //
      accountId: null,
      userName: null,
      fullName: null,
      email: null,
      phone: null,
      address: null,

      //
      dataSession: null,
      dialogPassword: false,
      show: false,
    };
  },
  created() {
    // let lcStore = localStorage.getItem("user");
    if (JSON.parse(localStorage.getItem("user"))) {
      this.dataSession = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$notify({
        title: "Vui lòng đăng nhập",
        type: "warn",
      });
      this.$router.push("/dang-nhap");
    }
  },
  methods: {
    closeDialogPass() {
      this.dialogPassword = false;
      this.currentPass = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },
    // async save() {
    //   const { valid } = await this.$refs.form_profile.validate();

    //   if (!valid) return;

    //   let { userName, fullName, email, phone, address } = this;

    //   this.$axios
    //     .put(`${this.$gAPI}/Account/Update/${this.accountId}`, {
    //       userName,
    //       fullName,
    //       email,
    //       phone,
    //       address,
    //     })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         this.$notify({
    //           title: "Cập nhật thành công",
    //           type: "success",
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       this.$notify({
    //         title: "Có lỗi sảy ra vui lòng thử lại",
    //         type: "warn",
    //       });
    //     });
    // },
    // async changePassword() {
    //   const { valid } = await this.$refs.form_password.validate();

    //   if (!valid) return;

    //   this.$axios
    //     .get(`${this.$gAPI}/Account/GetById/${this.accountId}`)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         if (res.data.password === this.currentPass) {
    //           if (res.data.password !== this.newPassword) {
    //             if (this.newPassword === this.confirmPassword) {
    //               this.$axios
    //                 .put(`${this.$gAPI}/Account/Update/${this.accountId}`, {
    //                   password: this.newPassword,
    //                 })
    //                 .then((res) => {
    //                   if (res.status === 200) {
    //                     this.$notify({
    //                       title: "Thay đổi mật khẩu thành công",
    //                       type: "success",
    //                     });
    //                     this.dialogPassword = false;
    //                     this.currentPass = "";
    //                     this.newPassword = "";
    //                     this.confirmPassword = "";
    //                     // this.currentPass = "";
    //                     // this.newPassword = "";
    //                     // this.confirmPassword = "";
    //                     // this.$refs.form_password.resetValidation();
    //                   }
    //                 });
    //             } else {
    //               this.$notify({
    //                 title: "Mật khẩu mới và xác mật khẩu không trùng khớp",
    //                 type: "warn",
    //               });
    //             }
    //           } else {
    //             this.$notify({
    //               title: "Mật khẩu mới không thể trùng mật khẩu cũ!",
    //               type: "error",
    //             });
    //           }
    //         } else {
    //           this.$notify({
    //             title: "Mật khẩu không chính xác",
    //             type: "warn",
    //           });
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       this.$notify({
    //         title: "Cố lỗi sảy ra!",
    //         type: "error",
    //       });
    //     });
    // },
    async changePassword() {
      try {
        const { valid } = await this.$refs.form_password.validate();
        if (!valid) return;
        const token = localStorage.getItem("token");
        const userResponse = await this.$axios.get(
          "http://localhost:9091/api/v1/auth/userinfo",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        const accountId = userResponse.data.EM.userId;

        console.log(`${accountId}`);
        const response = await this.$axios.put(
          "http://localhost:9091/api/v1/user/change_pass",
          {
            userid: `${accountId}`,
            currentpassword: this.currentPass.trim(),
            newpassword: this.newPassword.trim(),
          }
        );
        if (response.data.EC == 0) {
          this.$notify({
            title: "Thay đổi mật khẩu thành công",
            type: "success",
          });
          this.dialogPassword = false;
          this.currentPass = "";
          this.newPassword = "";
          this.confirmPassword = "";
        } else {
          this.$notify({
            title: "Mật khẩu không chính xác",
            type: "warn",
          });
        }
      } catch (error) {
        console.log(error);
        this.$notify({
          title: error.response.data.error.EM,
          type: "error",
        });
      }
    },
  },
  watch: {
    // dataSession(value) {
    //   if (value.accountId) {
    //     this.$axios
    //       .get(`${this.$gAPI}/Account/GetById/${value.accountId}`)
    //       .then((res) => {
    //         this.account = res.data;
    //         this.userName = res.data.userName;
    //         this.fullName = res.data.fullName;
    //         this.email = res.data.email;
    //         this.phone = res.data.phone;
    //         this.address = res.data.address;
    //         this.accountId = res.data.accountId;
    //       })
    //       .catch((err) => {
    //         this.$notify({
    //           title: "Cố lỗi sảy ra!",
    //           type: "error",
    //         });
    //       });
    //   }
    //   //   this.account = value;
    // },
  },
};
</script>

<style></style>
