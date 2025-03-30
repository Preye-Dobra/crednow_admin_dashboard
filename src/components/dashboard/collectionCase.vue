<template>
  <div>
    <Header title="Overdue Cases" />
    <div class="main-content">
      <!-- Form Section -->
      <div class="form-section">
        <form @submit.prevent="handleQuery">
          <div class="form-grid">
            <!-- Phone Number -->
            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                v-model="queryData.phoneNumber"
                placeholder="Please enter"
              />
            </div>

            <!-- First Name -->
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                v-model="queryData.firstName"
                placeholder="Please enter"
              />
            </div>

            <!-- Last Name -->
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                v-model="queryData.lastName"
                placeholder="Please enter"
              />
            </div>

            <!-- Loan Number -->
            <div class="form-group">
              <label for="loanNumber">Loan Number</label>
              <input
                type="number"
                id="loanNumber"
                v-model="queryData.loanNumber"
                placeholder="Please enter"
              />
            </div>

            <!-- Product Name -->
            <div class="form-group">
              <label for="productName">Product Name</label>
              <select id="productName" v-model="queryData.productName">
                <option disabled value="">--Select Option--</option>
                <option value="crednow">Crednow</option>
              </select>
            </div>

            <!-- Loan Tenure -->
            <div class="form-group">
              <label for="loanTenure">Loan Tenure</label>
              <select id="loanTenure" v-model="queryData.loanTenure">
                <option disabled value="">--Select Option--</option>
                <option :value="14">14</option>
                <option :value="28">28</option>
                <option :value="60">60</option>
              </select>
            </div>

            <!-- Loan Amount -->
            <div class="form-group">
              <label for="loanAmount">Loan Amount</label>
              <input
                type="number"
                id="loanAmount"
                v-model="queryData.loanAmount"
                placeholder="Please enter"
              />
            </div>

            <!-- Loan Status -->
            <div class="form-group">
              <label for="loanStatus">Loan Status</label>
              <select id="loanStatus" v-model="queryData.loanStatus">
                <option disabled value="">--Select Option--</option>
                <option value="overdue">Overdue</option>
                <option value="approved">Approved</option>
                <option value="disbursed">Disbursed</option>
                <option value="disbursement failed">Disbursement Failed</option>
              </select>
            </div>

            <!-- Loan Type -->
            <div class="form-group">
              <label for="loanType">Loan Type</label>
              <select id="loanType" v-model="queryData.loanType">
                <option value="" disabled selected>--Select Option--</option>
                <option value="Payday">Payday</option>
              </select>
            </div>

                        <!-- Days Overdue -->
            <div class="form-group">
              <label for="loanType">Days Overdue</label>
               <input
                type="number"
                id="daysOverDue"
                v-model="queryData.daysOverDue"
                placeholder="Please enter"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button type="submit" class="btn btn-query" :disabled="isLoading">
              <span v-if="isLoading" class="loader"></span>
              <span v-else>Query</span>
            </button>
            <button
              type="button"
              class="btn btn-reset"
              @click="handleReset"
              :disabled="isLoading"
            >
              Reset
            </button>
            <button
              v-if="isSuperAdmin"
              @click="openModal"
              type="button"
              class="btn"
              style="background-color: #e85353; color: #fff; border: #e85353"
              :disabled="isLoading || selectedIds.length === 0"
            >
              Assign Agent
            </button>

            <AssignAgentModal
              v-if="showModal"
              :isOpen="showModal"
              @close="showModal = false"
              @assign="handleAssign"
            />
          </div>
        </form>
      </div>
      
      <!-- Error Message Display -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <!-- Loading Indicator -->
      <div v-if="isLoading && !tableData.length" class="loading-container">
        <div class="loading-spinner-large"></div>
        <p>Loading data...</p>
      </div>
      
      <!-- Table Display -->
      <div v-if="tableData.length > 0" class="table-container" ref="tableContainer">
        <table class="data-table">
          <thead>
            <tr>
              <!-- Select All Checkbox (only visible for super-admin) -->
              <th v-if="isSuperAdmin" class="checkbox-column">
                <div class="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id="selectAll" 
                    :checked="isAllSelected"
                    @change="toggleSelectAll" 
                  />
                  <label for="selectAll"></label>
                </div>
              </th>
              <th v-for="field in displayFields" :key="field">
                {{ formatHeader(field) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
              <!-- Individual Row Checkbox (only visible for super-admin) -->
              <td v-if="isSuperAdmin" class="checkbox-column">
                <div class="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    :id="'row-' + row.loanId" 
                    :checked="isSelected(row.loanId)"
                    @change="toggleSelect(row.loanId)" 
                  />
                  <label :for="'row-' + row.loanId"></label>
                </div>
              </td>
              <td v-for="field in displayFields" :key="field">
                <template v-if="isTimeField(field)">
                  <span v-html="formatTime(row[field])"></span>
                </template>
                <template v-else-if="isObjectField(field, row)">
                  <span>{{ formatObject(row[field]) }}</span>
                </template>
                <template v-else-if="isArrayField(field, row)">
                  <span>{{ formatArray(row[field]) }}</span>
                </template>
                <template v-else>
                  {{ getFieldValue(row, field) || '-' }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import AssignAgentModal from "../modals/assignAgen.vue";
import Cookies from "js-cookie";

export default {
  name: "OverdueComponent",
  components: {
    Header,
    AssignAgentModal
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      errorMessage: "",
      tableData: [],
      currentPage: 1,
      totalPages: 1,
      selectedIds: [], // Array to store selected loan IDs
      userRole: null, // Store the user's role
      // Query form data
      queryData: {
        phoneNumber: "",
        firstName: "",
        lastName: "",
        loanNumber: null,
        productName: "",
        loanTenure: null,
        loanAmount: null,
        loanStatus: "",
        loanType: "",
        daysOverDue: null
      },
      // Fields to display in the table
      displayFields: [
        "loanNumber",
        "phoneNumber",
        "loanId",
        "loanLimit",
        "user",
        "loanType",
        "loanTerms",
        "productName",
        "status",
        "loanTenure",
        "daysOverDue",
        "loanAmount",
        "loanStatus",
        "processingFee",
        "paidAmount",
        "loanBalance",
        "totalAmount",
        "repaymentDeadline",
        "createdAt"
      ],
      // All available fields from API
      allFields: [
        "loanId",
        "loanLimit",
        "loanType",
        "user",
        "loanTerms",
        "productName",
        "status",
        "reasonOfFailure",
        "loanTenure",
        "loanNumber",
        "daysOverDue",
        "level",
        "phoneNumber",
        "loanAmount",
        "transactionReference",
        "reference",
        "loanChannel",
        "loanStatus",
        "lendingStatus",
        "processingFee",
        "loanPercentage",
        "applicationMethod",
        "paymentChannel",
        "requestExtension",
        "dateOfExtensionRequest",
        "extensionDays",
        "extensionFeePaid",
        "extensionAmount",
        "paidAmount",
        "overDueCharges",
        "loanBalance",
        "totalAmount",
        "repaymentDeadline",
        "actualRepaymentDate",
        "extendedPaybackTime",
        "userId",
        "createdAt",
        "updatedAt"
      ]
    };
  },
  computed: {
    isAllSelected() {
      return this.tableData.length > 0 && this.selectedIds.length === this.tableData.length;
    },
    isSuperAdmin() {
      return this.userRole === 'super-admin';
    }
  },
  mounted() {
    // Check user role from localStorage
    this.getUserRoleFromLocalStorage();
    
    // Load initial data when component mounts
    this.fetchInitialData();
    
    // Load selected IDs from local storage if any
    this.loadSelectedIdsFromLocalStorage();
  },
  methods: {
    // USER ROLE CHECK
    getUserRoleFromLocalStorage() {
      try {
        const userProfileString = localStorage.getItem('UserProfile');
        if (userProfileString) {
          const userProfile = JSON.parse(userProfileString);
          this.userRole = userProfile.role;
          console.log('User role:', this.userRole);
        }
      } catch (error) {
        console.error('Error parsing user profile from localStorage:', error);
        this.userRole = null;
      }
    },
    
    // SELECTION METHODS
    loadSelectedIdsFromLocalStorage() {
      const storedIds = localStorage.getItem('selectedLoanIds');
      if (storedIds) {
        try {
          this.selectedIds = JSON.parse(storedIds);
        } catch (e) {
          console.error('Error parsing stored IDs:', e);
          this.selectedIds = [];
        }
      }
    },
    
    saveSelectedIdsToLocalStorage() {
      localStorage.setItem('selectedLoanIds', JSON.stringify(this.selectedIds));
    },
    
    isSelected(id) {
      return this.selectedIds.includes(id);
    },
    
    toggleSelect(id) {
      if (this.isSelected(id)) {
        this.selectedIds = this.selectedIds.filter(item => item !== id);
      } else {
        this.selectedIds.push(id);
      }
      this.saveSelectedIdsToLocalStorage();
    },
    
    toggleSelectAll() {
      if (this.isAllSelected) {
        // Unselect all
        this.selectedIds = [];
      } else {
        // Select all
        this.selectedIds = this.tableData.map(row => row.loanId);
      }
      this.saveSelectedIdsToLocalStorage();
    },
    
    // API METHODS
  async fetchInitialData() {
  try {
    this.isLoading = true;
    this.errorMessage = "";
    
    // Get auth token from cookies
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      this.errorMessage = "Authentication token not found. Please log in again.";
      return;
    }
    
    // Use different endpoints based on user role
    const endpoint = this.isSuperAdmin 
      ? "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/collection/collection-case?page=1"
      : "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/collection/admin-assigned-loans?page=1";
    
    console.log(`Fetching data from endpoint: ${endpoint} based on role: ${this.userRole}`);
    
    // Make the API request with appropriate endpoint
    const response = await fetch(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      }
    );
    
    // Parse the response
    const responseData = await response.json();
    
    // Log the response data to console
    console.log("Initial API Response:", responseData);
    
    // Check for error response
    if (!response.ok) {
      throw new Error(responseData.message || `API Error: ${response.status}`);
    }
    
    // Update the table data and pagination info
    if (responseData.success && responseData.data) {
      // For admin-assigned-loans endpoint, transform the data
      if (!this.isSuperAdmin && responseData.data.length > 0 && responseData.data[0].loan) {
        this.tableData = responseData.data.map(item => {
          // Merge loan properties to top level for consistent access
          return {
            ...item.loan,
            assignId: item.assignId,
            assignedBy: item.assignedbyAdmin,
            assignCreatedAt: item.createdAt,
            assignUpdatedAt: item.updatedAt
          };
        });
      } else {
        this.tableData = responseData.data;
      }
      this.totalPages = Math.ceil(responseData.totalLoans / 10); // Assuming 10 items per page
    } else {
      this.tableData = [];
      this.errorMessage = "No data available.";
    }
    
  } catch (error) {
    console.error("Error loading initial data:", error);
    this.errorMessage = error.message || "Failed to load data. Please try again.";
    this.tableData = [];
  } finally {
    this.isLoading = false;
  }
},
    
async handleQuery() {
  try {
    this.isLoading = true;
    this.errorMessage = "";
    
    // Filter out null/empty values
    const filteredData = Object.entries(this.queryData)
      .filter(([_, value]) => value !== null && value !== "")
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    
    console.log("Sending query data to API:", filteredData);
    
    // Get auth token from cookies
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      this.errorMessage = "Authentication token not found. Please log in again.";
      return;
    }
    
    // Use different endpoints based on user role
    const endpoint = this.isSuperAdmin 
      ? "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/collection/collection-case"
      : "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/collection/admin-assigned-loans";
    
    // Make the POST request with search criteria
    const response = await fetch(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(filteredData)
      }
    );
    
    // Parse the response
    const responseData = await response.json();
    
    // Log the response data to console
    console.log("Search API Response:", responseData);
    
    // Check for error response
    if (!response.ok) {
      throw new Error(responseData.message || `API Error: ${response.status}`);
    }
    
    // Update the table data
    if (responseData.success && responseData.data) {
      // For admin-assigned-loans endpoint, transform the data
      if (!this.isSuperAdmin && responseData.data.length > 0 && responseData.data[0].loan) {
        this.tableData = responseData.data.map(item => {
          // Merge loan properties to top level for consistent access
          return {
            ...item.loan,
            assignId: item.assignId,
            assignedBy: item.assignedbyAdmin,
            assignCreatedAt: item.createdAt,
            assignUpdatedAt: item.updatedAt
          };
        });
      } else {
        this.tableData = responseData.data;
      }
      this.totalRecords = responseData.totalLoans || 0;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      
      if (this.tableData.length === 0) {
        this.errorMessage = "No results found for your search criteria.";
      }
    } else {
      this.tableData = [];
      this.errorMessage = "No data available for the specified criteria.";
    }
    
  } catch (error) {
    console.error("Error during query:", error);
    this.errorMessage = error.message || "Failed to fetch data. Please try again.";
    this.tableData = [];
  } finally {
    this.isLoading = false;
  }
},
    
    handleReset() {
      this.queryData = {
        phoneNumber: "",
        firstName: "",
        lastName: "",
        loanNumber: null,
        productName: "",
        loanTenure: null,
        loanAmount: null,
        loanStatus: "",
        loanType: "",
        daysOverDue: null
      };
      this.errorMessage = "";
      
      // Reload initial data
      this.fetchInitialData();
    },
    
    openModal() {
      if (this.selectedIds.length === 0) {
        this.errorMessage = "Please select at least one loan to assign an agent.";
        return;
      }
      this.showModal = true;
    },
    
    handleAssign(assignmentData) {
      if (assignmentData.success) {
        // Successful assignment
        console.log(`Assigned ${assignmentData.loanIds.length} loans to ${assignmentData.adminName} (${assignmentData.adminId})`);
        
        // Show success message
        this.errorMessage = "";
        
        // Optionally refresh the data to reflect changes
        this.fetchInitialData();
        
        // Clear selection
        this.selectedIds = [];
        this.saveSelectedIdsToLocalStorage();
      } else {
        // Failed assignment
        console.error("Assignment failed:", assignmentData.error);
        this.errorMessage = assignmentData.error || "Failed to assign loans. Please try again.";
      }
      
      this.showModal = false;
    },
    
    // TABLE DISPLAY METHODS
    formatHeader(field) {
      // Convert camelCase to Title Case with spaces
      return field
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .trim(); // Remove any leading/trailing spaces
    },
    
    // Function to format keys properly
    formatKey(header) {
      return header.toLowerCase().replace(/ /g, '').replace(/'/g, '');
    },
    
    getFieldValue(row, field) {
      // Handle nested user fields
      if (field === 'firstName' || field === 'lastName') {
        return row[field] || (row.user ? row.user[field] : '');
      }
      
      return row[field];
    },
    
    // Function to detect if a field is a time/date field
    isTimeField(field) {
      const timeFields = [
        "repaymentDeadline",
        "actualRepaymentDate",
        "extendedPaybackTime",
        "dateOfExtensionRequest",
        "createdAt",
        "updatedAt"
      ];
      return timeFields.includes(field);
    },
    
    // Check if field contains an object
    isObjectField(field, row) {
      return row[field] && typeof row[field] === 'object' && !Array.isArray(row[field]);
    },
    
    // Check if field contains an array
    isArrayField(field, row) {
      return row[field] && Array.isArray(row[field]);
    },
    
    // Format object fields (like bank, user)
    formatObject(obj) {
      if (!obj) return '-';
      
      // Special handling for common objects
      if (obj.firstName || obj.lastName) {
  // Only display first name and last name without phone number
  return `${obj.firstName || ''} ${obj.lastName || ''}`.trim();
}
      
      if (obj.bankName || obj.accountNumber) {
        // This is likely a bank object
        return `${obj.bankName || ''} - ${obj.accountNumber || ''}`.trim();
      }
      
      // Generic object formatting
      return Object.entries(obj)
        .filter(([_, v]) => v !== null && v !== undefined && v !== '')
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
    },
    
    // Format array fields
    formatArray(arr) {
      if (!arr || !arr.length) return '-';
      return `${arr.length} items`;
    },
    
    // Function to apply blue color to time values
    formatTime(value) {
      if (!value) return "-";
      
      try {
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;
        
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString();
        
        return `${dateStr} <span style="color: #00CCFF;">${timeStr}</span>`;
      } catch (e) {
        return value;
      }
    }
  }
};
</script>

<style scoped>
/* Form Styles */
.input-with-icon {
  position: relative;
  width: 100%;
}

.input-with-icon input {
  width: 100%;
  padding-right: 35px; /* Make space for the icon */
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.calendar-icon {
  position: absolute;
  left: 10px; /* Move icon to the left */
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.form-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

.form-group select {
  appearance: none; /* Remove default arrow */
  -webkit-appearance: none; /* Remove default arrow for Safari */
  -moz-appearance: none; /* Remove default arrow for Firefox */
  background-image: url("https://img.icons8.com/?size=100&id=40021&format=png&color=000000");
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center; /* Move icon slightly to the left */
  background-size: 20px 20px; /* Set icon size */
  padding-right: 30px; /* Add padding to prevent text overlap */
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #004759;
}

.form-group input,
.form-group select {
  width: 100%;
  height: 40px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
}

.form-group select {
  color: #acacb2;
}

.form-group input {
  color: #004759;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 0px 12px;
  height: 37px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-query {
  background-color: #00ccff;
  color: white;
  border: 1px solid #00ccff;
}

.btn-reset {
  background-color: #ffff;
  color: #00ccff;
  border: 1px solid #00ccff;
}

.disabled-option {
  color: #CCCCD8;
  background-color: #f0f0f0;
}

.loader {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 20px;
}

.loading-spinner-large {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 204, 255, 0.3);
  border-radius: 50%;
  border-top-color: #00CCFF;
  animation: spin 0.8s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 14px;
}

/* Table Styles */
.table-container {
  overflow-x: auto;
  width: 100%;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-top: 22px;
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

.data-table td:nth-child(2){
  color: #00CCFF;
}

/* Sticky the checkbox and Loan Number columns */
/* Sticky column styles based on user role */
/* For super-admin (with checkbox column) */
.data-table th:first-child,
.data-table td:first-child,
.data-table th:nth-child(2),
.data-table td:nth-child(2) {
  position: sticky;
  background-color: #fff;
  z-index: 1;
}

.data-table th:first-child {
  left: 0;
  background-color: #F2F7F8;
  z-index: 2;
}

.data-table td:first-child {
  left: 0;
  background-color: #fff;
  z-index: 2;
}

.data-table th:nth-child(2) {
  left: 50px;  /* Width of the checkbox column */
  background-color: #F2F7F8;
  z-index: 1;
}

.data-table td:nth-child(2) {
  left: 50px;  /* Width of the checkbox column */
  background-color: #fff;
  z-index: 1;
}

/* Styling for header row to make sure sticky column header stays visible */
.data-table th {
  background-color: #F2F7F8;
}

.data-table tbody tr:hover {
  background-color: #f9f9f9; /* Change background color on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow under the hovered row */
  cursor: pointer; /* Change cursor to pointer on hover */
}

/* Checkbox styles */
.checkbox-column {
  width: 50px;
  text-align: center;
}

.checkbox-wrapper {
  position: relative;
  display: inline-block;
}

/* Hide the default checkbox */
.checkbox-wrapper input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkbox-wrapper label {
  position: relative;
  cursor: pointer;
  padding-left: 25px;
  margin-bottom: 0;
}

.checkbox-wrapper label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  background: #fff;
  border-radius: 3px;
}

/* Style for checked state - creates a checkmark */
.checkbox-wrapper input[type="checkbox"]:checked + label:after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid #00CCFF;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Hover effect */
.checkbox-wrapper:hover input ~ label:before {
  border-color: #00CCFF;
}
</style>