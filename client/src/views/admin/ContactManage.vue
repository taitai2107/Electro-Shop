<template>
  <div>
    <h2>Quản lý liên hệ</h2>
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
          <v-col cols="9" class="d-flex align-center justify-end">
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
          </v-col>
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
            <template v-slot:item.contactId="{ item }">
              {{ "LH" + item.selectable.contactId }}
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                variant="elevated"
                color="red"
                v-if="item.selectable.status === 1"
              >
                Chưa kết nối</v-chip
              >
              <v-chip
                variant="elevated"
                color="warning"
                v-if="item.selectable.status === 2"
              >
                Kết nối lại</v-chip
              >
              <v-chip
                variant="elevated"
                color="success"
                v-if="item.selectable.status === 3"
              >
                Đã kết nối</v-chip
              >
            </template>

            <template v-slot:item.action="data">
              <div class="d-flex align-center justify-center">
                <!-- <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="teal-lighten-1"
                      size="small"
                      v-bind="props"
                      @click="openDetail(data)"
                    >
                      mdi-eye
                    </v-icon>
                  </template>
                  <span>Xem chi tiết</span>
                </v-tooltip> -->
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="primary"
                      size="small"
                      v-bind="props"
                      class="mx-1"
                      @click="openUpdate(data)"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                  <span>Sửa</span>
                </v-tooltip>
                <v-tooltip location="top">
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
                </v-tooltip>
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

    <detail-news
      :open="dialogDetail"
      :detail="dataDetail"
      @toggle="dialogDetail = false"
      @ok="getData"
    />
    <update-contact
      :open="dialogUpdate"
      :detail="dataDetail"
      @toggle="dialogUpdate = false"
      @ok="getData"
    />

    <yes-no-alert
      :open="dialogDelete"
      @toggle="dialogDelete = false"
      @confirm="confirmDelete"
      mess="Bạn có chắc chắn xóa liên h này?"
    />
  </div>
</template>

<script>
import AddContact from "@/components/admin/contact-manage/AddContact.vue";
import UpdateContact from "@/components/admin/contact-manage/UpdateContact.vue";
import DetailNews from "@/components/admin/news-manage/DetailNews.vue";

export default {
  components: { DetailNews, UpdateContact, AddContact },
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
        title: "Khác",
        disabled: false,
      },
      {
        title: "Liên hệ",
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
      { title: "Mã liên hệ ", key: "contactId", sortable: false },
      { title: "Người liên hệ", key: "fullName", sortable: false },
      { title: "SĐT", key: "phone", sortable: false },
      { title: "Email", key: "email", sortable: false },
      { title: "Ghi chú", key: "comment", sortable: false },
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
        const res = await this.$axios.get(`${this.$gAPI}/Contact/List`);
        this.data = res.data;
      } catch (err) {
        console.log(err);
      }
    },

    openDelete(data) {
      this.dataDetail = data.item.selectable;
      this.dialogDelete = true;
    },

    openDetail(data) {
      this.dataDetail = data.item.selectable;
      this.dialogDetail = true;
    },

    openUpdate(data) {
      this.dataDetail = data.item.selectable;
      this.dialogUpdate = true;
    },

    async confirmDelete() {
      try {
        const res = await this.$axios.delete(
          `${this.$gAPI}/Contact/Delete/${this.dataDetail.contactId}`
        );
        if (res.status === 200) {
          this.dialogDelete = false;
          this.getData();
          this.$notify({
            title: "Xóa thành công",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
        this.dialogDelete = false;
        this.$notify({
          title: "Xóa thất bại! vui lòng thử lại",
          type: "success",
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
