<template>
  <div>
    <Header title="All clients" />
    <div class="dashboard-container">
      <QueryModal @query="handleQueryResponse" @error="handleQueryError" />
      <Table :queryResponse="queryResponse" ref="dataTable" />
    </div>
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import QueryModal from "../modals/QueryFormTwo.vue";
import Table from "../dashboard/allClientTwo.vue";

export default {
  components: {
    Header,
    QueryModal,
    Table
  },
  data() {
    return {
      queryResponse: {
        success: false,
        message: "",
        totalUsers: 0,
        next: null,
        data: []
      }
    };
  },
  methods: {
    handleQueryResponse(response) {
      console.log("Main component received query response:", response);
      
      // Verify response has data property
      if (response && response.data) {
        console.log("Number of records:", response.data.length);
        if (response.data.length > 0) {
          console.log("First record sample:", response.data[0]);
        }
      } else {
        console.warn("Response missing data property:", response);
      }
      
      // Set the queryResponse and notify the table component
      this.queryResponse = {...response};
      
      // Use $nextTick to ensure the component updates properly
      this.$nextTick(() => {
        // If table has a refresh method, call it
        if (this.$refs.dataTable && typeof this.$refs.dataTable.refreshFromQuery === 'function') {
          this.$refs.dataTable.refreshFromQuery(response);
        }
      });
    },
    
    handleQueryError(error) {
      console.error("Query error:", error);
      this.queryResponse = {
        success: false,
        message: error.message || "An error occurred",
        totalUsers: 0,
        next: null,
        data: []
      };
    }
  }
};
</script>

<style scoped>

</style>