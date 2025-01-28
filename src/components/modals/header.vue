<template>
  <div class="main-content">
    <!-- Header Section -->
    <div class="header-container">
      <h1 class="header-title">{{ title }}</h1>

      <div class="header-details">
        <ul class="header-list">
          <li class="header-item header-date">LT: 2025/01/01 09:44:02</li>
          <li class="header-item header-circle">LT</li>
          <li class="header-item header-name">Lincon Tife</li>
          <li class="header-item header-dropdown" @click="toggleModal">
            <img src="/public/dropdown.png" alt="Dropdown" />
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal Component -->
    <Modal :isOpen="isModalOpen" @close="toggleModal" />
  </div>
</template>

<script>
import Modal from "./logModal.vue";

export default {
  components: {
    Modal,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
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

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 1228px;
  height: 46px;
}

.header-title {
  font-size: 14px;
  font-weight: bold;
  color: #004759;
}

.header-details {
  display: flex;
  align-items: center;
}

.header-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.header-date {
  width: 146px;
  font-size: 14px;
  color: #e85353;
}

.header-item {
  margin-left: 10px;
}

.header-circle {
  width: 12px;
  height: 17px;
  background-color: #d9f7ff;
  color: #004759;
  text-align: center;
  font-size: 12px;
}

.header-name {
  color: #585865;
}
</style>
