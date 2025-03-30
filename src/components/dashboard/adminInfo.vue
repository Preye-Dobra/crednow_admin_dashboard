<template>
  <div class="main-content">

    <Header title="Admin" />
    <query />
    <!--   -->
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import query from "../modals/adminDetail.vue";

// import queryTable from "../modals/LoanManagementTable.vue";
export default {
  components: {
    Header,
    query

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