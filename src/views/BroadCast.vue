<template>
  <div class="dashboard-container">
    <Broadcast class="dashboard" />
    <!-- <dashboardTwo class="dashboard-two" />-->

  </div>
</template>

<script>
import Broadcast from "../components/dashboard/Broadcast.vue";
export default {
  components: {
    Broadcast,

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
.pagination,
.dashboard,
.dashboard-two {
  width: 100%;
}

</style>