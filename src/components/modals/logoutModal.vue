<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-header">Change Password</h2>
      <div class="form-content">
        <p class="text-message">Are you sure you want to Logout of this account?</p>
        <div class="form-actions">
          <button
            type="button"
            @click="$emit('close')"
            class="btn btn-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-confirm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      alert('Password change confirmed!');
      this.$emit('close');
    },
  },
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

.modal-content {
  background: white;
  width: 563px;
  height: 233px; /* Adjusted height for the new layout */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.modal-header {
  background-color: #00CCFF;
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
  border-radius: 8px 8px 0 0;
  width: 100%;
}

.form-content {
  width: 100%;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-message {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  width: 98px;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #ffff;
  color: #00CCFF;
  border: 1px solid #00CCFF;
  transition: background-color 0.2s ease;
}

.btn-cancel:hover {
  background-color: #a97373;
}

.btn-confirm {
  background-color: #00CCFF;
  color: white;
  border: none;
  transition: background-color 0.2s ease;
}

.btn-confirm:hover {
  background-color: #00a5c5;
}
</style>
