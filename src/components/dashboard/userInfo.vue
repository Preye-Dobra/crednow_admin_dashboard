<template>
  <div class="main-content">
    <!-- Header Section -->
    <Header title="User" />
    <query />
   <UserInfoTable />
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import query from "../modals/UserOp.vue";

import UserInfoTable from "../modals/userInfoTable.vue";
export default {
  components: {
    Header,
    query,

    UserInfoTable

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

.main-conten{
  background-color: #D9F7FF;
  height: auto;
}


</style>
