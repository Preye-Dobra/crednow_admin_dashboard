<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
    <div class="modal-content">
      <ul>
        <li @click="changePassword" class="modal-item">Change Password</li>
        <li @click="logout" class="modal-item">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    changePassword() {
      alert("Redirecting to Change Password...");
      this.closeModal();
    },
    logout() {
      alert("Logging out...");
      this.closeModal();
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

.modal-item {
  cursor: pointer;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.modal-item:hover {
  color: #007bff;
}
</style>
