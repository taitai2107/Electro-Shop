// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "HomeUser",
        component: () => import("@/views/user/HomeUser.vue"),
      },
      {
        path: "/dang-nhap",
        name: "LoginUser",
        component: () => import("@/views/LoginUser.vue"),
      },
      {
        path: "/dang-ky",
        name: "Register",
        component: () => import("@/views/Register.vue"),
      },
      {
        path: "/san-pham",
        name: "MoreProduct",
        component: () => import("@/views/user/MoreProduct.vue"),
      },
      {
        path: "/chi-tiet-sp/:id",
        name: "DetailProduct",
        component: () => import("@/views/user/DetailProduct.vue"),
      },
      {
        path: "/san-pham/loai-san-pham/:id",
        name: "ProductByCategory",
        component: () => import("@/views/user/ProductByCategory.vue"),
      },
      {
        path: "/san-pham/tim-kiem/:keyword",
        name: "SearchProduct",
        component: () => import("@/views/user/SearchProduct.vue"),
      },
      {
        path: "/san-pham/loai-san-pham/:id",
        name: "MoreByCategory",
        component: () => import("@/views/user/MoreByCategory.vue"),
      },
      {
        path: "/gio-hang",
        name: "CartProduct",
        component: () => import("@/views/user/CartProduct.vue"),
      },
      {
        path: "/dat-hang",
        name: "Payment",
        component: () => import("@/views/user/Payment.vue"),
      },
      {
        path: "/dat-hang-thanh-cong",
        name: "PaymentSuccess",
        component: () => import("@/views/user/PaymentSuccess.vue"),
      },
      {
        path: "/tin-tuc",
        name: "News",
        component: () => import("@/views/user/News.vue"),
      },
      {
        path: "/chi-tiet-tin-tuc/:id",
        name: "NewsDetail",
        component: () => import("@/views/user/NewsDetail.vue"),
      },
      {
        path: "/gioi-thieu",
        name: "Information",
        component: () => import("@/views/user/Information.vue"),
      },
      {
        path: "/lien-he",
        name: "Contact",
        component: () => import("@/views/user/Contact.vue"),
      },
      // {
      //   path: "/thong-tin-ca-nhan",
      //   name: "HomeProfile",
      //   component: () => import("@/views/user/profile/HomeProfile.vue"),
      //   children: [
      //   ]
      // },
      {
        path: "/ho-so-cua-toi",
        name: "EditProfile",
        component: () => import("@/views/user/profile/EditProfile.vue"),
      },
      {
        path: "/kiem-tra-don-hang",
        name: "OrderDetail",
        component: () => import("@/views/user/profile/OrderDetail.vue"),
      },
      {
        path: "/kiem-tra-don-hang/chi-tiet-don/:id",
        name: "OrderDetailMore",
        component: () => import("@/views/user/profile/OrderDetailMore.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/layouts/default/LayoutAdmin.vue"),
    children: [
      {
        path: "",
        name: "Dasboard",
        component: () => import("@/views/admin/Dashboard.vue"),
      },
      {
        path: "/admin/user-manage",
        name: "UserManage",
        component: () => import("@/views/admin/UserManage.vue"),
      },
      {
        path: "/admin/role-manage",
        name: "RoleManage",
        component: () => import("@/views/admin/RoleManage.vue"),
      },
      {
        path: "/admin/customer-manage",
        name: "CustomerManage",
        component: () => import("@/views/admin/CustomerManage.vue"),
      },
      {
        path: "/admin/order-manage",
        name: "OrderManage",
        component: () => import("@/views/admin/OrderManage.vue"),
      },
      {
        path: "/admin/order-approved-manage",
        name: "OrderApprovedManage",
        component: () => import("@/views/admin/OrderApprovedManage.vue"),
      },
      {
        path: "/admin/product-manage",
        name: "ProductManage",
        component: () => import("@/views/admin/ProductManage.vue"),
      },
      {
        path: "/admin/image-product-manage",
        name: "ImageProductManage",
        component: () => import("@/views/admin/ImageProductManage.vue"),
      },
      {
        path: "/admin/category-manage",
        name: "CategoryManage",
        component: () => import("@/views/admin/CategoryManage.vue"),
      },
      {
        path: "/admin/brand-manage",
        name: "BrandManage",
        component: () => import("@/views/admin/BrandManage.vue"),
      },
      {
        path: "/admin/news-manage",
        name: "NewsManage",
        component: () => import("@/views/admin/NewsManage.vue"),
      },
      {
        path: "/admin/contact-manage",
        name: "ContactManage",
        component: () => import("@/views/admin/ContactManage.vue"),
      },
    ],
  },
  {
    path: "/admin/login",
    name: "LoginAdmin",
    component: () => import("@/views/LoginAdmin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    } else {
      return { left: 0, top: 0, behavior: 'smooth' };
    }
  }
});

export default router;
