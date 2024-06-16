<template>
  <div class="bg-menu">
    <div class="maxWidth">
      <v-row class="ma-0">
        <v-col cols="12" class="py-3 pl-10" align-self="start">
          <v-menu
            v-model="menuList"
            :close-on-content-click="false"
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="#373737"
                prepend-icon="mdi-menu"
                elevation="0"
                :aria-expanded="false"
                class="text-white"
                rounded="0"
                v-bind="props"
                >DANH MỤC SẢN PhẨM</v-btn
              >
            </template>

            <v-card min-width="300" color="#4a475f">
              <v-list :lines="false" nav>
                <v-list-item
                  v-for="(item, i) in listCategory"
                  :key="i"
                  class="mx-2"
                  density="comfortable"
                  :active="false"
                  @click="menuList = false"
                  :to="`/san-pham/loai-san-pham/${item.categoryId}`"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="'mdi-' + item.icon"></v-icon>
                  </template>

                  <v-list-item-title>{{ item.categoryName }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
          <v-menu :close-on-content-click="false" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                elevation="0"
                color="#373737"
                class=""
                rounded="0"
                :active="false"
                :aria-expanded="false"
                to="/"
                v-bind="props"
                >Trang chủ
              </v-btn>
            </template>
          </v-menu>
          <v-menu :close-on-content-click="false" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                elevation="0"
                color="#373737"
                class=""
                rounded="0"
                :active="false"
                :aria-expanded="false"
                to="/gioi-thieu"
                v-bind="props"
                >Giới thiệu
              </v-btn>
            </template>
          </v-menu>
          <v-menu :close-on-content-click="false" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                elevation="0"
                color="#373737"
                class=""
                rounded="0"
                :active="false"
                :aria-expanded="false"
                to="/san-pham"
                v-bind="props"
                >Sản phẩm
              </v-btn>
            </template>
          </v-menu>
          <v-menu :close-on-content-click="false" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                elevation="0"
                color="#373737"
                class=""
                rounded="0"
                :active="false"
                :aria-expanded="false"
                to="/tin-tuc"
                v-bind="props"
                >Tin tức
              </v-btn>
            </template>
          </v-menu>
          <v-menu :close-on-content-click="false" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                elevation="0"
                color="#373737"
                class=""
                rounded="0"
                :active="false"
                :aria-expanded="false"
                to="/lien-he"
                v-bind="props"
                >Liên hệ
              </v-btn>
            </template>
          </v-menu>
          <v-menu :close-on-content-click="false" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                elevation="0"
                color="#373737"
                class=""
                rounded="0"
                :active="false"
                :aria-expanded="false"
                to="/gioi-thieu"
                v-bind="props"
                >Điều khoản sử dụng
              </v-btn>
            </template>
          </v-menu>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: false,
      menuDiff: false,
      itemList: [
        { text: "Tủ lanh", icon: "mdi-folder" },
        { text: "Tivi", icon: "mdi-star" },
        { text: "Máy giặt", icon: "mdi-history" },
        { text: "Điều hòa", icon: "mdi-check-circle" },
        { text: "Thông gió", icon: "mdi-upload" },
        { text: "Khác", icon: "mdi-cloud-upload" },
      ],
      itemDiff: [
        {
          text: "Sản phẩm",
          icon: "mdi-mower-bag",
          to: "/san-pham",
        },
        {
          text: "Giới thiệu",
          icon: "mdi-information-variant",
          to: "/gioi-thieu",
        },
        { text: "Tin tức", icon: "mdi-newspaper", to: "/tin-tuc" },
        { text: "Liên hệ", icon: "mdi-card-account-phone", to: "/lien-he" },
      ],
      listCategory: null,
    };
  },
  created() {
    this.getListCategory();
  },
  methods: {
    openA() {},
    openB() {},
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
      // try {
      //   let res = axios("http://localhost:9091/api/v1/product/getCate");
      //   console.log("check:", res);
      // } catch (error) {}
    },
  },
};
</script>

<style scoped>
.bg-menu {
  background-color: #373737;
}
</style>
