<template>
  <v-dialog
    transition="dialog-top-transition"
    width="550"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Chi tiết tin tức"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" align="center">
                <v-avatar size="120" v-if="!detail.imagePath">
                  <v-img src="@/assets/news_default.png" cover alt="Avatar" />
                </v-avatar>
                <v-avatar size="120" v-else>
                  <v-img
                    v-bind:src="$gImgNews + detail.imagePath"
                    cover
                    alt="Avatar"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12">
                <h2 class="text-primary">Thông tin</h2>
              </v-col>
              <v-col cols="12" class="px-5 pt-0">
                <p>
                  Tiêu đề:
                  <b class="text-primary">{{ detail.newsName }}</b>
                </p>
                <p>
                  Tác giả:
                  <b class="text-primary">{{ detail.author }}</b>
                </p>
                <p>
                  Ngày thêm:
                  <b class="text-primary">{{ $fDateTime(detail.dateTime) }}</b>
                </p>
                <p>
                  Tóm tắt / mô tả ngắn:
                  <b class="text-primary">{{ detail.shortDescription }}</b>
                </p>
              </v-col>
              <v-col cols="12" class="pt-0" v-if="detail.features">
                <h2 class="text-primary">
                  Đặc tính
                  <span
                    class="fs-13 text-primary-a"
                    @click="openFeatures = true"
                    >_Xem thêm</span
                  >
                </h2>
              </v-col>
              <v-col cols="12" class="pt-0" v-if="detail.description">
                <h2 class="text-primary">
                  Nội dung
                  <span
                    class="fs-13 text-primary-a"
                    @click="openDescription = true"
                    >_Xem thêm</span
                  >
                </h2>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="outlined" color="success" @click="$emit('toggle')"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

  <v-dialog
    transition="dialog-top-transition"
    width="900"
    v-model="openDescription"
  >
    <v-card>
      <v-toolbar color="primary" title="Chi tiết mô tả"></v-toolbar>
      <v-card-text>
        <div class="open-des" v-html="detail.description"></div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          variant="outlined"
          color="success"
          @click="openDescription = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    detail: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      openFeatures: false,
      openDescription: false,
    };
  },
  methods: {},
  watch: {
    open(newVal) {
      if (newVal) {
      }
    },
  },
};
</script>

<style scoped>
::v-deep .open-des img {
  max-width: 600px !important;
}
</style>
