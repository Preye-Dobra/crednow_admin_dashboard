<template>
  <div class="query-modal">
    <!-- Loading Overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="circle-loader"></div>
    </div>
    <div class="modal-content">
      <div class="form-section" :class="{ 'rolled-up': isRolledUp }">
        <form @submit.prevent="handleQuery">
          <div class="form-grid" :class="{ 'rolled-up-grid': isRolledUp }">
            <div
              v-for="(field, index) in fields"
              :key="index"
              class="form-group"
              :class="{ 'hidden-field': isRolledUp && index < fields.length - 4 }"
            >
              <label :for="field.name">{{ field.label }}</label>

              <!-- Days Overdue Special Case -->
              <div v-if="field.name === 'daysOverdue'" class="days-overdue-container">
                <div class="overdue-inputs">
                  <input
                    type="text"
                    :id="`${field.name}_start`"
                    v-model="formData[`${field.name}_start`]"
                    placeholder="Overdue Time"
                    class="grey-placeholder overdue-input"
                  />
                  <input
                    type="text"
                    :id="`${field.name}_end`"
                    v-model="formData[`${field.name}_end`]"
                    placeholder="Overdue Time"
                    class="grey-placeholder overdue-input"
                  />
                </div>
              </div>

              <!-- Input with Icon -->
              <div v-else-if="field.props.icon" class="input-with-icon">
                <img :src="field.props.icon" alt="Calendar Icon" class="calendar-icon" />
                <input
                  type="text"
                  :id="field.name"
                  v-model="formData[field.name]"
                  :placeholder="field.props.placeholder"
                  class="grey-placeholder input-with-padding"
                />
              </div>

              <!-- Select Dropdown -->
              <select
                v-else-if="field.type === 'select'"
                :id="field.name"
                v-model="formData[field.name]"
                class="grey-placeholder"
              >
                <option disabled selected value="" class="grey-option">
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
                :type="field.props.type"
                :id="field.name"
                v-model="formData[field.name]"
                :placeholder="field.props.placeholder"
                class="grey-placeholder"
              />
            </div>
          </div>

          <div class="action-buttons">
            <button type="submit" class="btn btn-query"><img src="/public/pp.png" class="okay" > Query</button>
            <button type="button" class="btn btn-reset" @click="handleReset"><img class="okay" src="/public/pa.png" > Reset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { fields } from '../data/repay';
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  name: "QueryModal",
  data() {
    return {
      isRolledUp: false,
      formData: this.initializeFormData(),
      fields,
      loading: false,
      currentQueryParams: {} // Store the current query parameters
    };
  },
  methods: {
    initializeFormData() {
      const data = {};
      fields.forEach(field => {
        if (field.name === 'daysOverdue') {
          data[`${field.name}_start`] = '';
          data[`${field.name}_end`] = '';
        } else {
          data[field.name] = '';
        }
      });
      return data;
    },
    
    async handleQuery() {
      this.loading = true;
      console.log("Querying with data:", this.formData);
      
      try {
        // Check if we have an auth token
        const authToken = this.getAuthToken();
        if (!authToken) {
          throw new Error('No authentication token found');
        }
        
        // Filter out empty fields
        const filteredData = this.prepareRequestData(this.formData);
        
        // Store current query parameters for pagination
        this.currentQueryParams = { ...filteredData };
        
        console.log("Sending filtered request data to /admin/financial/repayment-enquiry:", filteredData);
        
        // Make the API call
        const response = await axios.post(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/financial/repayment-enquiry?page=1&limit=10",
          filteredData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        
        console.log("Repayment inquiry API Response:", response.data);
        
        // Emit the response data to parent component
        this.$emit("query", response.data);
      } catch (error) {
        console.error("Error during repayment inquiry:", error);
        
        // Emit error to parent
        this.$emit("error", {
          success: false,
          message: error.message || "An error occurred while fetching repayment data",
          error: error
        });
      } finally {
        this.loading = false;
      }
    },
    
    // New method specifically for pagination
    async fetchDataForPage(paginationParams) {
      this.loading = true;
      
      try {
        // Check if we have an auth token
        const authToken = this.getAuthToken();
        if (!authToken) {
          throw new Error('No authentication token found');
        }
        
        // Merge current query parameters with pagination parameters
        const params = {
          ...this.currentQueryParams,
          ...paginationParams
        };
        
        console.log("Fetching page data with params:", params);
        
        // Make the API call with pagination parameters in URL
        const response = await axios.post(
          `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/financial/repayment-enquiry?page=${paginationParams.page}&limit=${paginationParams.limit}`,
          params,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        
        console.log("Paginated repayment inquiry API Response:", response.data);
        
        // Emit the response data to parent component
        this.$emit("query", response.data);
      } catch (error) {
        console.error("Error during paginated repayment inquiry:", error);
        
        // Emit error to parent
        this.$emit("error", {
          success: false,
          message: error.message || "An error occurred while fetching repayment data",
          error: error
        });
      } finally {
        this.loading = false;
      }
    },
    
   prepareRequestData(formData) {
  // Filter out empty fields and format special fields like daysOverdue
  const requestData = {};
  
  Object.keys(formData).forEach(key => {
    // Check if the value exists and is not empty
    if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
      // Handle the daysOverdue special case
      if (key === 'daysOverdue_start' || key === 'daysOverdue_end') {
        // Only add if we haven't added the daysOverdue object yet
        if (!requestData.daysOverdue) {
          requestData.daysOverdue = {
            start: formData.daysOverdue_start || null,
            end: formData.daysOverdue_end || null
          };
        }
      } else {
        // For string values, we can trim them
        // For non-string values (like numbers), use them as is
        requestData[key] = typeof formData[key] === 'string' 
          ? formData[key].trim() 
          : formData[key];
      }
    }
  });
  
  return requestData;
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
    
    handleReset() {
      this.formData = this.initializeFormData();
      console.log("Form reset to empty values");
      
      // Clear stored query parameters
      this.currentQueryParams = {};
      
      // After reset, fetch all repayments (empty query)
      this.handleQuery();
    },
    
    handleRollUp() {
      this.isRolledUp = !this.isRolledUp;
    },
  },
  mounted() {
    // Load initial data when component mounts - perform an empty query
    this.handleQuery();
  }
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap');

.days-overdue-container {
  width: 90%;
  position: fixed;
}

.overdue-inputs {
  display: flex;
  gap: 8px;
}

.overdue-input {
  width: 139px !important;
  height: 40px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  color: #004759;
}
/* Form Section */
.form-section {
  background-color: white;
  width: 1218px;
  height: auto;
  margin-top: -12px;
  padding-top: 20px;
  top: 66px;
  left: 208px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  font-family: 'Fira Sans', sans-serif;

}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 10px;
  padding: 0;
  transition: all 0.3s ease-in-out;
  width: 1182px;
  margin: auto;
  max-height: 500px;
  overflow: hidden;
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

/* Hidden Fields */
.hidden-field {
  display: none;
  transition: all 0.3s ease-in-out;
  color:  #004759;
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
  background-image: url("https://img.icons8.com/?size=100&id=40021&format=png&color=000000");
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  background-size: 20px 20px;
  padding-right: 30px;
}
/* Inputs & Select */
.form-group input,
.form-group select,
.form-group option {
  width: 286.5px;
  
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  color: #004759;
  font-family: 'Fira Sans', sans-serif;

}
.form-group input{
  height: 40px;
}
.grey-placeholder::placeholder {
  color: #acacb2 !important;
}

/* Select Dropdown Styling */
/* .form-group select.grey-placeholder {
  color: #acacb2 !important;
} */

.form-group select.grey-placeholder:invalid {
  color: #acacb2 !important;
}

/* .form-group select.grey-placeholder option[disabled] {
  color: #acacb2 !important;
} */

.form-group select.grey-placeholder option:not([disabled]) {
  color: #004759 !important;
}
.form-group input[type="text"] {
  
  color: #004759;
}
/* Date Input */
.form-group input[type="date"] {
  background-image: url("/public/calendar-icon.png");
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
  gap: 12px;
  justify-content: flex-end;
  margin-top: -26px;
  margin-bottom: 20px;
  padding-right: 20px;
}

/* Buttons */
.btn {
  padding: 10px 12px;
  height: 37px;
  width: 88px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  border: 1px solid #00ccff;
}

.btn-query {
  background-color: #00ccff;
  color: white;
}

.btn-reset {
  background-color: #fff;
  color: #00ccff;
  border: 1px solid  #00ccff;
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
.okay{
    width: 12px;
    height: 12px;
    color: #004759;
}/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.circle-loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 204, 255, 0.3);
  border-radius: 50%;
  border-top-color: #00ccff;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>