<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading data...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="loadingError" class="error-container">
      <p>{{ loadingError }}</p>
    </div>

    <!-- Table Container -->
    <div v-else-if="tableData.length > 0" class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Loan Limit</th>
            <th>Name</th>
            <th>Loan Type</th>
            <th>Loan Terms</th>
            <th>Product Name</th>
            <th>Status</th>
            <th>Loan Tenure</th>
            <th>Loan Number</th>
            <th>Phone Number</th>
            <th>Days Overdue</th>
            <th>Loan Amount</th>
            <th>Transaction Reference</th>
            <th>Loan Status</th>
            <th>Processing Fee</th>
            <th>Loan Balance</th>
            <th>Total Amount</th>
            <th class="operation-header">Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.loanId }}</td>
            <td>{{ item.loanLimit }}</td>
            <td>{{ item.user.lastName }} {{ item.user.firstName }}</td>
            <td>{{ item.loanType }}</td>
            <td>{{ item.loanTerms }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.loanTenure }}</td>
            <td>{{ item.loanNumber }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.daysOverDue }}</td>
            <td>{{ item.loanAmount }}</td>
            <td>{{ item.transactionReference }}</td>
            <td>{{ item.loanStatus }}</td>
            <td>{{ item.processingFee }}</td>
            <td>{{ formatCurrency(item.loanBalance) }}</td>
            <td>{{ formatCurrency(item.totalAmount) }}</td>
            <td class="operation-cell">
              <div class="button-container">
                <button 
                  v-if="isSuperAdmin" 
                  class="operation-button" 
                  @click="openBillingModal(item)"
                >
                  Billing
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No Data State -->
    <div v-else class="no-data-container">
      <p>No data available.</p>
    </div>

    <!-- Status Message -->
    <div v-if="statusMessage" class="status-message" :class="statusMessage.type">
      {{ statusMessage.text }}
    </div>

    <!-- Billing Modal -->
    <BillingModal
      v-if="showBillingModal"
      :visible="showBillingModal"
      :loanId="selectedLoanId"
      :loanData="selectedLoanData"
      @close="closeBillingModal"
      @success="handleBillingSuccess"
      @error="handleBillingError"
    />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import BillingModal from "../modals/billingModal.vue";

export default {
  components: {
    BillingModal
  },
  props: {
    queryResult: {
      type: Object,
      default: null
    },
    isQueryLoading: {
      type: Boolean,
      default: false
    },
    queryError: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      tableData: [],
      isLoading: true,
      loadingError: null,
      showBillingModal: false,
      selectedLoanId: null,
      selectedLoanData: null,
      statusMessage: null,
      userProfile: null
    };
  },
  computed: {
    isSuperAdmin() {
      return this.userProfile && this.userProfile.role === "super-admin";
    }
  },
  watch: {
    queryResult(newData) {
      if (newData && newData.success && newData.data) {
        this.tableData = newData.data;
        this.loadingError = null;
      } else if (newData) {
        this.loadingError = "No data available for this query.";
        this.tableData = [];
      }
      this.isLoading = false;
    },
    isQueryLoading(isLoading) {
      this.isLoading = isLoading;
    },
    queryError(error) {
      if (error) {
        this.loadingError = error;
        this.tableData = [];
      } else {
        this.loadingError = null;
      }
    }
  },
  mounted() {
    // Load user profile from local storage
    this.loadUserProfile();
    
    // Auto-fetch data when the component mounts, only if no queryResult is provided
    if (!this.queryResult) {
      this.fetchAllData();
    }
  },
  methods: {
    loadUserProfile() {
      // Fetch user profile from local storage
      const userProfile = localStorage.getItem("userProfile");
      if (userProfile) {
        this.userProfile = JSON.parse(userProfile);
        console.log("Loaded user profile from local storage:", this.userProfile);
      } else {
        console.warn("No user profile found in local storage");
        this.userProfile = { role: "super-admin" }; // Fallback for testing
      }
    },
    async fetchAllData() {
      console.log("Auto-fetching all records on component mount");
      this.isLoading = true;
      this.loadingError = null;
      
      try {
        const authToken = Cookies.get("authToken");
        
        if (!authToken) {
          this.loadingError = "Authentication token not found. Please log in again.";
          this.isLoading = false;
          return;
        }
        
        const emptyQuery = {};
        
        const response = await fetch(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/financial/reconciliation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify(emptyQuery)
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          this.tableData = data.data;
        } else {
          this.loadingError = "No data available.";
          this.tableData = [];
        }
      } catch (error) {
        console.error("Error fetching reconciliation data:", error);
        this.loadingError = error.message || "Failed to load data. Please try again.";
        this.tableData = [];
      } finally {
        this.isLoading = false;
      }
    },
    formatCurrency(value) {
      if (!value) return "0.00";
      return parseFloat(value).toLocaleString('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      });
    },
    openBillingModal(loanItem) {
      this.selectedLoanId = loanItem.loanId;
      this.selectedLoanData = loanItem;
      this.showBillingModal = true;
    },
    closeBillingModal() {
      this.showBillingModal = false;
      setTimeout(() => {
        this.selectedLoanId = null;
        this.selectedLoanData = null;
      }, 300);
    },
    handleBillingSuccess(data) {
      console.log('Billing update successful:', data);
      this.statusMessage = {
        type: 'success',
        text: 'Billing update was successful!'
      };
      setTimeout(() => {
        this.statusMessage = null;
      }, 3000);
      this.fetchAllData();
    },
    handleBillingError(errorMessage) {
      console.error('Billing update failed:', errorMessage);
      this.statusMessage = {
        type: 'error',
        text: `Error: ${errorMessage}`
      };
      setTimeout(() => {
        this.statusMessage = null;
      }, 5000);
    }
  }
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

.data-table th {
  background-color: #F2F7F8;
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
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  width: 86px;
  height: 34px;
  font-weight: 400;
}

.operation-button:hover {
  background-color: #00CCFF;
  color: #fff;
}

.data-table tbody tr:hover {
  background-color: #ffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #004759;
  font-size: 14px;
}

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  color: #ff3333;
  font-weight: 500;
}

.no-data-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  color: #585865;
  font-size: 14px;
}

.status-message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
}

.status-message.success {
  background-color: #4CAF50;
}

.status-message.error {
  background-color: #F44336;
}
</style>


