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
      :disabled="currentPage === 1 || loading"
      @click="goToPage(currentPage - 1)"
      class="pagination-button"
    >
      &lt;
    </button>
    
    <!-- Page Numbers -->
    <div v-for="page in visiblePages" :key="page" class="page-number">
      <button
        @click="goToPage(page)"
        :disabled="loading"
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
      :disabled="currentPage === totalPages || loading"
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
        :disabled="loading"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      default: 0
    },
    initialItemsPerPage: {
      type: Number,
      default: 10
    },
    initialPage: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log("Pagination component initialized with:", {
      totalItems: this.totalItems,
      initialPage: this.initialPage,
      initialItemsPerPage: this.initialItemsPerPage
    });
  },
  data() {
    return {
      itemsPerPage: this.initialItemsPerPage,
      itemsPerPageOptions: [10, 20, 50, 100],
      currentPage: this.initialPage,
      goToPageInput: this.initialPage,
    };
  },
  computed: {
    totalPages() {
      return Math.max(Math.ceil(this.totalItems / this.itemsPerPage) || 1, 1);
    },
    visiblePages() {
      const maxPages = 6;
      const pages = [];
      
      if (this.totalPages <= maxPages) {
        // Show all pages if there are fewer than maxPages
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Calculate range for display
        const halfMax = Math.floor(maxPages / 2);
        let startPage = Math.max(1, this.currentPage - halfMax);
        let endPage = Math.min(startPage + maxPages - 1, this.totalPages);
        
        // Adjust if we're near the end
        if (endPage - startPage + 1 < maxPages) {
          startPage = Math.max(1, endPage - maxPages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    },
  },
  watch: {
    initialPage(newValue) {
      this.currentPage = newValue;
      this.goToPageInput = newValue;
    },
    initialItemsPerPage(newValue) {
      this.itemsPerPage = newValue;
    },
    totalItems() {
      // When totalItems changes, check if current page is still valid
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages;
        this.goToPageInput = this.totalPages;
      }
    }
  },
  methods: {
    onItemsPerPageChange() {
      this.currentPage = 1;
      this.goToPageInput = 1;
      console.log(`Changing items per page to ${this.itemsPerPage}`);
      this.$emit('page-change', this.currentPage, this.itemsPerPage);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && !this.loading) {
        this.currentPage = page;
        this.goToPageInput = page;
        console.log(`Navigating to page ${page} with ${this.itemsPerPage} items per page`);
        this.$emit('page-change', this.currentPage, this.itemsPerPage);
      } else {
        console.warn(`Invalid page number: ${page}. Valid range: 1-${this.totalPages}`);
      }
    },
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  background: #d9f7ff;
  padding: 16px;
  border-radius: 12px;
  gap: 12px;
  font-weight: 400;
  margin-top: 20px;
  
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
  background: #d9f7ff;
  border: 1px solid #d9f7ff;
  border-radius: 8px;
  padding: 6px 12px;
}

.go-label {
  font-size: 14px;
  color: #004759;
}

.go-input {
  border: 1px solid #00ccff;
  border-radius: 4px;
  padding: 4px 8px;
  width: 60px;
  text-align: center;
  background-color: #d9f7ff;
}


</style>

