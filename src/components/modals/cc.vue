<template>
  <div class="main-content">
    <!-- Form Section -->


    add two button that tri
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
        daysOverdue: "",
        repaymentCode: "",
        tradingStatus: "",
        paymentChannel: "",
        repayment: "",
        paybackTime: "",
        loanNumber: "",
        repaymentNumber: "",
        creationTime: "",
        collector: "",
        paymentCompanySerialNumber: "",
        transactionNumber: "",
        productName: "",
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
          name: "daysOverdue",
          label: "Days Overdue",
          type: "input",
          props: { type: "text", placeholder: "Enter days overdue" },
        },
        {
          name: "repaymentCode",
          label: "Repayment Code (VA)/Link",
          type: "input",
          props: { type: "text", placeholder: "Enter repayment code or link" },
        },
        {
          name: "tradingStatus",
          label: "Trading Status",
          type: "select",
          props: {
            options: ["--Select Trading Status--", "Cleared", "Pending", "Failed"],
            placeholder: "Select trading status",
          },
        },
        {
          name: "paymentChannel",
          label: "Payment Channel",
          type: "select",
          props: {
            options: ["--Select Payment Channel--", "Bank Transfer", "Credit Card", "Cash"],
            placeholder: "Select payment channel",
          },
        },
        {
          name: "repayment",
          label: "Repayment",
          type: "select",
          props: {
            options: ["--Select Repayment--", "Completed", "Pending", "Overdue"],
            placeholder: "Select repayment status",
          },
        },
        {
          name: "paybackTime",
          label: "Payback Time",
          type: "input",
          props: { type: "date", placeholder: "Select payback time" },
        },
        {
          name: "loanNumber",
          label: "Loan Number",
          type: "input",
          props: { type: "text", placeholder: "Enter loan number" },
        },
        {
          name: "repaymentNumber",
          label: "Repayment Number",
          type: "input",
          props: { type: "text", placeholder: "Enter repayment number" },
        },
        {
          name: "creationTime",
          label: "Creation Time",
          type: "input",
          props: { type: "date", placeholder: "Select creation time" },
        },
        {
          name: "collector",
          label: "Collector",
          type: "select",
          props: {
            options: ["--Select Collector--", "Collector A", "Collector B"],
            placeholder: "Select collector",
          },
        },
        {
          name: "paymentCompanySerialNumber",
          label: "Payment Company Serial Number",
          type: "input",
          props: { type: "text", placeholder: "Enter payment company serial number" },
        },
        {
          name: "transactionNumber",
          label: "Transaction No. of the Payment Company",
          type: "input",
          props: { type: "text", placeholder: "Enter transaction number" },
        },
        {
          name: "productName",
          label: "Product Name",
          type: "select",
          props: {
            options: ["--Select Product--", "Product A", "Product B"],
            placeholder: "Select product name",
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