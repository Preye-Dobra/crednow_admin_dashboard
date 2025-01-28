<template>
  <div class="main-content">
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContent",
  data() {
    return {
      formData: {
        mobile: "",
        name: "",
        loanNumber: "",
        userID: "",
        lendingStatus: "",
        loanChannel: "",
        bankName: "",
        loanStatus: "",
        creationTime: "",
        paymentSerialNumber: "",
        payoutNumber: "",
        updateTime: "",
      },
      fields: [
        {
          name: "mobile",
          label: "Mobile",
          type: "input",
          props: { type: "text", placeholder: "Enter mobile number" },
        },
        {
          name: "name",
          label: "Name",
          type: "input",
          props: { type: "text", placeholder: "Enter name" },
        },
        {
          name: "loanNumber",
          label: "Loan Number",
          type: "input",
          props: { type: "text", placeholder: "Enter loan number" },
        },
        {
          name: "userID",
          label: "User ID",
          type: "input",
          props: { type: "text", placeholder: "Enter user ID" },
        },
        {
          name: "lendingStatus",
          label: "Lending Status",
          type: "select",
          props: {
            options: ["--Select Lending Status--", "Active", "Closed", "Pending"],
            placeholder: "Select lending status",
          },
        },
        {
          name: "loanChannel",
          label: "Loan Channel",
          type: "select",
          props: {
            options: ["--Select Loan Channel--", "Online", "In-Store", "Bank"],
            placeholder: "Select loan channel",
          },
        },
        {
          name: "bankName",
          label: "Bank Name",
          type: "input",
          props: { type: "text", placeholder: "Enter bank name" },
        },
        {
          name: "loanStatus",
          label: "Loan Status",
          type: "select",
          props: {
            options: ["--Select Loan Status--", "Approved", "Rejected", "Pending"],
            placeholder: "Select loan status",
          },
        },
        {
          name: "creationTime",
          label: "Creation Time",
          type: "input",
          props: { type: "date", placeholder: "Select creation time" },
        },
        {
          name: "paymentSerialNumber",
          label: "Payment Serial Number",
          type: "input",
          props: { type: "text", placeholder: "Enter payment serial number" },
        },
        {
          name: "payoutNumber",
          label: "Payout Number",
          type: "input",
          props: { type: "text", placeholder: "Enter payout number" },
        },
        {
          name: "updateTime",
          label: "Update Time",
          type: "input",
          props: { type: "date", placeholder: "Select update time" },
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
  },
};
</script>



<style scoped>
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

.form-group input::placeholder,
.form-group select::placeholder {
  color: #ACACB2;
  width: 93px;
  height: 17px;
  font-size: 12px;
}
</style>