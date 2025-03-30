<template>
      <Header title="Admin" />
  <div class="main-content">
    <!-- Header Section -->


    <!-- Add Admin Button -->
    <div class="button-container">
      <button class="btn btn-primary" style="color: #004759;" @click="toggleModal">
        Add Admin
      </button>
    </div>

    <!-- Query Table Component -->
    <queryTable />

    <!-- Add Admin Modal -->
    <addAdminModal v-if="isModalOpen" :visible="isModalOpen" @close="toggleModal" />

  </div>
</template>

<script>
import Header from "../modals/header.vue";
import queryTable from "../modals/admin.vue";
import addAdminModal from "../modals/createAdminModal.vue"; // Import the modal

export default {
  components: {
    Header,
    queryTable,
    addAdminModal, // Register the modal component
  },
  data() {
    return {
      isModalOpen: false, // State to control modal visibility
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen; // Toggle modal visibility
    },
  },
};
</script>

<style scoped>
.main-content {}

.button-container {
  display: flex;
  justify-content: flex-end; /* Align button to the end of the container */
  padding: 20px; /* Add padding around the button */
}

.btn-primary {
  padding: 12px 24px; /* Add padding to the button */
  font-size: 16px; /* Adjust font size */
  border-radius: 8px; /* Add rounded corners */
  background-color: #00ccff; /* Primary color */
  color: white; /* Text color */
  border: none; /* Remove default border */
  cursor: pointer; /* Add pointer cursor */
  transition: background-color 0.3s ease; /* Smooth hover effect */
}

.btn-primary:hover {
  background-color: #0099cc; /* Darker shade on hover */
}
</style>
