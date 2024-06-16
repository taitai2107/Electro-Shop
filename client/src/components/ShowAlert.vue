<template>
  <div>
    <v-alert
      :type="isShow.type"
      border="start"
      variant="tonal"
      closable
      :title="isShow.title"
      style="opacity: 1 !important; z-index: 9999"
      class="custom-alert"
      :class="{ 'slide-in': isShow.status, 'fade-out': isClosing }"
      height="70"
      v-if="isShow.status"
    >
      {{ isShow.text }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Object,
      default: () => ({}),
      validator: () => false, // Always return false to make the prop read-only
    },
  },
  data() {
    return {
      isClosing: false,
      showProgressBar: false,
      progressValue: 0,
    };
  },
  watch: {
    "isShow.status"(newVal) {
      if (newVal) {
        this.isClosing = false;
        this.showProgressBar = true; // Show progress bar
        this.progressValue = 0; // Reset progress value

        const progressBarInterval = setInterval(() => {
          this.progressValue += 10; // Increment progress value
          if (this.progressValue >= 100) {
            clearInterval(progressBarInterval);
            this.progressValue = 0; // Reset progress value
            this.showProgressBar = false; // Hide progress bar
            this.closeAlert();
          }
        }, 200); // Interval for updating progress

        this.startAlertTimeout();
      }
    },
  },
  methods: {
    startAlertTimeout() {
      setTimeout(() => {
        this.closeAlert();
      }, 2000);
    },
    closeAlert() {
      this.isClosing = true; // Activate fade-out effect
      setTimeout(() => {
        this.$emit("reset");
        this.isClosing = false; // Reset fade-out effect
      }, 500); // Fade-out duration
    },
  },
};
</script>

<style scoped>
.custom-alert {
  position: fixed;
  top: 50px;
  right: -300px;
  transition: right 0.3s ease-in-out, opacity 0.5s ease-in-out;
  opacity: 0;
}

.slide-in {
  right: 20px;
  opacity: 1;
  animation: slideIn 0.3s ease-in-out, fadeIn 0.5s ease-in-out;
}

.fade-out {
  opacity: 0;
}

.closing {
  opacity: 0;
}

@keyframes slideIn {
  0% {
    right: -300px;
  }
  100% {
    right: 20px;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
