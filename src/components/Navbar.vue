<template>
  <div class="sidebar">
    <img src="/logo1.png" alt="Logo" class="sidebar-logo" />

    <div class="nav-list">
      <ul>
        <!-- All applications - visible to super-admin, admin, financial-admin -->
        <li v-if="hasAccess('all-applications')" :class="{ 'active': isActivePage('/dashboard') }">
          <a href="/dashboard"><img src="/public/all.svg" alt="All applications" class="nav-icon" /> All applications</a>
        </li>
        
        <!-- All client - visible to super-admin, admin, support-admin, financial-admin, collection-admin -->
        <li v-if="hasAccess('all-client')" :class="{ 'active': isActivePage('/all-client') }">
          <a href="/all-client"><img src="/public/pp.png" alt="All client" class="nav-icon" /> All client</a>
        </li>
        
        <!-- Financial dropdown - show if user has access to any financial items -->
        <li v-if="hasFinancialAccess()" :class="{ 'active': isActiveSection('financial') }">
          <div class="dropdown-header" @click="toggleDropdown('financial')">
            <a href="#"><img src="/public/money-recive.png" alt="Financial" class="nav-icon" /> Financial</a>
            <span class="dropdown-icon" :class="{ 'rotate': activeDropdown === 'financial' }">
              <img src="/public/arrow-down.png" alt="" class="arrow-icon">
            </span>
          </div>
          <ul class="dropdown" v-if="activeDropdown === 'financial'">
            <!-- Repayment Inquiries -->
            <li v-if="hasAccess('repayment-inquiries')" :class="{ 'active': isActivePage('/repay') }">
              <a href="/repay" @click.stop>Repayment Inquiries</a>
            </li>
            
            <!-- Loan Inquiry -->
            <li v-if="hasAccess('loan-inquiries')" :class="{ 'active': isActivePage('/loan-inquiry') }">
              <a href="/loan-inquiry" @click.stop>Loan Inquiry</a>
            </li>
            
            <!-- Reconciliation -->
            <li v-if="hasAccess('reconciliation')" :class="{ 'active': isActivePage('/reconcilliation') }">
              <a href="/reconcilliation" @click.stop>Reconcilliation</a>
            </li>
          </ul>
        </li>

        <!-- Collection case -->
        <li v-if="hasAccess('collection-case')" :class="{ 'active': isActivePage('/collection-case') }">
          <a href="/collection-case"><img src="/public/suit.png" alt="Collection case" class="nav-icon" /> Collection case</a>
        </li>
        
        <!-- Operation dropdown - show if user has access to any operation items -->
        <li v-if="hasOperationAccess()" :class="{ 'active': isActiveSection('operation') }">
          <div class="dropdown-header" @click="toggleDropdown('operation')">
            <a href="#"><img src="/public/operat.png" alt="Operation" class="nav-icon" /> Operation</a>
            <span class="dropdown-icon" :class="{ 'rotate': activeDropdown === 'operation' }">
              <img src="/public/arrow-down.png" alt="" class="arrow-icon">
            </span>
          </div>
          <ul class="dropdown" v-if="activeDropdown === 'operation'">
            <!-- Failed Order -->
            <li v-if="hasAccess('failed-order')" :class="{ 'active': isActivePage('/failed-order') }">
              <a href="/failed-order" @click.stop>Failed Order</a>
            </li>
          </ul>
        </li>

        <!-- Admin - visible to super-admin and admin only -->
        <li v-if="hasAccess('admin')" :class="{ 'active': isActivePage('/admin') }">
          <a href="/admin"><img src="/public/admin.png" alt="Admin" class="nav-icon" /> Admin</a>
        </li>
        
        <!-- Broadcast - visible to super-admin, admin, and support-admin -->
        <li v-if="hasAccess('broadcast')" :class="{ 'active': isActivePage('/broadcast') }">
          <a href="/broadcast"><img src="/public/broad.png" alt="Broadcast" class="nav-icon" /> Broadcast</a>
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
          
          // Enforce access restrictions based on role
          this.enforceAccessRestrictions();
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    },
    
    enforceAccessRestrictions() {
      const currentPath = this.$route.path;
      
      // Define allowed pages for each role exactly as specified
      const allowedPages = {
        'super-admin': ['/dashboard', '/all-client', '/repay', '/loan-inquiry', '/reconcilliation', 
                        '/collection-case', '/failed-order', '/admin', '/broadcast'],
                        
        'admin': ['/dashboard', '/all-client', '/repay', '/loan-inquiry', '/reconcilliation', 
                 '/collection-case', '/failed-order', '/admin', '/broadcast'],
                 
        'support-admin': ['/all-client', '/repay', '/loan-inquiry', '/failed-order', '/broadcast'],
        
        'financial-admin': ['/dashboard', '/all-client', '/repay', '/loan-inquiry', 
                           '/reconcilliation', '/collection-case'],
                           
        'collection-admin': ['/all-client', '/repay', '/loan-inquiry', '/collection-case', '/failed-order'],
        
        'support-agent': ['/collection-case'],
        
        'recovery-agent': ['/repay', '/loan-inquiry', '/reconcilliation', '/collection-case']
      };
      
      // If user tries to access a page they don't have permission for, redirect to a default page
      const userAllowedPages = allowedPages[this.userRole] || ['/collection-case'];
      
      if (!userAllowedPages.includes(currentPath)) {
        // Redirect to the first allowed page for this role
        this.$router.push(userAllowedPages[0] || '/collection-case');
      }
    },
    
    hasFinancialAccess() {
      // Check if user has access to any financial menu items
      return this.hasAccess('repayment-inquiries') || 
             this.hasAccess('loan-inquiries') || 
             this.hasAccess('reconciliation');
    },
    
    hasOperationAccess() {
      // Check if user has access to any operation menu items
      return this.hasAccess('failed-order');
    },
    
    hasAccess(menuItem) {
      // Define exact permissions for each menu item according to requirements
      const rolePermissions = {
        'super-admin': [
          'all-applications', 'all-client', 'repayment-inquiries', 'loan-inquiries', 
          'reconciliation', 'collection-case', 'failed-order', 'admin', 'broadcast'
        ],
        'admin': [
          'all-applications', 'all-client', 'repayment-inquiries', 'loan-inquiries', 
          'reconciliation', 'collection-case', 'failed-order', 'admin', 'broadcast'
        ],
        'support-admin': [
          'all-client', 'repayment-inquiries', 'loan-inquiries', 'failed-order', 'broadcast'
        ],
        'financial-admin': [
          'all-applications', 'all-client', 'repayment-inquiries', 'loan-inquiries', 
          'reconciliation', 'collection-case'
        ],
        'collection-admin': [
          'all-client', 'repayment-inquiries', 'loan-inquiries', 'collection-case', 'failed-order'
        ],
        'support-agent': [
          'collection-case'
        ],
        'recovery-agent': [
          'repayment-inquiries', 'loan-inquiries', 'reconciliation', 'collection-case'
        ]
      };
      
      // Return true if the user's role has access to the requested menu item
      return rolePermissions[this.userRole]?.includes(menuItem) || false;
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