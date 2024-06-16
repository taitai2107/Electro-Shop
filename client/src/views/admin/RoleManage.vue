<template>
  <div>
    <h2>Quản lý phân quyền</h2>
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

    <add-role
      :open="dialogCreate"
      @toggle="dialogCreate = false"
      @ok="getData"
    />

    <update-role
      :open="dialogUpdate"
      :detail="dataDetail"
      @toggle="dialogUpdate = false"
      @ok="getData"
    />

    <yes-no-alert
      :open="dialogDelete"
      @toggle="dialogDelete = false"
      @confirm="confirmDelete"
      mess="Bạn có chắc chắn xóa phân quyền này?"
    />
  </div>
</template>

<script>
import AddRole from "@/components/admin/role-manage/AddRole.vue";
import UpdateRole from "@/components/admin/role-manage/UpdateRole.vue";
export default {
  components: { AddRole, UpdateRole },
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
        title: "Quản lý người dùng",
        disabled: false,
      },
      {
        title: "Phân quyền",
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
      { title: "Mã phân quyền", key: "roleId", sortable: false },
      { title: "Tên phân quyền", key: "roleName", sortable: false },
      { title: "Mô tả", key: "description", sortable: false },
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
        const res = await this.$axios.get(`${this.$gAPI}/Role/List`);
        this.data = res.data;
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
        if (
          this.dataDetail.roleId === "admin" ||
          this.dataDetail.roleId === "user" ||
          this.dataDetail.roleId === "employee"
        ) {
          this.dialogDelete = false;
          this.$notify({
            title: "Không thể xóa quyền mặc định",
            type: "error",
          });
        } else {
          const res = await this.$axios.delete(
            `${this.$gAPI}/Role/Delete/${this.dataDetail.roleId}`
          );
          if (res.status === 200) {
            this.dialogDelete = false;
            this.getData();
            this.$notify({
              title: "Xóa thành công",
              type: "success",
            });
          }
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
