<template>
  <div class="dashboard-container">
    <repayment class="dashboard" />
  </div>
</template>

<script>
import repayment from "../components/dashboard/repayment.vue";
// import dashboardTwo from "../components/dashboard/maintwo.vue";
export default {
  components: {
    repayment,
  },
};
</script>

<style scoped>
.dashboard-container {
  width: calc(100% - 198px); /* Adjust width to account for the sidebar */
  margin-left: 198px; /* Offset the container to avoid overlapping */
  padding: 10px; /* Optional: Add padding for better spacing */
  display: flex;
  height: 900px;
  flex-direction: column;
  gap: 4px;
  background-color: #d9f7ff;
  font-family: 'Fira Sans', sans-serif;
  box-sizing: border-box; /* Ensure padding does not affect width */
}


</style>