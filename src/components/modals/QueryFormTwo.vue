<template>
  <div class="query-modal">
    <div class="modal-content">
      <div class="form-section">
        <form @submit.prevent="handleQuery">
          <div class="form-grid">
            <!-- Input Fields -->
            <div
              v-for="(field, index) in fields"
              :key="index"
              class="form-group"
            >
              <label :for="field.name">{{ field.label }}</label>

              <!-- Input with Icon -->
              <div v-if="field.props && field.props.icon" class="input-with-icon">
                <img :src="field.props.icon" alt="Calendar Icon" class="calendar-icon" />
                <input
                  type="text"
                  :id="field.name"
                  v-model="formData[field.name]"
                  :placeholder="field.props.placeholder"
                  class="grey-placeholder input-with-padding"
                />
              </div>

              <!-- Select Dropdown - Remove disabled attribute -->
              <select
                v-else-if="field.type === 'select'"
                :id="field.name"
                v-model="formData[field.name]"
                class="grey-placeholder"
              >
                <option value="" class="grey-option">
                  {{ field.props.placeholder }}
                </option>
                <option
                  v-for="(option, idx) in field.props.options"
                  :key="idx"
                  :value="option"
                  class="selected-option"
                >
                  {{ option }}
                </option>
              </select>

              <!-- Regular Input -->
              <input
                v-else
                :type="field.props.type || 'text'"
                :id="field.name"
                v-model="formData[field.name]"
                :placeholder="field.props.placeholder"
                class="grey-placeholder"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button type="submit" class="btn btn-query" :disabled="isLoading">
              <div v-if="isLoading" class="spinner"></div>
              <span v-if="!isLoading">Query</span>
              <span v-else>Loading...</span>
            </button>
            <button type="button" class="btn btn-reset" @click="handleReset" :disabled="isLoading">Reset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { fields } from "../data/allClient";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "QueryFormTwo",
  data() {
    return {
      formData: fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {}),
      fields,
      isLoading: false
    };
  },
  mounted() {
    // Fetch initial data when component mounts
    this.fetchInitialData();
  },
  methods: {
    async fetchInitialData() {
      this.isLoading = true;
      
      // Verify auth token
      const authToken = this.getAuthToken();
      if (!authToken) {
        this.isLoading = false;
        return;
      }

      try {
        // Make the initial API request with empty criteria
        const response = await axios.post(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/client/all-client",
          {}, // Empty request body to get all data
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Log the successful data load
        console.log("Initial data loaded:", response.data);
        
        // Emit the response data to parent
        this.$emit("query", response.data);
      } catch (error) {
        console.error("Error loading initial data:", error);
        this.handleApiError(error);
      } finally {
        // Always set loading to false when done
        this.isLoading = false;
      }
    },
    
    getAuthToken() {
      const authToken = Cookies.get("authToken");
      
      if (!authToken) {
        console.error("No authToken found in cookies!");
        this.$emit("error", { 
          success: false,
          message: "Authentication token not found. Please login again."
        });
        return null;
      }
      
      return authToken;
    },
    
    handleApiError(error) {
      console.error("API request error:", error);
      
      let errorMessage = "An error occurred while processing your request";
      
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      }
      
      this.$emit("error", {
        success: false,
        message: errorMessage,
        error: error.message
      });
    },
    
    async handleQuery() {
      // Set loading state to true
      this.isLoading = true;
      
      console.log("Submitting query with form data:", this.formData);
      
      // Verify auth token
      const authToken = this.getAuthToken();
      if (!authToken) {
        this.isLoading = false;
        return;
      }
      
      // Create a filtered object with ONLY non-empty values
      const filteredFormData = {};
      for (const key in this.formData) {
        // Only include fields that have a non-empty value
        if (this.formData[key] !== "" && this.formData[key] !== null && this.formData[key] !== undefined) {
          // Convert numeric values for level and loanLimit
          if (["level", "loanLimit"].includes(key) && !isNaN(this.formData[key])) {
            filteredFormData[key] = Number(this.formData[key]);
          } else {
            filteredFormData[key] = this.formData[key];
          }
        }
      }

      try {
        console.log("Sending filtered request data:", filteredFormData);

        // Make the API request with ONLY the filtered data
        const response = await axios.post(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/client/all-client?page=1",
          filteredFormData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Log the response data
        console.log("API Response Data:", response.data);
        
        // Log response summary
        const { success, message, totalUsers, data } = response.data;
        console.log("Response Summary:", {
          success,
          message,
          totalUsers,
          dataCount: data?.length || 0
        });

        // Emit the query event with the response data
        this.$emit("query", response.data);
      } catch (error) {
        this.handleApiError(error);
      } finally {
        // Set loading state to false when done (whether successful or failed)
        this.isLoading = false;
      }
    },
    
    handleReset() {
      // Don't allow reset while loading
      if (this.isLoading) return;
      
      this.formData = fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {});
      
      // Log the reset action
      console.log("Form reset to empty values");
      
      // After resetting, fetch all data
      this.fetchInitialData();
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap');

/* Form Section */
.form-section {
  background-color: white;
  width: 100%;
  height: auto;
  padding: 20px;
  font-family: 'Fira Sans', sans-serif;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 10px;
  padding: 0;
  width: 100%;
  margin: auto;
}

/* Input with Icon */
.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon input {
  width: 100%;
  padding-left: 35px !important;
}

.calendar-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 13px;
  height: 13px;
  pointer-events: none;
  z-index: 1;
}

/* Form Labels */
.form-group label {
  display: block;
  margin-bottom: 4px;
  line-height: 19.6px;
  font-weight: 400;
  font-size: 14px;
  color: #004759;
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23004759' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  background-size: 16px;
  padding-right: 30px;
}

/* Inputs & Select */
.form-group input,
.form-group select,
.form-group option {
  width: 100%;
  height: 40px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  color: #004759;
  font-family: 'Fira Sans', sans-serif;
}

.grey-placeholder::placeholder {
  color: #acacb2 !important;
}

/* Select Dropdown Styling */
.form-group select.grey-placeholder:invalid {
  color: #acacb2 !important;
}

.form-group select.grey-placeholder option:not([disabled]) {
  color: #004759 !important;
}

/* Date Input */
.form-group input[type="date"] {
  background-image: url("/assets/calendar-icon.png");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
  padding-right: 30px;
  color: #004759;
}

.form-group input[type="date"]:not(:focus):invalid {
  color: #acacb2;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-right: 20px;
}

/* Buttons */
.btn {
  padding: 10px 12px;
  height: 37px;
  min-width: 82px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  border: 1px solid #00CCFF;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-query {
  background-color: #00CCFF;
  color: white;
}

.btn-query:hover:not(:disabled) {
  background-color: #00b8e6;
}

.btn-reset {
  background-color: #fff;
  color: #00CCFF;
  border: 1px solid #00CCFF;
}

.btn-reset:hover:not(:disabled) {
  background-color: #f0f8ff;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Spinner Animation */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Dropdown Colors */
.dropdown {
  color: #004759;
}

.grey-option {
  color: #acacb2 !important;
}

.selected-option {
  color: #004759 !important;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .form-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>