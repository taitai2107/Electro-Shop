<template>
  <div>
    <div class="maxWidth">
      <div>
        <v-row class="ma-0">
          <v-col
            cols="3"
            class="only-than-md"
            style="border-right: 1px solid #e4e4e4"
          >
            <div>
              <h3>DANH MỤC SẢN PHẨM</h3>
              <div class="is-divider"></div>
              <div>
                <v-list :lines="false" density="comfortable" nav>
                  <v-list-item
                    v-for="(item, i) in listCategory"
                    :key="i"
                    :value="item"
                    color="primary"
                    :to="`/san-pham/loai-san-pham/${item.categoryId}`"
                  >
                    <template v-slot:prepend>
                      <v-icon :icon="'mdi-' + item.icon"></v-icon>
                    </template>

                    <v-list-item-title>{{
                      item.categoryName
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </div>
            <div class="mt-3">
              <h3>SẢN PHẨM</h3>
              <div class="is-divider"></div>
              <div>
                <v-row class="ma-0" v-for="(item, i) in listProduct" :key="i">
                  <v-col cols="3" align-self="center">
                    <v-img
                      v-bind:src="$gImgProduct + item.avatarPath"
                      cover
                    ></v-img>
                  </v-col>
                  <v-col cols="9" class="fs-14">
                    <p
                      class="text-uppercase text-a-primary"
                      @click="$router.push(`/chi-tiet-sp/${item.productId}`)"
                    >
                      {{ item.productName }}
                    </p>
                    <p>
                      <span
                        class="text-decoration-line-through op-7"
                        v-if="item.saleOf"
                        >{{ $fv(item.price) }}</span
                      >
                      <b class="ml-2">{{
                        item.saleOf
                          ? $fv(item.price, item.saleOf)
                          : $fv(item.price)
                      }}</b>
                    </p>
                  </v-col>
                </v-row>
              </div>
            </div>
            <div class="mt-3">
              <h3>BÀI VIẾT MỚI NHẤT</h3>
              <div class="is-divider"></div>
              <div>
                <v-row class="ma-0" v-for="(item, i) in listNews" :key="i">
                  <v-col cols="3" class="pa-1" align-self="center">
                    <v-img
                      v-bind:src="$gImgNews + item.imagePath"
                      cover
                    ></v-img>
                  </v-col>
                  <v-col cols="9" class="fs-14">
                    <p
                      class="text-a-primary"
                      @click="$router.push(`/chi-tiet-tin-tuc/${item.newsId}`)"
                    >
                      {{ item.shortDescription }}
                    </p>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="9">
            <v-row class="ma-0">
              <v-col cols="12">
                <div>
                  <p class="fs-13" @click="$router.push('/')">
                    <span class="home-link">Trang chủ</span>
                    <v-icon icon="mdi-menu-right" size="small"></v-icon>
                    <span class="text-blue-green">Sản phẩm</span>
                  </p>
                  <h3 class="text-uppercase mt-2 title-breadcrumbs">
                    Chi tiết sản phẩm
                  </h3>
                </div>
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col cols="12" md="7">
                <v-card flat class="cp">
                  <v-img v-bind:src="detailProduct.image" cover>
                    <v-toolbar
                      color="rgba(0, 0, 0, 0)"
                      v-if="detailProduct.saleOf"
                    >
                      <template v-slot:append>
                        <v-btn disabled color="red" variant="elevated">
                          {{ detailProduct.saleOf }}%</v-btn
                        >
                      </template>
                    </v-toolbar>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="12" md="5">
                <h2>{{ detailProduct.productName }}</h2>
                <p class="op-7">
                  số lượng: <b>{{ detailProduct.stock }}</b>
                </p>
                <div class="is-divider"></div>

                <h2 class="fs-18">
                  <span
                    class="op-5 text-decoration-line-through"
                    v-if="detailProduct.saleOf"
                    >{{ $fv(detailProduct.price) }}</span
                  >
                  <span class="ml-2 text-price-red">{{
                    detailProduct.saleOf
                      ? $fd(detailProduct.price, detailProduct.saleOf)
                      : $fv(detailProduct.price)
                  }}</span>
                </h2>
                <div
                  class="product-short-description ma-2 ml-5"
                  v-html="detailProduct.features"
                ></div>
                <div class="my-5">
                  <v-btn
                    class="text-white"
                    variant="elevated"
                    color="#f86666"
                    @click="
                      addCart(
                        detailProduct.productId,
                        $nvfd(detailProduct.price)
                      )
                    "
                    >Thêm vào giỏ</v-btn
                  >
                </div>
                <div class="mt-5">
                  <v-divider></v-divider>
                  <p class="my-2">Mã: SP{{ detailProduct.productId }}</p>
                  <v-divider></v-divider>
                  <p class="my-2">
                    Danh mục:
                    <b class="my-2">{{
                      detailProduct.Category
                        ? detailProduct.Category.categoryName
                        : ""
                    }}</b>
                    <!-- <span v-for="(item, i) in listCategory" :key="i">
                      <span
                        v-if="detailProduct.categoryId === item.categoryId"
                        >{{ detailProduct.productId }}</span
                      >
                    </span> -->
                  </p>
                </div>
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col cols="12">
                <h2>Mô tả</h2>
                <div class="is-divider"></div>
              </v-col>
              <v-col cols="12">
                <v-card flat style="border: 1px solid #ddd">
                  <div class="ma-5" v-html="detailProduct.desciption"></div>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-divider></v-divider>
                <v-row justify="space-between">
                  <v-col cols="auto">
                    <h2 class="my-3">Sản phẩm tương tự</h2>
                  </v-col>

                  <v-col cols="auto">
                    <h4
                      class="text-primary-a my-3"
                      @click="$router.push('/san-pham')"
                    >
                      Xem thêm
                    </h4>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="6"
                md="3"
                v-for="(item, i) in listProductNew"
                :key="i"
                ><v-card
                  flat
                  class="cp"
                  @click="$router.push(`/chi-tiet-sp/${item.productId}`)"
                >
                  <!-- src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" -->
                  <v-img
                    v-bind:src="$gImgProduct + item.avatarPath"
                    height="200px"
                    cover
                  >
                    <v-toolbar color="rgba(0, 0, 0, 0)" v-if="item.saleOf">
                      <template v-slot:append>
                        <v-btn disabled color="#ffe300" variant="elevated"
                          >Giảm giá</v-btn
                        >
                      </template>
                    </v-toolbar>
                  </v-img>

                  <v-card-title
                    class="text-a-primary"
                    :title="item.productName"
                  >
                    {{ item.productName }}
                  </v-card-title>

                  <v-card-subtitle
                    class="text-decoration-line-through"
                    v-if="item.saleOf"
                  >
                    {{ $fv(item.price) }}
                  </v-card-subtitle>
                  <v-card-text class="text-price-red py-1">
                    {{
                      item.saleOf
                        ? $fd(item.price, item.saleOf)
                        : $fv(item.price)
                    }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCartStore } from "@/store/cart.js";
export default {
  data() {
    return {
      breadcrumbs: [
        {
          title: "Trang chủ",
          disabled: false,
          to: "/",
        },
        {
          title: "Sản phẩm",
          disabled: false,
          to: "/san-pham",
        },
        {
          title: "Chi tiết sản phẩm",
          disabled: true,
        },
      ],
      itemList: [
        { text: "Tủ lanh", icon: "mdi-folder" },
        { text: "Tivi", icon: "mdi-star" },
        { text: "Máy giặt", icon: "mdi-history" },
        { text: "Điều hòa", icon: "mdi-check-circle" },
        { text: "Thông gió", icon: "mdi-upload" },
        { text: "Khác", icon: "mdi-cloud-upload" },
      ],
      shouldShowColumn: true,
      detailProduct: {},
      listCategory: null,
      listProductNew: null,
      listProduct: null,
      listNews: null,

      dataSession: null,
    };
  },
  async mounted() {
    // this.getListCategory();
    this.getProduct(this.$route.params.id);

    // this.getListProductNew();
    // this.getListProduct();
    // this.getListNews();
    // Lắng nghe sự thay đổi độ rộng màn hình
    window.addEventListener("resize", this.checkScreenWidth);
    this.checkScreenWidth(); // Kiểm tra độ rộng ban đầu của màn hình
  },
  watch: {
    "$route.params.id"(value) {
      if (value) {
        this.getProduct(value);
      }
    },
  },
  computed: {
    cart() {
      return useCartStore();
    },
  },
  methods: {
    checkScreenWidth() {
      // Lấy độ rộng hiện tại của màn hình
      const screenWidth = window.innerWidth;

      // Đặt điều kiện để ẩn cột khi độ rộng dưới 960px
      if (screenWidth < 960) {
        this.shouldShowColumn = false;
      } else {
        this.shouldShowColumn = true;
      }
    },
    async addCart(productId, price) {
      if (JSON.parse(localStorage.getItem("user"))) {
        this.dataSession = JSON.parse(localStorage.getItem("user"));
        const res = await this.$axios.get(
          `${this.$gAPI}/Cart/GetOneByProductId?productId=${productId}&accountId=${this.dataSession.accountId}`
        );
        if (res.status === 200) {
          this.$notify({
            title: "Giỏ hàng của bạn đã tồn tại sản phẩm này",
            type: "warn",
          });
        } else {
          let data = {
            quantity: 1,
            totalFee: price,
            productId: productId,
            accountId: this.dataSession.accountId,
          };
          this.$axios.post(`${this.$gAPI}/Cart/Store`, data).then((res) => {
            if (res.status === 200) {
              this.$notify({
                title: "Thêm vào giỏ hàng thành công",
                type: "success",
              });
              this.cart.getCartByAccountId(this.dataSession.accountId);
            }
          });
        }
      } else {
        this.$notify({
          title: "Vui lòng đăng nhập",
          type: "warn",
        });
        this.$router.push("/dang-nhap");
      }
    },
    getListCategory() {
      this.$axios
        .get(`${this.$gAPI}/Category/List`)
        .then((res) => {
          this.listCategory = res.data;
        })
        .catch((err) => {
          this.$notify({
            title: "có lỗi sảy ra",
            type: "error",
          });
        });
    },
    async getProduct(id) {
      try {
        if (id) {
          let req = await this.$axios.get(
            `http://localhost:9091/api/v1/product/getById/${id}`
          );
          let data = req.data.EM;
          if (req.data.EC == 0) {
            this.detailProduct = data;
          }
          console.log(req);
        }
      } catch (err) {
        this.$notify({
          title: "Có lỗi sảy ra",
          type: "error",
        });
      }
    },

    // async getProduct(id) {
    //   if (id) {
    //     let req = this.$axios
    //       .get(`http://localhost:9091/api/v1/product/getById/${id}`)
    //       .then((res) => {
    //         if (res.data) {
    //           this.detailProduct = res.data;
    //         }
    //       })
    //       .catch((err) => {
    //         this.$notify({
    //           title: "Có lỗi sảy ra",
    //           type: "error",
    //         });
    //       });
    //   }
    // },
    getListProductNew() {
      this.$axios
        .get(`${this.$gAPI}/Product/ListProductNew`)
        .then((res) => {
          if (res.status === 200) {
            let value = res.data;
            if (value) {
              this.listProductNew = value.slice(0, 4);
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
    getListProduct() {
      this.$axios
        .get(`${this.$gAPI}/Product/List`)
        .then((res) => {
          if (res.status === 200) {
            let value = res.data;
            if (value) {
              this.listProduct = value.slice(0, 5);
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
  beforeDestroy() {
    // Gỡ bỏ lắng nghe sự kiện khi component bị hủy
    window.removeEventListener("resize", this.checkScreenWidth);
  },
};
</script>

<style></style>
