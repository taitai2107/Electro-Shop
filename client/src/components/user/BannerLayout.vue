<template>
  <div class="mt-1">
    <div class="maxWidth">
      <div>
        <v-row class="ma-0">
          <v-col cols="12" sm="4">
            <v-img src="@/assets/banner_1.jpg" width="100%" alt="News Image" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-img src="@/assets/banner_2.jpg" width="100%" alt="News Image" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-img src="@/assets/banner_3.jpg" width="100%" alt="News Image" />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        {
          url: "http://mauweb.monamedia.net/nguyenkim/wp-content/uploads/2017/12/BBChuongTrinhVung-Desktop-4.0.jpg",
        },
        {
          url: "http://mauweb.monamedia.net/nguyenkim/wp-content/uploads/2017/12/Header4_v1.jpg",
        },
        {
          url: "http://mauweb.monamedia.net/nguyenkim/wp-content/uploads/2017/12/HSBC_homenew3.png",
        },
        {
          url: "http://mauweb.monamedia.net/nguyenkim/wp-content/uploads/2017/12/TL_banner_Homepage.jpg",
        },
      ],
    };
  },
};
</script>
