<template>
  <div class="main-content">
    <!-- Header Section -->
    <Header title="Failed Order" />
    
    <!-- Query Form -->
    <Query @query-result="handleQueryResults" @query-loading="setLoading" @query-error="setError" />
    
    <!-- Results Table -->
    <QueryTable 
      :queryResult="queryResults" 
      :isQueryLoading="isLoading" 
      :queryError="queryError"
      :lastQueryParams="lastQueryParams"
    />
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import Query from "../modals/FailerOrderQuery.vue";
import QueryTable from "../modals/FailedOrderTable.vue";

export default {
  components: {
    Header,
    Query,
    QueryTable
  },
  data() {
    return {
      queryResults: null, // Set to null initially to allow table to load its own data first
      lastQueryParams: null,
      isLoading: false,
      queryError: null
    };
  },
  methods: {
    handleQueryResults(results, params) {
      console.log("Query results received in parent:", results ? results.length : 0);
      this.queryResults = results;
      this.lastQueryParams = params;
      this.isLoading = false;
    },
    
    setLoading(isLoading) {
      console.log("Setting loading state:", isLoading);
      this.isLoading = isLoading;
    },
    
    setError(error) {
      console.log("Setting error state:", error);
      this.queryError = error;
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>

</style>