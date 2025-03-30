<template>
  <div class="main-content">
    <div class="form-section">
      <form @submit.prevent="handleQuery">
        <div class="form-grid">
          <div
            v-for="(field, index) in fields"
            :key="index"
            class="form-group"
            :class="{ 'hidden-field': isRolledUp && index < fields.length - 4 }"
          >
            <label :for="field.name">{{ field.label }}</label>
            
            <!-- Date input with calendar -->
            <div v-if="field.props.type === 'date'" class="input-with-icon">
              <input
                type="date"
                :id="field.name"
                v-model="formData[field.name]"
                class="date-input"
              />
              <img 
                src="/date.png" 
                alt="Calendar Icon" 
                class="calendar-icon" 
                @click="focusDateInput(field.name)"
              />
            </div>
            
            <!-- Regular select dropdown - REMOVED disabled attribute -->
            <select
              v-else-if="field.type === 'select'"
              :id="field.name"
              v-model="formData[field.name]"
              class="grey-placeholder"
            >
              <option value="">
                {{ field.props.placeholder || "--Select Option--" }}
              </option>
              <option v-for="(option, idx) in field.props.options" :key="idx" :value="option">
                {{ option }}
              </option>
            </select>
            
            <!-- Regular text/number inputs -->
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
          <button id="query-btn" type="submit" class="btn btn-action btn-query" :disabled="isLoading">
            {{ isLoading ? 'Querying...' : 'Query' }}
          </button>
          <button
            id="reset-btn"
            type="button"
            class="btn btn-action btn-reset"
            @click="handleReset"
            style="color: #00ccff"
            :disabled="isLoading"
          >
            Reset
          </button>
          <button
            id="batch-operation-btn"
            type="button"
            class="btn btn-action btn-batch"
            @click="handleBatchOperation"
            style="color: #acacb2"
            :disabled="isLoading"
          >
            Batch Operation
          </button>
          <button
            id="batch-modification-btn"
            type="button"
            class="btn btn-action btn-modify"
            @click="handleBatchModification"
            style="color: #acacb2"
            :disabled="isLoading"
          >
            Batch Account Modification
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "FailerOrderQuery",
  data() {
    return {
      isRolledUp: false,
      isLoading: false,
      lastQueryParams: null,
      formData: {
        loanNumber: null,
        phoneNumber: "",
        applicationTime: "",
        productName: "",
      },
      fields: [
        {
          name: "loanNumber",
          label: "Loan Number",
          type: "input",
          props: { type: "number", placeholder: "Enter Loan Number" },
        },
        {
          name: "phoneNumber",
          label: "Phone Number",
          type: "input",
          props: { type: "text", placeholder: "Enter Phone Number" },
        },
        {
          name: "applicationTime",
          label: "Application Time",
          type: "input",
          props: { type: "date" },
        },
        {
          name: "productName",
          label: "Product Name",
          type: "select",
          props: { placeholder: "Select Product Name", options: ["crednow"] },
        },
      ],
    };
  },
  mounted() {
    // Set default values if needed
    // For example, if you want to pre-populate with the sample data
    if (this.$route.query.presetData) {
      this.formData.phoneNumber = "08105802380";
      this.formData.loanNumber = 51535339;
      this.formData.productName = "crednow";
      
      // Parse and set date from ISO string
      const dateObj = new Date("2025-03-12T22:11:56.647Z");
      this.formData.applicationTime = this.formatDateForInput(dateObj);
    }
  },
  methods: {
    formatDateForInput(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    
    focusDateInput(fieldName) {
      const input = document.getElementById(fieldName);
      if (input) {
        input.focus();
        input.click();
      }
    },
    
    async handleQuery() {
      try {
        // Set loading state
        this.isLoading = true;
        this.$emit("query-loading", true);
        this.$emit("query-error", null);

        const authToken = Cookies.get("authToken");
        if (!authToken) {
          const error = "Authentication token not found";
          console.error(error);
          this.$emit("query-error", error);
          this.$emit("query-result", []);
          return;
        }

        // Filter out empty values and format data for the API
        const queryParams = {};
        Object.entries(this.formData).forEach(([key, value]) => {
          // Properly check for empty values (including empty strings)
          if (value !== null && value !== undefined && value !== "") {
            // Convert loanNumber to number format
            if (key === "loanNumber") {
              queryParams[key] = Number(value);
            } 
            // Don't convert empty string for productName
            else if (key === "productName" && value === "") {
              // Skip adding empty product name
            }
            // For other string fields, trim whitespace
            else {
              queryParams[key] = String(value).trim();
            }
          }
        });
        
        // Store last query parameters for retry functionality
        this.lastQueryParams = {...queryParams};
        
        // Format date properly for API if present
        if (queryParams.applicationTime) {
          // Native date input returns YYYY-MM-DD format
          // Convert to ISO string with time at the end of day
          const dateStr = queryParams.applicationTime;
          const date = new Date(`${dateStr}T23:59:59.999Z`);
          queryParams.applicationTime = date.toISOString();
        }

        console.log("Sending query parameters:", queryParams);

        const response = await fetch(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/operation/failed-loans?page=1",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify(queryParams),
          }
        );

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Full API response:", responseData);

        if (responseData.success) {
          const data = responseData.data || [];
          this.$emit("query-result", data);
        } else {
          const error = responseData.message || "API returned an error";
          console.error("API error:", error);
          this.$emit("query-error", error);
          this.$emit("query-result", []);
        }
      } catch (error) {
        console.error("Error during query:", error);
        this.$emit("query-error", error.message || "Failed to fetch data");
        this.$emit("query-result", []);
      } finally {
        this.isLoading = false;
        this.$emit("query-loading", false);
      }
    },
    
    handleReset() {
      this.formData = {
        loanNumber: null,
        phoneNumber: "",
        applicationTime: "",
        productName: "",
      };
      this.lastQueryParams = null;
      this.$emit("query-result", []);
      this.$emit("query-error", null);
    },
    
    handleBatchOperation() {
      console.log("Batch Operation initiated");
    },
    
    handleBatchModification() {
      console.log("Batch Account Modification initiated");
    },
    
    // Added method to retry the last query
    retryLastQuery() {
      if (this.lastQueryParams) {
        this.handleQuery();
      } else {
        // If no previous query, just run a fresh query with current form data
        this.handleQuery();
      }
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap");

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  width: 286.5px;
}

.date-input {
  padding-right: 30px; /* Make space for the icon */
  cursor: pointer;
}

.calendar-icon {
  position: absolute;
  right: 10px; /* Position on the right side */
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  cursor: pointer; /* Show pointer cursor to indicate it's clickable */
  z-index: 2; /* Ensure icon is above the input */
}

.form-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 87vw;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px 12px 12px 10px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  line-height: 19.6px;
  font-weight: 400;
  font-size: 14px;
  color: #004759;
}

.form-group input,
.form-group select,
.form-group option {
  width: 286.5px;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  color: #333; /* Changed from light gray to make selected values more visible */
}

/* Style for date picker input (to match other form controls) */
input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  background-color: white;
}

/* Hide the default date picker icon in webkit browsers */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 12px;
  height: 37px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  border: 0.5px;
  font-weight: 500;
  border: 1px solid #00CCFF;
  white-space: nowrap; /* Prevents text wrapping */
}

.btn-action {
  transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.btn-query {
  background-color: #00CCFF;
  color: white;
}

.btn-reset,
.btn-batch,
.btn-modify {
  background-color: #ffffff;
}

.btn-reset:hover,
.btn-batch:hover,
.btn-modify:hover {
  background-color: #e6f7ff;
}

.btn-query:hover {
  opacity: 0.8;
}

.form-group input::placeholder,
.form-group select::placeholder {
  color: #acacb2;
  font-size: 12px;
}
</style>
