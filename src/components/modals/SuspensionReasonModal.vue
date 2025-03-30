<!-- SuspensionReasonModal.vue -->
<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h3>Suspend Admin</h3>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <p>Please provide a reason for suspension:</p>
        <textarea 
          v-model="suspensionReason" 
          placeholder="Enter reason for suspension" 
          class="reason-textarea"
        ></textarea>
      </div>
      <div class="modal-footer">
        <button class="cancel-button" @click="closeModal">Cancel</button>
        <button class="confirm-button" @click="confirmSuspension">Confirm Suspension</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      suspensionReason: ""
    };
  },
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false);
      this.suspensionReason = ""; // Clear reason when closing
    },
    confirmSuspension() {
      if (!this.suspensionReason.trim()) {
        alert("Please provide a reason for suspension");
        return;
      }
      this.$emit('confirm', this.suspensionReason);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #F5F5F5;
}

.modal-header h3 {
  margin: 0;
  color: #004759;
  font-size: 16px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #888;
}

.modal-body {
  padding: 16px;
}

.reason-textarea {
  width: 100%;
  min-height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  resize: vertical;
  font-family: inherit;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  gap: 12px;
  border-top: 1px solid #F5F5F5;
}

.cancel-button {
  background-color: #f1f1f1;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button {
  background-color: #E85353;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #d64545;
}
</style>