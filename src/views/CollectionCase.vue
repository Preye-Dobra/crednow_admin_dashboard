<template>
  <div class="collection-container">
    <collection class="collection" />
    <pagination class="pagination"/>
  </div>
</template>

<script>
import collection from "../components/dashboard/collectionCase.vue";
import pagination from "../components/modals/pagination.vue";
export default {
  components: {
    collection,

    pagination,
  },
};
</script>

<style scoped>
.collection-container {
  width: calc(100% - 198px); /* Adjust width to account for the sidebar */
  margin-left: 198px; /* Offset the container to avoid overlapping */
  padding: 10px; /* Optional: Add padding for better spacing */
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100vh;
  background-color: #d9f7ff;
  font-family: 'Fira Sans', sans-serif;
  box-sizing: border-box; /* Ensure padding does not affect width */
}
.pagination,
.collection,
.collection-two {
  width: 100%;
}

</style>
  