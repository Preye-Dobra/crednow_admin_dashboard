<template>
  <div class="loader-container" v-if="loading">
    <div class="round-loader"></div>
  </div>
</template>

<script>
export default {
  name: 'RoundLoader',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.round-loader {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 204, 255, 0.2);
  border-top: 5px solid #00ccff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>