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
          
          <p class="heading">You've been invited to join CashGo for quick and easy loans. Download the app now and get started with your loan application today!</p>
    
          <div class="button-container">
            <button type="submit" class="action-btn submit">Send SMS Invite</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "PhoneInviteModal",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: "Invitation Message Via SMS",
    },
  },
  data() {
    return {
      formFields: [
        { id: "phone", label: "Phone", type: "text", placeholder: "e.g., +2348105802380", value: "" },
        { id: "message", label: "Message", type: "text", placeholder: "You’re Invited to Experience Quick and Easy Loans with Crednow!", value: "" },
      ],
      statusMessage: null
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async handleSubmit() {
      // Extract form data
      const phoneField = this.formFields.find(f => f.id === "phone");
      const messageField = this.formFields.find(f => f.id === "message");
      let phoneNumbers = phoneField.value.split(",").map(num => num.trim());

      // Ensure all phone numbers are in international format
      phoneNumbers = phoneNumbers.map(num => {
        if (!num.startsWith("+")) {
          return `+${num}`; // Add "+" if missing
        }
        return num;
      });

      const payload = {
        message: messageField.value,
        phoneNumbers: phoneNumbers
      };

      try {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          alert("Authentication token not found. Please log in.");
          return;
        }

        const response = await fetch("https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/broadcast/send-sms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Failed to send SMS: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("SMS sent successfully:", result);

        // Show success notification
        this.showNotification("success", "SMS sent successfully!");
        this.closeModal();

      } catch (error) {
        console.error("Error sending SMS:", error);
        this.showNotification("error", `Error: ${error.message}`);
      }
    },
    showNotification(type, text) {
      // Assuming a global notification system or a simple alert for this example
      this.statusMessage = { type, text };
      setTimeout(() => {
        this.statusMessage = null;
      }, 3000); // Clear after 3 seconds

      // For a simple alert (replace with your app's notification system if available)
      alert(text);
    }
  }
};
</script>

<style scoped>
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
.form-main{
  width: 740px;
  height: 172px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  width: 820px;
  height: auto;
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
  margin-left: 20px;
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
  padding-top: 10px;
  color: #004759;
  font-size: 14px;
  margin-bottom: 8px;
  margin-left: 10px;
}

.input-field {
  width: 720px;
  height: 40px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
  margin: auto;
}

.input-field::placeholder {
  color: #acacb2;
}

.button-container {
  width: 101%; /* You can keep this width, or adjust it to match your design */
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

.action-btn {
  width: 780px;
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
  background-color: #00CCFF;
}
.cancel{
  border: 1px solid #00CCFF;
  color: #00CCFF;
  background-color: #fff;
}

.submit{
  border: 1px solid #00CCFF;
  color: #ecf1f2;
  background-color: #00CCFF;
  width: 746px;
  align-content: center;
  border-radius: 20px;
}
ul {
  list-style-type: disc;
  margin-left: 20px; /* Adjust as needed */
}

ol {
  list-style-type: decimal;
  margin-left: 20px; /* Adjust as needed */
}
.heading{
  width: 720px;
  margin-top: 1px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #004759;
}
p{
  width: 720px;
  margin-top: 1px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #004759;
}
li{
  font-size: 12px;
  color: #004759;
}
</style>