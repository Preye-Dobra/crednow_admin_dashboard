<template>
  <div class="query-modal">
    <!-- Modal Content -->
    <div class="modal-content">
      <!-- Form Section -->
      <div class="form-section" :class="{ 'rolled-up': isRolledUp }">
        <threebox />
        <form @submit.prevent="handleQuery">
          <div class="form-grid" :class="{ 'rolled-up-grid': isRolledUp }">
            <!-- Input Fields -->
            <div
              v-for="(field, index) in generatedFields"
              :key="index"
              class="form-group"
              :class="{ 'hidden-field': isRolledUp && index < generatedFields.length - 4 }"
            >
              <label :for="field.name">{{ field.label }}</label>

              <div v-if="field.props.icon" class="input-with-icon">
                <img :src="field.props.icon" alt="Calendar Icon" class="calendar-icon" />
                <input
                  type="text"
                  :id="field.name"
                  v-model="formData[field.name]"
                  :placeholder="field.props.placeholder"
                  class="grey-placeholder input-with-padding"
                  :class="{ 'value-entered': formData[field.name] }"
                />
              </div>

              <select
                v-else-if="field.type === 'select'"
                :id="field.name"
                v-model="formData[field.name]"
                class="grey-placeholder"
                :class="{ 'value-entered': formData[field.name] && formData[field.name] !== '--Select Option--' }"
              >
                <option disabled value="">
                  {{ field.props.placeholder || "--Select Option--" }}
                </option>
                <option
                  v-for="(option, idx) in field.props.options"
                  :key="idx"
                  :value="option"
                  :class="{ 'selected-option': option !== '--Select Option--' }"
                >
                  {{ option }}
                </option>
              </select>

              <input
                v-else
                :type="field.props.type"
                :id="field.name"
                v-model="formData[field.name]"
                :placeholder="field.props.placeholder"
                class="grey-placeholder"
                :class="{ 'value-entered': formData[field.name] }"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons" :class="{ 'rolled-up-buttons': isRolledUp }">
            <button type="submit" class="btn btn-query">Query</button>
            <button type="button" class="btn btn-reset" @click="handleReset">Reset</button>
            <h4 class="btn-rollup" @click="handleRollUp">
              {{ isRolledUp ? "Roll down" : "Roll up" }}
              <img
                :src="isRolledUp ? '/Dropdown.png' : '/Vector.png'"
                alt="Arrow"
                style="width: 16px; color: #00CCFF;"
              />
            </h4>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import threebox from "../modals/threebox.vue";
import Cookies from "js-cookie"; // Import js-cookie

export default {
  components: {
    threebox,
  },
  name: "QueryModal",
  data() {
    return {
      isRolledUp: false,
      formData: {},
      generatedFields: [],
    };
  },
  created() {
    this.generatedFields = this.generateFields();
    this.formData = this.generatedFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
  },
  mounted() {
    // Automatically trigger handleQuery after component is mounted
    this.$nextTick(() => {
      this.handleQuery();
    });
  },
  methods: {
    generateFields() {
      return [
        {
          name: "phoneNumber",
          label: "phoneNumber",
          type: "input",
          props: { type: "text", placeholder: "Please enter" },
        },
        {
          name: "loanNumber",
          label: "loanNumber",
          type: "input",
          props: { type: "text", placeholder: "Please enter" },
        },
        {
          name: "status",
          label: "status",
          type: "select",
          props: {
            options: ["--Select Option--", "open", "closed"],
          },
        },
        {
          name: "applicationTime",
          label: "applicationTime",
          type: "input",
          props: {
            type: "text",
            placeholder: "start ~ end",
            icon: "/date.png",
          },
        },
        {
          name: "loanTerms",
          label: "loanTerms",
          type: "select",
          props: {
            options: ["--Select Option--", "single", "multiple"],
          },
        },
        {
          name: "lendingStatus",
          label: "lendingStatus",
          type: "select",
          props: {
            options: ["--Select Option--", "success", "failed"],
          },
        },
        {
          name: "loanType",
          label: "loanType",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "Perday",
              "Weekly",
              "Monthly",
              "Yearly",
            ],
          },
        },
        {
          name: "reasonOfFailure",
          label: "reasonOfFailure",
          type: "input",
          props: { type: "text", placeholder: "Please enter" },
        },
        {
          name: "productName",
          label: "productName",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "crednow",
              "Product A",
              "Product B",
              "Product C",
            ],
          },
        },
        {
          name: "level",
          label: "level",
          type: "select",
          props: {
            options: ["--Select Option--", "1", "2", "3", "4", "5"],
          },
        },
        {
          name: "loanTenure",
          label: "loanTenure",
          type: "input",
          props: { type: "number", placeholder: "Please enter" },
        },
        {
          name: "loanAmount",
          label: "loanAmount",
          type: "input",
          props: { type: "number", placeholder: "Please enter" },
        },
        {
          name: "loanChannel",
          label: "loanChannel",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "monify",
              "Web",
              "Mobile App",
              "Agent",
            ],
          },
        },
        {
          name: "loanLimit",
          label: "loanLimit",
          type: "input",
          props: { type: "number", placeholder: "Please enter" },
        },
        {
          name: "daysOverDue",
          label: "daysOverDue",
          type: "input",
          props: { type: "number", placeholder: "Please enter" },
        },
        {
          name: "loanStatus",
          label: "loanStatus",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "approved",
              "disbursed",
              "disbursement failed",
              "pending",
            ],
          },
        },
      ];
    },
    formatDate(isoDate) {
      if (!isoDate) return "";

      const date = new Date(isoDate);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    async handleQuery() {
      console.log("Querying with data:", this.formData);

      // Get the authToken from the cookie
      const authToken = Cookies.get("authToken");

      if (!authToken) {
        console.error("No authToken found in cookies!");
        // Handle the error (e.g., redirect to login)
        return;
      }

      // Create a filtered object with only non-empty values and non-default select options
      const filteredFormData = {};
      for (const key in this.formData) {
        // For text/number inputs - include if not empty
        if (this.formData[key] !== "") {
          // For select fields - exclude default "--Select Option--" values
          if (this.formData[key] !== "--Select Option--") {
            // Convert string numbers to actual numbers for numeric fields
            if (["loanNumber", "level", "loanTenure", "loanAmount", "loanLimit", "daysOverDue"].includes(key) && 
                !isNaN(this.formData[key])) {
              filteredFormData[key] = Number(this.formData[key]);
            } else {
              filteredFormData[key] = this.formData[key];
            }
          }
        }
      }

      try {
        console.log("Sending request with data:", filteredFormData);
        
        // Make the POST request
        const response = await fetch(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/application/all-application",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(filteredFormData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log("API Response:", responseData);
        
        // Format the response to match the expected structure
        const formattedResponse = {
          success: responseData.success,
          message: responseData.message || "List of loans based on query",
          totalLoans: responseData.totalLoans || (responseData.data ? responseData.data.length : 0),
          next: responseData.next || null,
          data: responseData.data || []
        };
        
        // Make sure each record has the expected structure
        if (formattedResponse.data && formattedResponse.data.length > 0) {
          formattedResponse.data = formattedResponse.data.map(item => {
            // Ensure phoneNumber is properly mapped from the user object
            if (item.user && item.user.phoneNumber && !item.phoneNumber) {
              item.phoneNumber = item.user.phoneNumber;
            }
            
            // Ensure other fields are present
            return {
              ...item,
              loanId: item.loanId || "",
              loanLimit: item.loanLimit || 0,
              loanType: item.loanType || "",
              loanTerms: item.loanTerms || "",
              productName: item.productName || "",
              status: item.status || "",
              reasonOfFailure: item.reasonOfFailure || "",
              loanTenure: item.loanTenure || 0,
              loanNumber: item.loanNumber || 0,
              daysOverDue: item.daysOverDue || 0,
              level: item.level || 0,
              phoneNumber: item.phoneNumber || (item.user ? item.user.phoneNumber : ""),
              loanAmount: item.loanAmount || 0,
              loanChannel: item.loanChannel || "",
              loanStatus: item.loanStatus || "",
              lendingStatus: item.lendingStatus || "",
              paymentChannel: item.paymentChannel || item.loanChannel || "",
              paidAmount: item.paidAmount || "0.00",
              user: item.user || {},
            };
          });
        }
        
        console.log("Formatted response:", formattedResponse);
        // Emit the query event with the formatted response data
        this.$emit("query", formattedResponse);
      } catch (error) {
        console.error("Error during POST request:", error);
        // Emit an error response
        this.$emit("query", {
          success: false,
          message: "An error occurred while processing your request",
          data: []
        });
      }
    },
    handleReset() {
      // Clear all form data
      this.formData = this.generatedFields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {});
      
      // After resetting the form, trigger the query with empty parameters to show all data
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    handleRollUp() {
      this.isRolledUp = !this.isRolledUp;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap');

/* Form Section */
.form-section {
  background-color: white;
  width: 1218px;
  height: 562px;
  top: 66px;
  left: 208px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  font-family: 'Fira Sans', sans-serif;
}

.form-section.rolled-up {
  height: 300px; /* Adjusted height for rolled-up state */
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

.form-grid.rolled-up-grid {
  max-height: 140px; /* Limit rows shown */
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

/* Inputs & Select */
.form-group input,
.form-group select {
  width: 286.5px;
  height: 40px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
}

/* Grey placeholder for empty inputs/selects */
.grey-placeholder {
  color: #acacb2;
}

/* Green text for filled inputs */
.value-entered {
  color:#004759 !important; /* Dark green for entered values */
  font-weight: 500;
}

/* Green text for selected options */
.selected-option {
  color:#004759;
}

/* Making the default option grey */
select option:first-child {
  color: #acacb2;
}

/* Other options (non-default) will be dark green */
select option:not(:first-child) {
  color:#004759;
}

.grey-placeholder::placeholder {
  color: #acacb2 !important;
}

.form-group select {
  appearance: none;
  background-image: url("https://img.icons8.com/?size=100&id=40021&format=png&color=000000");
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  background-size: 20px 20px;
  padding-right: 30px;
}

/* Date Input */
.form-group input[type="date"] {
  background-image: url("/public/calendar-icon.png");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
  padding-right: 30px;
}

.form-group input[type="date"]:not(:focus):invalid {
  color: #acacb2;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 37px;
  margin-bottom: 20px;
  padding-right: 20px;
}

.action-buttons.rolled-up-buttons {
  margin-top: 10px;
}

/* Buttons */
.btn {
  padding: 10px 12px;
  height: 37px;
  width: 82px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  border: 1px solid  #00CCFF;
}

.btn-query {
  background-color:  #00CCFF;
  color: white;
}

.btn-reset {
  background-color: #fff;
  color:  #00CCFF;
  border: 1px solid   #00CCFF;
}

.btn-rollup {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #fff;
  color:  #00CCFF;
  width: 100px;
  cursor: pointer;
  font-size: 10px;
  padding: 10px 12px;
  height: 37px;
  border: none;
  font-weight: 400;
}

/* Dropdown Colors */
.dropdown {
  color: #004759;
}
</style>