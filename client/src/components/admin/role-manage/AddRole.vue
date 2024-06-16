<template>
  <v-dialog
    transition="dialog-top-transition"
    width="600"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Thêm mới phân quyền"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="role.roleId"
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Mã phân quyền *"
                  prepend-inner-icon="mdi-account-lock"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="role.roleName"
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Tên phân quyền *"
                  required
                  prepend-inner-icon="mdi-account-alert"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-textarea
                  v-model="role.description"
                  density="compact"
                  variant="outlined"
                  label="Mô tả / ghi chú"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="outlined" color="success" @click="submit"
            >Thêm mới</v-btn
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
  },
  data() {
    return {
      role: {
        roleId: "",
        roleName: "",
        description: "",
      },
    };
  },
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();

      try {
        if (valid) {
          const res = await this.$axios.post(
            `${this.$gAPI}/Role/Store`,
            this.role
          );
          if (res.status === 200) {
            this.$emit("toggle");
            this.$emit("ok");
            this.$notify({
              title: "Thêm thành công",
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
      if (!newVal) {
        this.$refs.form?.reset();
        this.$refs.form?.resetValidation();
      }
    },
  },
};
</script>

<style></style>
