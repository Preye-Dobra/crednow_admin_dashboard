<template>
  <div>
    <RoundLoader :loading="loading" />

    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead style="background-color: #f2f7f8">
          <tr>
            <th style="color: #004759">User Id</th>
            <th style="color: #004759">Name</th>
            <th style="color: #004759">User Level</th>
            <th style="color: #004759">Mobile</th>
            <th style="color: #004759">Email</th>
            <th style="color: #004759">Status</th>
            <th style="color: #004759">Trading Status</th>
            <th style="color: #004759">Loan Status</th>
            <th style="color: #004759">Loan Limit</th>
            <th style="color: #004759">Registration Time</th>
            <th style="color: #004759">Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tableData"
            :key="index"
            @click="goToUserInfo(item.userId)"
          >
            <td style="color: #00CCFF;">{{ truncateId(item.userId) }}</td>
            <td>{{ item.firstName }} {{ item.lastName }}</td>
            <td>{{ item.level }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.email }}</td>
            <td :class="getStatusClass(item.accountStatus)">{{ item.accountStatus }}</td>
            <td>{{ item.tradingStatus }}</td>
            <td>{{ item.loanStatus }}</td>
            <td>{{ formatCurrency(item.loanLimit) }}</td>
            <td v-html="formatDateTime(item.createdAt)"></td>
            <td>
              <button class="operation-button" @click.stop="openOperationModal(item.userId)">
                Operation
              </button>
              <button class="operation-button" @click.stop="openChangePasswordModal(item.userId)">
                Change Password
              </button>
            </td>
          </tr>
          <!-- No data message -->
          <tr v-if="tableData.length === 0">
            <td colspan="11" class="no-data">No data available</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Component -->
    <Pagination
      :totalItems="totalUsers"
      :initialItemsPerPage="itemsPerPage"
      :initialPage="currentPage"
      @page-change="handlePageChange"
    />

    <!-- Operation Modal -->
    <OperationModal
      v-if="showOperationModal"
      :userId="selectedUserId"
      :visible="showOperationModal"
      @close="closeModals"
    />

    <!-- Change Password Modal -->
    <ChangePasswordModal v-if="showChangePasswordModal" :userId="selectedUserId" @close="closeModals" />
  </div>
</template>

<script>
import OperationModal from "../modals/OperationClientModal.vue";
import ChangePasswordModal from "../modals/changePasswordModal.vue";
import Pagination from "../modals/pagination.vue";
import RoundLoader from '../modals/loadder.vue';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: "AllClientTable",
  components: {
    OperationModal,
    ChangePasswordModal,
    Pagination,
    RoundLoader
  },
  props: {
    queryResponse: {
      type: Object,
      default: () => ({
        success: false,
        message: "",
        totalUsers: 0,
        next: null,
        data: []
      })
    }
  },
  data() {
    return {
      selectedUserId: null,
      showOperationModal: false,
      showChangePasswordModal: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalUsers: 0,
      loading: false,
      isQueryMode: false, // Flag to track if we're in query mode
      fetchedData: [] // Store fetched data from API
    };
  },
  computed: {
    tableData() {
      // If we have query results, use those first
      if (this.isQueryMode && this.queryResponse && this.queryResponse.data && this.queryResponse.data.length > 0) {
        console.log("Using query response data:", this.queryResponse.data.length);
        return this.queryResponse.data;
      }
      
      // Otherwise use fetched data
      if (this.fetchedData && this.fetchedData.length > 0) {
        console.log("Using fetched data:", this.fetchedData.length);
        return this.fetchedData;
      }
      
      // Fallback to empty array
      return [];
    }
  },
  watch: {
    queryResponse: {
      handler(newVal) {
        console.log("Table received new queryResponse:", newVal);
        if (newVal && newVal.data) {
          // Update local state with query response data
          this.isQueryMode = true;
          this.totalUsers = newVal.totalUsers || 0;
          
          // Reset to first page when a new query comes in
          this.currentPage = 1;
        }
      },
      deep: true,
      immediate: true
    },
    // Add this watcher to handle pagination changes correctly
    currentPage: {
      handler(newPage) {
        // If we're not in query mode, fetch new page data when currentPage changes
        if (!this.isQueryMode) {
          this.fetchClients(newPage, this.itemsPerPage);
        }
      }
    }
  },
  mounted() {
    // Only fetch initial data if we don't have query results
    if (!this.queryResponse || !this.queryResponse.data || this.queryResponse.data.length === 0) {
      this.fetchClients(1, this.itemsPerPage);
    }
  },
  methods: {
    // Method explicitly called from parent to refresh data from query
    refreshFromQuery(queryData) {
      console.log("Table refreshFromQuery called with:", queryData);
      
      if (queryData && queryData.data) {
        this.isQueryMode = false; // Set to false so we can fetch new data
        this.totalUsers = queryData.totalUsers || 0;
        
        // Force computed property to re-evaluate
        this.$forceUpdate();
        
        // Fetch first page data
        this.currentPage = 1;
        this.fetchClients(1, this.itemsPerPage);
      }
    },
    
    handlePageChange(page, itemsPerPage) {
      console.log(`Pagination changed: Page ${page}, Items per page: ${itemsPerPage}`);
      
      // Always update local state
      this.currentPage = page;
      this.itemsPerPage = itemsPerPage;
      
      // Always fetch new data on page change, regardless of mode
      this.fetchClients(page, itemsPerPage);
    },

    async fetchClients(page, itemsPerPage) {
      this.loading = true;
      
      try {
        const authToken = Cookies.get('authToken');
        if (!authToken) {
          throw new Error('No authentication token found in cookies');
        }

        const apiUrl = `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/client/all-client?page=${page}&limit=${itemsPerPage}`;
        console.log(`Fetching clients from: ${apiUrl}`);
        
        const response = await axios.post(
          apiUrl,
          {}, // Empty body for POST request
          {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          }
        );
        
        console.log("Data fetched from API:", response.data);
        
        if (response.data && response.data.data) {
          this.fetchedData = response.data.data || [];
          this.totalUsers = response.data.totalUsers || 0;
          
          // Reset query mode since we're now showing API data
          this.isQueryMode = false;
        } else {
          console.error("API response did not contain expected data structure:", response.data);
          this.fetchedData = [];
        }
        
        // Handle case where current page might no longer be valid
        if (this.fetchedData.length === 0 && page > 1) {
          this.currentPage = 1;
          this.fetchClients(1, itemsPerPage);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        this.fetchedData = [];
      } finally {
        this.loading = false;
      }
    },

    truncateId(id) {
      if (!id) return '';
      return id.length > 8 ? `${id.substring(0, 8)}...` : id;
    },
    
    formatCurrency(amount) {
      if (!amount && amount !== 0) return '₦0';
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    },
    
    formatDateTime(dateTime) {
      if (!dateTime) return '';
      const date = new Date(dateTime);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${formattedDate} <span style="color: #00CCFF;">${formattedTime}</span>`;
    },
    
    getStatusClass(status) {
      if (!status) return '';
      return status.toLowerCase() === "active" ? "active-status" : "inactive-status";
    },
    
    goToUserInfo(userId) {
      this.$router.push({ name: "UserInfo", params: { id: userId } });
    },
    
    openOperationModal(userId) {
      this.selectedUserId = userId;
      this.showOperationModal = true;
    },
    
    openChangePasswordModal(userId) {
      this.selectedUserId = userId;
      this.showChangePasswordModal = true;
    },
    
    closeModals() {
      this.showOperationModal = false;
      this.showChangePasswordModal = false;
      this.selectedUserId = null;
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  white-space: nowrap;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
  height: auto;
  overflow-x: auto;
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
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

th {
  color: #004759;
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

.data-table th:first-child,
.data-table td:first-child {
  position: sticky;
  left: 0;
  background-color: #fff;
  z-index: 1;
}

.operation-button {
  padding: 5px 10px;
  margin: 2px;
  font-size: 12px;
  background-color: #ffff;
  color: #00ccff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.operation-button:hover {
  background-color: #fff;
}

.active-status {
  color: #00ccff;
}

.inactive-status {
  color: red;
}

.data-table tbody tr:hover {
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #777;
  font-style: italic;
}
</style>