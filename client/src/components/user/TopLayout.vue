<template>
  <div class="bg-top">
    <div class="maxWidth">
      <v-row class="ma-0" justify="space-between">
        <v-col cols="6" class="pb-2 pl-10">
          <p class="fs-13 text-blue-green">
            <v-icon color="#01c4c4" icon="mdi-phone" size="x-small"></v-icon>
            Hotline: 0999 27 27 27
          </p>
        </v-col>

        <v-col cols="6" class="pb-2">
          <v-row class="ma-0" justify="end">
            <v-col
              cols="auto"
              class="pa-0 pr-1 border-left-top"
              align-self="center"
            >
              <div
                class="text-header-a"
                @click="$router.push('/kiem-tra-don-hang')"
              >
                <v-icon
                  icon="mdi-pencil-box-multiple-outline"
                  size="x-small"
                ></v-icon>
                <span class="ml-1 fs-13">Kiểm tra đơn hàng</span>
              </div>
            </v-col>
            <v-col
              cols="auto"
              class="pa-0 px-1 border-left-top"
              align-self="center"
              @click="$router.push('/gio-hang')"
            >
              <div class="text-header-a">
                <v-icon icon="mdi-cart" size="x-small"></v-icon>
                <span class="ml-1 fs-13">Giỏ hàng</span>
              </div>
            </v-col>
            <v-col
              cols="auto"
              class="pa-0 px-1 border-left-top"
              align-self="center"
              v-if="!cart.isAccount"
            >
              <div class="text-header-a" @click="$router.push('/dang-nhap')">
                <v-icon icon="mdi-login" size="x-small"></v-icon>
                <span class="ml-1 fs-13">Đăng nhập</span>
              </div>
            </v-col>
            <v-col
              cols="auto"
              class="pa-0 px-1"
              align-self="center"
              v-if="!cart.isAccount"
              @click="$router.push('/dang-ky')"
            >
              <div class="text-header-a">
                <v-icon icon="mdi-key-outline" size="x-small"></v-icon>
                <span class="ml-1 fs-13">Đăng ký</span>
              </div>
            </v-col>
            <v-col
              cols="auto"
              class="pa-0 px-1 border-left-top"
              align-self="center"
              v-if="cart.isAccount"
              @click="$router.push('/ho-so-cua-toi')"
            >
              <div class="text-header-a">
                <v-icon icon="mdi-account" size="x-small"></v-icon>
                <span class="ml-1 fs-13">{{ dataSession.userName }}</span>
              </div>
            </v-col>
            <v-col
              cols="auto"
              class="pa-0 px-1"
              align-self="center"
              v-if="cart.isAccount"
              @click="dialogLogout = true"
            >
              <div class="text-header-a">
                <v-icon
                  icon="mdi-close-octagon-outline"
                  size="x-small"
                ></v-icon>
                <span class="ml-1 fs-13">Đăng xuất</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
  <div>
    <div class="maxWidth">
      <v-row class="ma-0">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 cp my-auto"
          @click="$router.push('/')"
        >
          <div class="d-flex align-end">
            <v-img
              src="@/assets/logo_def.png"
              alt="News Image"
              width="auto"
              height="63"
            />
          </div>
        </v-col>
        <v-col cols="12" md="9" class="pa-0">
          <v-row class="ma-0 my-2 only-than-md" justify="center">
            <v-col cols="auto" align-self="center">
              <div class="d-flex align-center">
                <v-icon
                  class="text-blue-green"
                  icon="mdi-truck"
                  size="large"
                ></v-icon>
                <span class="ml-1 fs-14 text-header">GIAO HÀNG MIỄN PHÍ</span>
              </div></v-col
            >
            <v-col cols="auto" align-self="center">
              <div class="d-flex align-center">
                <v-icon
                  icon="mdi-cash-100"
                  class="text-blue-green"
                  size="large"
                ></v-icon>
                <span class="ml-1 fs-14 text-header">THANH TOÁN LINH HOẠT</span>
              </div></v-col
            >
            <v-col cols="auto" align-self="center">
              <div class="d-flex align-center">
                <v-icon
                  icon="mdi-refresh"
                  class="text-blue-green"
                  size="large"
                ></v-icon>
                <span class="ml-1 fs-14 text-header"
                  >TRẢ HÀNG TRONG 30 NGÀY</span
                >
              </div></v-col
            >
          </v-row>
          <v-row class="ma-0">
            <v-col cols="8" class="py-0" align-self="center">
              <v-text-field
                v-model="search"
                :loading="loading"
                density="compact"
                variant="outlined"
                placeholder="Tìm kiếm..."
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
                style="width: 100%"
                rounded="5"
                class="d-inline-block"
              >
                <template v-slot></template> </v-text-field
            ></v-col>
            <v-col cols="auto" class="ml-10">
              <v-row class="ma-0">
                <v-col cols="auto" class="py-0">
                  <v-img
                    src="@/assets/my_cart.png"
                    alt="News Image"
                    class="d-inline-block"
                    width="auto"
                    height="63"
                  />
                </v-col>
                <v-col cols="auto" align-self="center">
                  <p
                    class="fs-13 text-header-a"
                    @click="$router.push('/gio-hang')"
                  >
                    {{ cart.lengthProductCart }} sp -
                    {{ $fv(cart.totalMoneyCart) }}
                    <v-icon
                      class="ml-4"
                      icon="mdi-arrow-right-thick"
                      size="x-small"
                    ></v-icon>
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>

  <yes-no-alert
    :open="dialogLogout"
    @toggle="dialogLogout = false"
    @confirm="confirmLogout"
    title="Xác nhận"
    mess="Bạn có chắc chắn muốn đăng xuất?"
  />
</template>

<script>
import { useCartStore } from "@/store/cart.js";
export default {
  data: () => ({
    loaded: false,
    loading: false,
    fav: true,
    menu: false,
    avatarUser: "",
    isAccount: false,
    dialogLogout: false,
    account: null,

    totalMoneyCart: null,
    lengthProductCart: null,

    dataSession: null,

    listCart: null,
  }),
  search: "",
  computed: {
    cart() {
      return useCartStore();
    },
  },
  created() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.dataSession = JSON.parse(localStorage.getItem("user"));
      const cartStore = this.cart;
      cartStore.$state.isAccount = true;
      // this.isAccount = true;
    } else {
      const cartStore = this.cart;
      cartStore.$state.isAccount = false;
      // this.isAccount = false;
    }
  },
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;

        if (this.search) {
          this.$router.push(`/san-pham/tim-kiem/${this.search}`);
          this.search = "";
        } else {
          this.$notify({
            title: "Vui lòng nhập từ khóa tìm kiếm",
            type: "warn",
          });
        }
      }, 1000);
    },

    logout() {
      this.menu = false;
      this.dialogLogout = true;
    },
    confirmLogout() {
      this.cart.lengthProductCart = 0;
      this.cart.totalMoneyCart = 0;
      this.cart.isAccount = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.dialogLogout = false;
      this.menu = false;
      this.$notify({
        title: "Đăng xuất thành công",
        type: "success",
      });
      this.$router.push("/");
    },
    getCartByAccountId(id) {
      const cartStore = this.cart;
      cartStore.getCartByAccountId(id);
    },
  },
  watch: {
    dataSession(value) {
      if (value.accountId) {
        const cartStore = this.cart;

        cartStore.getCartByAccountId(value.accountId);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bg-top {
  background-color: #eaeaea;
}

::v-deep .input-select .v-field {
  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
}
::v-deep .input-search .v-field {
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
}

.border-left-top {
  border-right: 1px solid #ddd;
}
</style>
