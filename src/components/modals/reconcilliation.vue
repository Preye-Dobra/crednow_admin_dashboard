<template>
  <div class="main-content">
    <!-- Form Section -->
    <div class="form-section">
      <button class="single-button">
        Single
      </button>

      <div class="line"></div>
      <form @submit.prevent="handleQuery">
        <div class="form-grid">
          <!-- Input Fields -->
          <div v-for="(field, index) in fields" :key="index" class="form-group">
            <label :for="field.name">{{ field.label }}</label>
            
            <!-- Regular text/number inputs -->
            <input
              v-if="field.type === 'input'"
              :type="field.props.type"
              :id="field.name"
              v-model="formData[field.name]"
              :placeholder="field.props.placeholder"
              class="grey-placeholder"
            />
            
            <!-- Select dropdown -->
            <select
              v-else-if="field.type === 'select'"
              :id="field.name"
              v-model="formData[field.name]"
              class="grey-placeholder"
            >
              <option value="">
                {{ field.props.placeholder || "--Select Option--" }}
              </option>
              <option
                v-for="(option, idx) in field.props.options"
                :key="idx"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-group action-buttons">
            <button type="submit" class="btn btn-query" :disabled="isLoading">
              {{ isLoading ? 'Querying...' : 'Query' }}
            </button>
            <button type="button" class="btn btn-reset" @click="handleReset" :disabled="isLoading">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
    
    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- User Full Name -->
    <div v-if="fullName" class="user-full-name">
      User: {{ fullName }}
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "ReconciliationQuery",
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      lastQueryParams: null,
      formData: {
        phoneNumber: "",
        loanNumber: null,
        daysOverDue: null,
      },
      fields: [
        {
          name: "phoneNumber",
          label: "Phone Number",
          type: "input",
          props: { type: "text", placeholder: "Please enter" },
        },
        {
          name: "loanNumber",
          label: "Loan Number",
          type: "input",
          props: { type: "number", placeholder: "Please enter" },
        },
        {
          name: "daysOverDue",
          label: "Days Overdue",
          type: "input",
          props: { type: "Number", placeholder: "Please enter" },
        },
      ],
      userData: null, // To store user data
    };
  },
  computed: {
    fullName() {
      if (this.userData && this.userData.user) {
        const { firstName, lastName } = this.userData.user;
        return `${firstName} ${lastName}`;
      }
      return '';
    },
  },
  methods: {
    async handleQuery() {
      try {
        this.isLoading = true;
        this.errorMessage = "";
        this.$emit('loading', true);
        this.$emit('error', null);

        const authToken = Cookies.get("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found. Please log in again.");
        }

        // Prepare query parameters
        const queryParams = {};
        Object.entries(this.formData).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            // Handle number fields (both loanNumber and daysOverDue)
            if (key === 'loanNumber' || key === 'daysOverDue') {
              // Convert to number and validate
              const parsedValue = Number(value);
              if (isNaN(parsedValue)) {
                throw new Error(`Expected number for ${key}, received string`);
              }
              queryParams[key] = parsedValue;
            } else {
              // Handle string fields (like phoneNumber)
              queryParams[key] = String(value).trim();
            }
          }
        });

        // Store last query parameters
        this.lastQueryParams = { ...queryParams };

        console.log("Sending query with parameters:", queryParams);

        const response = await fetch(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/financial/reconciliation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(queryParams),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', {
            status: response.status,
            errorData
          });
          throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        const data = await response.json();
        this.userData = data.data[0]; // Assuming the first item in the array is relevant
        this.$emit('query-result', data);

      } catch (error) {
        console.error("Error querying:", error);
        this.errorMessage = error.message;
        this.$emit('error', error.message);
        this.$emit('query-result', []);
      } finally {
        this.isLoading = false;
        this.$emit('loading', false);
      }
    },
    
    handleReset() {
      // Reset all form fields consistently
      this.formData = {
        phoneNumber: "",
        loanNumber: "", // Using empty string consistently
        daysOverDue: "",
      };
      
      this.lastQueryParams = null;
      this.errorMessage = "";
      
      // Clear query results in parent component
      this.$emit('query-result', []);
      this.$emit('error', null);
      
      // Log reset for debugging
      console.log("Form reset completed");
      
      // If you want to reload the page after reset
      window.location.reload();
      // Note: Uncomment the above line if you want the page to reload
    },
    
    retryLastQuery() {
      if (this.lastQueryParams) {
        this.handleQuery();
      }
    }
  },
};
</script>

<style scoped>
/* Your existing styles remain unchanged */
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.form-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 1220px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 1fr;
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
.form-group select {
  width: 286.5px;
  height: 40px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: center;
  margin-top: 22px;
  margin-left: 12px;
}

.btn {
  padding: 0px 12px;
  height: 37px;
  width: 82px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-query {
  background-color: #00CCFF;
  color: white;
  border: none;
}

.btn-reset {
  background-color: #ffff;
  color: #00CCFF;
  border: 1px solid #ddd;
}

.single-button {
  width: 65px;
  height: 42px;
  padding: 10px;
  border: none;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  border-bottom: 2px solid #00CCFF;
  margin-bottom: 2px;
}

.line {
  width: 100%; 
  height: 0.9px;
  background: linear-gradient(to right, black 3.7%, black 6%);
  margin-bottom: 15px;
}

.loader {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
  }

.error-message {
  margin-top: 15px;
  padding: 12px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  font-size: 14px;
  width: 1220px;
}

.user-full-name {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #004759;
}

@media (max-width: 1240px) {
  .form-section, .error-message {
    width: 100%;
  }
  
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
  }
}
</style>