<template>
  <v-dialog
    transition="dialog-top-transition"
    width="600"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Cập nhật tài khoản"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="userName"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Tên đăng nhập*"
                  required
                  readonly
                  class="c-readonly"
                  prepend-inner-icon="mdi-account-box"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="fullName"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Họ tên *"
                  prepend-inner-icon="mdi-account"
                  required
                ></v-text-field>
              </v-col>

              <!-- <v-col cols="12" md="6">
                <v-text-field
                  v-model="password"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Mật khẩu*"
                  type="password"
                  required
                  class="c-readonly"
                  prepend-inner-icon="mdi-lock"
                ></v-text-field>
              </v-col> -->
              <!-- <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="roleId"
                  :items="listRoles"
                  label="Phân quyền"
                  hide-details="auto"
                  placeholder="- Chọn phân quyền -"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  density="compact"
                  item-value="roleId"
                  item-title="roleName"
                  variant="outlined"
                  required
                  prepend-inner-icon="mdi-account-alert"
                ></v-autocomplete>
              </v-col> -->

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="email"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Email*"
                  prepend-inner-icon="mdi-email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="phone"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Số điện thoại *"
                  prepend-inner-icon="mdi-phone"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="dateTime"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  label="Ngày đăng ký *"
                  type="datetime-local"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="">
                <v-textarea
                  v-model="address"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  label="Địa chỉ"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="outlined" color="success" @click="submit"
            >Cập nhật</v-btn
          >
          <v-btn variant="outlined" color="red" @click="$emit('toggle')"
            >Đóng</v-btn
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
      listRoles: [],
      userName: "",
      fullName: "",
      email: "",
      avartar: "",
      password: "",
      phone: "",
      address: "",
      purchase: null,
      dateTime: "",
      roleId: null,
    };
  },
  created() {},
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();
      let update = {
        userName: this.userName,
        fullName: this.fullName,
        email: this.email,
        avartar: this.avartar,
        password: this.password,
        phone: this.phone,
        address: this.address,
        purchase: this.purchase,
        dateTime: this.dateTime,
        // roleId: this.roleId, // Thêm lại trường roleId
      };
      try {
        if (valid) {
          const res = await this.$axios.put(
            `http://localhost:9091/api/v1/admin/update/${this.detail.userId}`,
            update
          );
          if (res.data.EC == 0) {
            this.$emit("toggle");
            this.$emit("ok");
            this.$notify({
              title: "Cập nhật thành công",
              type: "success",
            });
          }
        }
      } catch (err) {
        console.log(err);
        this.$emit("toggle");
        this.$notify({
          title: err.response.data.error.EM,
          type: "error",
        });
      }
    },
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.userName = this.detail?.userName;
        this.fullName = this.detail?.fullName;
        this.email = this.detail?.email;
        this.avartar = this.detail?.avartar;
        this.password = this.detail?.password;
        this.phone = this.detail?.phone;
        this.address = this.detail?.address;
        this.purchase = this.detail?.purchase;
        this.dateTime = this.detail?.dateTime;
        this.roleId = this.detail?.roleId;
      }
    },
  },
};
</script>

<style></style>
