<template>
  <div class="mt-4">
    <div class="maxWidth">
      <div>
        <v-row class="ma-0" justify="center">
          <v-col cols="auto" align-self="center">
            <h1>Hồ sơ cá nhân</h1>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col cols="12" md="3">
            <div>
              <v-row>
                <v-col class="pa-0 pl-10" cols="4">
                  <!-- v-bind:image="`${url + item.columns.avatarPath}`" -->
                  <v-avatar
                    class="my-1"
                    image="@/assets/default_avt.jpg"
                    size="70"
                  ></v-avatar>
                </v-col>
                <v-col class="pa-0" cols="8" align-self="center">
                  <div class="">
                    <p>
                      <b>{{ dataSession.userName }}</b>
                    </p>
                    <p class="op-7">
                      <v-icon
                        @click="$router.push('/ho-so-cua-toi')"
                        icon="mdi-pencil"
                      ></v-icon>
                      Sửa hồ sơ
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-row class="ma-0">
                <v-col cols="12" class="px-0">
                  <div>
                    <v-card color="#4a475f" flat>
                      <v-list>
                        <v-list-item
                          class="mx-2"
                          @click="$router.push('/ho-so-cua-toi')"
                        >
                          <template v-slot:prepend>
                            <v-icon icon="mdi-account-box"></v-icon>
                          </template>

                          <v-list-item-title
                            ><b>Hồ sơ của tôi</b></v-list-item-title
                          >
                        </v-list-item>
                        <v-list-item
                          class="mx-2"
                          @click="$router.push('/kiem-tra-don-hang')"
                        >
                          <template v-slot:prepend>
                            <v-icon icon="mdi-cart"></v-icon>
                          </template>

                          <v-list-item-title><b>Đơn mua</b></v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" md="9">
            <div>
              <router-view></router-view></div
          ></v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSession: {},
    };
  },
  created() {
    if (!JSON.parse(localStorage.getItem("user"))) {
      this.$notify({
        title: "Vui lòng đăng nhập",
        type: "warn",
      });
      this.$router.push("/dang-nhap");
    } else {
      this.dataSession = JSON.parse(localStorage.getItem("user"));
    }
  },
};
</script>

<style></style>
