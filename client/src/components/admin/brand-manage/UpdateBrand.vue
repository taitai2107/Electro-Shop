<template>
  <v-dialog
    transition="dialog-top-transition"
    width="600"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar
          color="primary"
          title="Cập nhật thương hiệu / nguồn"
        ></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="brandName"
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Tên thương hiệu / nguồn *"
                  prepend-inner-icon="mdi-bootstrap"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="icon"
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Icon *"
                  prepend-inner-icon="mdi-label"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pt-0" align-self="center">
                Xem Icon
                <span class="cp text-price-red" @click="openNewTab"
                  >Tại đây</span
                >
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
      brandName: "",
      description: "",
      icon: "",
    };
  },
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();
      let update = {
        brandName: this.brandName,
        description: this.description,
        icon: this.icon,
      };
      try {
        if (valid) {
          const res = await this.$axios.put(
            `${this.$gAPI}/Brand/Update/${this.detail.brandId}`,
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
          type: "warn",
        });
      }
    },
  },
  watch: {
    open(newVal) {
      if (newVal) {
        // this.$refs.form?.reset();
        // this.$refs.form?.resetValidation();
        this.brandName = this.detail?.brandName;
        this.description = this.detail?.description;
        this.icon = this.detail?.icon;
      }
    },
  },
};
</script>

<style></style>
