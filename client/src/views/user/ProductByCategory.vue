<template>
  <div class="mt-4">
    <div class="maxWidth">
      <div>
        <v-row class="ma-0 px-10">
          <v-col cols="12">
            <div>
              <p class="fs-13" @click="$router.push('/')">
                <span class="home-link">Trang chủ</span>
                <v-icon icon="mdi-menu-right" size="small"></v-icon>
                <span class="text-blue-green">{{
                  detaiCategory.categoryName
                }}</span>
              </p>
              <h3 class="text-uppercase mt-2 title-breadcrumbs">
                {{ detaiCategory.categoryName }}
              </h3>
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-0 px-10" justify="end">
          <v-col cols="auto" align="end">
            <p>
              <b class="text-error">{{ lengProduct }}</b> Kết quả
            </p>
          </v-col>
        </v-row>
        <v-row class="ma-0 px-10" v-if="lengProduct">
          <v-col
            cols="6"
            sm="3"
            md="2"
            v-for="(item, i) in listProduct"
            :key="i"
          >
            <v-card
              flat
              class="cp"
              @click="$router.push(`/chi-tiet-sp/${item.productId}`)"
            >
              <v-img :src="item.image" height="200px" cover>
                <v-toolbar color="rgba(0, 0, 0, 0)" v-if="item.saleOf && i < 8">
                  <template v-slot:prepend>
                    <v-btn disabled color="error" variant="elevated">Hot</v-btn>
                  </template>
                </v-toolbar>
                <v-toolbar
                  color="rgba(0, 0, 0, 0)"
                  v-if="item.saleOf && i >= 8"
                >
                  <template v-slot:prepend>
                    <v-btn disabled color="red" variant="elevated">
                      -{{ item.saleOf }}%
                    </v-btn>
                  </template>
                </v-toolbar>
              </v-img>
              <v-card-title class="text-a-primary" :title="item.name">
                {{ item.name }}
              </v-card-title>
              <v-card-subtitle
                class="text-decoration-line-through"
                v-if="item.saleOf"
              >
                {{ $fv(item.price) }}
              </v-card-subtitle>
              <v-card-text class="text-price-red py-1">
                {{
                  item.saleOf ? $fd(item.price, item.saleOf) : $fv(item.price)
                }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="ma-0" justify="center" v-else style="min-height: 40vh">
          <v-col cols="auto" align-self="center" class="d-block" align="center">
            <p>
              Không tồn tại sản phẩm liên quan từ tìm kiếm! vui lòng thử lại
            </p>
            <v-btn
              variant="elevated"
              color="#4a90e2"
              prepend-icon="mdi-arrow-left"
              class="mt-5"
              to="/"
            >
              Trang chủ
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        { text: "Tủ lạnh", icon: "mdi-folder" },
        { text: "Tivi", icon: "mdi-star" },
        { text: "Máy giặt", icon: "mdi-history" },
        { text: "Điều hòa", icon: "mdi-check-circle" },
        { text: "Thông gió", icon: "mdi-upload" },
        { text: "Khác", icon: "mdi-cloud-upload" },
      ],
      page: 1,
      listProduct: [],
      lengProduct: 0,
      listCategory: null,
      listNews: null,
      detaiCategory: {},
    };
  },
  watch: {
    "$route.params.id"(value) {
      if (value) {
        this.getProductByCategory(value);
        this.getDetailCategory(value);
      }
    },
  },
  mounted() {
    this.getProductByCategory(this.$route.params.id);
    this.getDetailCategory(this.$route.params.id);
  },
  methods: {
    getDetailCategory(id) {
      this.$axios
        .get(`http://localhost:9091/api/v1/product/getCateById/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.detaiCategory = res.data.EM;
          }
        })
        .catch((err) => {
          this.$notify({
            title: "Có lỗi xảy ra!",
            type: "error",
          });
        });
    },
    getProductByCategory(id) {
      this.$axios
        .get(`http://localhost:9091/api/v1/product/getCateById/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.listProduct = res.data.EM.Products;
            this.lengProduct = this.listProduct.length;
          }
          console.log("check,", res.data.EM.Products);
          console.log("check2", this.listProduct);
        })
        .catch((err) => {
          this.$notify({
            title: "Có lỗi xảy ra!",
            type: "error",
          });
        });
    },
    getListCategory() {
      this.$axios
        .get(`http://localhost:9091/api/v1/product/getCate`)
        .then((res) => {
          this.listCategory = res.data.EM;
        })
        .catch((err) => {
          this.$notify({
            title: "có lỗi sảy ra",
            type: "error",
          });
        });
    },
    getListNews() {
      this.$axios
        .get(`${this.$gAPI}/News/ListNew`)
        .then((res) => {
          if (res.status === 200) {
            let value = res.data;
            if (value) {
              this.listNews = value.slice(0, 5);
            }
          }
        })
        .catch((err) => {
          this.$notify({
            title: "Có lỗi xảy ra!",
            type: "error",
          });
        });
    },
  },
};
</script>
