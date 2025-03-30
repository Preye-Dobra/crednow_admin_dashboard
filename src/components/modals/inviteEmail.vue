<template>
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
          <div class="form-main">
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
          </div>
          <p class="heading">We are excited to invite you to join Crednow. Your go-to solution for fast and easy loans. With Crednow, you can access the funds you need quickly and effortlessly.</p>
          <p>Why Choose Crednow?</p>
          <ul class="unordered">
            <li>Quick Approval: Get your loan approved in minutes</li>
            <li>Flexible Repayment: Choose a repayment plan that suits your needs.</li>
            <li>Competitive Rates: Enjoy low-interest rates tailored to you.</li>
            <li>User-Friendly: Easy application process through our apps</li>
          </ul>
          <p>How to Get Started:</p>
          <ol class="ordered">
            <li>Download the Crednow App: Available on Google Play and App Store</li>
            <li>Sign Up: Create your account in just a few simple steps.</li>
            <li>Apply for a Loan: Fill out the loan application and get approved quickly</li>
          </ol>
          <p style="border-bottom: 1px solid black; display: inline-block; margin: 0; padding: 0; width: 142px;">
            Download Crednow Now!!!
          </p>
          <p>Should you have any questions, our support team is here to assist you. Feel free to reach out at support@credilityfin.com</p>
          <p>Best regards,</p>
          <p>The Crednow Team</p>
          <div class="button-container">
            <button type="submit" class="action-btn submit">Send Email Invite</button>
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
      default: "Invitation Message Via Email",
    },
  },
  data() {
    return {
      formFields: [
        { id: "field1", label: "Email", type: "text", placeholder: "Email To", value: "" },
        { id: "field2", label: "Subject", type: "text", placeholder: "You’re Invited to Experience Quick and Easy Loans with Crednow!", value: "" },

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
  width: 90%; /* Responsive width */
  max-width: 820px; /* Maximum width */
  height: 90vh; /* Responsive height */
  max-height: 90vh; /* Maximum height */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  margin-top: -12px;
  overflow: hidden; /* Prevent content from overflowing */
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
}.text {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
  flex-grow: 1;
}
.modal-content {
  height: calc(100% - 56px); /* Subtract header height */
  overflow-y: auto; /* Enable scrolling */
  padding: 20px;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-main {
  width: 100%;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px; /* Add padding for better spacing */
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px; /* Add spacing between form groups */
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

.button-container {
  width: 100.1%;
  height: 40px;
  display: flex;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 12px;
}

.action-btn {
  width: 100%;
  height: 100%;
  background-color: #59002e;
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

.submit {
  background-color: #00CCFF;
  border-radius: 20px;
}

.close-button {
  width: 24px;
  height: 24px;
  background-color: #00CCFF;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.close-button img {
  width: 12px;
  height: 12px;
}

.heading, p {
  width: 100%;
  margin-top: 1px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #004759;
}

ul, ol {
  margin-left: 20px;
}

li {
  font-size: 12px;
  color: #004759;
  margin: 10px 0;
}
</style>