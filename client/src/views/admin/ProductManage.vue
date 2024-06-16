<template>
  <div>
    <h2>Quản lý sản phẩm</h2>
    <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card elevation="0">
      <div class="ma-2">
        <v-row>
          <v-col cols="3">
            <v-text-field
              :loading="loading"
              density="compact"
              variant="outlined"
              label="Search..."
              append-inner-icon="mdi-magnify"
              single-line
              flat
              hide-details
              @click:append-inner="onClick"
            ></v-text-field
          ></v-col>
          <v-col cols="9" class="d-flex align-center justify-end">
            <v-btn
              prepend-icon="mdi-plus-circle-outline"
              color="primary"
              class="mr-5"
              @click="dialogCreate = true"
            >
              <template v-slot:prepend>
                <v-icon color="white"></v-icon>
              </template>

              Thêm mới
            </v-btn>
          </v-col>
        </v-row>
        <div>
          <v-data-table
            v-model:page="page"
            :headers="headers"
            :items="data"
            :items-per-page="itemsPerPage"
            hide-default-footer
            height="434"
          >
            <template v-slot:bottom>
              <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </template>
            <template v-slot:item.image="{ item }">
              <v-avatar
                class="my-1"
                v-bind:image="item.columns.image"
                size="50"
              ></v-avatar>
            </template>
            <!-- <template v-slot:item.avatarPath="{ item }">
              <v-avatar
                class="my-1"
                v-bind:src="item.columns.image"
                size="50"
              ></v-avatar> -->
            <!-- </template> -->
            <template v-slot:item.productName="{ item }">
              <div class="text-limit-2" :title="item.columns.productName">
                {{ item.columns.productName }}
              </div>
            </template>
            <template v-slot:item.price="{ item }">
              {{ $fv(item.columns.price) }}
            </template>

            <template v-slot:item.categoryId="{ item }">
              <span
                v-for="category in categories"
                v-bind:key="category.categoryId"
              >
                <span v-if="category.categoryId === item.columns.categoryId">{{
                  category.categoryName
                }}</span>
              </span>
            </template>
            <template v-slot:item.brandId="{ item }">
              <span v-for="brand in brands" v-bind:key="brand.brandId">
                <span v-if="brand.brandId === item.columns.brandId">{{
                  brand.brandName
                }}</span>
              </span>
            </template>

            <template v-slot:item.productId="{ item }">
              {{ `SP${item.columns.productId}` }}
            </template>
            <template v-slot:item.action="{ item }">
              <div class="d-flex align-center justify-center">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="teal-lighten-1"
                      size="small"
                      v-bind="props"
                      @click="openDetail(item)"
                    >
                      mdi-eye
                    </v-icon>
                  </template>
                  <span>Xem chi tiết</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="primary"
                      size="small"
                      v-bind="props"
                      class="mx-1"
                      @click="openUpdate(item)"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                  <span>Sửa</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="red"
                      size="small"
                      v-bind="props"
                      @click="openDelete(item)"
                    >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                  <span>Xóa</span>
                </v-tooltip>
              </div>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-card>

    <add-product
      :open="dialogCreate"
      @toggle="dialogCreate = false"
      @ok="getData"
    />

    <detail-product
      :open="dialogDetail"
      :detail="dataDetail"
      @toggle="dialogDetail = false"
      :categories="categories"
      :brands="brands"
      @ok="getData"
    />

    <update-product
      :open="dialogUpdate"
      :detail="dataDetail"
      @toggle="dialogUpdate = false"
      @ok="getData"
    />

    <yes-no-alert
      :open="dialogDelete"
      @toggle="dialogDelete = false"
      @confirm="confirmDelete"
      mess="Bạn có chắc chắn xóa sản phẩm này?"
    />
  </div>
</template>

<script>
import AddProduct from "@/components/admin/product-manage/AddProduct.vue";
import DetailProduct from "@/components/admin/product-manage/DetailProduct.vue";
import UpdateProduct from "@/components/admin/product-manage/UpdateProduct.vue";

export default {
  components: { AddProduct, DetailProduct, UpdateProduct },
  data: () => ({
    loaded: false,
    loading: false,
    show: false,
    breadcrumbs: [
      {
        title: "Home",
        disabled: false,
        to: "/admin/",
      },
      {
        title: "Quản lý sản phẩm",
        disabled: false,
      },
      {
        title: "Sản phẩm",
        disabled: true,
      },
    ],
    page: 1,
    itemsPerPage: 7,
    headers: [
      { title: "", key: "image", sortable: false, align: "center" },
      { title: "Mã sản phẩm", key: "productId", sortable: false },
      { title: "Tên sản phẩm", key: "name", sortable: false },
      { title: "Giá gốc", key: "price", sortable: false },
      { title: "Số lượng", key: "stock", sortable: false },
      { title: "Loại", key: "categoryId", sortable: false },
      { title: "Thương hiệu / Nguồn", key: "brandId", sortable: false },

      {
        title: "Chức năng",
        key: "action",
        sortable: false,
        align: "center",
      },
    ],
    data: [],
    dataDetail: null,
    dialogCreate: false,
    dialogDetail: false,
    dialogUpdate: false,
    dialogDelete: false,
    // url: "https://localhost:44393/api/Product/GetImageByPath?path=",
    categories: [],
    brands: [],
  }),
  async mounted() {
    await this.getData();
    // await this.getCategories();
    // await this.getBrands();
  },
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
    async getData() {
      try {
        const res = await this.$axios.get(
          `http://localhost:9091/api/v1/product/getAll`
        );
        this.data = res.data.EM.map((product) => ({
          ...product,
          // categoryName: product.Category.categoryName,
          // brandName: product.Brand.brandName,
        }));
        // Log đường dẫn ảnh từ dữ liệu
        // this.data.forEach((item) => {
        //   console.log("Đường dẫn ảnh:", item.image);
        // });
        const categoriesSet = new Set();
        const brandsSet = new Set();

        this.data.forEach((product) => {
          if (product.Category) {
            categoriesSet.add(JSON.stringify(product.Category));
          }
          if (product.Brand) {
            brandsSet.add(JSON.stringify(product.Brand));
          }
        });

        this.categories = Array.from(categoriesSet).map((item) =>
          JSON.parse(item)
        );
        this.brands = Array.from(brandsSet).map((item) => JSON.parse(item));

        console.log("Categories:", this.categories);
        console.log("Brands:", this.brands);
      } catch (err) {
        console.log(err);
      }
    },

    // async getData() {
    //   try {
    //     const res = await this.$axios.get(
    //       `http://localhost:9091/api/v1/product/getAll`
    //     );
    //     this.data = res.data.EM;
    //     this.categories = this.data[0].Category;
    //     console.log("check", this.categories);
    //     // console.log(this.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    // async getCategories() {
    //   try {
    //     // const res = await this.$axios.get(`${this.$gAPI}/Category/List`);
    //     // this.categories = res.data;
    //     const res = await this.$axios.get(
    //       `http://localhost:9091/api/v1/product/getAll`
    //     );
    //     this.categories = res.data.EM.Category;
    //     console.log("check", this.categories);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async getBrands() {
    //   try {
    //     const res = await this.$axios.get(`${this.$gAPI}/Brand/List`);
    //     this.brands = res.data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    openDetail(item) {
      console.log(item.Brand); // Kiểm tra dữ liệu Brand của item
      this.dataDetail = item.selectable;
      this.dialogDetail = true;
    },
    openDelete(item) {
      this.dataDetail = item.selectable;
      this.dialogDelete = true;
    },

    openUpdate(item) {
      this.dataDetail = item.selectable;
      this.dialogUpdate = true;
    },

    async confirmDelete() {
      try {
        const res = await this.$axios.delete(
          `http://localhost:9091/api/v1/product/delete/${this.dataDetail.productId}`
        );
        if (res.status === 200) {
          this.dialogDelete = false;
          this.getData();
          this.$notify({
            title: "Xóa thành công",
            type: "success",
          });
          this.$notify({
            title: "Xóa thành công",
            type: "success",
          });
        }
      } catch (error) {
        this.dialogDelete = false;
        this.$notify({
          title: "Có lỗi sảy ra! vui lòng thử lại",
          type: "error",
        });
      }
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    },
  },
};
</script>
<style></style>
