<template>
  <div class="main-content">
    <!-- Header Section -->
    <Header title="Loan Management" />
    <query />
    <queryTable/>
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import query from "../modals/LoanManagementQuery.vue";

import queryTable from "../modals/LoanManagementTable.vue";
export default {
  components: {
    Header,
    query,
    queryTable

  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
};
</script>

<style scoped>
.main-content {
  /* Main content styles (optional) */
}
</style>