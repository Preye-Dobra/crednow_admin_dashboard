<template>
  <div v-if="visible" class="modal-container">
    <div class="modal">
      <div class="modal-title">
        <h2 class="text">{{ title }}</h2>
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
          <div class="button-container">
            <button type="button" class="action-btn cancel">Cancel</button>
            <button type="submit" class="action-btn submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Refresh Modal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Refresh Modal",
    },
  },
  data() {
    return {
      formFields: [
        { id: "field1", label: "Loan Number", type: "text", placeholder: "Enter Loan Number", value: "" },
        { id: "field2", label: "Name", type: "text", placeholder: "Enter Name", value: "" },
        { id: "field3", label: "Days Overdue", type: "number", placeholder: "Enter Days Overdue", value: "" },
        { id: "field4", label: "Total Remaining Repayment", type: "number", placeholder: "Enter Total Remaining Repayment", value: "" },
        { id: "field5", label: "Public Transfer Amount", type: "number", placeholder: "Enter Public Transfer Amount", value: "" },
        { id: "field6", label: "Remarks", type: "text", placeholder: "Enter Remarks", value: "" },
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-title {
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

.text {
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
  color:  #004759; /* Ensure the text color is white */
}

.close-button {
  width: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white; /* Ensure the close button color is white */
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
  background-color:  #00CCFF;
}

.cancel {
  border: 1px solid  #00CCFF;
  color:  #00CCFF;
  background-color: #fff;
}

.submit {
  border: 1px solid  #00CCFF;
  color: #ecf1f2;
  background-color:  #00CCFF;
}
</style>