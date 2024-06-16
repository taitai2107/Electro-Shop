<template>
  <div>
    <h2>Quản lý đơn hàng</h2>
    <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card elevation="0">
      <div class="ma-2">
        <v-row>
          <v-col cols="3">
            <v-text-field
              :loading="loading"
              density="compact"
              variant="outlined"
              label="Search..."
              append-inner-icon="mdi-magnify"
              single-line
              flat
              hide-details
              @click:append-inner="onClick"
            ></v-text-field
          ></v-col>
          <!-- <v-col cols="9" class="d-flex align-center justify-end">
            <v-btn
              prepend-icon="mdi-plus-circle-outline"
              color="primary"
              class="mr-5"
              @click="dialogCreate = true"
            >
              <template v-slot:prepend>
                <v-icon color="white"></v-icon>
              </template>

              Thêm mới
            </v-btn>
          </v-col> -->
        </v-row>
        <div>
          <v-data-table
            v-model:page="page"
            :headers="headers"
            :items="data"
            :items-per-page="itemsPerPage"
            hide-default-footer
            height="434"
          >
            <template v-slot:bottom>
              <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </template>
            <template v-slot:item.stt="{ item }">
              {{ item.index + 1 }}
            </template>
            <template v-slot:item.totalFee="{ item }">
              {{ $fv(item.selectable.totalFee) }}
            </template>
            <template v-slot:item.orderId="{ item }">
              {{ "HDDH" + item.selectable.orderId }}
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                variant="elevated"
                color="red"
                v-if="item.selectable.status === 1"
              >
                Chưa Duyệt</v-chip
              >
              <v-chip
                variant="elevated"
                color="#9E9D24"
                v-if="item.selectable.status === 2"
              >
                Đang xử lý</v-chip
              >
              <v-chip
                variant="elevated"
                color="warning"
                v-if="item.selectable.status === 3"
              >
                Đang Vận chuyển</v-chip
              >
              <v-chip
                variant="elevated"
                color="success"
                v-if="item.selectable.status === 4"
              >
                Thành công</v-chip
              >
              <v-chip
                variant="elevated"
                color="error"
                v-if="item.selectable.status === 5"
              >
                Đã hủy</v-chip
              >
            </template>

            <template v-slot:item.action="data">
              <div class="d-flex align-center justify-center">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="teal-lighten-1"
                      size="small"
                      class="mr-1"
                      v-bind="props"
                      @click="openDetail(data)"
                    >
                      mdi-eye
                    </v-icon>
                  </template>
                  <span>Xem chi tiết</span>
                </v-tooltip>
                <v-tooltip
                  location="top"
                  v-if="data.item.selectable.status === 1"
                >
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="success"
                      size="small"
                      v-bind="props"
                      class="mr-1"
                      @click="openOk(data)"
                    >
                      mdi-check-outline
                    </v-icon>
                  </template>
                  <span>Duyệt đơn hàng</span>
                </v-tooltip>
                <v-tooltip
                  location="top"
                  v-if="
                    data.item.selectable.status === 1 ||
                    data.item.selectable.status === 2 ||
                    data.item.selectable.status === 3
                  "
                >
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="primary"
                      size="small"
                      v-bind="props"
                      class="mr-1"
                      @click="openUpdate(data)"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                  <span>Cập nhật trạng thái</span>
                </v-tooltip>
                <!-- <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="red"
                      size="small"
                      v-bind="props"
                      @click="openDelete(data)"
                    >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                  <span>Xóa</span>
                </v-tooltip> -->
              </div>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-card>

    <add-contact
      :open="dialogCreate"
      @toggle="dialogCreate = false"
      @ok="getData"
    />

    <detail-order
      :open="dialogDetail"
      :detail="dataDetail"
      @toggle="dialogDetail = false"
      @ok="getData"
    />
    <update-order
      :open="dialogUpdate"
      :detail="dataDetail"
      @toggle="dialogUpdate = false"
      @ok="getData"
    />

    <yes-no-alert
      :open="dialogOk"
      @toggle="dialogOk = false"
      @confirm="confirmOk"
      title="Xác nhận duyệt"
      mess="Bạn có chắc chắn duyệt đơn hàng này?"
    />
  </div>
</template>

<script>
import AddContact from "@/components/admin/contact-manage/AddContact.vue";
import UpdateContact from "@/components/admin/contact-manage/UpdateContact.vue";
import DetailOrder from "@/components/admin/order-manage/DetailOrder.vue";
import UpdateOrder from "@/components/admin/order-manage/UpdateOrder.vue";

export default {
  components: { UpdateOrder, DetailOrder, UpdateContact, AddContact },
  data: () => ({
    loaded: false,
    loading: false,
    show: false,
    breadcrumbs: [
      {
        title: "Home",
        disabled: false,
        to: "/admin/",
      },
      {
        title: "Quản lý bán hàng",
        disabled: false,
      },
      {
        title: "Đơn hàng",
        disabled: true,
      },
    ],
    page: 1,
    itemsPerPage: 7,
    headers: [
      {
        align: "start",
        key: "stt",
        sortable: false,
        title: "STT",
      },
      { title: "Mã đơn hàng ", key: "orderId", sortable: false },
      { title: "Người nhận", key: "receiver", sortable: false },
      { title: "SĐT", key: "phone", sortable: false },
      { title: "Trị giá ĐH", key: "totalFee", sortable: false },
      { title: "Trạng thái", key: "status", sortable: false, align: "center" },
      {
        title: "Chức năng",
        key: "action",
        sortable: false,
        align: "center",
      },
    ],
    data: [],
    dataDetail: null,
    dialogCreate: false,
    dialogDetail: false,
    dialogOk: false,
    dialogUpdate: false,
    dialogDelete: false,
  }),
  async mounted() {
    await this.getData();
  },
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
    async getData() {
      try {
        const res = await this.$axios.get(`${this.$gAPI}/Order/List`);
        this.data = res.data;
      } catch (err) {
        console.log(err);
      }
    },

    openDelete(data) {
      //   this.dataDetail = data.item.selectable;
      //   this.dialogDelete = true;
    },

    openDetail(data) {
      this.dataDetail = data.item.selectable;
      this.dialogDetail = true;
    },

    openOk(data) {
      this.dataDetail = data.item.selectable;
      this.dialogOk = true;
    },

    openUpdate(data) {
      this.dataDetail = data.item.selectable;
      this.dialogUpdate = true;
    },
    async confirmOk() {
      let data = {
        status: 2,
      };
      try {
        const res = await this.$axios.put(
          `${this.$gAPI}/Order/Update/${this.dataDetail.orderId}`,
          data
        );
        if (res.status === 200) {
          this.dialogOk = false;
          this.getData();
          this.$notify({
            title: "Duyệt đơn hàng thành công",
            type: "success",
          });
        }
      } catch (err) {
        console.log(err);
        this.$emit("toggle");
        this.$notify({
          title: "Có lỗi sảy ra! vui lòng thử lại",
          type: "error",
        });
      }
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    },
  },
};
</script>
<style></style>
