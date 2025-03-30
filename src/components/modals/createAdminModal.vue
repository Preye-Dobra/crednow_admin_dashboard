<template>
  <TransitionRoot appear :show="visible" as="div">
    <div class="modal-container">
      <div class="modal">
        <!-- Modal Header -->
        <div class="modal-header">
          <h2 class="text">{{ title }}</h2>
          <!-- <button class="close-button" @click="closeModal">×</button> -->
        </div>

        <!-- Modal Content -->
        <div class="modal-content">
          <form @submit.prevent="handleSubmit" class="form-box">
            <div class="form-group" v-for="(field, index) in formFields" :key="index">
              <label :for="field.id">{{ field.label }}</label>
              <input
                v-if="field.type !== 'select'"
                :id="field.id"
                :type="field.type"
                :placeholder="field.placeholder"
                v-model="field.value"
                required
                class="input-field"
              />

              <!-- Custom Role Dropdown -->
              <div v-if="field.type === 'select'" class="custom-dropdown" @click="toggleDropdown(index)">
                <div class="dropdown-selected">
                  {{ field.value || 'Select Role' }}
                  <img src="/public/arro.png" alt="Dropdown Icon" class="dropdown-icon" />
                </div>
                <div v-if="activeDropdown === index" class="dropdown-options">
                  <div class="dropdown-options-scroll">
                    <div
                      v-for="role in roleOptions"
                      :key="role.value"
                      class="dropdown-option"
                      @click.stop="selectOption(field, role.value)"
                    >
                      {{ role.label }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error message -->
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <!-- Loading indicator -->
            <div v-if="isLoading" class="loading-indicator">
              Processing...
            </div>

            <!-- Buttons -->
            <div class="button-container">
              <button type="button" class="action-btn cancel" @click="closeModal" :disabled="isLoading">Cancel</button>
              <button type="submit" class="action-btn submit" :disabled="isLoading">Create Admin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot } from "@headlessui/vue";
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: "AddAdminModal",
  components: {
    TransitionRoot,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Create Admin",
    },
  },
  data() {
    return {
      formFields: [
        { id: "firstName", label: "First Name", type: "text", placeholder: "Enter First Name", value: "" },
        { id: "lastName", label: "Last Name", type: "text", placeholder: "Enter Last Name", value: "" },
        { id: "email", label: "Email", type: "email", placeholder: "Enter Email", value: "" },
        { id: "phoneNumber", label: "Phone Number", type: "text", placeholder: "Enter Phone Number", value: "" },
        { id: "role", label: "Role", type: "select", value: "" },
      ],
      roleOptions: [
        { label: "Admin", value: "admin" },
        { label: "Support Admin", value: "support-admin" },
        { label: "Financial Admin", value: "financial-admin" },
        { label: "Collection Admin", value: "collection-admin" },
        { label: "Support Agent", value: "support-agent" },
        { label: "Recovery Agent", value: "recovery-agent" }
      ],
      activeDropdown: null,
      isLoading: false,
      errorMessage: null
    };
  },
  mounted() {
    // Add event listener to close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdownOnClickOutside);
  },
  beforeUnmount() {
    // Remove event listener when component is destroyed
    document.removeEventListener('click', this.closeDropdownOnClickOutside);
  },
  methods: {
    closeModal() {
      // Reset form data
      this.formFields.forEach(field => {
        field.value = "";
      });
      this.errorMessage = null;
      
      // Emit close event
      this.$emit("close");
    },
    
    closeDropdownOnClickOutside(event) {
      if (this.activeDropdown !== null && !event.target.closest('.custom-dropdown')) {
        this.activeDropdown = null;
      }
    },
    
    async handleSubmit() {
      try {
        this.isLoading = true;
        this.errorMessage = null;
        
        // Validate form data
        for (const field of this.formFields) {
          if (!field.value) {
            this.errorMessage = `${field.label} is required`;
            this.isLoading = false;
            return;
          }
        }
        
        // Get the form data
        const formData = this.formFields.reduce((acc, field) => {
          acc[field.id] = field.value;
          return acc;
        }, {});
        
        console.log("Form data to be submitted:", formData);
        
        // Get the auth token from cookies
        const token = Cookies.get('authToken') || Cookies.get('token') || Cookies.get('access_token');
        
        if (!token) {
          this.errorMessage = "Authentication token not found. Please login again.";
          this.isLoading = false;
          return;
        }
        
        // Send the API request
        const response = await axios.post(
          'https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/auth/add-admin',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log("API Response:", response.data);
        
        if (response.data.success) {
          // Show success message
          alert("Admin created successfully!");
          
          // Close the modal
          this.closeModal();
          
          // Emit success event with the new admin data
          this.$emit("admin-created", response.data.data);
        } else {
          // Handle API error response
          this.errorMessage = response.data.message || "Failed to create admin account";
        }
      } catch (error) {
        console.error("Error creating admin:", error);
        
        // Handle different types of errors
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.errorMessage = error.response.data.message || `Error: ${error.response.status} - ${error.response.statusText}`;
        } else if (error.request) {
          // The request was made but no response was received
          this.errorMessage = "No response received from server. Please check your internet connection.";
        } else {
          // Something happened in setting up the request that triggered an Error
          this.errorMessage = error.message || "An unexpected error occurred";
        }
      } finally {
        this.isLoading = false;
      }
    },
    
    toggleDropdown(index) {
      this.activeDropdown = this.activeDropdown === index ? null : index;
    },
    
    selectOption(field, option) {
      field.value = option; // Set the selected value
      this.activeDropdown = null; // Close the dropdown immediately
    },
  },
};
</script>

<style scoped>
.text {
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
}

.custom-dropdown {
  position: relative;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  margin-top: 4px;
}

.dropdown-selected {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #004759;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 5px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-options-scroll {
  max-height: 180px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #00CCFF #f0f0f0;
}

.dropdown-options-scroll::-webkit-scrollbar {
  width: 6px;
}

.dropdown-options-scroll::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.dropdown-options-scroll::-webkit-scrollbar-thumb {
  background-color: #00CCFF;
  border-radius: 10px;
}

.dropdown-option {
  padding: 10px 12px;
  font-size: 14px;
  color: #004759;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-option:hover {
  background-color: #f0f0f0;
}

.dropdown-option:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.dropdown-option:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

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
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
  color: #004759;
  background-color: #00CCFF;
  height: 46px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  font-size: 24px;
  padding: 0 16px;
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.close-button {
  width: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  color: #004759;
  font-size: 14px;
  margin-bottom: 4px;
  font-weight: 400;
}

.input-field {
  width: 100%;
  height: 40px;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
  margin-top: 4px;
}

.input-field::placeholder {
  color: #acacb2;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}

.action-btn {
  width: 98px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
}

.action-btn:hover {
  background-color: #00CCFF;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel {
  border: 1px solid #00CCFF;
  color: #00CCFF;
  background-color: #fff;
}

.submit {
  border: 1px solid #00CCFF;
  color: #ecf1f2;
  background-color: #00CCFF;
}

.error-message {
  color: #ff3333;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
  padding: 8px;
  background-color: #ffeeee;
  border-radius: 5px;
  border: 1px solid #ffcccc;
}

.loading-indicator {
  text-align: center;
  color: #00CCFF;
  font-size: 14px;
  margin-top: 8px;
}
</style>