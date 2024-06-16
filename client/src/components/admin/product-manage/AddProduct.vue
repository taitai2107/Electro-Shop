<template>
  <v-dialog
    transition="dialog-top-transition"
    width="800"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Thêm mới sản phẩm"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" align="center">
                <v-avatar size="120" v-if="!AvatarResponse">
                  <v-img
                    src="@/assets/product_default.png"
                    cover
                    alt="Product Image"
                  />
                </v-avatar>
                <v-avatar size="120" v-else>
                  <v-img
                    v-bind:src="AvatarResponse"
                    cover
                    alt="Product Image"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="product.productName"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Tên sản phẩm *"
                  prepend-inner-icon="mdi-wallet-giftcard"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="product.price"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[
                    (v) =>
                      (!isNaN(v) && v >= 0) || 'Giá phải lớn hơn hoặc bằng 0',
                  ]"
                  label="Giá (VNĐ) *"
                  prepend-inner-icon="mdi-cash"
                  required
                  type="number"
                ></v-text-field>
              </v-col>

              <!-- <v-col cols="12" md="6">
                <v-text-field
                  v-model="product.saleOf"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[
                    (v) =>
                      (!isNaN(v) && v >= 0) ||
                      'Giảm giá phải lớn hơn hoặc bằng 0',
                    (v) => (!isNaN(v) && v <= 100) || '% không qua 100',
                  ]"
                  label="giảm giá (%) *"
                  prepend-inner-icon="mdi-sale"
                  required
                  type="number"
                ></v-text-field>
              </v-col> -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="product.quantity"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[
                    (v) =>
                      (!isNaN(v) && v >= 0) ||
                      'Số lượng phải lớn hơn hoặc bằng 0',
                  ]"
                  label="Số lượng nhập *"
                  prepend-inner-icon="mdi-counter"
                  required
                  type="number"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="6">
                <v-select
                  v-model="product.status"
                  label="Trạng thái"
                  :items="statuses"
                  item-value="value"
                  hide-details="auto"
                  item-title="text"
                  variant="outlined"
                  prepend-inner-icon="mdi-list-status"
                  density="compact"
                ></v-select>
              </v-col> -->

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="product.categoryId"
                  :items="categories"
                  label="Loại sản phẩm"
                  hide-details="auto"
                  placeholder="- Chọn loại sản phẩm -"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  density="compact"
                  item-value="categoryId"
                  item-title="categoryName"
                  prepend-inner-icon="mdi-shape-plus"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="product.brandId"
                  :items="brands"
                  label="Thương hiệu"
                  hide-details="auto"
                  placeholder="- Chọn thương hiệu -"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  density="compact"
                  item-value="brandId"
                  item-title="brandName"
                  prepend-inner-icon="mdi-bootstrap"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Chọn ảnh sản phẩm"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  prepend-inner-icon="mdi-image-album"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  @change="handleFileChange"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" class="">
                <p class="c-label-editor">Đặc tính</p>
                <ckeditor
                  :editor="editor"
                  v-model="product.features"
                ></ckeditor>
              </v-col> -->

              <v-col cols="12" class="">
                <p class="c-label-editor">Mô tả</p>
                <ckeditor
                  :editor="editor"
                  v-model="product.description"
                ></ckeditor>
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
import { format } from "date-fns";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
      product: {
        name: "", //
        features: "", //
        description: "", //
        saleOf: 0, //
        price: 0, //
        stock: 0, //
        sold: 0, //auto
        avatarPath: "",
        status: true,
        dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        categoryId: null,
        brandId: null,
      },
      categories: [],
      brands: [],
      editor: ClassicEditor,
      statuses: [
        {
          text: "Đang bán",
          value: true,
        },
        {
          text: "Ngưng bán",
          value: false,
        },
      ],
      AvatarResponse: "",
      selectedFile: null,
    };
  },
  async mounted() {},
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();

      try {
        if (valid) {
          const formData = new FormData();
          formData.append("name", this.product.productName);
          formData.append("description", this.product.description);
          formData.append("price", this.product.price);
          formData.append("stock", this.product.quantity);
          formData.append("categoryId", this.product.categoryId);
          formData.append("brandId", this.product.brandId);
          formData.append("image", this.selectedFile); // Sử dụng 'image' để khớp với tên trường tệp trên server

          const res = await this.$axios.post(
            `http://localhost:9091/api/v1/product/create`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
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

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.AvatarResponse = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    async getCategories() {
      try {
        const res = await this.$axios.get(`${this.$gAPI}/Category/List`);
        this.categories = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getBrands() {
      try {
        const res = await this.$axios.get(`${this.$gAPI}/Brand/List`);
        this.brands = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    open(newVal) {
      if (!newVal) {
        this.product.productName = "";
        this.product.features = "";
        this.product.description = "";
        this.product.saleOf = 0;
        this.product.price = 0;
        this.product.quantity = 0;
        this.product.sold = 0;
        this.product.avatarPath = "";
        this.product.status = true;
        // this.product.dateTime = "";
        this.product.categoryId = null;
        this.product.brandId = null;
        this.AvatarResponse = "";
        this.selectedFile = null;
        this.$refs.form?.resetValidation();
      } else {
        this.getBrands();
        this.getCategories();
      }
    },
  },
};
</script>

<style></style>
