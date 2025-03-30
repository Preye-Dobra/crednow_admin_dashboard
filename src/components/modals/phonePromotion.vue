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
          <div class="form-group">
            <label for="messageField">Message</label>
            <textarea
              id="messageField"
              v-model="message"
              placeholder="Enter Message"
              required
              class="input-field body-field"
            ></textarea>
          </div>
          <div class="button-container">
            <button type="submit" class="action-btn submit">Send SMS Promotion</button>
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
      default: "Promotion Message Via SMS",
    },
  },
  data() {
    return {
      message: "CredNow: Get instant loans whenever you need cash. Quick, easy, and reliable. Visit CredNow today!" // Default message
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async handleSubmit() {
      const payload = {
        message: this.message
      };

      try {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          alert("Authentication token not found. Please log in.");
          return;
        }

        const response = await fetch("https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/broadcast/sms-all-users", {
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
        alert("SMS sent successfully!");
        this.closeModal();

      } catch (error) {
        console.error("Error sending SMS:", error);
        alert(`Error: ${error.message}`);
      }
    }
  }
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
/* Style for the Message textarea */
.body-field {
  height: 210px;
  resize: none;
}
.button-container {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
.action-btn {
  width: 100%;
  height: 100%;
  background-color: #00CCFF;
  color: #ecf1f2;
  border: 1px solid #00CCFF;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
}
.action-btn:hover {
  background-color: #00CCFF;
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
  margin-right: 10px;
}
.close-button img {
  width: 12px;
  height: 12px;
}
</style>