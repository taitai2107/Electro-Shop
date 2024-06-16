<template>
  <div ref="fullscreenElement" class="fullscreen-content">
    <v-card elevation="0">
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          expand-on-hover
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="https://cdn1.vectorstock.com/i/1000x1000/11/10/admin-icon-male-person-profile-avatar-with-gear-vector-25811110.jpg"
            title="Quản trị viên"
            nav
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-menu"
                @click.stop="rail = !rail"
                title="Cố định"
              ></v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>
          <v-list density="compact">
            <v-list-item color="primary" to="/admin/" :active="false">
              <v-list-item-title><b>Dashboard</b></v-list-item-title>
            </v-list-item>
          </v-list>
          <!-- Người dùng -->
          <v-list density="compact">
            <v-list-subheader>QUẢN LÝ BÁN HÀNG</v-list-subheader>
            <v-list-item
              v-for="(item, i) in itemSales"
              :key="i"
              :value="item"
              color="primary"
              :to="item.to"
              :active="false"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title
                ><b class="text-capitalize">{{
                  item.text
                }}</b></v-list-item-title
              >
            </v-list-item>
          </v-list>

          <v-list density="compact">
            <v-list-subheader>QUẢN LÝ NGƯỜI DÙNG</v-list-subheader>

            <v-list-item
              v-for="(item, i) in itemUsers"
              :key="i"
              :value="item"
              color="primary"
              :to="item.to"
              :active="false"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title
                ><b class="text-capitalize">{{
                  item.text
                }}</b></v-list-item-title
              >
            </v-list-item>
          </v-list>
          <!-- bán hàng  -->

          <!-- sản phẩm  -->
          <v-list density="compact">
            <v-list-subheader>QUẢN LÝ SẢN PHẨM</v-list-subheader>
            <v-list-item
              v-for="(item, i) in itemProducts"
              :key="i"
              :value="item"
              color="primary"
              :to="item.to"
              :active="false"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title
                ><b class="text-capitalize">{{
                  item.text
                }}</b></v-list-item-title
              >
            </v-list-item>
          </v-list>

          <!-- Tin tức  -->
          <!-- <v-list density="compact">
            <v-list-subheader>QUẢN LÝ TIN TỨC</v-list-subheader>
            <v-list-item
              v-for="(item, i) in itemNews"
              :key="i"
              :value="item"
              color="primary"
              :to="item.to"
              :active="false"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title
                ><b class="text-capitalize">{{ item.text }}</b></v-list-item-title
              >
            </v-list-item>
          </v-list> -->

          <!-- Khác  -->
          <!-- <v-list density="compact">
            <v-list-subheader>KHÁC</v-list-subheader>
            <v-list-item
              v-for="(item, i) in itemDiffs"
              :key="i"
              :value="item"
              color="primary"
              :to="item.to"
              :active="false"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title
                ><b class="text-capitalize">{{
                  item.text
                }}</b></v-list-item-title
              >
            </v-list-item>
          </v-list> -->
        </v-navigation-drawer>
        <v-main style="min-height: 100vh">
          <div style="height: 55px; border-bottom: 1px solid #bdbbbb">
            <v-row class="ma-0">
              <v-col cols="12" align="end">
                <p class="cp fs-14" @click="dialogLogout = true">Đăng xuất</p>
              </v-col>
            </v-row>
          </div>
          <div style="background-color: #ecf0fa">
            <v-container
              ><div class="maxWidth"><router-view></router-view></div>
            </v-container>
          </div>
          <footer class="maxWidth">
            <v-row class="ma-0" justify="center">
              <v-col cols="auto">
                <span>TAINGUYEN </span>
              </v-col>
            </v-row>
          </footer>
        </v-main>
      </v-layout>
    </v-card>
  </div>
  <yes-no-alert
    :open="dialogLogout"
    @toggle="dialogLogout = false"
    @confirm="logout"
    title="Xác nhận"
    mess="Bạn có chắc muốn đăng xuất với quyền quản trị viên?"
  />
</template>

<script>
import YesNoAlert from "@/components/YesNoAlert.vue";
export default {
  components: { YesNoAlert },
  data() {
    return {
      drawer: true,
      rail: true,
      loaded: false,
      loading: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      itemUsers: [
        // {
        //   text: "Phân Quyền",
        //   icon: "mdi-account-alert-outline",
        //   to: "/admin/role-manage",
        // },
        { text: "Tài Khoản", icon: "mdi-account", to: "/admin/user-manage" },
        // {
        //   text: "Khách Hàng",
        //   icon: "mdi-account-check",
        //   to: "/admin/customer-manage",
        // },
      ],
      itemSales: [
        {
          text: "Các đơn hàng",
          icon: "mdi-cart",
          to: "/admin/order-manage",
        },
        {
          text: "Đơn hàng chưa duyệt",
          icon: "mdi-cart-variant",
          to: "/admin/order-approved-manage",
        },
      ],
      itemProducts: [
        {
          text: "Mặt hàng",
          icon: "mdi-dolly",
          to: "/admin/product-manage",
        },
        // {
        //   text: "Hình Ảnh",
        //   icon: "mdi-image-edit",
        //   to: "/admin/image-product-manage",
        // },
        {
          text: "Loại hàng",
          icon: "mdi-format-list-bulleted-square",
          to: "/admin/category-manage",
        },
        {
          text: "Thương Hiệu",
          icon: "mdi-aws",
          to: "/admin/brand-manage",
        },
      ],

      itemDiffs: [
        {
          text: "Tin Tức",
          icon: "mdi-newspaper",
          to: "/admin/news-manage",
        },
        {
          text: "Liên hệ",
          icon: "mdi-card-account-mail",
          to: "/admin/contact-manage",
        },
      ],
      dataSession: null,
      dialogLogout: false,
    };
  },
  created() {
    this.dataSession = JSON.parse(localStorage.getItem("user"));

    if (this.dataSession && this.dataSession.roleId === 1) {
      console.log(this.dataSession);
    } else {
      this.$notify({
        title: "Vui lòng đăng nhập tài khoản quản trị viên",
        type: "error",
      });
      this.$router.push("/admin/login");
    }
  },
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
    openInformation() {},
    logout() {
      this.menu = false;
      localStorage.removeItem("user");
      this.$notify({
        title: "Đăng xuất thành công",
        type: "success",
      });
      this.$router.push("/admin/login");
    },
    toggleFullScreen() {
      const elem = this.$refs.fullscreenElement;

      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch((err) => {
          console.log(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    },
  },
};
</script>
<style></style>
