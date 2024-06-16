<template>
  <v-app>
    <top-layout-vue />
    <menu-layout-vue />
    <banner-layout-vue v-if="$route.path === '/'" />
    <v-main>
      <router-view />
    </v-main>
    <footer-layout />
    <div>
      <transition name="fade" mode="out-in">
        <v-btn
          v-if="showScrollButton"
          class="scroll-button"
          @click="scrollToTop"
          icon
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </transition>
    </div>
  </v-app>
</template>

<script>
import TopLayoutVue from "@/components/user/TopLayout.vue";
import MenuLayoutVue from "@/components/user/MenuLayout.vue";
import BannerLayoutVue from "@/components/user/BannerLayout.vue";
import FooterLayout from "@/components/user/FooterLayout.vue";

export default {
  components: {
    MenuLayoutVue,
    TopLayoutVue,
    BannerLayoutVue,
    FooterLayout,
  },
  data() {
    return {
      showScrollButton: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Kiểm tra vị trí cuộn của trang
      if (window.pageYOffset > 100) {
        this.showScrollButton = true;
      } else {
        this.showScrollButton = false;
      }
    },
    scrollToTop() {
      // Cuộn lên đầu trang
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.scroll-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #01c4c4;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  opacity: 0.8;
}
</style>
