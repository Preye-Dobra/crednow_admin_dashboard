<template>
  <div class="main-content">
    <!-- Header Section -->
    <div class="header-container">
      <h1 class="header-title">All Applications</h1>
      <div class="header-details">
        <ul class="header-list">
          <li class="header-item header-date">LT: 2025/01/01 09:44:02</li>
          <li class="header-item header-circle">LT</li>
          <li class="header-item header-name">Lincon Tife</li>
          <li
            class="header-item header-dropdown"
            @click="toggleModal"
          >
            <img src="/public/dropdown.png" alt="Dropdown" />
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal Component -->
    <Modal
      :isOpen="isModalOpen"
      @close="toggleModal"
    />

    <!-- Form Section -->
    <div class="form-section">
      <form @submit.prevent="handleQuery">
        <div class="form-grid">
          <!-- Input Fields -->
          <div v-for="(field, index) in fields" :key="index" class="form-group">
            <label :for="field.name">{{ field.label }}</label>
            <component
              :is="field.type"
              v-bind="field.props"
              :id="field.name"
              v-model="formData[field.name]"
            >
              <!-- Add default select option -->
              <template v-if="field.type === 'select'">
                <option disabled value="">
                  {{ field.props.placeholder || "--Select Option--" }}
                </option>
                <option
                  v-for="(option, idx) in field.props.options"
                  :key="idx"
                  :value="option"
                >
                  {{ option }}
                </option>
              </template>
            </component>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button type="submit" class="btn btn-query">Query</button>
          <button type="button" class="btn btn-reset" @click="handleReset">
            Reset
          </button>
          <button type="button" class="btn btn-rollup">Roll up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Modal from "../modals/logModal.vue";

export default {
  components: {
    Modal,
  },
  name: "MainContent",
  data() {
    return {
      isModalOpen: false,
      formData: {
        mobile: "",
        loanNumber: "",
        applicationStatus: "",
        applicationTime: "",
        isItRepeatedBorrowing: "",
        loanSuccessTime: "",
        loanTimeType: "",
        refuseReason: "",
        productName: "",
        userLevel: "",
        loanTenure: "",
        loanAmount: "",
        applicationChannel: "",
        isPrivacyDataAuthorized: "",
        appPackage: "",
        appVersion: "",
        applicationMethod: "",
        tag: "",
      },
      fields: [
        {
          name: "mobile",
          label: "Mobile",
          type: "input",
          props: { type: "text", placeholder: "Please enter mobile number" },
        },
        {
          name: "loanNumber",
          label: "Loan Number",
          type: "input",
          props: { type: "text", placeholder: "Please enter loan number" },
        },
        {
          name: "applicationStatus",
          label: "Application Status",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "Approved",
              "Rejected",
              "Pending",
              "In Progress",
            ],
            placeholder: "--Select Application Status--",
          },
        },
        {
          name: "applicationTime",
          label: "Application Time",
          type: "input",
          props: { type: "date", placeholder: "Select application date" },
        },
        {
          name: "isItRepeatedBorrowing",
          label: "Is it Repeated Borrowing",
          type: "select",
          props: {
            options: ["--Select Option--", "Yes", "No"],
            placeholder: "--Select Repeated Borrowing--",
          },
        },
        {
          name: "loanSuccessTime",
          label: "Loan Success Time",
          type: "input",
          props: { type: "date", placeholder: "Select loan success date" },
        },
        {
          name: "loanTimeType",
          label: "Loan Time Type",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "Short-term",
              "Long-term",
              "Medium-term",
            ],
            placeholder: "--Select Loan Time Type--",
          },
        },
        {
          name: "refuseReason",
          label: "Refuse Reason",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "Ineligible",
              "Missing documents",
              "Rejected by system",
              "Other",
            ],
            placeholder: "--Select Refuse Reason--",
          },
        },
        {
          name: "productName",
          label: "Product Name",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "Product A",
              "Product B",
              "Product C",
              "Product D",
            ],
            placeholder: "--Select Product--",
          },
        },
        {
          name: "userLevel",
          label: "User Level",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "New",
              "Returning",
              "VIP",
              "Gold",
              "Platinum",
            ],
            placeholder: "--Select User Level--",
          },
        },
        {
          name: "loanTenure",
          label: "Loan Tenure",
          type: "input",
          props: { type: "number", placeholder: "Enter tenure in months" },
        },
        {
          name: "loanAmount",
          label: "Loan Amount",
          type: "input",
          props: { type: "number", placeholder: "Enter loan amount" },
        },
        {
          name: "applicationChannel",
          label: "Application Channel",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "Web",
              "Mobile App",
              "Agent",
              "Call Center",
            ],
            placeholder: "--Select Application Channel--",
          },
        },
        {
          name: "isPrivacyDataAuthorized",
          label: "Is Privacy Data Authorized",
          type: "select",
          props: {
            options: ["--Select Option--", "Yes", "No"],
            placeholder: "--Select Privacy Data Authorization--",
          },
        },
        {
          name: "appPackage",
          label: "App Package",
          type: "select",
          props: {
            options: ["--Select Option--", "Android", "iOS", "Web", "Other"],
            placeholder: "--Select App Package--",
          },
        },
        {
          name: "appVersion",
          label: "App Version",
          type: "select",
          props: {
            options: ["--Select Option--", "v1.0", "v2.0", "v3.0", "v3.5"],
            placeholder: "--Select App Version--",
          },
        },
        {
          name: "applicationMethod",
          label: "Application Method",
          type: "select",
          props: {
            options: [
              "--Select Option--",
              "Online",
              "Offline",
              "In-Person",
              "Through Agent",
            ],
            placeholder: "--Select Application Method--",
          },
        },
        {
          name: "tag",
          label: "Tag",
          type: "select",
          props: {
            options: ["--Select Option--", "Priority", "Regular", "Low", "High"],
            placeholder: "--Select Tag--",
          },
        },
      ],
    };
  },
  methods: {
    handleQuery() {
      console.log("Querying with data:", this.formData);
    },
    handleReset() {
      this.formData = Object.keys(this.formData).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.main-content {
  
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 1228px;
  height: 46px;
  font-weight: 400;
}

.header-title {
  font-size: 14px;
  font-weight: bold;
  color: #004759;
}

.header-details {
  display: flex;
  align-items: center;
}

.header-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.header-date {
  width: 146px;
  font-size: 14px;
  color: #e85353;
}
.header-item {
  margin-left: 10px;
}

.header-circle {
  width: 12px;
  height: 17px;
  background-color: #d9f7ff;
  color: #004759;
  text-align: center;
  font-size: 12px;
}
.header-name {
  color: #585865;
}
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
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px 12px 12px 10px;
  border: 1px;
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
  justify-content: flex-end; 
}


.btn {
  padding: 10px 12px;
  height: 37px;
  width: 82px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  border: #00CCFF;
}

.btn-query {
  background-color: #00CCFF;
  color: white;
  
}

.btn-reset {
  background-color: #ffff;
  color: #00CCFF;
  border: #00CCFF;
  border: 1px solid #ddd;
}

.btn-rollup {
 background-color: #ffff;
  color: #00CCFF;
  border: #00CCFF;
  border: 1px solid #ddd;
}


.form-group input::placeholder,
.form-group select::placeholder {
    color: #ACACB2; 
width: 93px;
height: 17px;
  font-size: 12px;
}




</style>
