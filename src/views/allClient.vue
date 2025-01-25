<template>
  <div class="dashboard-container">
    <dashboard class="dashboard" />
     <dashboardTwo class="dashboard-two" />
    <pagination class="pagination"/>
  </div>
</template>

<script>
import dashboard from "../components/dashboard/allClient.vue";
import dashboardTwo from "../components/dashboard/allClientTwo.vue";
 import pagination from "../components/modals/pagination.vue";
export default {
  components: {
    dashboard,
     dashboardTwo,
     pagination,
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