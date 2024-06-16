<template>
  <div>
    <h2>Quản lý tài khoản</h2>
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
            <template v-slot:item.accountId="{ item }">
              {{ `ACC${item.columns.accountId}` }}
            </template>
            <template v-slot:item.action="{ item }">
              <div class="d-flex align-center justify-center">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="teal-lighten-1"
                      size="small"
                      v-bind="props"
                      @click="openDetail(item)"
                    >
                      mdi-eye
                    </v-icon>
                  </template>
                  <span>Xem chi tiết</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="#FFA726"
                      size="small"
                      v-bind="props"
                      class="mx-1"
                      @click="openReset(item)"
                    >
                      mdi-account-convert
                    </v-icon>
                  </template>
                  <span>Reset mật khẩu</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      color="primary"
                      size="small"
                      v-bind="props"
                      class="mx-1"
                      @click="openUpdate(item)"
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
                      @click="openDelete(item)"
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

    <add-user
      :open="dialogCreate"
      @toggle="dialogCreate = false"
      @ok="getData"
    />

    <detail-user
      :open="dialogDetail"
      :detail="dataDetail"
      @toggle="dialogDetail = false"
      @ok="getData"
    />

    <update-user
      :open="dialogUpdate"
      :detail="dataDetail"
      @toggle="dialogUpdate = false"
      @ok="getData"
    />

    <yes-no-alert
      :open="dialogDelete"
      @toggle="dialogDelete = false"
      @confirm="confirmDelete"
      mess="Bạn có chắc chắn xóa user này?"
    />
    <yes-no-alert
      :open="dialogReset"
      @toggle="dialogReset = false"
      @confirm="confirmReset"
      mess="Reset mật khẩu người dùng này thành 123456 ?"
    />
  </div>
</template>

<script>
import AddUser from "@/components/admin/user-manage/AddUser.vue";
import DetailUser from "@/components/admin/user-manage/DetailUser.vue";
import UpdateUser from "@/components/admin/user-manage/UpdateUser.vue";

export default {
  components: { AddUser, DetailUser, UpdateUser },
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
        title: "Tài khoản",
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
      { title: "Mã ng dùng", key: "userId", sortable: false },
      { title: "Tên đăng nhập", key: "userName", sortable: false },
      { title: "Họ Tên", key: "fullName", sortable: false },
      { title: "SĐT", key: "phone", sortable: false },
      { title: "Phân quyền", key: "role", sortable: false },

      {
        title: "Chức năng",
        key: "action",
        sortable: false,
        align: "center",
      },
    ],
    data: [],
    dataDetail: {},
    dialogCreate: false,
    dialogDetail: false,
    dialogUpdate: false,
    dialogDelete: false,
    dialogReset: false,
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
        const res = await this.$axios.get(
          `http://localhost:9091/api/v1/admin/getAll`
        );
        this.data = res.data.EM;
      } catch (err) {
        console.log(err);
      }
    },
    openDetail(item) {
      this.dataDetail = item.selectable;
      this.dialogDetail = true;
    },
    openReset(item) {
      this.dataDetail = item.selectable;
      this.dialogReset = true;
    },
    openDelete(item) {
      this.dataDetail = item.selectable;
      this.dialogDelete = true;
    },

    openUpdate(item) {
      this.dataDetail = item.selectable;
      this.dialogUpdate = true;
    },

    async confirmReset() {
      try {
        const res = await this.$axios.put(
          `http://localhost:9091/api/v1/admin/update/${this.dataDetail.userId}`,
          { ...this.dataDetail, password: "123456" }
        );
        if (res.data.EC == 0) {
          this.dialogReset = false;
          this.getData();
          this.$notify({
            title: "Reset mật khẩu thành công",
            type: "success",
          });
        }
      } catch (error) {
        this.dialogReset = false;
        this.$notify({
          title: "Có lỗi sảy ra! vui lòng thử lại",
          type: "error",
        });
      }
    },

    async confirmDelete() {
      try {
        if (this.dataDetail.role !== 1) {
          const res = await this.$axios.delete(
            `http://localhost:9091/api/v1/admin/delete/${this.dataDetail.userId}`
          );
          if (res.status === 200) {
            this.dialogDelete = false;
            this.getData();
            this.$notify({
              title: "Xóa thành công",
              type: "success",
            });
          }
        } else {
          this.dialogDelete = false;
          this.$notify({
            title: "Tài khoản mặc định hệ thống không thể xóa",
            type: "error",
          });
        }
      } catch (error) {
        this.dialogDelete = false;
        this.$notify({
          title: "Xóa thành công",
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
