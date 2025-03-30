<template>
  <div class="container">
    <div class="profile-container">
      <div class="profile-section">
        <div class="section-header">
          <div class="square-box"></div>
          <h3>Profile</h3>
        </div>
        <div class="profile-info">
          <p class="info-item">
            Name: <span class="position-right">{{ adminData.firstName }} {{ adminData.lastName }}</span>
          </p>
          <p class="info-item">
            Email: <span class="position-right">{{ adminData.email }}</span>
          </p>
          <p class="info-item">
            Admin <span class="position-right">{{ adminData.role }}</span>
          </p>
          <p class="info-item">
            Phone Number: <span class="position-right">{{ adminData.phoneNumber }}</span>
          </p>
          <p class="info-item">
            <span>Status</span>
            <span class="position-right" :class="{ active: adminData.status === 'active', inactive: adminData.status === 'inactive' }">
              {{ formatStatus(adminData.status) }}
            </span>
          </p>
        </div>
      </div>
      <button 
        class="remove-admin" 
        @click="handleActionButtonClick"
        :class="{ 'reactivate-btn': adminData.status === 'suspended' }"
      >
        {{ adminData.status === 'active' ? 'Suspend Admin' : 'Reactivate Admin' }}
      </button>
      
      <!-- Use different modals based on action -->
      <ConfirmationModal
        :isVisible="isConfirmationModalOpen"
        @update:isVisible="isConfirmationModalOpen = $event"
        @confirm="reactivateAdmin"
        :header="'Reactivate Admin'"
      />
      
      <SuspensionReasonModal
        :isVisible="isSuspensionModalOpen"
        @update:isVisible="isSuspensionModalOpen = $event"
        @confirm="suspendAdmin"
      />
    </div>

    <div v-if="notification.visible" class="notification">
      {{ notification.message }}
    </div>

    <div class="permissions-section">
      <div class="section-header">
        <div class="square-box"></div>
        <h3>Permissions</h3>
      </div>
      <div class="permissions-list">
        <div
          class="permission-item"
          v-for="(permission, index) in permissions"
          :key="index"
        >
          <p class="permission-label">{{ permission.label }}</p>
          <label class="toggle-switch">
            <input type="checkbox" v-model="permission.enabled" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmationModal from "./removeAdminModal.vue";
import SuspensionReasonModal from "./SuspensionReasonModal.vue";
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  components: {
    ConfirmationModal,
    SuspensionReasonModal
  },
  data() {
    return {
      adminData: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        status: ''
      },
      isConfirmationModalOpen: false,
      isSuspensionModalOpen: false,
      permissions: [
        { label: "Loan Application", enabled: false },
        { label: "All Client", enabled: true },
        { label: "Repay Inquiries", enabled: true },
        { label: "Loan Inquiry", enabled: false },
        { label: "Reconciliation", enabled: false },
        { label: "Collection Case", enabled: false },
        { label: "Failed Operation", enabled: false },
        { label: "Loan Management", enabled: false },
        { label: "Loan Order", enabled: false },
        { label: "Broadcast", enabled: false },
        { label: "Financial Statistics", enabled: false },
      ],
      notification: {
        visible: false,
        message: "",
      },
    };
  },
  methods: {
    handleActionButtonClick() {
      if (this.adminData.status === 'suspended') {
        // For reactivation, use the original confirmation modal
        this.isConfirmationModalOpen = true;
      } else {
        // For suspension, use the new modal with reason field
        this.isSuspensionModalOpen = true;
      }
    },
    suspendAdmin(suspensionReason) {
      const token = Cookies.get('authToken');
      
      // Call the API to suspend admin with the provided reason
      axios.post(
        `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/profile/suspend-admin/${this.adminData.id}`,
        { suspensionReason: suspensionReason },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          // Update admin status locally
          this.adminData.status = 'inactive';
          
          // Update localStorage
          localStorage.setItem('selectedAdminData', JSON.stringify(this.adminData));
          
          // Show notification
          this.notification.message = "Admin suspended successfully!";
          this.notification.visible = true;
          
          // Set a timeout to redirect after showing the notification
          setTimeout(() => {
            this.notification.visible = false;
            // Redirect to admin page
            window.location.href = "http://localhost:5173/admin";
          }, 2000);
        }
      })
      .catch(error => {
        console.error('Error suspending admin:', error);
        // Show error notification
        this.notification.message = "Failed to suspend admin. Please try again.";
        this.notification.visible = true;
        setTimeout(() => {
          this.notification.visible = false;
        }, 3000);
      });
    },
    reactivateAdmin() {
      const token = Cookies.get('authToken');
      const adminId = this.$route.params.id || this.adminData.id;
      
      // Call the API to reactivate admin using the new endpoint
      axios.post(
        `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/profile/reactivate-admin/${adminId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          // Update admin status locally
          this.adminData.status = 'active';
          
          // Update localStorage
          localStorage.setItem('selectedAdminData', JSON.stringify(this.adminData));
          
          // Show notification
          this.notification.message = "Admin reactivated successfully!";
          this.notification.visible = true;
          
          // Set a timeout to redirect after showing the notification
          setTimeout(() => {
            this.notification.visible = false;
            // Redirect to admin page
            window.location.href = "http://localhost:5173/admin";
          }, 2000);
        }
      })
      .catch(error => {
        console.error('Error reactivating admin:', error);
        // Show error notification
        this.notification.message = "Failed to reactivate admin. Please try again.";
        this.notification.visible = true;
        setTimeout(() => {
          this.notification.visible = false;
        }, 3000);
      });
      
      this.isConfirmationModalOpen = false;
    },
    formatStatus(status) {
      return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
    },
    fetchAdminDetails() {
      // First try to get admin data from localStorage
      const storedAdminData = localStorage.getItem('selectedAdminData');
      
      if (storedAdminData) {
        try {
          this.adminData = JSON.parse(storedAdminData);
          console.log('Admin data loaded from localStorage:', this.adminData);
          return;
        } catch (e) {
          console.error('Error parsing stored admin data:', e);
          // Continue to fetch from API if parsing fails
        }
      }
      
      // If no data in localStorage, fetch from API using route param ID
      const adminId = this.$route.params.id;
      if (!adminId) {
        console.error('No admin ID provided in route params');
        return;
      }

      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No authentication token found in cookies');
        return;
      }

      console.log('Fetching admin details from API for ID:', adminId);
      
      axios.get(
        `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/profile/${adminId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          const admin = response.data.data;
          this.adminData = {
            id: admin.adminId,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            phoneNumber: admin.phoneNumber,
            role: admin.role,
            status: admin.status
          };
          
          // Store this data in localStorage for future use
          localStorage.setItem('selectedAdminData', JSON.stringify(this.adminData));
          
          console.log('Admin data fetched from API and stored in localStorage:', this.adminData);
        }
      })
      .catch(error => {
        console.error('Error fetching admin details from API:', error);
        if (error.response && error.response.status === 401) {
          console.error('Authentication failed. Please log in again.');
          // this.$router.push('/login');
        }
      });
    }
  },
  created() {
    this.fetchAdminDetails();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 86vw;
  gap: 20px;
}

.profile-container {
  width: 809px;
  height: 498px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.profile-section {
  background: white;
  padding: 32px;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #F5F5F5; /* Added underline */
  margin-bottom: 16px; /* Added spacing after the line */
}
.square-box {
  width: 8px;
  height: 8px;
  background-color: #00ccff;
  flex-shrink: 0;
}

.section-header h3 {
  color: #004759;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.position-right {
  color: #004759;
  font-weight: 400;
}

.active {
  color: #09CF22;
}

.inactive {
  color: #E85353;
}

.permissions-section {
  background: white;
  padding: 32px;
  border-radius: 8px;
  width: 809px;
}

.permissions-list {
  margin-top: 24px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #acacb2;
  height: 45px;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid #F5F5F5; /* Added line */
}

.permission-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  height: 45px;
}

.permission-label {
  color: #004759;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
}

.remove-admin {
  background-color: #E85353;
  color: white;
  border: none;
  border-radius: 5px;
  width: 154px;
  height: 33px;
  cursor: pointer;
  margin-top: auto;
  display: flex;
  margin-left: 180px;
  justify-content: center;
  align-items: center;
}

.reactivate-btn {
  background-color: #09CF22;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 18px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 18px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #00c8ff;
}

input:checked + .slider:before {
  transform: translateX(32px);
}

.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  z-index: 1001;
}
</style>