<template>
  <div class="container">
    <div class="header-button-container flex items-center justify-between mb-4 bg-white px-4 py-2 border-b">
      <!-- Tabs and Delete Button remain the same -->
    </div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Loading user data...</p>
    </div>

    <!-- Navigation buttons -->
    <div class="trigger-button" style="margin-top: 6px; background-color: #fff; color: #004759;">
      <div 
        class="report" 
        :class="{ active: activeSection === 'contact' }"
        @click="setActiveSection('contact')"
      >
        <h4 style="font-size: 16px; font-weight: 400;line-height: 22.4px;">Contact Information</h4>
      </div>
      <div 
        class="recognition"
        :class="{ active: activeSection === 'repayment' }"
        @click="setActiveSection('repayment')"
      >
        <h4 style="font-size: 16px; font-weight: 400;line-height: 22.4px;">Repayment Record</h4>
      </div>
      <div 
        class="recognition"
        :class="{ active: activeSection === 'loan' }"
        @click="setActiveSection('loan')"
      >
        <h4 style="font-size: 16px; font-weight: 400;line-height: 22.4px;">Loan Record</h4>
      </div>
    </div>

    <!-- Contact Information Section -->
    <div style="overflow-x: auto; width: 100%;">
      <table v-if="activeSection === 'contact'" class="data-table">
        <thead>
          <tr>
            <th style="width: auto; font-size: 12px; color: #004759;">Contact Id</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Contact Name</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Phone Number</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Relationship</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="contactData.length === 0">
            <td colspan="4" style="text-align: center;">No contact information available</td>
          </tr>
          <tr v-for="(contact, index) in contactData" :key="'contact-'+index">
            <td>{{ contact.contactId }}</td>
            <td>{{ contact.contactName }}</td>
            <td>{{ contact.phoneNumber }}</td>
            <td style="text-transform: capitalize;">{{ contact.relationship }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Only show pagination for contacts if there's data -->
      <Pagination 
        v-if="activeSection === 'contact' && totalContactItems > 0" 
        :totalItems="totalContactItems"
        :initialItemsPerPage="itemsPerPage"
        :initialPage="currentPage"
        @page-change="onContactPageChange"
      />
    </div>

    <!-- Repayment Record Section -->
    <div style="overflow-x: auto; width: 100%;">
      <table v-if="activeSection === 'repayment'" class="data-table">
        <thead>
          <tr>
            <th style="width: auto; font-size: 12px; color: #004759;">User Id</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Number</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Terms</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Status</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Tenure</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Lending Status</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Processing Fee</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Amount</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Days Overdue</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Extension Amount</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Overdue Charges</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Percentage</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Balance</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="repaymentData.length === 0">
            <td colspan="14" style="text-align: center;">No repayment records available</td>
          </tr>
          <tr v-for="(item, index) in repaymentData" :key="'repayment-'+index">
            <td>{{ item.userId }}</td>
            <td>{{ item.loanNumber }}</td>
            <td>{{ item.loanTerms }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.loanTenure }}</td>
            <td>{{ item.lendingStatus }}</td>
            <td>{{ item.processingFee }}</td>
            <td>{{ item.loanAmount }}</td>
            <td>{{ item.daysOverDue }}</td>
            <td>{{ item.extensionAmount }}</td>
            <td>{{ item.overDueCharges }}</td>
            <td>{{ item.loanPercentage }}</td>
            <td>{{ item.loanBalance }}</td>
            <td>{{ item.totalAmount }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Pagination for repayment records -->
      <Pagination 
        v-if="activeSection === 'repayment' && totalRepaymentItems > 0" 
        :totalItems="totalRepaymentItems"
        :initialItemsPerPage="itemsPerPage"
        :initialPage="currentPage"
        @page-change="onRepaymentPageChange"
      />
    </div>

    <!-- Loan Record Section -->
    <div style="overflow-x: auto; width: 100%;">
      <table v-if="activeSection === 'loan'" class="data-table">
        <thead>
          <tr>
            <th style="width: auto; font-size: 12px; color: #004759;">User Id</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Number</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Terms</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Status</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Tenure</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Lending Status</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Processing Fee</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Amount</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Days Overdue</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Extension Amount</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Overdue Charges</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Percentage</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Loan Balance</th>
            <th style="width: auto; font-size: 12px; color: #004759;">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loanData.length === 0">
            <td colspan="14" style="text-align: center;">No loan records available</td>
          </tr>
          <tr v-for="(item, index) in loanData" :key="'loan-'+index">
            <td>{{ item.userId }}</td>
            <td>{{ item.loanNumber }}</td>
            <td>{{ item.loanTerms }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.loanTenure }}</td>
            <td>{{ item.lendingStatus }}</td>
            <td>{{ item.processingFee }}</td>
            <td>{{ item.loanAmount }}</td>
            <td>{{ item.daysOverDue }}</td>
            <td>{{ item.extensionAmount }}</td>
            <td>{{ item.overDueCharges }}</td>
            <td>{{ item.loanPercentage }}</td>
            <td>{{ item.loanBalance }}</td>
            <td>{{ item.totalAmount }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Pagination for loan records -->
      <Pagination 
        v-if="activeSection === 'loan' && totalLoanItems > 0" 
        :totalItems="totalLoanItems"
        :initialItemsPerPage="itemsPerPage"
        :initialPage="currentPage"
        @page-change="onLoanPageChange"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Pagination from './pagination.vue';

export default {
  name: "UserLoanRecords",
  components: {
    Pagination
  },
  data() {
    return {
      activeTab: 'user',
      activeSection: 'contact',
      repaymentData: [],
      loanData: [],
      contactData: [],
      userData: null,
      isLoading: true,
      // Pagination related data
      currentPage: 1,
      itemsPerPage: 10,
      totalContactItems: 0,
      totalRepaymentItems: 0,
      totalLoanItems: 0,
      userId: null // Store userId from route params
    };
  },
  created() {
    // Get userId from route params
    this.userId = this.$route.params.id;
    
    if (!this.userId) {
      console.error('No user ID provided in route parameters');
      this.isLoading = false; // Stop loading if no userId
      return;
    }
    
    this.initializeData();
  },
  methods: {
    initializeData() {
      // Simulate a 3-second loading delay
      setTimeout(() => {
        this.fetchContactData();
        this.isLoading = false;
      }, 3000);
    },

    setActiveSection(section) {
      this.activeSection = section;
      
      // Reset pagination when switching sections
      this.currentPage = 1;
      
      if (section === 'repayment') {
        this.fetchRepaymentData();
      } else if (section === 'loan') {
        this.fetchLoanData();
      } else if (section === 'contact') {
        this.fetchContactData();
      }
    },
    
    // Pagination event handlers
    onContactPageChange(page, itemsPerPage) {
      this.currentPage = page;
      this.itemsPerPage = itemsPerPage;
      this.fetchContactData();
    },
    
    onRepaymentPageChange(page, itemsPerPage) {
      this.currentPage = page;
      this.itemsPerPage = itemsPerPage;
      this.fetchRepaymentData();
    },
    
    onLoanPageChange(page, itemsPerPage) {
      this.currentPage = page;
      this.itemsPerPage = itemsPerPage;
      this.fetchLoanData();
    },
    
    async fetchContactData() {
      try {
        // Retrieve contacts from localStorage
        const storedContacts = localStorage.getItem('userContacts');
        
        if (storedContacts) {
          const contacts = JSON.parse(storedContacts);
          
          // Set the total number of contact items for pagination
          this.totalContactItems = contacts.length;
          
          // Calculate pagination
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          
          // Apply pagination to contacts
          this.contactData = contacts.slice(startIndex, endIndex);
          
          console.log('Contact data loaded from localStorage:', this.contactData);
          console.log('Total contacts:', this.totalContactItems);
        } else {
          // If no contacts in localStorage, clear data and show empty state
          this.contactData = [];
          this.totalContactItems = 0;
          console.log('No user contacts found in localStorage');
        }
      } catch (error) {
        console.error('Error processing contact data:', error);
        
        // Clear data in case of any error
        this.contactData = [];
        this.totalContactItems = 0;
      }
    },
    
    async fetchRepaymentData() {
      try {
        const token = Cookies.get('authToken') || Cookies.get('token') || Cookies.get('access_token');
        
        if (!token) {
          console.error('No authentication token found in cookies');
          return;
        }

        if (!this.userId) {
          console.error('User ID is missing');
          return;
        }

        const response = await axios.get(
          `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/client/loan-repayment-history/${this.userId}?page=${this.currentPage}&limit=${this.itemsPerPage}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log('Full Repayment API Response:', response);
        console.log('Repayment Response Data:', response.data);

        // More robust checking of response structure
        if (response.data) {
          const repaymentData = response.data.data || 
                               response.data.results || 
                               response.data.repayments || 
                               [];
          this.repaymentData = Array.isArray(repaymentData) ? repaymentData : [];
          this.totalRepaymentItems = response.data.total || 
                                     response.data.totalItems || 
                                     response.data.count || 
                                     this.repaymentData.length;
        } else {
          this.repaymentData = [];
          this.totalRepaymentItems = 0;
        }

        console.log('Processed Repayment Data:', this.repaymentData);
        console.log('Total Repayment Items:', this.totalRepaymentItems);
      } catch (error) {
        console.error('Detailed Error fetching repayment data:', error);
        
        if (error.response) {
          console.error('Error Response Data:', error.response.data);
          console.error('Error Response Status:', error.response.status);
          console.error('Error Response Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }

        this.repaymentData = [];
        this.totalRepaymentItems = 0;
      }
    },

    async fetchLoanData() {
      try {
        const token = Cookies.get('authToken') || Cookies.get('token') || Cookies.get('access_token');
        
        if (!token) {
          console.error('No authentication token found in cookies');
          return;
        }

        if (!this.userId) {
          console.error('User ID is missing');
          return;
        }

        const response = await axios.get(
          `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/client/user-loan-record/${this.userId}?page=${this.currentPage}&limit=${this.itemsPerPage}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log('Full Loan API Response:', response);
        console.log('Loan Response Data:', response.data);

        if (response.data) {
          const loanData = response.data.data || 
                         response.data.results || 
                         response.data.loans || 
                         [];
          this.loanData = Array.isArray(loanData) ? loanData : [];
          this.totalLoanItems = response.data.total || 
                               response.data.totalItems || 
                               response.data.count || 
                               this.loanData.length;
        } else {
          this.loanData = [];
          this.totalLoanItems = 0;
        }

        console.log('Processed Loan Data:', this.loanData);
        console.log('Total Loan Items:', this.totalLoanItems);
      } catch (error) {
        console.error('Detailed Error fetching loan data:', error);
        
        if (error.response) {
          console.error('Error Response Data:', error.response.data);
          console.error('Error Response Status:', error.response.status);
          console.error('Error Response Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }

        this.loanData = [];
        this.totalLoanItems = 0;
      }
    }
  }
};
</script>

<style scoped>
.containerr {
  height: auto;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  box-sizing: border-box;
}

.data-table tbody tr:hover {
  background-color: #ffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.trigger-button {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 18px;
}

.report, .recognition {
  width: 160px;
  height: 42px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.report.active, .recognition.active {
  color: #00ccff;
  border-bottom: 2px solid #00ccff;
}

.report:not(.active), .recognition:not(.active) {
  color: #004759;
  border-bottom: none;
  font-weight: 400;
  font-size: 16px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th {
  background: #F2F7F8;
  padding: 14px;
  color: #004759;
  text-align: center;
  font-weight: 400;
}

.data-table td {
  padding: 14px;
  color: #585865;
  text-align: center;
  background: #fff;
  font-size: 12px;
}

.failed-container {
  height: 208px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #D9D9D9;
  margin: 10px auto;
  font-size: 12px;
}

h4 {
  margin: 0;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #00ccff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  color: #004759;
  font-size: 16px;
}

</style>