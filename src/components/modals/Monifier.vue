<template>
  <div class="monnify-dropdown">
    <button @click="toggleDropdown" class="monnify-button">
      Monnify
      <img 
        src="/public/raphael_arrowdown.png" 
        alt="dropdown arrow" 
        class="arrow-icon"
      />
    </button>
    <div v-if="isOpen" class="dropdown-content">
      <div class="dropdown-item">Monnify</div>
      <div class="dropdown-item">Woven</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonnifyButton',
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown)
  }
}
</script>

<style scoped>
.monnify-dropdown {
  position: relative;
  display: flex;
  margin: auto;
  gap: 4;
  justify-content: flex-end; /* Align to the right */
  
  width: 1182px;
  
}

.monnify-button {
  display: flex;
  align-items: center; /* Changed from end to center */
  justify-content: center;
  gap: 4px;
  background-color: #00CCFF;
  color: white;
  padding: 6px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.arrow-icon {
  width: 12px;
  height: 12px;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0; /* Aligns dropdown content with the right edge */
  background-color: white;
  min-width: 161px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-radius: 4px;
  height: 101px;
  margin-top: 4px;
  z-index: 1000;
}

.dropdown-item {
  padding: 12px 16px;
  cursor: pointer;
  color: #333;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}
</style>