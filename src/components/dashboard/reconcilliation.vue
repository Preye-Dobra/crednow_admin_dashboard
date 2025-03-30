<template>
  <div>
    <Header title="Reconciliation" />
    <div class="main-content">
      <!-- Query Form Component -->
      <reconciliation-query
        @loading="handleLoading"
        @query-result="handleQueryResult"
        @error="handleError"
      />
      
      <!-- Table Component -->
      <reconciliation-table
        :queryResult="queryResult"
        :isQueryLoading="isLoading"
        :queryError="error"
      />
    </div>
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import ReconciliationQuery from "../modals/reconcilliation.vue";
import ReconciliationTable from "../modals/ReconcilliationList.vue";

export default {
  components: {
    Header,
    ReconciliationQuery,
    ReconciliationTable
  },
  data() {
    return {
      isLoading: false,
      queryResult: null,
      error: null
    };
  },
  methods: {
    handleLoading(loading) {
      this.isLoading = loading;
      if (loading) {
        this.error = null;
      }
    },
    
    handleQueryResult(result) {
      console.log("Query result received in parent:", result);
      this.queryResult = result;
    },
    
    handleError(errorMessage) {
      console.error("Error received in parent:", errorMessage);
      this.error = errorMessage;
      this.queryResult = null;
    }
  }
};
</script>

<style scoped>

</style>