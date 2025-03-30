<template>
  <div class="sidebar">
    <img src="/logo1.png" alt="Logo" class="sidebar-logo" />

    <div class="nav-list">
      <ul>
        <!-- Only show for non-super-agent roles -->
        <li v-if="userRole !== 'support-agent' && userRole !== 'super-agent'" :class="{ 'active': isActivePage('/dashboard') }">
          <a href="/dashboard"><img src="/public/all.svg" alt="All applications" class="nav-icon" /> All applications</a>
        </li>
        
        <li v-if="userRole !== 'support-agent' && userRole !== 'super-agent'" :class="{ 'active': isActivePage('/all-client') }">
          <a href="/all-client"><img src="/public/pp.png" alt="All client" class="nav-icon" /> All client</a>
        </li>
        
        <li v-if="userRole !== 'support-agent' && userRole !== 'super-agent'" :class="{ 'active': isActiveSection('financial') }">
          <div class="dropdown-header" @click="toggleDropdown('financial')">
            <a href="#"><img src="/public/money-recive.png" alt="Financial" class="nav-icon" /> Financial</a>
            <span class="dropdown-icon" :class="{ 'rotate': activeDropdown === 'financial' }">
              <img src="/public/arrow-down.png" alt="" class="arrow-icon">
            </span>
          </div>
          <ul class="dropdown" v-if="activeDropdown === 'financial'">
            <li :class="{ 'active': isActivePage('/repay') }">
              <a href="/repay" @click.stop>Repayment Inquiries</a>
            </li>
            <li :class="{ 'active': isActivePage('/loan-inquiry') }">
              <a href="/loan-inquiry" @click.stop>Loan Inquiry</a>
            </li>
            <li :class="{ 'active': isActivePage('/reconcilliation') }">
              <a href="/reconcilliation" @click.stop>Reconcilliation</a>
            </li>
          </ul>
        </li>

        <!-- Collection case is always visible to all users -->
        <li :class="{ 'active': isActivePage('/collection-case') }">
          <a href="/collection-case"><img src="/public/suit.png" alt="Collection case" class="nav-icon" /> Collection case</a>
        </li>
        
        <li v-if="userRole !== 'support-agent' && userRole !== 'super-agent'" :class="{ 'active': isActiveSection('operation') }">
          <div class="dropdown-header" @click="toggleDropdown('operation')">
            <a href="#"><img src="/public/operat.png" alt="Operation" class="nav-icon" /> Operation</a>
            <span class="dropdown-icon" :class="{ 'rotate': activeDropdown === 'operation' }">
              <img src="/public/arrow-down.png" alt="" class="arrow-icon">
            </span>
          </div>
          <ul class="dropdown" v-if="activeDropdown === 'operation'">
            <li :class="{ 'active': isActivePage('/failed-order') }">
              <a href="/failed-order" @click.stop>Failed Order</a>
            </li>
          </ul>
        </li>

        <li v-if="userRole !== 'support-agent' && userRole !== 'super-agent'" :class="{ 'active': isActivePage('/admin') }">
          <a href="/admin"><img src="/public/admin.png" alt="Admin" class="nav-icon" /> Admin</a>
        </li>
        
        <li v-if="userRole !== 'support-agent' && userRole !== 'super-agent'" :class="{ 'active': isActivePage('/broadcast') }">
          <a href="/broadcast"><img src="/public/broad.png" alt="Admin" class="nav-icon" /> Broadcast</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      activeDropdown: null,
      userRole: null
    };
  },
  created() {
    // Get user role from localStorage when component is created
    this.getUserRole();
  },
  methods: {
    getUserRole() {
      try {
        const userProfileStr = localStorage.getItem('UserProfile');
        if (userProfileStr) {
          const userProfile = JSON.parse(userProfileStr);
          this.userRole = userProfile.role;
          console.log('Current user role:', this.userRole);
          
          // If super-agent tries to access any page via URL, redirect to collection-case
          if (this.userRole === 'super-agent' && this.$route.path !== '/collection-case') {
            this.$router.push('/collection-case');
          }
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    },
    toggleDropdown(dropdown) {
      if (this.activeDropdown === dropdown) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = dropdown;
      }
    },
    isActivePage(path) {
      return this.$route.path === path;
    },
    isActiveSection(section) {
      const sectionPaths = {
        financial: ['/repay', '/loan-inquiry', '/reconcilliation'],
        operation: ['/failed-order', '/loan-management', '/loan-status'],
      };
      return sectionPaths[section]?.includes(this.$route.path) || false;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

/* Apply white background only to the selected <li> */
.nav-list li.active > a {
  background-color: #ffff;
  color: #004759;
  border-radius: 8px; /* Maintain rounded corners for the active link */
  width: 160px; /* Ensure it fills the <li> */
  padding: 25px 8px; /* Add padding to the <a> for better appearance */
}

/* Updated: Use CSS filter to change icon color to #004759 when active */
.nav-list li.active .nav-icon {
  filter: invert(22%) sepia(88%) saturate(592%) hue-rotate(157deg) brightness(94%) contrast(102%);
}

.sidebar {
  width: 198px;
  background-color: #00ccff;
  color: white;
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
  margin-top: -11px;
}

.sidebar-logo {
  width: 53px;
  height: 52px;
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
  width: 162px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  margin-bottom: 19px;
  position: relative;
  transition: background-color 0.3s ease;
  height: auto;
}

.nav-list a {
  text-decoration: none;
  color: #ffff;
  font-size: 16px;
  font-weight: 350;
  display: flex;
  font-family: 'Fira Sans', sans-serif;
  align-items: center;
  width: 139px;
  height: 22px;
  line-height: 22.4px;
  transition: color 0.3s ease;
}

.nav-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  transition: filter 0.3s ease;
  margin-right: 6px;
}

.arrow-icon {
  width: 20px;
  height: 20px;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
}

.dropdown-icon {
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
  border-radius: 8px;
  width: 100%;
}

.dropdown li {
  padding: 8px 0;
  margin-bottom: 10px;
  height: auto;
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

/* Updated: Change icon color on hover using the same filter */
.nav-list li:hover .nav-icon {
  filter: invert(22%) sepia(88%) saturate(592%) hue-rotate(157deg) brightness(94%) contrast(88%);
}
</style>