<template>
  <div class="dashboard-container">
    <dashboard class="dashboard" />
    <dashboardTwo class="dashboard-two" />
  </div>
</template>

<script>
import dashboard from "../components/dashboard/main.vue";
import dashboardTwo from "../components/dashboard/maintwo.vue";

export default {
  components: {
    dashboard,
    dashboardTwo,
  },
};
</script>

<style scoped>
.dashboard-container {
  width: calc(100% - 198px); /* Adjust width to account for the sidebar */
  margin-left: 198px; /* Offset the container to avoid overlapping */
  padding: 10px; /* Optional: Add padding for better spacing */
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #d9f7ff;
  font-family: 'Fira Sans', sans-serif;
  box-sizing: border-box; /* Ensure padding does not affect width */
}

.dashboard,
.dashboard-two {
  width: 100%;
}

</style>
  

  