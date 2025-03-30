<template>
  <!-- Only render the modal when visible is true -->
  <div v-if="visible" class="modal-container">
    <div class="modal">
      <div class="modal-header">
        <h2 class="text">{{ title }}</h2>
        <button 
  class="close-button" 
  @click="closeModal" 
  style="
    margin-right: 10px; 
    background-color: #00CCFF; 
    border: none; 
    width: 13.728515625px; 
    height: 13.728515625px; 
    font-size: 24px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    cursor: pointer;
  "
>
  <img src="/public/can.png" alt="">
</button>
      </div>
      <div class="modal-content">
        <form @submit.prevent="handleSubmit" class="form-box">
          <!-- Existing form fields rendered via v-for -->
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
          <!-- New Body field as a textarea -->
          <div class="form-group">
            <label for="bodyField">Body</label>
            <textarea
              id="bodyField"
              v-model="body"
              placeholder="Enter Body"
              required
              class="input-field body-field"
            ></textarea>
          </div>
          <div class="button-container">
            <button type="submit" class="action-btn submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailInviteModal",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: "Promotion Message Via Email ",
    },
  },
  data() {
    return {
      formFields: [
        { id: "field1", label: "Email", type: "text", placeholder: "Email To", value: "" },
        { id: "field2", label: "Subject", type: "text", placeholder: "Enter Subject", value: "" },
      ],
      body: "" // New data property for the Body textarea
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {
      // Combine formFields data with the new body field
      const formData = {
        ...this.formFields.reduce((acc, field) => {
          acc[field.id] = field.value;
          return acc;
        }, {}),
        body: this.body
      };
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
.close-button {
  width: 22px;
  height: 22px;
}
.text {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
  flex-grow: 1;
}
.modal {
  width: 820px;
  height: 609px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00CCFF;
  margin-bottom: 20px;
  height: 56px;
  color: #004759;
  font-size: 24px;
}
.modal-content {
  max-height: calc(100% - 80px);
  overflow-y: auto;
  margin-top: 40px;
  padding: 20px;
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
/* Style for the Body textarea */
.body-field {
  height: 210px;
  resize: none;
}
.button-container {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  align-items: center;
 
}

.submit {
  width: 100%; /* Make the button full width */
  
  align-content: center;
  border-radius: 20px;
}

.action-btn {
  width: 100%;
  height: 100%;
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
  background-color: #00CCFF;
  width: 100%;
  align-content: center;
  border-radius: 20px;
}
ul {
  list-style-type: disc;
  margin-left: 20px;
}
ol {
  list-style-type: decimal;
  margin-left: 20px;
}
.heading {
  width: 720px;
  margin-top: 1px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #004759;
}
p {
  width: 720px;
  margin-top: 1px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #004759;
}
li {
  font-size: 12px;
  color: #004759;
}

.close-button {
  width: 24px; /* Adjusted to a smaller size */
  height: 24px; /* Adjusted to a smaller size */
  background-color: #00CCFF;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0; /* Remove default padding */
  margin-right: 10px; /* Adjust margin as needed */
}

.close-button img {
  width: 12px; /* Adjust the size of the image */
  height: 12px; /* Adjust the size of the image */
}
</style>