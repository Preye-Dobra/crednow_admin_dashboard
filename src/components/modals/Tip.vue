<template>
  <div v-if="visible" class="modal-container">
    <div class="modal">
      <div class="modal-header">
        <h2 class="text">{{ header }}</h2>
        <button class="close-button" @click="closeModal">×</button>
      </div>
      <div class="modal-content">
        <div class="icon-container">
          <img src="/public/info-circle.png" alt="Warning Icon" class="icon" />
        </div>
        <p class="message">Are you sure you want to notify the user to modify the account?</p>
      </div>
      <div class="button-container">
        <button class="action-btn cancel" @click="closeModal">Cancel</button>
        <button class="action-btn submit" @click="confirmAction">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    header: {
      type: String,
      default: "Tips",
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmAction() {
      this.$emit("confirm"); // Emit event to open the next modal
      this.closeModal(); // Close current modal
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
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  height: 335px;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #00CCFF;
  height: 46px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  font-size: 24px;
  padding: 0 16px;
  position: relative;
}

.text {
  color: #ffffff;
  font-weight: 400;
  font-size: 22px;
  flex-grow: 1;
  text-align: center;
}

.close-button {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
}

.modal-content {
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: center;
  margin: auto;
  width: 350px;
  margin-top: 70px;
  gap: px; /* Space between icon and text */
}

.icon-container {
  flex-shrink: 0; /* Prevents the icon from shrinking */
  
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.message {
  font-size: 20px;
  color: #585865;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 20px;
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

.action-btn.cancel {
  border: 1px solid#00CCFF;
  color:#00CCFF;
  background-color: #fff;
}

.action-btn.cancel:hover {
  background-color:#00CCFF;
  color: #fff;
}

.action-btn.submit {
  border: 1px solid#00CCFF;
  background-color:#00CCFF;
}

.action-btn.submit:hover {
  background-color: #006f99;
}
</style>
