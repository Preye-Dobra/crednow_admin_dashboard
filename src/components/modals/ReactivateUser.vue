<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-header">Activate</h2>
      <div class="form-content">
        <p class="text-message">Are you sure you want to activate this client?</p>
        <div class="form-actions">
          <button
            type="button"
            @click="$emit('close')"
            class="btn btn-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="handleSubmit"
            class="btn btn-confirm"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Activating...' : 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isLoading: false,
      userId: null
    };
  },
  created() {
    // Fetch user ID from route params
    this.userId = this.$route.params.id;
    
    if (!this.userId) {
      console.error('No user ID found in route parameters');
      this.$emit('close');
    }
  },
  methods: {
    async handleSubmit() {
      // Get authentication token
      const token = Cookies.get('authToken') || Cookies.get('token') || Cookies.get('access_token');
      
      if (!token) {
        alert('No authentication token found');
        return;
      }

      if (!this.userId) {
        alert('User ID is missing');
        return;
      }

      this.isLoading = true;

      try {
        // Construct the full API endpoint
        const endpoint = `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/client/account-reactivation/${this.userId}`;
        
        // Make the API call
        const response = await axios.post(endpoint, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Log full response for debugging
        console.log('Reactivation Response:', response);

        // Check if the response is successful
        if (response.data.success) {
          // Notify the user
          alert('Client Reactivated Successfully!');
          
          // Emit an event to inform parent component to refresh user data (optional)
          this.$emit('reactivated');
          
          // Close the modal
          this.$emit('close');
          
          // Reload the page after successful reactivation
          window.location.reload();
        } else {
          // Handle unsuccessful response
          alert(response.data.message || 'Failed to reactivate client');
        }
      } catch (error) {
        // Handle network errors or exceptions
        console.error('Error reactivating client:', error);
        
        // More detailed error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(error.response.data.message || 'An error occurred while reactivating the client');
        } else if (error.request) {
          // The request was made but no response was received
          alert('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          alert('Error setting up the reactivation request');
        }
      } finally {
        this.isLoading = false;
      }
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

.modal-content {
  background: white;
  width: 563px;
  height: 335px; /* Adjusted height for the new layout */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.modal-header {
  background-color: #00CCFF;
  color: #004759;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
  width: 100%;
}

.form-content {
  width: 329px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-message {
  font-size: 20px;
  color: #585865;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 40px;
}

.form-actions {
  display: flex;
  justify-content: center;
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

.btn-cancel {
  background-color: #ffff;
  color: #00CCFF;
  border: 1px solid #00CCFF;
  transition: background-color 0.2s ease;
}

.btn-confirm {
  background-color: #00CCFF;
  color: white;
  border: none;
  transition: background-color 0.2s ease;
}

.btn-confirm:hover {
  background-color: #00CCFF;
}
</style>