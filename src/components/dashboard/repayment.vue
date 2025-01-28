<template>
  <div class="main-content">
    <!-- Header Section -->
    <Header title="Repayment Inquries" />
    <query />
    <queryTable/>
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import query from "../modals/repayQeury.vue";

import queryTable from "../modals/repayMentTable.vue";
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

