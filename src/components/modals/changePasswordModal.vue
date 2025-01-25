<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-header">Change Password</h2>
      <form @submit.prevent="handleSubmit" class="form-content">
        <div class="form-group">
          <label for="new-password" class="form-label">New Password</label>
          <div class="input-container">
            <input
              id="new-password"
              :type="showNewPassword ? 'text' : 'password'"
              v-model="newPassword"
              class="form-input"
              placeholder="Enter password"
            />
            <i
              class="fa"
              :class="showNewPassword ? 'fa-eye' : 'fa-eye-slash'"
              @click="toggleNewPasswordVisibility"
            ></i>
          </div>
        </div>
        <div class="form-group">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <div class="input-container">
            <input
              id="confirm-password"
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              class="form-input"
              placeholder="Enter password"
            />
            <i
              class="fa"
              :class="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
              @click="toggleConfirmPasswordVisibility"
            ></i>
          </div>
        </div>
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
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.newPassword === this.confirmPassword) {
        alert('Password changed successfully!');
        this.$emit('close');
      } else {
        alert('Passwords do not match!');
      }
    },
    toggleNewPasswordVisibility() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
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
  height: 433px;
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

.form-group {
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  max-width: 463px; /* Ensures the group stays centered but labels align left */
}

.form-label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #004759;
  text-align: left; /* Aligns the text to the left */
}


.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 463px;
}

.form-input {
  width: 100%;
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
}

.input-container i {
  position: absolute;
  right: 12px; /* Keeps the icon aligned with padding of the input */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 16px;
  color: #555;
}

.form-input:focus {
  border-color: #CCCCD8;
  box-shadow: 0 0 5px rgba(0, 207, 232, 0.5);
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
  margin-right: -1px;
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



