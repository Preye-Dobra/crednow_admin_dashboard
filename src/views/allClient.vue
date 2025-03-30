<template>
  <div class="dashboard-container">
    <AllclientQuery class="dashboard" />

   
  </div>
</template>

<script>
import AllclientQuery from "../components/dashboard/allClient.vue";
 import pagination from "../components/modals/pagination.vue";
export default {
  components: {
AllclientQuery,
    
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