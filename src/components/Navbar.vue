<template>
  <div class="sidebar">
    <!-- Sidebar Content: Logo inside a box at the top -->
    <div class="logo-box">
      <img src="/logo1.png" alt="Logo" class="sidebar-logo" />
    </div>

    <div class="nav-list">
      <ul>
        <!-- Straight Links -->
        <li><a href="/dashboard"><img src="/public/all.svg" alt="All applications" class="nav-icon" /> All applications</a></li>
        <li><a href="all-client"><img src="/public/pp.png" alt="All client" class="nav-icon" /> All client</a></li>
        
        <!-- Financial Link with Dropdown -->
        <li>
          <div class="dropdown-header" @click="toggleDropdown('financial')">
            <a href="#"><img src="/public/money-recive.png" alt="Financial" class="nav-icon" /> Financial</a>
            <span class="dropdown-icon" :class="{ 'rotate': activeDropdown === 'financial' }">▼</span>
          </div>
          <ul class="dropdown" v-if="activeDropdown === 'financial'">
            <li><a href="/repay">Repay Inquiries</a></li>
            <li><a href="loan-inquiry">Loan Inquiry</a></li>
                        <li><a href="reconcilliation">Reconcilliation</a></li>
          </ul>
        </li>

        <!-- Straight Links -->
        <li><a href="collection-case"><img src="/public/suit.png" alt="Collection case" class="nav-icon" /> Collection case</a></li>
        
        <!-- Operation Link with Dropdown -->
        <li>
          <div class="dropdown-header" @click="toggleDropdown('operation')">
            <a href="#"><img src="/public/operat.png" alt="Operation" class="nav-icon" /> Operation</a>
            <span class="dropdown-icon" :class="{ 'rotate': activeDropdown === 'operation' }">V</span>
          </div>
          <ul class="dropdown" v-if="activeDropdown === 'operation'">
            <li><a href="failed-order">Failed Operation</a></li>
            <li><a href="loan-management">Loan Managment</a></li>
                        <li><a href="loan-status">Loan Order With Unknown Status</a></li>
            
          </ul>
        </li>

        <!-- Straight Links -->
        <li><a href="#"><img src="/public/admin.png" alt="Admin" class="nav-icon" /> Admin</a></li>
        <li><a href="#"><img src="/public/broad.png" alt="Admin" class="nav-icon" /> Broadcast</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      activeDropdown: null, // Tracks which dropdown is active
    };
  },
  methods: {
    toggleDropdown(dropdown) {
      if (this.activeDropdown === dropdown) {
        this.activeDropdown = null; // Close dropdown if already open
      } else {
        this.activeDropdown = dropdown; // Open dropdown
      }
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.sidebar {
  width: 198px;
  background-color: #00ccff;
  color: white;
  font-size: 12px;
  box-sizing: border-box; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  align-items: center;
  position: fixed; 
  top: 0;
  left: 0;
  height: 100%; 
}

.logo-box {
  width: 100px;
  height: 100px;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 0px; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-logo {
  width: 70%;
  height: auto;
}

.nav-list {
  width: 162px; 
  height: auto; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 18px;
  padding: 0;
  margin-top: 8px; 
}

.nav-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  height: auto;
  padding: 12px 10px 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 8px;
  position: relative;
}

.nav-list a {
  text-decoration: none;
  color: #ffff;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  font-family: 'Fira Sans', sans-serif;
  align-items: center; 
  gap: 8px;
}

.nav-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  transition: filter 0.3s ease; 
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
}

.dropdown-icon {
  font-size: 10px;
  transition: transform 0.3s ease;
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

.dropdown {
  list-style: none;
  padding-left: 20px;
  margin-top: 8px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effect for list items */
.nav-list li:hover {
  background-color: #ffff;
}

/* Change icon and text color to black on hover */
.nav-list li:hover a {
  color: black; /* Text color turns black */
}

.nav-list li:hover .nav-icon .dropdown-icon{
  filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%); /* Icon turns black */
}
</style>











