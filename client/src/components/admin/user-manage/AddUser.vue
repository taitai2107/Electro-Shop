<template>
  <v-dialog
    transition="dialog-top-transition"
    width="700"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Thêm mới người dùng"></v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row class="mt-2">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="account.username"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Tên đăng nhập*"
                  required
                  prepend-inner-icon="mdi-account-box"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="account.fullname"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Họ tên *"
                  required
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="account.password"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Mật khẩu*"
                  type="password"
                  required
                  prepend-inner-icon="mdi-lock"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="account.roleId"
                  :items="listRoles"
                  label="Phân quyền"
                  hide-details="auto"
                  placeholder="- Chọn phân quyền -"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  density="compact"
                  item-value="roleId"
                  item-title="roleName"
                  variant="outlined"
                  prepend-inner-icon="mdi-account-alert"
                  required
                ></v-autocomplete> -->
              <!-- </v-col> -->

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="account.email"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Email*"
                  required
                  prepend-inner-icon="mdi-email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="account.phone"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Số điện thoại *"
                  required
                  prepend-inner-icon="mdi-phone"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="account.dateTime"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  label="Ngày đăng ký *"
                  type="datetime-local"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="6">
                <v-text-field
                  label="Chọn avartar"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  prepend-inner-icon="mdi-image-album"
                  @change="uploadFile"
                  type="file"
                  accept="image/*"
                ></v-text-field>
              </v-col> -->

              <v-col cols="12" class="">
                <v-textarea
                  v-model="account.address"
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
            >Thêm mới</v-btn
          >
          <v-btn variant="outlined" color="red" @click="closeDialog"
            >Đóng</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { format } from "date-fns";

export default {
  components: {},
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      account: {
        username: "",
        fullname: "",
        email: "",
        avartar: "",
        password: "",
        phone: "",
        address: "",
        purchase: 0,
        dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        roleId: "user",
      },
      listRoles: [],
    };
  },
  async mounted() {
    // await this.getRoles();
  },
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        try {
          const res = await this.$axios.post(
            `http://localhost:9091/api/v1/admin/create`,
            {
              ...this.account,
            }
          );
          if (res.status === 200) {
            this.$emit("toggle");
            this.$emit("ok");
            this.$notify({
              title: "Thêm thành công",
              type: "success",
            });
          }
        } catch (err) {
          console.error(err);
          console.error(err.response.data.error.EM);
          this.$notify({
            title: err.response.data.error.EM,
            type: "error",
          });
        }
      } else {
        this.$notify({
          title: "Vui lòng kiểm tra lại các trường thông tin",
          type: "warning",
        });
      }
    },
    closeDialog() {
      this.$emit("toggle");
      this.resetForm();
    },
    resetForm() {
      this.account = {
        username: "",
        fullname: "",
        email: "",
        avartar: "",
        password: "",
        phone: "",
        address: "",
        purchase: 0,
        dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        // roleId: "user",
      };
      this.$refs.form.resetValidation();
    },
    uploadFile(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("formFile", file);
      if (file !== null) {
        this.account.avartar = file.name;
        this.$axios
          .post(`${this.$gAPI}/Account/Upload`, formData, {})
          .then((res) => {
            console.log(res);
          });
      }
    },
    async getRoles() {
      try {
        const res = await this.$axios.get(`${this.$gAPI}/Role/List`);
        this.listRoles = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    open(newVal) {
      if (!newVal) {
        this.resetForm();
      } else {
        // this.getRoles();
      }
    },
  },
};
</script>

<style scoped></style>
