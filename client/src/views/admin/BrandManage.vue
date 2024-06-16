<template>
  <div>
    <h2>Quản lý thương hiệu</h2>
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
            <template v-slot:item.brandId="{ item }">
              {{ `TH${item.columns.brandId}` }}
            </template>
            <template v-slot:item.icon="{ item }">
              <v-icon
                v-if="item.columns.icon"
                size="small"
                :icon="'mdi-' + item.columns.icon"
              ></v-icon>
            </template>
            <template v-slot:item.action="data">
              <div class="d-flex align-center justify-center">
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

    <add-brand
      :open="dialogCreate"
      @toggle="dialogCreate = false"
      @ok="getData"
    />

    <update-brand
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

    <show-alert :isShow="showAlert" @reset="resetAlert" />
  </div>
</template>

<script>
import AddBrand from "@/components/admin/brand-manage/AddBrand.vue";
import UpdateBrand from "@/components/admin/brand-manage/UpdateBrand.vue";
export default {
  components: { AddBrand, UpdateBrand },
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
        title: "Quản lý sản phẩm",
        disabled: false,
      },
      {
        title: "Thương hiệu / nguồn",
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
      { title: "Mã thương hiệu / nguồn", key: "brandId", sortable: false },
      { title: "Tên thương hiệu / nguồn", key: "brandName", sortable: false },
      { title: "Icon", key: "icon", sortable: false },
      { title: "Mô tả (Ghi chú)", key: "description", sortable: false },
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
    dialogUpdate: false,
    dialogDelete: false,
    showAlert: {
      status: false,
      type: "",
      title: "",
      text: "",
    },
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
    resetAlert() {
      this.showAlert.status = false;
    },

    async getData() {
      try {
        const res = await this.$axios.get(
          `http://localhost:9091/api/v1/brand/getAll`
        );
        this.data = res.data.EM;
      } catch (err) {
        console.log(err);
      }
    },

    openDelete(data) {
      this.dataDetail = data.item.columns;
      this.dialogDelete = true;
    },

    openUpdate(data) {
      this.dataDetail = data.item.columns;
      this.dialogUpdate = true;
    },

    async confirmDelete() {
      try {
        const res = await this.$axios.delete(
          `http://localhost:9091/api/v1/brand/del/${this.dataDetail.brandId}`
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
