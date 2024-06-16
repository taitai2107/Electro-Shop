<template>
  <v-dialog
    transition="dialog-top-transition"
    width="550"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Chi tiết người dùng"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" align="center">
                <v-avatar size="120" v-if="!detail.avartar">
                  <v-img src="@/assets/default_avt.jpg" alt="Avatar" />
                </v-avatar>
                <v-avatar size="120" v-else>
                  <img v-bind:src="$gImgNews + detail.avartar" alt="Avatar" />
                </v-avatar>
              </v-col>
              <v-col cols="12">
                <h2 class="text-primary">Thông tin</h2>
              </v-col>
              <v-col cols="12" class="px-5 pt-0">
                <p>
                  Tên đăng nhập:
                  <b class="text-primary">{{ detail.userName }}</b>
                </p>
                <p>
                  Họ tên:
                  <b class="text-primary">{{ detail.fullName }}</b>
                </p>
                <p>
                  Email:
                  <b class="text-primary">{{ detail.email }}</b>
                </p>
                <p>
                  Số điện thoại:
                  <b class="text-primary">{{ detail.phone }}</b>
                </p>
                <p>
                  Địa chỉ:
                  <b class="text-primary">{{ detail.address }}</b>
                </p>
                <p>
                  Tổng tiền mua:
                  <b class="text-primary">{{ detail.purchase }}</b>
                </p>
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
    return {};
  },
  methods: {},
  watch: {
    open(newVal) {
      if (!newVal) {
      }
    },
  },
};
</script>

<style></style>
