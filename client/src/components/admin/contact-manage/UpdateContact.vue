<template>
  <v-dialog
    transition="dialog-top-transition"
    width="700"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Cập nhật liên hệ"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="fullName"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Người liên hệ *"
                  required
                  prepend-inner-icon="mdi-account-box"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="email"
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
                  v-model="phone"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Số điện thoại *"
                  required
                  prepend-inner-icon="mdi-phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="status"
                  density="compact"
                  variant="outlined"
                  :items="itemStatus"
                  item-value="value"
                  item-title="text"
                  hide-details="auto"
                  label="Trạng thái *"
                  required
                  prepend-inner-icon="mdi-phone"
                ></v-select>
              </v-col>

              <v-col cols="12" class="">
                <v-textarea
                  v-model="comment"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  label="Ghi chú"
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
      required: true,
      default: false,
    },
  },
  data() {
    return {
      fullName: "",
      email: "",
      phone: "",
      comment: "",
      status: null,
      listRoles: [],
      itemStatus: [
        {
          text: "Chưa kết nối",
          value: 1,
        },
        {
          text: "Kết nối lại",
          value: 2,
        },
        {
          text: "Đã kết nối",
          value: 3,
        },
      ],
    };
  },
  async mounted() {},
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();
      const { fullName, email, phone, comment, status } = this;
      try {
        if (valid) {
          const res = await this.$axios.put(
            `${this.$gAPI}/Contact/Update/${this.detail.contactId}`,
            {
              fullName,
              email,
              phone,
              comment,
              status,
            }
          );
          if (res.status === 200) {
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
          title: "Có lỗi sảy ra! vui lòng thử lại",
          type: "error",
        });
      }
    },
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.fullName = this.detail.fullName;
        this.email = this.detail.email;
        this.phone = this.detail.phone;
        this.comment = this.detail.comment;
        this.status = this.detail.status;
      } else {
        this.$refs.form?.resetValidation();
      }
    },
  },
};
</script>

<style></style>
