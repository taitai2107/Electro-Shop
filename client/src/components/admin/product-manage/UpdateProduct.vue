<template>
  <v-dialog
    transition="dialog-top-transition"
    width="800"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Cập nhật sản phẩm"></v-toolbar>
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
                    v-bind:src="$gImgProduct + AvatarResponse"
                    cover
                    alt="Product Image"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="productName"
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
                  v-model="price"
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

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="saleOf"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[
                    (v) =>
                      (!isNaN(v) && v >= 0) ||
                      'Giảm giá phải lớn hơn hoặc bằng 0',
                  ]"
                  label="giảm giá (%) *"
                  prepend-inner-icon="mdi-sale"
                  required
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="quantity"
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
              <v-col cols="12" md="6">
                <v-select
                  v-model="status"
                  label="Trạng thái"
                  :items="statuses"
                  item-value="value"
                  hide-details="auto"
                  item-title="text"
                  variant="outlined"
                  prepend-inner-icon="mdi-list-status"
                  density="compact"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="categoryId"
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
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="brandId"
                  :items="brands"
                  label="Thương hiệu / nguồn"
                  hide-details="auto"
                  placeholder="- Chọn thương hiệu / nguồn -"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  density="compact"
                  item-value="brandId"
                  item-title="brandName"
                  prepend-inner-icon="mdi-bootstrap"
                  variant="outlined"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Chọn ảnh sửa sản phẩm"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  prepend-inner-icon="mdi-image-album"
                  @change="uploadFile"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="">
                <p class="c-label-editor">Đặc tính</p>
                <ckeditor :editor="editor" v-model="features"></ckeditor>
              </v-col>

              <v-col cols="12" class="">
                <p class="c-label-editor">Mô tả</p>
                <ckeditor :editor="editor" v-model="description"></ckeditor>
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
    detail: {
      type: Array,
      required: true,
      default: {},
    },
  },
  data() {
    return {
      productName: "", //
      features: "", //
      description: "", //
      saleOf: null, //
      price: null, //
      quantity: null, //
      sold: null, //auto
      avatarPath: "",
      status: null,
      dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      categoryId: null,
      brandId: null,
      categories: [],
      brands: [],
      AvatarResponse: "",
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
    };
  },
  async mounted() {},
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();

      try {
        if (valid) {
          const {
            productName,
            features,
            description,
            saleOf,
            price,
            quantity,
            sold,
            AvatarResponse,
            status,
            dateTime,
            categoryId,
            brandId,
          } = this;
          const res = await this.$axios.put(
            `${this.$gAPI}/Product/Update/${this.detail.productId}`,
            {
              productName,
              features,
              description,
              saleOf: Number(saleOf),
              price: Number(price),
              quantity: Number(quantity),
              sold: Number(sold),
              avatarPath: AvatarResponse,
              status,
              dateTime,
              categoryId,
              brandId,
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

    uploadFile(event) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append("formFile", file);

      if (file !== null) {
        this.$axios
          .post(`${this.$gAPI}/Product/Upload`, formData, {})
          .then((res) => {
            this.AvatarResponse = this.$linkIProduct + res.data.name;
            console.log(res);
          });
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
    open(val) {
      if (val) {
        this.getBrands();
        this.getCategories();
        this.productName = this.detail.productName;
        this.features = this.detail.features;
        this.description = this.detail.description;
        this.saleOf = this.detail.saleOf;
        this.price = this.detail.price;
        this.quantity = this.detail.quantity;
        this.sold = this.detail.sold;
        this.avatarPath = this.detail.avatarPath;
        this.status = this.detail.status;
        this.dateTime = this.detail.dateTime;
        this.categoryId = this.detail.categoryId;
        this.brandId = this.detail.brandId;
        this.AvatarResponse = this.detail.avatarPath;
      }
    },
  },
};
</script>

<style></style>
