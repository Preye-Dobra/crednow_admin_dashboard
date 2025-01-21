<template>
  <div class="main-content">
    <!-- Your main dashboard content goes here -->
    <h1>Welcome to the Dashboard</h1>
    <p>This is where the dashboard content will go.</p>
  </div>
</template>

<script>
export default {
  name: 'MainContent'
};
</script>

<style scoped>
/* Main content styling */
.main-content {
  flex-grow: 1; /* This ensures the content takes up the remaining space */
  background-color: #f4f4f4;
  padding: 20px;
  overflow-y: auto;
}

.main-content h1 {
  font-size: 24px;
  color: #333;
}

.main-content p {
  font-size: 16px;
  color: #666;
}
</style>







