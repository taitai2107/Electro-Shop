<template>
  <v-dialog
    transition="dialog-top-transition"
    width="600"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Thêm mới loại sản phẩm"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="ma-0">
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="category.categoryName"
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Loại sản phẩm *"
                  prepend-inner-icon="mdi-cart-variant"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="category.icon"
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Icon *"
                  prepend-inner-icon="mdi-label"
                  required
                ></v-text-field>
              </v-col> -->
              <!-- <v-col cols="12" md="6" class="pt-0" align-self="center">
                Xem Icon
                <span class="cp text-price-red" @click="openNewTab"
                  >Tại đây</span
                >
              </v-col> -->
              <v-col cols="12" class="pt-0">
                <v-textarea
                  v-model="category.description"
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
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      category: {
        categoryName: "",
        description: "",
        // icon: "",
      },
    };
  },
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();

      try {
        if (valid) {
          const res = await this.$axios.post(
            `http://localhost:9091/api/v1/category/create`,
            this.category
          );
          if (res.status === 200 || res.status === 204) {
            this.$emit("toggle");
            this.$emit("ok");
            this.$notify({
              title: "Thêm loại sản phẩm thành công",
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
    openNewTab() {
      window.open("https://mdisearch.com/", "_blank", "noreferrer");
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
