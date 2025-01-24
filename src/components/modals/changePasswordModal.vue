<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-96">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 bg-blue-500 rounded-t-lg">
        <h2 class="text-xl font-semibold text-white">Change Password</h2>
        <button
          @click="$emit('close')"
          class="text-white text-lg focus:outline-none"
        >
          &times;
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-4">
        <!-- New Password Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >New Password</label
          >
          <div class="relative">
            <input
              type="password"
              v-model="newPassword"
              placeholder="Enter password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              @click="togglePasswordVisibility('new')"
              class="absolute top-2.5 right-2.5 text-gray-500 focus:outline-none"
            >
              <span v-if="showNewPassword">👁</span>
              <span v-else>🙈</span>
            </button>
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Confirm Password</label
          >
          <div class="relative">
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Enter password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              @click="togglePasswordVisibility('confirm')"
              class="absolute top-2.5 right-2.5 text-gray-500 focus:outline-none"
            >
              <span v-if="showConfirmPassword">👁</span>
              <span v-else>🙈</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end px-6 py-4 border-t">
        <button
          @click="$emit('close')"
          class="px-4 py-2 mr-2 text-sm font-medium text-gray-700 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          @click="handleConfirm"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Confirm
        </button>
      </div>
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
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      showNewPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility(field) {
      if (field === "new") {
        this.showNewPassword = !this.showNewPassword;
      } else if (field === "confirm") {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    },
    handleConfirm() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Passwords do not match!");
      } else {
        alert("Password changed successfully!");
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
