<template>
  <v-dialog
    transition="dialog-top-transition"
    width="600"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Cập nhật phân quyền"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="roleId"
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Mã phân quyền *"
                  required
                  readonly
                  class="c-readonly"
                  prepend-inner-icon="mdi-account-lock"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="roleName"
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Tên phân quyền *"
                  prepend-inner-icon="mdi-account-alert"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-textarea
                  v-model="description"
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
      roleId: "",
      roleName: "",
      description: "",
    };
  },
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();
      let update = {
        roleName: this.roleName,
        description: this.description,
      };
      try {
        if (valid) {
          const res = await this.$axios.put(
            `${this.$gAPI}/Role/Update/${this.detail.roleId}`,
            update
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
        // this.$refs.form?.reset();
        // this.$refs.form?.resetValidation();
        this.roleId = this.detail?.roleId;
        this.roleName = this.detail?.roleName;
        this.description = this.detail?.description;
      }
    },
  },
};
</script>

<style></style>
