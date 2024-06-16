<template>
  <div>
    <div class="maxWidth">
      <div>
        <v-row class="ma-0 px-10" justify="center">
          <v-col cols="auto" align-self="center"><h2>TIN TỨC</h2></v-col>
        </v-row>
        <v-row class="ma-0 px-10">
          <v-col cols="12" md="3">
            <div class="mt-5">
              <h3 class="title-left">
                <span> Tin tức nổi bật </span>
              </h3>
            </div>
            <div>
              <v-row class="ma-0" v-for="(item, i) in listNewsNew" :key="i">
                <v-col cols="3" class="pa-1" align-self="center">
                  <v-img v-bind:src="$gImgNews + item.imagePath" cover></v-img>
                </v-col>
                <v-col cols="9" class="fs-14">
                  <p
                    class="text-a-primary font-weight-bold"
                    @click="$router.push(`/chi-tiet-tin-tuc/${item.newsId}`)"
                  >
                    {{ item.shortDescription }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" md="9">
            <v-row class="ma-0">
              <v-col cols="12">
                <div>
                  <p class="fs-13" @click="$router.push('/')">
                    <span class="home-link">Trang chủ</span>
                    <v-icon icon="mdi-menu-right" size="small"></v-icon>
                    <span class="text-blue-green">Tin tức</span>
                  </p>
                  <h3 class="text-uppercase mt-2 title-breadcrumbs">Tin tức</h3>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" v-for="(item, i) in listNews" :key="i">
                <v-row class="ma-0">
                  <v-col cols="3">
                    <v-img
                      v-bind:src="$gImgNews + item.imagePath"
                      height="200px"
                      cover
                      class="cp"
                      @click="$router.push(`/chi-tiet-tin-tuc/${item.newsId}`)"
                    >
                    </v-img>
                  </v-col>
                  <v-col cols="9">
                    <h3
                      class="text-blue-green-a"
                      @click="$router.push(`/chi-tiet-tin-tuc/${item.newsId}`)"
                    >
                      {{ item.newsName }}
                    </h3>
                    <p class="op-7 fs-12">{{ $fDate(item.dateTime) }}</p>
                    <p class="mt-4 fs-14">{{ item.shortDescription }}</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
    loading: false,
    listNews: null,
    listNewsNew: null,
  }),
  mounted() {
    this.getListNews();
    this.getListNewsNew();
  },

  methods: {
    getListNewsNew() {
      this.$axios
        .get(`${this.$gAPI}/News/ListNew`)
        .then((res) => {
          if (res.status === 200) {
            let value = res.data;
            if (value) {
              this.listNewsNew = value.slice(0, 5);
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
      this.$axios.get(`${this.$gAPI}/News/List`).then((res) => {
        if ((res.status = 200)) {
          if (res.data) {
            this.listNews = res.data.slice(0, 4);
          }
        }
      });
    },
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.title-left {
  background-color: #01c4c4;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  padding: 15px 10px;
  text-transform: uppercase;
  margin: 0;
  border-bottom: 2px solid #aaaaaa;
}
</style>
