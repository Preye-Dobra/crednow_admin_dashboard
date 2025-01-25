<template>
  <div>
    <!-- Parent Modal -->
    <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
      <div class="modal-content" ref="dropdownModal">
        <ul class="modal-list">
          <li @click="openChangePasswordModal" class="modal-item">Change Password</li>
          <li @click="openLogoutConfirmationModal" class="modal-item">Logout</li>
        </ul>
      </div>
    </div>

    <!-- Import and use ChangePasswordForm -->
    <ChangePasswordForm
      v-if="showChangePasswordModal"
      :position="changePasswordModalPosition"
      @close="closeChangePasswordModal"
    />

    <!-- Logout Confirmation Modal -->
    <LogoutConfirmationModal
      v-if="showLogoutConfirmationModal"
      @close="closeLogoutConfirmationModal"
      @confirm="handleLogout"
    />
  </div>
</template>

<script>
import ChangePasswordForm from './changePasswordModal.vue';
import LogoutConfirmationModal from './logoutModal.vue'; // Import the new modal component

export default {
  components: {
    ChangePasswordForm,
    LogoutConfirmationModal, // Register the new modal component
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showChangePasswordModal: false,
      showLogoutConfirmationModal: false, // State for the logout confirmation modal
      changePasswordModalPosition: { top: '0px', left: '0px' }, // Default position
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    openChangePasswordModal() {
      const dropdownModal = this.$refs.dropdownModal.getBoundingClientRect();
      this.changePasswordModalPosition = {
        top: `${dropdownModal.top}px`,
        left: `${dropdownModal.left}px`,
      };

      this.showChangePasswordModal = true;
      this.closeModal();
    },
    closeChangePasswordModal() {
      this.showChangePasswordModal = false;
    },
    openLogoutConfirmationModal() {
      this.showLogoutConfirmationModal = true;
      this.closeModal();
    },
    closeLogoutConfirmationModal() {
      this.showLogoutConfirmationModal = false;
    },
    handleLogout() {
      alert("You have logged out successfully!");
      this.closeLogoutConfirmationModal();
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
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.modal-item {
  cursor: pointer;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding: 8px 0;
}

.modal-item:hover {
  color: #007bff;
  background-color: #f1f1f1;
  border-radius: 4px;
  transition: background-color 0.3s;
}
</style>

