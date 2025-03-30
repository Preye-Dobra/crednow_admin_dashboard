<template>
  <div>
    <!-- Round Loader -->
    <RoundLoader :loading="loading" />

    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead style="background-color: #D9F7FF;">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tableData"
            :key="index"
            @click="navigateToUser(item)"
            class="clickable-row"
          >
            <td>
              <span
                style="
                  background-color: #d9f7ff;
                  width: 32px;
                  height: 32px;
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 50%;
                  font-size: 12px;
                  font-weight: 400;
                  color: #004759;
                "
                >{{ getInitials(item.firstName, item.lastName) }}</span>
            </td>
            <td style="color: #00ccff">{{ item.firstName }} {{ item.lastName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.role }}</td>
            <td
              :class="{
                'status-active': item.status === 'active',
                'status-inactive': item.status === 'inactive',
              }"
            >
              {{ formatStatus(item.status) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dynamic Modal Components -->
    <component
      v-if="selectedModal"
      :is="selectedModal"
      :visible="showModal"
      @close="closeModal"
    >
      <p>Provide necessary details here.</p>
    </component>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import RoundLoader from './loadder.vue'; // Import Round Loader
import OperationModal from "../modals/ModifyAccountModal.vue";
import EditModal from "../modals/EditModal.vue";
import RefreshModal from "../modals/RefreshModal.vue";
import ModifyAccountModal from "../modals/ModifyAccountModal.vue";

export default {
  components: {
    OperationModal,
    EditModal,
    RefreshModal,
    ModifyAccountModal,
    RoundLoader // Add Round Loader to components
  },
  data() {
    return {
      tableData: [],
      showModal: false,
      selectedModal: null,
      selectedLoan: null,
      loading: true
    };
  },
  methods: {
    async fetchAdminData() {
      try {
        this.loading = true;
        const token = Cookies.get('authToken');
        
        console.log('Retrieved authToken:', token);

        if (!token) {
          console.error('No authentication token found in cookies');
          return;
        }

        const response = await axios.get(
          'https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/profile/all-admin',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log('API Response:', response.data);
        if (response.data.success) {
          this.tableData = response.data.data.map(admin => ({
            id: admin.adminId,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            phoneNumber: admin.phoneNumber,
            role: admin.role,
            status: admin.status
          }));
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
        if (error.response && error.response.status === 401) {
          console.error('Authentication failed. Please log in again.');
          // this.$router.push('/login');
        }
      } finally {
        this.loading = false;
      }
    },
    getInitials(firstName, lastName) {
      const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
      const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
      return `${firstInitial}${lastInitial}`;
    },
    formatStatus(status) {
      return status.charAt(0).toUpperCase() + status.slice(1);
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
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedModal = null;
    },
    navigateToUser(user) {
      localStorage.setItem('selectedAdminData', JSON.stringify(user));
      
      this.$router.push({
        name: "UserPage",
        params: { id: user.id }
      });
    }
  },
  created() {
    this.fetchAdminData();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.table-container {
  overflow-x: auto;
  width: 99.5%;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 12px;
  font-family: "Fira Sans", sans-serif;
  cursor: pointer;
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
  background-color: #F2F7F8;
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
  color: #00ccff;
  background-color: #fff;
  border: 1px solid #00ccff;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.operation-button:hover {
  background-color: #00ccff;
  color: #fff;
}

/* Status Styling */
.status-active {
  color: #09CF22;
  font-weight: 400;
}

.status-inactive {
  color: red;
  font-weight: 400;
}
</style>