<template>
  <div>
    <!-- Loading and Error States -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading data...</p>
    </div>

    <div v-else-if="loadingError" class="error-container">
      <p>{{ loadingError }}</p>
      <button @click="retry" class="retry-button">Retry</button>
    </div>

    <!-- Table Container -->
    <div v-else-if="tableData.length > 0" class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead style="background-color: #F2F7F8;">
          <tr>
            <th><input type="checkbox" id="select-all" /></th>
            <th>Loan ID</th>
            <th>Loan Limit</th>
            <th>Loan Type</th>
            <th>Name</th>
            <th>Loan Terms</th>
            <th>Product Name</th>
            <th>Status</th>
            <th>Reason Of Failure</th>
            <th>Loan Tenure</th>
            <th>Loan Number</th>
            <th>Days Overdue</th>
            <th>Level</th>
            <th>Phone Number</th>
            <th>Loan Amount</th>
            <th>Transaction Ref</th>
            <th>Reference</th>
            <th>Loan Channel</th>
            <th>Loan Status</th>
            <th>Lending Status</th>
            <th>Processing Fee</th>
            <th>Loan Percentage</th>
            <th>Application Method</th>
            <th>Payment Channel</th>
            <th>Request Extension</th>
            <th>Date Of Ext Request</th>
            <th>Extension Days</th>
            <th>Extension Fee Paid</th>
            <th>Extension Amount</th>
            <th>Paid Amount</th>
            <th>Overdue Charges</th>
            <th>Loan Balance</th>
            <th>Total Amount</th>
            <th>Repayment Deadline</th>
            <th>Actual Repayment</th>
            <th>Extended Payback</th>
            <th>User ID</th>
            <th>Created At</th>
            <th>Updated At</th>
            <!-- <th class="operation-header">Operation</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, rowIndex) in tableData" :key="rowIndex">
            <td><input type="checkbox" :id="`checkbox-${rowIndex}`" /></td>
            <td>{{ item.loanId }}</td>
            <td>{{ item.loanLimit }}</td>
            <td>{{ item.loanType }}</td>
            <td>{{ item.user.lastName }} {{ item.user.firstName }}</td>
            <td>{{ item.loanTerms }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.reasonOfFailure }}</td>
            <td>{{ item.loanTenure }}</td>
            <td style="color: #00CCFF;">{{ item.loanNumber }}</td>
            <td>{{ item.daysOverDue }}</td>
            <td>{{ item.level }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.loanAmount }}</td>
            <td>{{ item.transactionReference }}</td>
            <td>{{ item.reference }}</td>
            <td>{{ item.loanChannel }}</td>
            <td>{{ item.loanStatus }}</td>
            <td>{{ item.lendingStatus }}</td>
            <td>{{ item.processingFee }}</td>
            <td>{{ item.loanPercentage }}</td>
            <td>{{ item.applicationMethod }}</td>
            <td>{{ item.paymentChannel }}</td>
            <td>{{ item.requestExtension }}</td>
            <td>{{ item.dateOfExtensionRequest }}</td>
            <td>{{ item.extensionDays }}</td>
            <td>{{ item.extensionFeePaid }}</td>
            <td>{{ item.extensionAmount }}</td>
            <td>{{ item.paidAmount }}</td>
            <td>{{ item.overDueCharges }}</td>
            <td>{{ item.loanBalance }}</td>
            <td>{{ item.totalAmount }}</td>
            <td>{{ item.repaymentDeadline }}</td>
            <td>{{ item.actualRepaymentDate }}</td>
            <td>{{ item.extendedPaybackTime }}</td>
            <td>{{ item.userId }}</td>
            <td>
              {{ formatDate(item.createdAt) }}
              <span style="color: #00CCFF;">{{ formatTime(item.createdAt) }}</span>
            </td>
            <td>
              {{ formatDate(item.updatedAt) }}
              <span style="color: #00CCFF;">{{ formatTime(item.updatedAt) }}</span>
            </td>
            <!-- <td class="operation-cell">
              <div class="button-container">
                <button class="operation-button" @click="openModal('operation', item.loanNumber)" style="width: 86px;">Operation</button>
                <button class="operation-button" @click="openModal('edit', item.loanNumber)" style="width: 86px;">Edit</button>
                <button class="operation-button" @click="openModal('refresh', item.loanNumber)" style="width: 86px;">Refresh</button>
                <button class="operation-button" @click="openModal('modifyAccount', item.loanNumber)" style="width: 103px;">Modify Account</button>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-data-container">
      <div class="no-data-content">
        <img src="/public/date.png" alt="No Data" class="no-data-icon" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQwIDcuNUM1OC41IDcuNSA3MyAyMiA3MyA0MEM3MyA1OCA1OC41IDcyLjUgNDAgNzIuNUMyMS41IDcyLjUgNyA1OCA3IDQwQzcgMjIgMjEuNSA3LjUgNDAgNy41WiIgc3Ryb2tlPSIjQUNBQ0IyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjQgNCIvPgo8cGF0aCBkPSJNMjYgMjZMNTQgNTQiIHN0cm9rZT0iI0FDQUNCMiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik01NCAyNkwyNiA1NCIgc3Ryb2tlPSIjQUNBQ0IyIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==';" />
        <p class="no-data-text">No Data Available</p>
        <p class="no-data-subtext">Try modifying your search criteria or reset filters</p>
        <button @click="handleReset" class="no-data-button">Reset Filters</button>
      </div>
    </div>

    <!-- Pagination Component Placeholder -->
    <div v-if="tableData.length > 0" class="pagination-container">
      <!-- Add your pagination component here -->
    </div>

    <!-- Dynamic Modal Components -->
    <component
      v-if="selectedModal"
      :is="selectedModal"
      :visible="showModal"
      :loan-number="selectedLoan"
      :title="modalTitle"
      @close="closeModal"
    >
      <p>Provide necessary details here.</p>
    </component>
  </div>
</template>

<script>
import OperationModal from "./ModifyAccountModal.vue";
import EditModal from "../modals/EditModal.vue";
import RefreshModal from "../modals/RefreshModal.vue";
import ModifyAccountModal from "../modals/Tip.vue";
import Cookies from 'js-cookie';

export default {
  components: {
    OperationModal,
    EditModal,
    RefreshModal,
    ModifyAccountModal,
  },
  props: {
    queryResult: {
      type: Array,
      default: null
    },
    isQueryLoading: {
      type: Boolean,
      default: false
    },
    queryError: {
      type: String,
      default: null
    },
    lastQueryParams: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      tableData: [],
      showModal: false,
      selectedModal: null,
      modalTitle: "",
      selectedLoan: null,
      isAuthenticated: false,
      isLoading: true,
      loadingError: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      initialDataLoaded: false
    };
  },
  watch: {
    // Watch for query results coming from parent
    queryResult(newData) {
      if (newData) {
        this.tableData = newData;
        this.loadingError = null;
      } else if (this.initialDataLoaded) {
        // Only show "no data" if initial data was already loaded
        // and we're processing a new query with no results
        this.loadingError = null; // Don't show as error, show the nice empty state
        this.tableData = [];
      }
      // We don't set isLoading=false here because we use isQueryLoading prop
    },

    // Watch for loading state changes from parent
    isQueryLoading(isLoading) {
      if (isLoading) {
        this.isLoading = true;
        this.loadingError = null;
      } else if (this.initialDataLoaded) {
        this.isLoading = false;
      }
    },

    // Watch for error changes from parent
    queryError(error) {
      if (error) {
        this.loadingError = error;
        this.isLoading = false;
      } else if (!this.isQueryLoading) {
        this.loadingError = null;
      }
    },
  },
  async created() {
    // Run authentication check and data fetch on component creation
    await this.verifyAuthAndFetchData();
  },
  methods: {
    // Method to verify auth token and fetch data
    async verifyAuthAndFetchData(queryParams = null) {
      this.isLoading = true;
      this.loadingError = null;

      try {
        // Get auth token from cookies
        const authToken = Cookies.get('authToken');

        if (!authToken) {
          // Redirect to login if no token found
          this.$router.push('/auth/signin');
          return;
        }

        // Authenticate first
        this.isAuthenticated = true;

        // If there are query results from parent and we've already loaded initial data, don't fetch again
        if (this.queryResult !== null && this.initialDataLoaded) {
          this.isLoading = this.isQueryLoading;
          return;
        }

        // Construct the API URL with pagination
        let apiUrl = `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/operation/failed-loans?page=${this.currentPage}`;
        const requestBody = {
          page: this.currentPage,
          itemsPerPage: this.itemsPerPage,
        };

        // Add any query parameters if provided
        if (queryParams) {
          Object.assign(requestBody, queryParams);
        }

        // Fetch table data if authenticated
        const dataResponse = await fetch(
          apiUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(requestBody)
          }
        );

        if (!dataResponse.ok) {
          const errorData = await dataResponse.json().catch(() => ({}));
          throw new Error(errorData.message || `API error: ${dataResponse.status}`);
        }

        const responseData = await dataResponse.json();

        // Handle different response structures
        if (responseData.data) {
          // If API returns { data: [...], meta: { total: X } } structure
          this.tableData = responseData.data;
          this.totalItems = responseData.meta?.total || 0;
        } else if (Array.isArray(responseData)) {
          // If API returns array directly
          this.tableData = responseData;
          this.totalItems = responseData.length;
        } else {
          // Fallback for other structures
          this.tableData = responseData;
          this.totalItems = 0;
        }

        // Mark that initial data has been loaded
        this.initialDataLoaded = true;

      } catch (error) {
        console.error('Error:', error);
        this.loadingError = error.message || 'Failed to fetch data';
        this.isAuthenticated = false;

        // Only redirect if it's an authentication error
        if (error.message.includes('Authentication failed') ||
          error.message.includes('401') ||
          error.message.includes('unauthorized')) {
          this.$router.push('/auth/signin');
        }
      } finally {
        // If this is the initial load, or if there's no active query from parent
        if (!this.initialDataLoaded || this.queryResult === null) {
          this.isLoading = false;
        } else {
          // Otherwise, respect the loading state from parent
          this.isLoading = this.isQueryLoading;
        }
      }
    },

    openModal(type, loanNumber) {
      const modalMapping = {
        operation: OperationModal,
        edit: EditModal,
        refresh: RefreshModal,
        modifyAccount: ModifyAccountModal,
      };

      this.selectedLoan = loanNumber;
      this.selectedModal = modalMapping[type];
      this.modalTitle = `${type.charAt(0).toUpperCase() + type.slice(1)} for Loan ${loanNumber}`;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedModal = null;
    },

    // Add retry method to allow user to retry if fetch fails
    retry() {
      if (this.lastQueryParams) {
        this.verifyAuthAndFetchData(this.lastQueryParams);
      } else {
        this.verifyAuthAndFetchData();
      }
    },
    
    // Reset filters by emitting to parent component
    handleReset() {
      this.$emit('reset-filters');
    },

    // Pagination handlers
    changePage(newPage) {
      this.currentPage = newPage;
      this.verifyAuthAndFetchData(this.lastQueryParams);
    },

    // Format date and time helpers
    formatDate(dateString) {
      if (!dateString) return '';
      return dateString.split(' ')[0];
    },

    formatTime(dateString) {
      if (!dateString) return '';
      const parts = dateString.split(' ');
      return parts.length > 1 ? parts[1] : '';
    }
  },
};
</script>


<style scoped>
.table-container {
  overflow-x: auto;
  width: 99.5%;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 12px;
}

.data-table {
  width: 2592px;
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
.data-table tbody tr:hover {
  background-color: #ffff; /* Change background color on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow under the hovered row */
  cursor: pointer; /* Change cursor to pointer on hover */
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

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.operation-button {
  color: #00CCFF;
  background-color: #fff;
  border: 1px solid #00CCFF;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.operation-button:hover {
  background-color: #00CCFF;
  color: #fff;
}

/* Sticky the first column (checkbox) */
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

/* Sticky the Operation column */
.data-table th.operation-header,
.data-table td.operation-cell {
  position: sticky;
  right: 0;
  background-color: #fff;
  z-index: 1;
}

.data-table th.operation-header {
  background-color: #F2F7F8;
}

/* Styling for header row to make sure sticky column header stays visible */
.data-table th {
  background-color: #F2F7F8;
}

/* Loading and Error Styles */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
}

.loading-spinner {
  border: 4px solid rgba(0, 204, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #00CCFF;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #004759;
  font-size: 14px;
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  color: #ff3333;
  font-weight: 500;
}

.retry-button {
  background-color: #00CCFF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.retry-button:hover {
  opacity: 0.8;
}

/* Enhanced No Data Styling */
.no-data-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  margin-top: 12px;
}

.no-data-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px;
}

.no-data-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  opacity: 0.6;
}

.no-data-text {
  font-size: 20px;
  font-weight: 500;
  color: #004759;
  margin-bottom: 8px;
}

.no-data-subtext {
  font-size: 14px;
  color: #ACACB2;
  margin-bottom: 20px;
  max-width: 300px;
}

.no-data-button {
  background-color: white;
  color: #00CCFF;
  border: 1px solid #00CCFF;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.no-data-button:hover {
  background-color: #00CCFF;
  color: white;
}
</style>