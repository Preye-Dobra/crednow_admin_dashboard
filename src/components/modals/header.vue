<template>
  <div class="main-content" @click="handleClickOutside">
    <div class="header-container">
      <h1 class="header-title">{{ title }}</h1>
      
      <div class="header-details">
        <ul class="header-list">
          <li class="header-item header-date">
            Time: {{ currentDateTime }}
          </li>
          <li class="header-item header-circle">
            <h4>{{ userInitials }}</h4>
          </li>
          <li class="header-item header-name">
            <span>{{ firstName }}</span> <span>{{ lastName }}</span>
          </li>
          <li style="margin-right: 8px;" class="header-item header-dropdown" @click.stop="toggleModal">
            ▼
          </li>
        </ul>
      </div>
    </div>
    
    <Modal
      :isOpen="isModalOpen"
      @close="closeModal"
    />
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
      firstName: '',
      lastName: '',
      currentDateTime: '',
      timerInterval: null
    };
  },
  computed: {
    userInitials() {
      if (this.firstName && this.lastName) {
        return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`;
      }
      return 'LT'; // default fallback
    }
  },
  created() {
    // Load user data from localStorage
    this.loadUserData();
    
    // Start the timer to update the datetime
    this.updateDateTime();
    this.timerInterval = setInterval(this.updateDateTime, 1000);
  },
  beforeUnmount() {
    // Clear interval when component is destroyed
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
  methods: {
    loadUserData() {
      try {
        const userProfile = localStorage.getItem('UserProfile'); // Changed to UserProfile
        if (userProfile) {
          const parsedData = JSON.parse(userProfile);
          this.firstName = parsedData.firstName || '';
          this.lastName = parsedData.lastName || '';
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    },
    updateDateTime() {
      const now = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      this.currentDateTime = now.toLocaleString('en-US', options).replace(',', '');
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleClickOutside(event) {
      // Only close if clicking outside the dropdown and the dropdown is open
      if (this.isModalOpen && !event.target.closest('.dropdown-menu')) {
        this.closeModal();
      }
    },
  },
};
</script>

<style scoped>
.header-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 18px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 85vw;
  gap: 10px;
  height: 48px;
  box-sizing: border-box;
 
}

.header-title {
  font-size: 14px;
  font-weight: 400;
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
  align-items: center;
}

.header-date {
  width: 170px;
  font-size: 14px;
  color: #e85353;
}

.header-item {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.header-circle {
  width: 30px;
  height: 30px;
  background-color: #d9f7ff;
  color: #004759;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 30px;
}

.header-circle h4 {
  margin: 0;
}

.header-name {
  color: #585865;
}

.header-dropdown {
  cursor: pointer;
  color: #585865;
  font-size: 12px;
 
}

.header-dropdown:hover {
  color: #004759;
}
</style>