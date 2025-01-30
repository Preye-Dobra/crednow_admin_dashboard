<template>
  <div class="loading-overlay">
    <div class="loading-content">
      <img src="/public/logo1.png" alt="Logo" class="loading-logo" />
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of everything */
}

.loading-content {
  text-align: center;
}

.loading-logo {
  width: 100px; /* Adjust logo size */
  margin-bottom: 20px;
}

.loading-spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>