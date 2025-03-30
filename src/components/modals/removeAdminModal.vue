<template>
  <div v-if="isVisible" class="modal-container">
    <div class="modal">
      <div class="modal-header">
        <h2 class="text">{{ header }}</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      <div class="modal-content">
        <p class="message">Are you sure you want to reactivate this admin?</p>
      </div>
      <div class="button-container">
        <button class="action-btn cancel" @click="closeModal">No</button>
        <button class="action-btn submit" @click="handleReactivation" :disabled="isLoading">
          {{ isLoading ? 'Reactivating...' : 'Yes' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: "ReactivationModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    header: {
      type: String,
      default: "Reactivate Admin",
    },
  },
  data() {
    return {
      isLoading: false,
      adminId: null
    }
  },
  created() {
    // Fetch admin ID from route params
    this.adminId = this.$route.params.id;
    
    if (!this.adminId) {
      console.error('No admin ID found in route parameters');
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:isVisible", false); // Emit the updated value to parent
    },
    async handleReactivation() {
      // Get authentication token
      const token = Cookies.get('authToken');
      
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      if (!this.adminId) {
        console.error('Admin ID is missing');
        return;
      }

      this.isLoading = true;

      try {
        // Construct the full API endpoint
        const endpoint = `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/profile/reactivate-admin/${this.adminId}`;
        
        // Make the API call
        const response = await axios.post(endpoint, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Check if the response is successful
        if (response.data.success) {
          // Emit an event to inform parent component of successful reactivation
          this.$emit('reactivated');
          
          // Close the modal
          this.closeModal();
          
          // Redirect to admin page
          setTimeout(() => {
            window.location.href = "http://localhost:5173/admin";
          }, 1500);
        } else {
          // Handle unsuccessful response
          console.error('Failed to reactivate admin:', response.data.message);
        }
      } catch (error) {
        // Handle network errors or exceptions
        console.error('Error reactivating admin:', error);
        
        if (error.response) {
          console.error('Server response:', error.response.data);
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  width: 563px;
  height: 355px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: center; /* Center title */
  align-items: center;
  margin-bottom: 20px;
  background-color: #00CCFF;
  color: #004759;
  height: 46px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  font-size: 24px;
  padding: 0 16px;
  position: relative; /* Enables positioning for the close button */
}

.text {
  color: #004759;
  font-weight: 400;
  font-size: 24px;
  flex-grow: 1; /* Allows centering while pushing close button */
  text-align: center;
  line-height: 16px;
}

.close-btn {
  position: absolute;
  right: 16px;
  top: 12px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #004759;
  cursor: pointer;
}

.close-btn:hover {
  color: #ff0000;
}

.modal-content {
  text-align: center;
  justify-content: center;
  padding: 20px;
  width: 329px;
  height: 60px;
  margin: auto;
  font-size: 18px;
  color: #585865;
  margin-top: 60px;
}

.message {
  font-size: 16px;
  color: #333;
  width: 329px;
  text-align: center;
  line-height: 1.4;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px;
}

.action-btn {
  width: 98px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 10px 12px;
  text-align: center;
  font-size: 14px;
}

.action-btn.cancel {
  border: 1px solid #00CCFF;
  color: #00CCFF;
  background-color: #fff;
}

.action-btn.cancel:hover {
  background-color: #00CCFF;
  color: #fff;
}

.action-btn.submit {
  border: 1px solid #00CCFF;
  background-color: #00CCFF;
}

.action-btn.submit:hover {
  background-color: #c3e7f4;
}

.action-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>