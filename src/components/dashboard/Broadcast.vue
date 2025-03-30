<template>
  <div class="main-content">
    <!-- Header Section -->
    <Header title="Broadcast" />
    <broadcast />
    <!--   -->
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import broadcast from "../modals/broadcast.vue";

// import broadcastTable from "../modals/LoanManagementTable.vue";
export default {
  components: {
    Header,
    broadcast

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

</style>