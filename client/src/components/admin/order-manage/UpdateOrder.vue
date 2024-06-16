<template>
  <v-dialog
    transition="dialog-top-transition"
    width="600"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar
          color="primary"
          :title="`Cập nhật đơn hàng - HDDH${orderId}`"
        ></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" md="6">
                <!-- v-model="" -->

                <v-select
                  v-model="status"
                  :items="listStatus"
                  label="Trạng thái"
                  hide-details="auto"
                  placeholder="- Chọn trạng thái -"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  density="compact"
                  item-value="value"
                  item-title="text"
                  variant="outlined"
                  prepend-inner-icon="mdi-account-alert"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="outlined"
            color="success"
            @click="submit"
            :disabled="statusOrigin === 4 || statusOrigin === 5"
            :loading="isLoading"
            >Cập nhật</v-btn
          >
          <v-btn variant="outlined" color="red" @click="$emit('toggle')"
            >Đóng</v-btn
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
    detailStatus: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      orderId: null,
      status: null,
      statusOrigin: null,
      totalFee: null,
      listStatus: [
        {
          value: 1,
          text: "Chưa duyệt",
        },
        {
          value: 2,
          text: "Đang xử lý",
        },
        {
          value: 3,
          text: "Đang vận chuyển",
        },
        {
          value: 4,
          text: "Giao thành công",
        },
        {
          value: 5,
          text: "Hủy đơn",
        },
      ],
      isLoading: false,
    };
  },
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;
      let data = {
        status: this.status,
        totalFee: this.totalFee,
      };
      try {
        if (this.status > this.statusOrigin) {
          if (this.status === 4) {
            const res = await this.$axios.put(
              `${this.$gAPI}/Order/Update/${this.detail.orderId}`,
              data
            );
            if (res.status === 200) {
              this.$axios
                .get(
                  `${this.$gAPI}/OrderDetail/GetByOrderId?orderId=${res.data.orderId}`
                )
                .then((response) => {
                  if (response.data) {
                    response.data.forEach((item) => {
                      this.$axios
                        .get(`${this.$gAPI}/Product/GetById/${item.productId}`)
                        .then((res3) => {
                          this.$axios
                            .put(
                              `${this.$gAPI}/Product/Update/${item.productId}`,
                              {
                                brandId: item.brandId,
                                categoryId: item.categoryId,
                                quantity: Number(
                                  res3.data.quantity - item.quantity
                                ),
                                sold: Number(res3.data.sold + item.quantity),
                              }
                            )
                            .then((resEnd) => {
                              if (resEnd.status === 200) {
                                this.$notify({
                                  title:
                                    "Cập nhật trạng thái đơn hàng thành công",
                                  type: "success",
                                });
                              }
                            });
                        });
                    });
                  }
                });
            }
          } else {
            const res = await this.$axios.put(
              `${this.$gAPI}/Order/Update/${this.detail.orderId}`,
              data
            );
            if (res.status === 200) {
              this.$emit("toggle");
              this.$emit("ok");
              this.$notify({
                title: "Cập nhật trạng thái đơn hàng thành công",
                type: "success",
              });
            }
          }
        } else {
          this.$emit("toggle");
          this.$notify({
            title: "Trạng thái phải thay đổi! Vui lòng thử lại",
            type: "warn",
          });
        }
      } catch (err) {
        console.log(err);
        this.$emit("toggle");
        this.$notify({
          title: "Có lỗi sảy ra! vui lòng thử lại",
          type: "error",
        });
      } finally {
        this.$emit("toggle");
        this.$emit("ok");
      }
    },
  },
  watch: {
    open(newVal) {
      if (newVal) {
        // this.$refs.form?.reset();
        // this.$refs.form?.resetValidation();

        this.orderId = this.detail?.orderId;
        this.status = this.detail?.status;
        this.totalFee = this.detail?.totalFee;
        this.statusOrigin = this.detail?.status;
      }
    },
  },
};
</script>

<style></style>
