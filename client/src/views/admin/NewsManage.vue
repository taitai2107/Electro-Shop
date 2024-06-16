<template>
  <div>
    <h2>Quản lý tin tức</h2>
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
            <template v-slot:item.newsId="{ item }">
              {{ "TT" + item.selectable.newsId }}
            </template>

            <template v-slot:item.action="data">
              <div class="d-flex align-center justify-center">
                <v-tooltip location="top">
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
                </v-tooltip>
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

    <add-news
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
    <update-news
      :open="dialogUpdate"
      :detail="dataDetail"
      @toggle="dialogUpdate = false"
      @ok="getData"
    />

    <yes-no-alert
      :open="dialogDelete"
      @toggle="dialogDelete = false"
      @confirm="confirmDelete"
      mess="Bạn có chắc chắn xóa loại sản phẩm này?"
    />
  </div>
</template>

<script>
import AddNews from "@/components/admin/news-manage/AddNews.vue";
import UpdateNews from "@/components/admin/news-manage/UpdateNews.vue";
import DetailNews from "@/components/admin/news-manage/DetailNews.vue";
import UpdateCategory from "@/components/admin/category-manage/UpdateCategory.vue";

export default {
  components: { DetailNews, UpdateNews, AddNews, UpdateCategory },
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
        title: "Tin tức",
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
      { title: "Mã tin tức ", key: "newsId", sortable: false },
      { title: "Tên tin tức", key: "newsName", sortable: false, width: "450" },
      { title: "tác giả", key: "author", sortable: false },
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
        const res = await this.$axios.get(`${this.$gAPI}/News/List`);
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
          `${this.$gAPI}/News/Delete/${this.dataDetail.newsId}`
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
