<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-header">Change Password</h2>
      <form @submit.prevent="handleSubmit" class="form-content">
        <div class="form-group">
          <label for="old-password" class="form-label">Current Password</label>
          <div class="input-container">
            <input
              id="old-password"
              :type="showOldPassword ? 'text' : 'password'"
              v-model="oldPassword"
              class="form-input"
              placeholder="Enter current password"
            />
            <i
              class="fa"
              :class="showOldPassword ? 'fa-eye' : 'fa-eye-slash'"
              @click="toggleOldPasswordVisibility"
            ></i>
          </div>
        </div>
        <div class="form-group">
          <label for="new-password" class="form-label">New Password</label>
          <div class="input-container">
            <input
              id="new-password"
              :type="showNewPassword ? 'text' : 'password'"
              v-model="newPassword"
              class="form-input"
              placeholder="Enter new password"
            />
            <i
              class="fa"
              :class="showNewPassword ? 'fa-eye' : 'fa-eye-slash'"
              @click="toggleNewPasswordVisibility"
            ></i>
          </div>
        </div>
        <div class="form-group">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <div class="input-container">
            <input
              id="confirm-password"
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              class="form-input"
              placeholder="Confirm new password"
            />
            <i
              class="fa"
              :class="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
              @click="toggleConfirmPasswordVisibility"
            ></i>
          </div>
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div class="form-actions">
          <button
            type="button"
            @click="$emit('close')"
            class="btn btn-cancel"
            :disabled="isLoading"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-confirm"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Updating...' : 'Confirm' }}
          </button>
        </div>
      </form>
    </div>
    <!-- Success Notification -->
    <div v-if="showNotification" class="notification">
      <div class="notification-content">
        <i class="fa fa-check-circle"></i>
        <span>Password changed successfully!</span>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"; // Import js-cookie for authentication

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      errorMessage: '',
      showNotification: false
    };
  },
  methods: {
    async handleSubmit() {
      // Reset error message
      this.errorMessage = '';

      // Validate input
      if (!this.oldPassword) {
        this.errorMessage = 'Please enter your current password.';
        return;
      }

      if (!this.newPassword) {
        this.errorMessage = 'Please enter a new password.';
        return;
      }

      if (this.newPassword.length < 6) {
        this.errorMessage = 'New password must be at least 6 characters.';
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      // Start loading
      this.isLoading = true;

      try {
        // Get auth token
        const authToken = Cookies.get("authToken");
        
        if (!authToken) {
          this.errorMessage = 'Authentication error. Please log in again.';
          this.isLoading = false;
          return;
        }
        
        // Send API request
        const response = await fetch(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/application/change-password",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
              oldPassword: this.oldPassword,
              newPassword: this.newPassword
            })
          }
        );

        // Handle response
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to change password');
        }

        // Show success notification
        this.showNotification = true;
        
        // Hide notification after 3 seconds
        setTimeout(() => {
          this.showNotification = false;
          this.$emit('close');
        }, 3000);
        
        // Reset form
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        
      } catch (error) {
        console.error('Error changing password:', error);
        this.errorMessage = error.message || 'An error occurred while changing password.';
      } finally {
        this.isLoading = false;
      }
    },
    toggleOldPasswordVisibility() {
      this.showOldPassword = !this.showOldPassword;
    },
    toggleNewPasswordVisibility() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },
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

.modal-content {
  background: white;
  width: 563px;
  height: auto;
  min-height: 433px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.modal-header {
  background-color: #00CCFF;
  color:#004759;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
  border-radius: 8px 8px 0 0;
  width: 100%;
}

.form-content {
  width: 100%;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  max-width: 463px;
}

.form-label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #004759;
  text-align: left;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 463px;
}

.form-input {
  width: 100%;
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
}

.input-container i {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 16px;
  color: #555;
}

.form-input:focus {
  border-color: #CCCCD8;
  box-shadow: 0 0 5px rgba(0, 207, 232, 0.5);
}

.error-message {
  color: #e53935;
  margin-bottom: 15px;
  font-size: 14px;
  max-width: 463px;
  text-align: left;
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  width: 98px;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-cancel {
  background-color: #ffff;
  color: #00CCFF;
  border: 1px solid #00CCFF;
  transition: background-color 0.2s ease;
  margin-right: -1px;
}

.btn-confirm {
  background-color: #00CCFF;
  color: white;
  border: none;
  transition: background-color 0.2s ease;
}

.btn-confirm:hover:not(:disabled) {
  background-color: #00a5c5;
}

/* Notification Styles */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  animation: slideIn 0.3s ease-out forwards;
}

.notification-content {
  background-color: #041f05;
  color: white;
  padding: 15px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
}

.notification-content i {
  margin-right: 10px;
  font-size: 20px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

