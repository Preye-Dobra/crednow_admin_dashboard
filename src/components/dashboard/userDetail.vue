<template>
  <div
    class="user-info-container bg-gray-100 p-6 rounded-lg shadow-lg"
    style="width: 1218px; height: 417px;"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 bg-white px-4 py-2 border-b">
      <!-- Tabs aligned to the left -->
      <div class="flex space-x-4 trigger-container">
        <button
          class="tab-button"
          :class="{'active': activeTab === 'user'}"
          @click="toggleTab('user')"
        >
          User Information
        </button>
        <button
          class="tab-button"
          :class="{'active': activeTab === 'media'}"
          @click="toggleTab('media')"
        >
          Media Information
        </button>
      </div>

      <!-- Delete button aligned to the right -->
      <button
        class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
      >
        Delete Client
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfoSection",
  data() {
    return {
      activeTab: "user", // Default active tab
    };
  },
  methods: {
    toggleTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
.user-info-container {
  width: 1218px; /* Fixed width for the container */
  margin: 0 auto; /* Centers the container */
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ef4444; /* Changes to red on hover */
}

button:focus {
  outline: none; /* Removes the default focus outline */
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.mb-4 {
  margin-bottom: 1rem;
}

.bg-white {
  background-color: #ffffff;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.border-b {
  border-bottom: 2px solid #e2e8f0;
}

.text-blue-600 {
  color: #3182ce;
}

.text-gray-600 {
  color: #4a5568;
}

.font-medium {
  font-weight: 500;
}

.hover\:text-blue-600:hover {
  color: #3182ce;
}

.bg-red-500 {
  background-color: #ef4444;
}

.text-white {
  color: #ffffff;
}

.rounded {
  border-radius: 0.375rem;
}

.hover\:bg-red-600:hover {
  background-color: #dc2626;
}

.transition {
  transition: all 0.3s ease;
}

.duration-300 {
  transition-duration: 300ms;
}

.focus\:outline-none:focus {
  outline: none;
}

.trigger-container {
  display: flex;
  gap: 1rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: #4a5568;
  border-radius: 0.375rem; /* Border radius for the buttons */
  transition: all 0.3s ease;
  background: none;
  cursor: pointer;
}

.tab-button:hover {
  color: #3182ce;
}

.tab-button.active {
  color: #3182ce;
  border-bottom: 2px solid #3182ce; /* Add a blue bottom border for active state */
  transform: translateX(20%); /* Slide 20% to the right when active */
}
</style>

