<template>
  <div class="pagination-container">
    <!-- Total Count -->
    <div class="total-box">Total {{ totalItems }}</div>

    <!-- Items Per Page Selector -->
    <select
      v-model="itemsPerPage"
      @change="onItemsPerPageChange"
      class="items-per-page-selector"
    >
      <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
        {{ option }}/Page
      </option>
    </select>

    <!-- Previous Button -->
    <button
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
      class="pagination-button"
    >
      &lt;
    </button>

    <!-- Page Numbers -->
    <div v-for="page in visiblePages" :key="page" class="page-number">
      <button
        @click="goToPage(page)"
        :class="[
          'pagination-button',
          { 'active-page': currentPage === page }
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
      class="pagination-button bg-gray-100"
    >
      &gt;
    </button>

    <!-- Go To Page -->
    <div class="go-page">
      <span class="go-label">Go to:</span>
      <input
        v-model.number="goToPageInput"
        @keyup.enter="goToPage(goToPageInput)"
        type="number"
        class="go-input"
        :min="1"
        :max="totalPages"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalItems: 93319,
      itemsPerPage: 10,
      itemsPerPageOptions: [10, 20, 50, 100],
      currentPage: 1,
      goToPageInput: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    visiblePages() {
      const maxPages = 6;
      const pages = [];
      const startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
      const endPage = Math.min(startPage + maxPages - 1, this.totalPages);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    onItemsPerPageChange() {
      this.currentPage = 1;
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.goToPageInput = page;
      }
    },
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content:end;
  flex-wrap: wrap;
  background:  #d9f7ff;
  padding: 16px;
  border-radius: 12px;
  gap: 12px;
  font-weight: 400;
}

.total-box {
  font-weight: 400;
  color: #004759;
  margin-right: 12px;
  font-size: 14px;
}

.items-per-page-selector {
  border: 1px solid #00ccff;
  border-radius: 8px;
  padding: 4px;
  color: #004759;
  background-color: #ffffff;
  outline: none;
}

.pagination-button {
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  color: #004759;
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #00ccff;
  color: white;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.active-page {
  background-color: #00ccff;
  color: white;
}

.go-page {
  display: flex;
  align-items: center;
  gap: 8px;
  background:   #d9f7ff;
  border: 1px solid   #d9f7ff;
  border-radius: 8px;
  padding: 6px 12px;
}

.go-label {
  font-size: 14px;
  color: #004759;
}

.go-input {
  border: 1px solid   #00ccff;
  border-radius: 4px;
  padding: 4px 8px;
  width: 60px;
  text-align: center;
  background-color: #d9f7ff;
}
</style>
