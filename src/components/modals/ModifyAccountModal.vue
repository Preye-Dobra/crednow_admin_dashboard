<template>
  <div v-if="visible" class="modal-container">
    <div class="modal">
      <div class="modal-title">
        <h2 class="text">Loan managemnt</h2>
        <button class="close-button" @click="closeModal">×</button>
      </div>
      <div class="modal-content">
        <form @submit.prevent="handleSubmit" class="form-box">
          <div class="form-group" v-for="(field, index) in formFields" :key="index">
            <!-- Label for all fields except checkbox -->
            <label :for="field.id" v-if="field.type !== 'checkbox'">{{ field.label }}</label>
            
            <!-- Input field for text fields -->
            <input
              v-if="field.type !== 'checkbox'"
              :id="field.id"
              :type="field.type"
              :placeholder="field.placeholder"
              v-model="field.value"
              required
              class="input-field"
            />
            
            <!-- Checkbox for Plus Note -->
            <div v-if="field.type === 'checkbox'" class="checkbox-container">
              <input
                type="checkbox"
                :id="field.id"
                v-model="field.value"
                class="checkbox-input"
              />
              <label :for="field.id" class="checkbox-label">
                {{ field.label }}
              </label>
            </div>
          </div>
          <div class="button-container">
            <button type="button" class="action-btn cancel" @click="closeModal">Cancel</button>
            <button type="submit" class="action-btn submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModifyAccountModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    tittlee: {
      type: String,
      default: "Loan Management", // Default title
    },
  },
  data() {
    return {
      // Modified form fields based on the new labels
      formFields: [
        { id: "loanNumber", label: "Loan Number", type: "text", placeholder: "Enter Loan Number", value: "" },
        { id: "loanStatus", label: "Loan Status", type: "text", placeholder: "Enter Loan Status", value: "" },
        { id: "remarks", label: "Remarks", type: "text", placeholder: "Enter Remarks", value: "" },
        { id: "plusNote", label: "Plus Note", type: "checkbox", value: false }, // Checkbox for Plus Note
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {
      const formData = this.formFields.reduce((acc, field) => {
        acc[field.id] = field.value;
        return acc;
      }, {});
      console.log("Form submitted with data:", formData);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.text {
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
  color: #004759;
  
}

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
  background-color: #00CCFF;
  height: 46px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  font-size: 24px;
  padding: 0 16px;
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

.close-button {
  width: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
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

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between checkbox and label */
}

.checkbox-input {
  width: 16px;
  height: 16px;
  margin: 0;
}

.checkbox-label {
  color: #004759;
  font-size: 14px;
  margin: 0;
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
  background-color: #00CCFF;
}

.cancel {
  border: 1px solid #00CCFF;
  color: #00CCFF;
  background-color: #fff;
}

.submit {
  border: 1px solid #00CCFF;
  color: #ecf1f2;
  background-color: #00CCFF;
}
</style>
