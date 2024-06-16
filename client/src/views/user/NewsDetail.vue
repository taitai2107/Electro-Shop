<template>
  <div>
    <div class="maxWidth">
      <div>
        <v-row class="ma-0">
          <v-col cols="12" md="3">
            <div class="mt-5">
              <h3 class="title-left">
                <span> Tin tức nổi bật </span>
              </h3>
            </div>
            <div>
              <v-row class="ma-0" v-for="(item, i) in newsNew" :key="i">
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
                    <span class="op-5">Tin tức</span>
                    <v-icon icon="mdi-menu-right" size="small"></v-icon>
                    <span class="text-blue-green">{{
                      detailNews.newsName
                    }}</span>
                  </p>
                  <h3 class="text-uppercase mt-2">{{ detailNews.newsName }}</h3>
                </div>
              </v-col>
            </v-row>
            <v-card class="pa-3">
              <div>
                Tác giả: <b>{{ detailNews.author }}</b>
              </div>
              <div>
                Ngày đăng: <b>{{ $fDateTime(detailNews.dateTime) }}</b>
              </div>
              <div>
                <v-row class="ma-0" justify="center">
                  <v-col cols="auto">
                    <v-img
                      v-bind:src="$gImgNews + detailNews.imagePath"
                      width="auto"
                      height="auto"
                    ></v-img>
                  </v-col>
                </v-row>
              </div>
              <div class="mt-3" v-html="detailNews.description"></div>
            </v-card>
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
    newsNew: null,
    detailNews: {},
  }),
  mounted() {
    this.getListNewsNew();
    this.getDetail(this.$route.params.id);
  },
  watch: {
    "$route.params.id"(value) {
      if (value) {
        this.getDetail(value);
      }
    },
  },
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
    getListNewsNew() {
      this.$axios.get(`${this.$gAPI}/News/ListNew`).then((res) => {
        if (res.status === 200) {
          this.newsNew = res.data;
        }
      });
    },
    getDetail(id) {
      this.$axios.get(`${this.$gAPI}/News/GetById/${id}`).then((res) => {
        if (res.status === 200) {
          this.detailNews = res.data;
        }
      });
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
