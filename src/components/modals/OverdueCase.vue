<template>
  <div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in loanData" :key="rowIndex">
            <td v-for="(header, index) in headers" :key="index">
              <template v-if="isTimeField(header)">
                <span v-html="formatTime(getDisplayValue(row, header))"></span>
              </template>
              <template v-else>
                {{ getDisplayValue(row, header) || '-' }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination" v-if="pagination.totalPages > 1">
      <button 
        class="pagination-button" 
        :disabled="pagination.currentPage === 1"
        @click="changePage(pagination.currentPage - 1)"
      >
        Previous
      </button>
      <span class="page-info">Page {{ pagination.currentPage }} of {{ pagination.totalPages }}</span>
      <button 
        class="pagination-button" 
        :disabled="pagination.currentPage === pagination.totalPages"
        @click="changePage(pagination.currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      headers: [
        "Loan Number",
        "Loan ID",
        "Product Name",
        "Status",
        "Loan Type",
        "Loan Terms",
        "Phone Number",
        "First Name",
        "Last Name",
        "Loan Amount",
        "Loan Limit",
        "Loan Tenure",
        "Days Overdue",
        "Processing Fee",
        "Paid Amount",
        "Loan Balance",
        "Total Amount",
        "Repayment Deadline",
        "Loan Status",
        "Transaction Reference",
        "Reference",
        "Loan Channel",
        "Payment Channel",
        "Created At"
      ],
      loanData: [],
      loading: false,
      error: null,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalLoans: 0
      }
    };
  },
  created() {
    this.fetchLoanData();
  },
  methods: {
    // Fetch loan data from API
    async fetchLoanData() {
      this.loading = true;
      try {
        const response = await axios.post(`/admin/collection/collection-case?page=${this.pagination.currentPage}`);
        
        if (response.data.success) {
          this.loanData = response.data.data;
          this.pagination.totalLoans = response.data.totalLoans || 0;
          
          // Calculate total pages (assuming 10 items per page)
          const perPage = 10;
          this.pagination.totalPages = Math.ceil(this.pagination.totalLoans / perPage);
        } else {
          this.error = response.data.message || 'Failed to fetch loan data';
        }
      } catch (error) {
        console.error('Error fetching loan data:', error);
        this.error = 'An error occurred while fetching loan data';
      } finally {
        this.loading = false;
      }
    },
    
    // Change page and fetch new data
    changePage(page) {
      if (page < 1 || page > this.pagination.totalPages) return;
      this.pagination.currentPage = page;
      this.fetchLoanData();
    },
    
    // Function to format keys properly
    formatKey(header) {
      return header.toLowerCase().replace(/ /g, '').replace(/'/g, '');
    },

    // Function to detect time-related fields dynamically
    isTimeField(header) {
      const timeFields = [
        "Repayment Deadline",
        "Created At",
        "Updated At",
        "Date Of Extension Request",
        "Actual Repayment Date",
        "Extended Payback Time"
      ];
      return timeFields.includes(header);
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
    },
    
    // Get display value based on header and row data
    getDisplayValue(row, header) {
      const key = this.formatKey(header);
      
      // Handle special cases for nested data
      if (key === 'firstname' && row.user) {
        return row.user.firstName;
      }
      
      if (key === 'lastname' && row.user) {
        return row.user.lastName;
      }
      
      // Handle phone number - could be in the row directly or in user object
      if (key === 'phonenumber') {
        return row.phoneNumber || (row.user ? row.user.phoneNumber : '');
      }
      
      // For other fields, check if they exist in the row directly
      return row[key] || row[this.snakeToCamel(key)] || '';
    },
    
    // Utility function to convert snake_case to camelCase
    snakeToCamel(str) {
      return str.replace(/([-_][a-z])/g, group => 
        group.toUpperCase()
             .replace('-', '')
             .replace('_', '')
      );
    }
  },
};
</script>

<style scoped>
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

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.operation-button {
  color: #004759;
  background-color: #fff;
  border: 1px solid #00CCFF;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.operation-button:hover {
  background-color: #00CCFF;
  color: #fff;
}

.data-table td:first-child {
  color: #00CCFF;
}

/* Sticky the Loan Number column */
.data-table th:first-child,
.data-table td:first-child {
  position: sticky;
  left: 0;
  background-color: #fff; /* Ensure the background color matches the rest */
  z-index: 1; /* Keep it on top of other elements */
}

.data-table th:first-child {
  background-color: #F2F7F8; /* Ensure the background color matches the rest */
}

/* Styling for header row to make sure sticky column header stays visible */
.data-table th {
  background-color: #F2F7F8;
}

.data-table tbody tr:hover {
  background-color: #ffff; /* Change background color on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow under the hovered row */
  cursor: pointer; /* Change cursor to pointer on hover */
}

/* Pagination styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 15px;
}

.pagination-button {
  color: #004759;
  background-color: #fff;
  border: 1px solid #00CCFF;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.pagination-button:hover:not(:disabled) {
  background-color: #00CCFF;
  color: #fff;
}

.pagination-button:disabled {
  border-color: #ccc;
  color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #585865;
}
</style>
