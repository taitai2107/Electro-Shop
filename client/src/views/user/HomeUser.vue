<template>
  <div class="pb-5">
    <div class="maxWidth">
      <div>
        <v-card class="pa-5" rounded="0" elevation="0">
          <v-row justify="space-between">
            <v-col cols="auto"> <h3 class="text-uppercase">Sản phẩm</h3></v-col>

            <v-col cols="auto">
              <h4 @click="$router.push('/san-pham')" class="text-primary-a">
                Xem thêm
              </h4>
            </v-col>
          </v-row>
          <v-row class="ma-0 mt-3">
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
                  <v-toolbar
                    color="rgba(0, 0, 0, 0)"
                    v-if="item.saleOf && i < 8"
                  >
                    <template v-slot:prepend>
                      <v-btn disabled color="error" variant="elevated">
                        Hot
                      </v-btn>
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
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import ListBottomHome from "@/components/user/ListBottomHome.vue";

export default {
  components: { ListBottomHome },
  data() {
    return {
      listProduct: null,
      user: null,
    };
  },
  mounted() {
    this.checkLoginStatus();
    this.getListProduct();
  },
  methods: {
    checkLoginStatus() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.user = user;
        console.log("User logged in:", this.user);
      } else {
        console.log("User not logged in");
      }
    },
    async getListProduct() {
      try {
        let data = await this.$axios.get(
          `http://localhost:9091/api/v1/product/getAll`
        );
        console.log(data);
        if (data) {
          let value = data.data.EM;
          console.log(value);
          if (value) {
            this.listProduct = value.slice(0, 24);
          }
        }
      } catch (error) {
        console.log(error);
        this.$notify({
          title: "Có lỗi xảy ra!",
          type: "error",
        });
      }
    },
  },
};
</script>

<style></style>
