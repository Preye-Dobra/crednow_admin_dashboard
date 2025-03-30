<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Assign Admin</h2>
          <button class="close-button" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-body">
          <div v-if="isLoading" class="loading-indicator">
            <div class="spinner"></div>
            <p>Loading admins...</p>
          </div>
          <div v-else>
            <div class="form-group">
              <label for="adminSelect">Select Admin/Agent:</label>
              <select v-model="selectedAdminId" id="adminSelect" class="form-select">
                <option value="" disabled selected>--Select Admin--</option>
                <option 
                  v-for="admin in admins" 
                  :key="admin.adminId" 
                  :value="admin.adminId"
                >
                  {{ admin.firstName }} {{ admin.lastName }} ({{ admin.role }})
                </option>
              </select>
            </div>
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            
            <div class="button-group">
              <button 
                class="btn-cancel" 
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button 
                class="btn-assign" 
                @click="assignToAdmin" 
                :disabled="!selectedAdminId || isAssigning"
              >
                <span v-if="isAssigning" class="loader"></span>
                <span v-else>Assign</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "AssignAgentModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      selectedAdminId: "",
      admins: [],
      isLoading: false,
      isAssigning: false,
      errorMessage: ""
    };
  },
  mounted() {
    if (this.isOpen) {
      this.fetchAdmins();
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.fetchAdmins();
      }
    }
  },
  methods: {
    async fetchAdmins() {
      try {
        this.isLoading = true;
        this.errorMessage = "";
        
        // Get auth token from cookies
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          this.errorMessage = "Authentication token not found. Please log in again.";
          return;
        }
        
        // Fetch admin list from API
        const response = await fetch(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/profile/all-admin",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            }
          }
        );
        
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.message || `API Error: ${response.status}`);
        }
        
        if (responseData.success && responseData.data) {
          // Store the admins list
          this.admins = responseData.data;
          
          // Save to localStorage for future reference
          localStorage.setItem('adminsList', JSON.stringify(this.admins));
        } else {
          this.errorMessage = "No admin data available.";
        }
        
      } catch (error) {
        console.error("Error fetching admins:", error);
        this.errorMessage = error.message || "Failed to load admins. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },
    
    async assignToAdmin() {
      if (!this.selectedAdminId) {
        this.errorMessage = "Please select an admin to assign.";
        return;
      }
      
      try {
        this.isAssigning = true;
        this.errorMessage = "";
        
        // Get selected loan IDs from localStorage
        const storedIds = localStorage.getItem('selectedLoanIds');
        if (!storedIds) {
          this.errorMessage = "No loans selected for assignment.";
          return;
        }
        
        const selectedLoanIds = JSON.parse(storedIds);
        if (!selectedLoanIds.length) {
          this.errorMessage = "No loans selected for assignment.";
          return;
        }
        
        // Prepare assignment data
        const assignmentData = {
          assignedToId: this.selectedAdminId,
          loanIds: selectedLoanIds
        };
        
        console.log("Assignment data:", assignmentData);
        
        // Get auth token from cookies
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          this.errorMessage = "Authentication token not found. Please log in again.";
          return;
        }
        
        // Log complete request details for debugging
        console.log("Making API request to:", "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/collection/assign-loan");
        console.log("Request headers:", {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        });
        console.log("Request body:", JSON.stringify(assignmentData));
        
        // Call assignment API with the correct endpoint
        const response = await fetch(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/collection/assign-loan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(assignmentData)
          }
        );
        
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.message || `API Error: ${response.status}`);
        }
        
        // Emit success event with assignment data
        this.$emit('assign', {
          success: true,
          adminId: this.selectedAdminId,
          adminName: this.getAdminName(this.selectedAdminId),
          loanIds: selectedLoanIds
        });
        
        // Clear selected IDs from localStorage
        localStorage.removeItem('selectedLoanIds');
        
      } catch (error) {
        console.error("Error assigning loans:", error);
        this.errorMessage = error.message || "Failed to assign loans. Please try again.";
        
        // Emit failure event
        this.$emit('assign', {
          success: false,
          error: this.errorMessage
        });
      } finally {
        this.isAssigning = false;
      }
    },
    
    getAdminName(adminId) {
      const admin = this.admins.find(a => a.adminId === adminId);
      return admin ? `${admin.firstName} ${admin.lastName}` : 'Unknown';
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  width: 563px;
  max-width: 90%;
  padding: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  background-color: #00CCFF;
  padding: 20px;
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  color: white;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  width: 100%;
}

.close-button {
  width: 22px;
  height: 22px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 20px;
}

.modal-body {
  padding: 24px 40px;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  color: #004759;
  font-size: 16px;
  margin-bottom: 12px;
}

.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  background-color: white;
  color: #585865;
  font-size: 14px;
  appearance: none;
  background-image: url("https://img.icons8.com/?size=100&id=40021&format=png&color=000000");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px 20px;
  cursor: pointer;
  height: 48px;
}

.form-select:focus {
  outline: none;
  border-color: #00CCFF;
}

.button-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
}

.btn-cancel,
.btn-assign {
  padding: 12px 40px;
  border-radius: 24px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  min-width: 120px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-cancel {
  background-color: white;
  border: 1px solid #00CCFF;
  color: #00CCFF;
}

.btn-assign {
  background-color: #00CCFF;
  color: white;
}

.btn-assign:disabled {
  background-color: #b3ebff;
  cursor: not-allowed;
}

.btn-cancel:hover {
  background-color: #f5f5f5;
}

.btn-assign:hover:not(:disabled) {
  background-color: #00b8e6;
}

.error-message {
  color: #e85353;
  font-size: 14px;
  margin-top: 16px;
  padding: 12px;
  background-color: #ffebee;
  border-radius: 8px;
  text-align: center;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 204, 255, 0.3);
  border-radius: 50%;
  border-top-color: #00CCFF;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Animation transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>