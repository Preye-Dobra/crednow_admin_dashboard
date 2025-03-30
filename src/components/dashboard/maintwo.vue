<template>
  <div>
    <QueryForm ref="queryForm" @query="handleQueryResults" />
    <div class="table-scroll-buttons">
      <!-- <button @click="scrollLeft" class="scroll-button">◀ Scroll Left</button>
      <button @click="scrollRight" class="scroll-button">Scroll Right ▶</button> -->
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading data...</p>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="tableData.length === 0" class="empty-state">
      <p>{{ loadingError ? loadingError : "No data available. Please try a different query." }}</p>
    </div>
    
    <!-- Table with Data -->
    <div v-else class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead style="background-color: #F2F7F8;">
          <tr>
            <th style="color: #004759; font-size: 14px;">Loan Number</th>
            <th style="color: #004759; font-size: 14px;">Loan ID</th>
                        <th style="color: #004759; font-size: 14px;">Name</th>
            <th style="color: #004759; font-size: 14px;">Product Name</th>
            <th style="color: #004759; font-size: 14px;">Loan Terms</th>
            <th style="color: #004759; font-size: 14px;">Payment Channel</th>
            <th style="color: #004759; font-size: 14px;">Status</th>
            <th style="color: #004759; font-size: 14px;">Level</th>
            <th style="color: #004759; font-size: 14px;">Paid Amount</th>
            <th style="color: #004759; font-size: 14px;">Phone Number</th>
            <th style="color: #004759; font-size: 14px;">Loan Tenure</th>
            <th style="color: #004759; font-size: 14px;">Loan Amount</th>
            <th style="color: #004759; font-size: 14px;">Loan Percentage</th>
            <th style="color: #004759; font-size: 14px;">Loan Type</th>
            <th style="color: #004759; font-size: 14px;">Loan Status</th>
            <th style="color: #004759; font-size: 14px;">Processing Fee</th>
            <th style="color: #004759; font-size: 14px;">Lending Status</th>
            <th style="color: #004759; font-size: 14px;">Loan Channel</th>
            <th style="color: #004759; font-size: 14px;">Request Extension</th>
            <th style="color: #004759; font-size: 14px;">Days Overdue</th>
            <th style="color: #004759; font-size: 14px;">Reason of Failure</th>
            <th style="color: #004759; font-size: 14px;">Application Method</th>
            <th style="color: #004759; font-size: 14px;">Created At</th>
            <th style="color: #004759; font-size: 14px;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td style="color: #00CCFF;">{{ item.loanNumber }}</td>
            <td>{{ item.loanId }}</td>
                        <td>{{ item.user.lastName }} {{ item.user.firstName }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.loanTerms }}</td>
            <td>{{ item.paymentChannel }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.level }}</td>
            <td>{{ item.paidAmount }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.loanTenure }}</td>
            <td>{{ item.loanAmount }}</td>
            <td>{{ item.loanPercentage }}</td>
            <td>{{ item.loanType }}</td>
            <td
              :class="{
                'payment-period': item.loanStatus === 'disbursed',
                'pre-review': item.loanStatus === 'pending',
              }"
            >
              {{ item.loanStatus }}
            </td>
            <td>{{ item.processingFee }}</td>
            <td>{{ item.lendingStatus }}</td>
            <td>{{ item.loanChannel }}</td>
            <td>{{ item.requestExtension ? 'Yes' : 'No' }}</td>
            <td>{{ item.daysOverDue }}</td>
            <td>{{ item.reasonOfFailure || '-' }}</td>
            <td>{{ item.applicationMethod }}</td>
            <td v-html="formatDate(item.createdAt)"></td>
            <td>
              <div class="button-container">
                <button
                  class="approve-button"
                  @click="approveLoan(item.loanNumber)"
                >
                  Approve
                </button>
                <button
                  class="reject-button"
                  @click="rejectLoan(item.loanNumber)"
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <Pagination 
      :totalItems="totalItems" 
      :initialItemsPerPage="currentLimit" 
      :initialPage="currentPage" 
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import QueryForm from "../modals/queryForm.vue";
import Pagination from "../modals/pagination.vue";
import Cookies from "js-cookie";

export default {
  components: {
    QueryForm,
    Pagination
  },
  data() {
    return {
      tableData: [], // Start with an empty array
      isLoading: true, // Add loading state
      loadingError: null, // Track loading errors
      initialDataLoaded: false, // Flag to prevent multiple initial loads
      totalItems: 0, // Total number of items for pagination
      currentPage: 1, // Current page
      currentLimit: 10, // Items per page
      lastQueryParams: {}, // Store the last query parameters
      nextPage: null, // Store the next page from API response
    };
  },
  mounted() {
    // Only trigger the initial data load once
    if (!this.initialDataLoaded) {
      this.initialDataLoaded = true;
      this.$nextTick(() => {
        console.log("Component mounted, loading initial data");
        // First check if there's a QueryForm component and it has a handleQuery method
        if (this.$refs.queryForm && typeof this.$refs.queryForm.handleQuery === 'function') {
          this.$refs.queryForm.handleQuery();
        } else {
          // If we can't access the QueryForm directly, use our own fetch method
          this.fetchInitialData();
        }
      });
    }
  },
  
  watch: {
    // Watch for changes to totalItems to ensure pagination component gets updated
    totalItems(newValue) {
      console.log(`Total items updated to: ${newValue}`);
    }
  },
  methods: {
    async fetchData(page = 1, limit = 10, queryParams = {}) {
      this.isLoading = true; // Set loading to true when starting to fetch
      this.loadingError = null; // Clear any previous errors
      
      try {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          console.error("No authToken found in cookies!");
          this.loadingError = "Authentication token not found. Please log in again.";
          this.isLoading = false;
          return;
        }
        
        // Combine pagination with any other query parameters
        const requestBody = {
          page,
          limit,
          ...queryParams
        };
        
        // Save the last query parameters for pagination
        this.lastQueryParams = queryParams;
        
        // Use the URL with query parameter for GET requests or include in body for POST
        const url = `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/application/all-application?page=${page}`;
        
        const response = await fetch(
          url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(requestBody)
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Data:", responseData);
        
        if (responseData.success && responseData.data) {
          this.tableData = responseData.data;
          this.totalItems = responseData.totalLoans || 0;
          this.currentPage = page;
          this.currentLimit = limit;
          this.nextPage = responseData.next || null;
          
          // Log pagination details for debugging
          console.log("Pagination info:", {
            totalItems: this.totalItems,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            itemsPerPage: this.currentLimit
          });
        } else {
          console.error("Data was not successful or data is missing.");
          this.loadingError = "No data returned from the server.";
          this.tableData = [];
          this.totalItems = 0;
          this.nextPage = null;
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.loadingError = `Error fetching data: ${error.message}`;
        this.tableData = []; // Clear table data on error
        this.totalItems = 0;
        this.nextPage = null;
      } finally {
        // Always turn off loading when done, whether successful or not
        this.isLoading = false;
      }
    },
    
    async fetchInitialData() {
      await this.fetchData(1, 10, {});
    },
    
    formatDate(dateString) {
      if (!dateString) return "-";
      
      try {
        const date = new Date(dateString);
        const datePart = date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
        const timePart = date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        });
        
        return `${datePart} <span style="color: #00CCFF;">${timePart}</span>`;
      } catch (error) {
        return dateString; // Return the original value if there's an error
      }
    },
    
    handlePageChange(page, itemsPerPage) {
      console.log(`Page change requested: page ${page}, items per page ${itemsPerPage}`);
      // Validate the page number before fetching
      const maxPage = Math.ceil(this.totalItems / itemsPerPage) || 1;
      if (page < 1 || page > maxPage) {
        console.warn(`Invalid page ${page}, valid range is 1-${maxPage}`);
        page = Math.min(Math.max(1, page), maxPage);
      }
      
      this.fetchData(page, itemsPerPage, this.lastQueryParams);
    },
    
    approveLoan(loanNumber) {
      alert(`Loan Number ${loanNumber} approved.`);
    },
    
    rejectLoan(loanNumber) {
      alert(`Loan Number ${loanNumber} rejected.`);
    },
    
    scrollLeft() {
      this.$refs.tableContainer.scrollBy({ left: -300, behavior: "smooth" });
    },
    
    scrollRight() {
      this.$refs.tableContainer.scrollBy({ left: 300, behavior: "smooth" });
    },
    
    handleQueryResults(responseData) {
      // Don't set isLoading to true here since it's already been set by the QueryForm
      this.loadingError = null; // Clear any previous errors
      
      console.log("Full responseData received:", responseData);
      if (responseData.success && responseData.data) {
        this.tableData = responseData.data;
        this.totalItems = responseData.totalLoans || 0;
        this.currentPage = 1; // Reset to first page when a new query is made
        this.nextPage = responseData.next || null;
        
        // Log pagination details for debugging
        console.log("Query results pagination info:", {
          totalItems: this.totalItems,
          currentPage: this.currentPage,
          nextPage: this.nextPage,
          itemsPerPage: this.currentLimit
        });
      } else {
        console.error("Query results were not successful or data is missing.");
        this.loadingError = "No data returned from the server for this query.";
        this.tableData = [];
        this.totalItems = 0;
        this.nextPage = null;
      }
      
      this.isLoading = false; // Turn off loading when done
    },
  },
};
</script>

<style scoped>
/* Existing styles */
.data-table tbody tr:hover {
  background-color: #ffff; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer; 
}
.table-container {
  overflow-x: auto;
  width: 85vw;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.data-table {
  width: 2500px; /* Adjusted width for fewer columns */
  border-collapse: collapse;
  margin: 0;
  text-align: left;
}

tr th {
  font-size: 14px;
  line-height: 19.6px;
  text-align: center;
  color: #004759;
  font-weight: 400;
}

tr td {
  font-size: 12px;
  line-height: 16.8px;
  font-weight: 400;
  text-align: center;
  color: #585865;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
}

/* Sticky the Loan Number column */
.data-table th:first-child,
.data-table td:first-child {
  position: sticky;
  left: 0;
  background-color: #fff; 
  z-index: 1; 
}
.data-table th:first-child {
  background-color: #F2F7F8; 
}


.data-table th {
  background-color: #F2F7F8;
}

/* Add some space for scroll buttons */
.table-scroll-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.scroll-button {
  padding: 5px 15px;
  margin: 0 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.scroll-button:hover {
  background-color: #0056b3;
}

.pass {
  color: #00CCFF;
}

.waiting {
  color: orange;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.approve-button {
  color: #fff;
  background-color: #00CCFF;
  border: none;
  padding: 10px 10px;
  margin: 4px;
  border-radius: 5px;
  cursor: pointer;
}

.reject-button {
  color: red;
  background-color: #fff;
  border: 1px solid red;
  padding: 10px 10px;
  margin: 4px;
  border-radius: 5px;
  cursor: pointer;
}
.payment-period {
  color: #00CCFF;
}

.pre-review {
  color: #E59600;
}

/* Loading state styles */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 99.5%;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #00CCFF;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.loading-text {
  color: #004759;
  font-size: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Empty state styling */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 99.5%;
  color: #585865;
  font-size: 16px;
}
</style>