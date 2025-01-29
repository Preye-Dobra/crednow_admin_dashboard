<template>
  <div v-if="visible" class="modal-container">
    <div class="modal">
      <div class="modal-header">
        <h2 class="text">{{ title }}</h2> <!-- Add the .text class here -->
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
  name: "EdithModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Edith Modal",
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
.close-button{
    width: 22px;
    height: 22px;
    
}
.text {
  text-align: center; /* Center the text horizontally */
  font-size: 20px; /* Set the font size */
  font-weight: 600; /* Set the font weight */
  line-height: 16px; /* Adjust the line height */
  margin: 0; /* Remove default margin */
  flex-grow: 1; /* Allow the text to take up remaining space */
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

.button-container {
  width: 208px; /* You can keep this width, or adjust it to match your design */
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  align-items: center;
  /* Center the buttons in the container */
  margin-left: auto;
  margin-right: auto;
}


.action-btn {
  width: 98px;
  height: 100%;
  
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
}

.action-btn:hover {
  background-color: #009fcc;
}
.cancel{
border: 1px solid #009fcc;
color: #009fcc;
background-color: #fff;
}

.submit{
    border: 1px solid #009fcc;
color: #ecf1f2;
background-color: #009fcc;
}
</style>