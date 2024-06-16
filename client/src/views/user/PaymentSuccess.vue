<template>
  <div class="mt-4">
    <div class="maxWidth">
      <div class="mt-2">
        <v-row class="ma-0 px-10">
          <v-col cols="12">
            <div>
              <p class="fs-13" @click="$router.push('/')">
                <span class="home-link">Trang chủ</span>
                <v-icon icon="mdi-menu-right" size="small"></v-icon>
                <span class="text-blue-green">Đặt hàng thành công</span>
              </p>
              <h3 class="text-uppercase mt-2 title-breadcrumbs">
                Đặt hàng thành công
              </h3>
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-0 px-10" justify="center">
          <v-col cols="auto">
            <div class="steps clearfix">
              <ul class="clearfix">
                <li
                  class="cart active col-md-offset-3 col-sm-offset-0 col-xs-offset-0"
                >
                  <span
                    ><v-icon
                      class="glyphicon glyphicon-shopping-cart"
                      icon="mdi-cart"
                      size="x-large"
                    ></v-icon></span
                  ><span>Giỏ hàng của tôi</span
                  ><span class="step-number"><a>1</a></span>
                </li>
                <li
                  class="cart active col-md-offset-3 col-sm-offset-0 col-xs-offset-0"
                >
                  <span
                    ><v-icon
                      class="glyphicon glyphicon-shopping-cart"
                      icon="mdi-currency-usd"
                      size="x-large"
                    ></v-icon></span
                  ><span>Đặt hàng</span
                  ><span class="step-number"><a>2</a></span>
                </li>
                <li
                  class="cart active col-md-offset-3 col-sm-offset-0 col-xs-offset-0"
                >
                  <span
                    ><v-icon
                      class="glyphicon glyphicon-shopping-cart"
                      icon="mdi-check"
                      size="x-large"
                    ></v-icon></span
                  ><span>Hoàn tất</span
                  ><span class="step-number"><a>3</a></span>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
        <v-row
          class="ma-0 px-10 mb-10"
          justify="center"
          style="min-height: 30vh"
        >
          <v-col cols="auto" class="pa-0" align-self="center">
            <v-row class="ma-0" justify="center">
              <v-col cols="auto" class="pa-0">
                <p>
                  <v-icon
                    size="60"
                    color="#34a853"
                    icon="mdi-check-circle-outline"
                  ></v-icon>
                </p>
              </v-col>
            </v-row>
            <v-row class="ma-0 mt-1" justify="center">
              <v-col cols="auto" class="pa-0">
                <p style="color: #f16221; font-weight: 500" class="fs-18">
                  Đặt hàng thành công!
                </p>
              </v-col>
            </v-row>
            <v-row class="ma-0 mt-3" justify="center">
              <v-col cols="auto" class="pa-0">
                <p>Chúng tôi sẽ xử lý đơn hàng một cách sớm nhất!</p>
              </v-col>
            </v-row>
            <v-row class="ma-0 mt-3" justify="center">
              <v-col cols="auto" class="pa-0">
                <v-btn
                  variant="outlined"
                  color="#999"
                  to="/kiem-tra-don-hang"
                  class="cp mr-2"
                  >Xem chi tiết đơn hàng</v-btn
                >
                <v-btn
                  variant="elevated"
                  color="#f16221"
                  to="/san-pham"
                  class="cp"
                  >Tiếp tục mua hàng</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  data() {
    return {};
  },
  created() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.dataSession = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$notify({
        title: "Vui lòng đăng nhập",
        type: "error",
      });
      this.$router.push("/dang-nhap");
    }
  },
};
</script>

<style scoped>
.here-divider {
  height: 3px;
  display: block;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
}
.here-divider-small {
  height: 1px;
  display: block;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
}

.steps {
  margin-bottom: 30px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

.steps li {
  margin-bottom: 5px;
  float: left;
  text-align: center;
  font-size: 13px;
  border-bottom: 2px solid #aaaaaa;
  padding-bottom: 15px;
  margin-bottom: 15px;
  position: relative;
  font-weight: bold;
  min-width: 200px;
}

.steps li span {
  display: block;
  color: #aaaaaa;
  padding: 5px 0;
}

.steps li.active span {
  color: #01c4c4;
}

.steps li span {
  display: block;
  /* color: #aaaaaa; */
  padding: 5px 0;
}

.steps li span.step-number {
  display: block;
  text-align: center;
  left: 0;
  position: absolute;
  z-index: 9999;
  font-weight: bold;
  width: 100%;
}

.glyphicon {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: "Glyphicons Halflings";
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.steps li span.step-number a {
  padding: 3px 7px;
  background-color: #d0d0d0;
  border: 1px solid #aaaaaa;
  color: #ffffff;
  border-radius: 20px;
}

.steps li.active span.step-number a {
  border-color: #01c4c4;
  color: #ffffff;
  background-color: #01c4c4;
}
</style>
