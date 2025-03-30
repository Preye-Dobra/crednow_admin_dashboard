<template>
  <div>
    <Header title="Loan Inquiries" />
    <div class="dashboard-container">
      <QueryModal 
        ref="queryModal" 
        @query="handleQueryResponse" 
        @error="handleQueryError" 
      />
      <Table :queryResponse="queryResponse" />
      
      <!-- Add Pagination Component -->
      <Pagination
        v-if="queryResponse.success && queryResponse.totalLoans > 0"
        :total-items="queryResponse.totalLoans"
        :initial-items-per-page="itemsPerPage"
        :initial-page="currentPage"
        :loading="loading"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import QueryModal from "../query/inquiry.vue";
import Table from "../modals/loanInquiryList.vue";
import Pagination from "../modals/pagination.vue"; // Import pagination component

export default {
  components: {
    Header,
    QueryModal,
    Table,
    Pagination // Add to components
  },
  data() {
    return {
      queryResponse: {
        success: false,
        message: "",
        totalLoans: 0, // Changed from totalRepayments to match API response
        next: null,
        data: []
      },
      currentPage: 1,
      itemsPerPage: 10,
      loading: false,
      // Store the last query parameters to reuse when changing pages
      lastQueryParams: {}
    };
  },
  methods: {
    handleQueryResponse(response) {
      console.log("Repayment query response received in parent component:", response);
      this.queryResponse = response;
      // Update current page from response if available
      if (response.next) {
        this.currentPage = response.next - 1; // next points to the next page
      }
    },
    
    handleQueryError(error) {
      console.error("Repayment query error in parent component:", error);
      this.queryResponse = {
        success: false,
        message: error.message || "An error occurred",
        totalLoans: 0, // Changed from totalRepayments to match API response
        next: null,
        data: []
      };
      this.loading = false;
    },
    
    async handlePageChange(page, itemsPerPage) {
      console.log(`Page changed to ${page} with ${itemsPerPage} items per page`);
      this.currentPage = page;
      this.itemsPerPage = itemsPerPage;
      this.loading = true;
      
      // Using ref instead of $children to access QueryModal
      const queryModalInstance = this.$refs.queryModal;
      
      if (queryModalInstance) {
        // Prepare params for the API call
        const params = {
          page: this.currentPage,
          limit: this.itemsPerPage
        };
        
        // Call the fetchDataForPage method on the QueryModal component
        await queryModalInstance.fetchDataForPage(params);
      } else {
        console.error("Could not find QueryModal component instance");
      }
      
      this.loading = false;
    }
  }
};
</script>

<style scoped>

</style>