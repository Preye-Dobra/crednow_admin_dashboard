<template>
  <div v-if="visible" class="modal-container">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-button" @click="closeModal">×</button>
      </div>
      <div class="modal-content">
        <form @submit.prevent="handleSubmit" class="form-box">
          <div class="form-group" v-for="(field, index) in formFields" :key="index">
            <label :for="field.id">{{ field.label }}</label>
            <input
              :id="field.id"
              :type="field.type"
              :placeholder="field.placeholder"
              v-model="field.value"
              required
              class="input-field"
            />
          </div>
          <button type="submit" class="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BillingModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Billing Modal",
    },
  },
  data() {
    return {
      formFields: [
        { id: "field1", label: "Loan Number", type: "text", placeholder: "Enter Loan Number", value: "" },
        { id: "field2", label: "Name", type: "text", placeholder: "Enter Name", value: "" },
        { id: "field3", label: "Days Overdue", type: "Number", placeholder: "Enter Days Overdue", value: "" },
        { id: "field4", label: "Total Remaining Repayment", type: "Number", placeholder: "Enter Total Remaining Repayment", value: "" },
        { id: "field5", label: "Public Transfer Amount", type: "number", placeholder: "Enter Public Transfer Amount", value: "" },
        { id: "field6", label: "Remarks", type: "text", placeholder: "Enter Field 6", value: "" },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {
      const formData = this.formFields.map((field) => ({
        [field.id]: field.value,
      }));
      console.log("Form submitted with data:", formData);
      this.closeModal();
    },
  },
};
</script>
<style scoped>
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
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-content {
  max-height: calc(100% - 80px);
  overflow-y: auto;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  color: #004759;
  font-size: 14px;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  height: 40px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
}

.input-field::placeholder {
  color: #acacb2;
}

.submit-btn {
  background-color: #00ccff;
  color: #fff;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.submit-btn:hover {
  background-color: #009fcc;
}
</style>

