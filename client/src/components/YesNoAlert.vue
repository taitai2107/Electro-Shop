<template>
  <v-dialog
    transition="dialog-top-transition"
    width="600"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar color="lime-lighten-1" :title="title"></v-toolbar>
        <v-card-text> {{ mess }} </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="outlined" color="red" @click="$emit('confirm')"
            >Xác nhận</v-btn
          >
          <v-btn variant="outlined" color="primary" @click="$emit('toggle')"
            >Đóng</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    mess: {
      type: String,
      default: "Xác nhận?",
    },
    title: {
      type: String,
      default: "Xác nhận xóa",
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
