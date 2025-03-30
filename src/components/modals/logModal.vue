
<template>
  <div class="dropdown-menu" @click.stop>
    <div v-if="isOpen" class="item-container">
      <div class="dropdown-item" @click="openChangePasswordModal">
        Change Password
      </div>
      <div class="dropdown-item" @click="openLogoutConfirmationModal">
        Logout
      </div>
    </div>

    <!-- Change Password Modal -->
    <ChangePasswordForm
      v-if="showChangePasswordModal"
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
import ChangePasswordForm from "./changePasswordModal.vue";
import LogoutConfirmationModal from "./logoutModal.vue";

export default {
  components: {
    ChangePasswordForm,
    LogoutConfirmationModal,
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
      showLogoutConfirmationModal: false,
    };
  },
  methods: {
    openChangePasswordModal() {
      this.showChangePasswordModal = true;
      this.$emit("close");
    },
    closeChangePasswordModal() {
      this.showChangePasswordModal = false;
    },
    openLogoutConfirmationModal() {
      this.showLogoutConfirmationModal = true;
      this.$emit("close");
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
.dropdown-menu {
  position: absolute;
  width: 161px;
  right: 20px;
  background: white;
  margin-top: -16px;
  z-index: 1000;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-top: 8px;
}

.dropdown-item {
  display: flex;
  padding: 14px 16px;
  cursor: pointer;
  font-size: 13px;
  width: 140px;
  height: 22px;
  align-items: center;
  justify-content: center;
  color: #333;
  text-align: center;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}
</style>

