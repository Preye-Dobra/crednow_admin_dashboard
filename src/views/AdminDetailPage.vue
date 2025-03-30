<template>
  <div class="dashboard-container">
    <FailedOrder class="dashboard" />
    <!-- <dashboardTwo class="dashboard-two" />-->

  </div>
</template>

<script>
import FailedOrder from "../components/dashboard/adminInfo.vue";
export default {
  components: {
    FailedOrder,

  },
};
</script>

<style scoped>
.dashboard-container {
  width: calc(100% - 198px);
  margin-left: 198px;
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