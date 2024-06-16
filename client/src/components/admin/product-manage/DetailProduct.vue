<template>
  <v-dialog
    transition="dialog-top-transition"
    width="550"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Chi tiết sản phẩm"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" align="center">
                <v-avatar size="120" v-if="!detail.image">
                  <v-img src="@/assets/default_avt.jpg" cover alt="Avatar" />
                </v-avatar>

                <v-avatar size="120" v-else>
                  <v-img v-bind:src="detail.image" cover alt="Avatar" />
                </v-avatar>
              </v-col>
              <v-col cols="12">
                <h2 class="text-primary">Thông tin</h2>
              </v-col>
              <v-col cols="12" class="px-5 pt-0">
                <p>
                  Tên sản phẩm:
                  <b class="text-primary">{{ detail.name }}</b>
                </p>
                <p>
                  Đã bán:
                  <b class="text-primary">{{ detail.sold }}</b>
                </p>
                <p>
                  Lượng hàng tồn kho:
                  <b class="text-primary">{{ detail.stock }}</b>
                </p>
                <p>
                  Lượng hàng hiển thị:
                  <b class="text-primary">{{ detail.stock }}</b>
                </p>
                <p>
                  Giá gốc:
                  <b class="text-primary">{{ $fv(detail.price) }}</b>
                </p>
                <p>
                  Giảm giá:
                  <b class="text-primary">{{ detail.saleOf }}%</b>
                </p>
                <p>
                  Giá hiển thị:
                  <b class="text-primary">{{
                    $fd(detail.price, detail.saleOf)
                  }}</b>
                </p>
                <p>
                  loại sản phẩm:
                  <b class="text-primary">
                    <span
                      v-for="item in categories"
                      v-bind:key="item.categoryId"
                    >
                      <span v-if="item.categoryId === detail.categoryId">{{
                        item.categoryName
                      }}</span>
                    </span>
                  </b>
                </p>
                <p>
                  Thương hiệu / nguồn:
                  <b class="text-primary">
                    <span v-for="item in brands" v-bind:key="item.brandId">
                      <span v-if="item.brandId === detail.brandId">{{
                        item.brandName
                      }}</span>
                    </span>
                  </b>
                </p>
                <p>
                  Ngày thêm:
                  <b class="text-primary">{{ $fDateTime(detail.dateTime) }}</b>
                </p>
                <p class="my-2">
                  Trạng thái:
                  <v-chip
                    variant="elevated"
                    :color="detail.status ? 'success' : 'success'"
                  >
                    <!-- {{ detail.status ? "Đang bán" : "Ngưng bán" }}</v-chip -->
                    {{ detail.status ? "Đang bán" : "Đang bán" }}</v-chip
                  >
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
                  Mô tả
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
    width="700"
    v-model="openFeatures"
  >
    <v-card>
      <v-toolbar color="primary" title="Chi tiết đặc tính"></v-toolbar>
      <v-card-text>
        <div v-html="detail.features"></div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="outlined" color="success" @click="openFeatures = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
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
    categories: {
      type: Array,
      default: [],
    },
    brands: {
      type: Array,
      default: [],
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
