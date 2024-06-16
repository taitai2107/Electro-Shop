<template>
  <v-dialog
    transition="dialog-top-transition"
    width="800"
    :model-value="open"
    persistent
  >
    <template v-slot:default="{}">
      <v-card>
        <v-toolbar color="primary" title="Cập nhật tin tức"></v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row class="mt-2">
              <v-col cols="12" align="center">
                <v-avatar size="120" v-if="!imageResponse">
                  <v-img
                    src="@/assets/news_default.png"
                    cover
                    alt="News Image"
                  />
                </v-avatar>
                <v-avatar size="120" v-else>
                  <v-img
                    v-bind:src="$gImgNews + imageResponse"
                    cover
                    alt="News Image"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newsName"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Tiêu đề *"
                  prepend-inner-icon="mdi-wallet-giftcard"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="author"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Tác giả *"
                  prepend-inner-icon="mdi-cash"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Thay đổi ảnh"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  prepend-inner-icon="mdi-image-album"
                  @change="uploadFile"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="dateTime"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  label="Ngày thêm tin *"
                  type="datetime-local"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="shortDescription"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Không được để trống']"
                  label="Mô tả ngắn *"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="">
                <p class="c-label-editor">Nội dung</p>
                <ckeditor :editor="editor" v-model="description"></ckeditor>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="outlined" color="success" @click="submit"
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
import { format } from "date-fns";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
      required: true,
      default: {},
    },
  },
  data() {
    return {
      newsName: "",
      author: "",
      imagePath: "",
      dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      shortDescription: "",
      description: "",
      editor: ClassicEditor,
      imageResponse: "",
    };
  },
  async mounted() {},
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();

      try {
        if (valid) {
          const {
            newsName,
            author,
            imagePath,
            dateTime,
            shortDescription,
            description,
          } = this;
          const res = await this.$axios.put(
            `${this.$gAPI}/News/Update/${this.detail.newsId}`,
            {
              newsName,
              author,
              imagePath,
              dateTime,
              shortDescription,
              description,
            }
          );
          if (res.status === 200) {
            this.$emit("toggle");
            this.$emit("ok");
            this.$notify({
              title: "Cập nhật thành công",
              type: "success",
            });
          }
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

    uploadFile(event) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append("formFile", file);

      if (file !== null) {
        this.imagePath = this.$linkINews + file.name;

        this.$axios
          .post(`${this.$gAPI}/News/Upload`, formData, {})
          .then((res) => {
            this.imageResponse = this.$linkINews + res.data.name;
            console.log(res);
          });
      }
    },
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.newsName = this.detail.newsName;
        this.author = this.detail.author;
        this.imageResponse = this.detail.imagePath;
        this.imagePath = this.detail.imagePath;
        this.shortDescription = this.detail.shortDescription;
        this.description = this.detail.description;
        this.$refs.form?.resetValidation();
      }
    },
  },
};
</script>

<style></style>
