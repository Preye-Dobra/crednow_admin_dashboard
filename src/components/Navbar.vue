<template>
  <div class="sidebar">
    <img src="/logo1.png" alt="Logo" class="sidebar-logo" />

    <div class="nav-list">
      <ul>
        <!-- All applications -->
        <li
          v-if="hasAccess('all-applications')"
          :class="{ active: isActivePage('/dashboard') }"
        >
          <a href="/dashboard">
            <img src="/public/all.svg" alt="All applications" class="nav-icon" />
            All applications
          </a>
        </li>

        <!-- All client -->
        <li
          v-if="hasAccess('all-client')"
          :class="{ active: isActivePage('/all-client') }"
        >
          <a href="/all-client">
            <img src="/public/pp.png" alt="All client" class="nav-icon" />
            All client
          </a>
        </li>

        <!-- Financial dropdown -->
        <li
          v-if="hasFinancialAccess()"
          :class="{ active: isActiveSection('financial') }"
        >
          <div
            class="dropdown-header"
            @click="toggleDropdown('financial')"
          >
            <a href="javascript:void(0)">
              <img src="/public/money-recive.png" alt="Financial" class="nav-icon" />
              Financial
            </a>
            <span
              class="dropdown-icon"
              :class="{ rotate: activeDropdown === 'financial' }"
            >
              <img src="/public/arrow-down.png" alt="Arrow" class="arrow-icon" />
            </span>
          </div>
          <ul
            class="dropdown"
            v-if="activeDropdown === 'financial'"
          >
            <li
              v-if="hasAccess('repayment-inquiries')"
              :class="{ active: isActivePage('/repay') }"
            >
              <a href="/repay">Repayment Inquiries</a>
            </li>
            <li
              v-if="hasAccess('loan-inquiries')"
              :class="{ active: isActivePage('/loan-inquiry') }"
            >
              <a href="/loan-inquiry">Loan Inquiry</a>
            </li>
            <li
              v-if="hasAccess('reconciliation')"
              :class="{ active: isActivePage('/reconciliation') }"
            >
              <a href="/reconciliation">Reconciliation</a>
            </li>
          </ul>
        </li>

        <!-- Collection case -->
        <li
          v-if="hasAccess('collection-case')"
          :class="{ active: isActivePage('/collection-case') }"
        >
          <a href="/collection-case">
            <img src="/public/suit.png" alt="Collection case" class="nav-icon" />
            Collection case
          </a>
        </li>

        <!-- Operation dropdown -->
        <li
          v-if="hasOperationAccess()"
          :class="{ active: isActiveSection('operation') }"
        >
          <div
            class="dropdown-header"
            @click="toggleDropdown('operation')"
          >
            <a href="javascript:void(0)">
              <img src="/public/operat.png" alt="Operation" class="nav-icon" />
              Operation
            </a>
            <span
              class="dropdown-icon"
              :class="{ rotate: activeDropdown === 'operation' }"
            >
              <img src="/public/arrow-down.png" alt="Arrow" class="arrow-icon" />
            </span>
          </div>
          <ul
            class="dropdown"
            v-if="activeDropdown === 'operation'"
          >
            <li
              v-if="hasAccess('failed-order')"
              :class="{ active: isActivePage('/failed-order') }"
            >
              <a href="/failed-order">Failed Order</a>
            </li>
          </ul>
        </li>

        <!-- Admin -->
        <li
          v-if="hasAccess('admin')"
          :class="{ active: isActivePage('/admin') }"
        >
          <a href="/admin">
            <img src="/public/admin.png" alt="Admin" class="nav-icon" />
            Admin
          </a>
        </li>

        <!-- Broadcast -->
        <li
          v-if="hasAccess('broadcast')"
          :class="{ active: isActivePage('/broadcast') }"
        >
          <a href="/broadcast">
            <img src="/public/broad.png" alt="Broadcast" class="nav-icon" />
            Broadcast
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      activeDropdown: null,
      userRole: null,
      rolePermissions: {
        "super-admin": [
          "all-applications",
          "all-client",
          "repayment-inquiries",
          "loan-inquiries",
          "reconciliation",
          "collection-case",
          "failed-order",
          "admin",
          "broadcast"
        ],
        admin: [
          "all-applications",
          "all-client",
          "repayment-inquiries",
          "loan-inquiries",
          "reconciliation",
          "collection-case",
          "failed-order",
          "admin",
          "broadcast"
        ],
        "support-admin": [
          "all-client",
          "repayment-inquiries",
          "loan-inquiries",
          "failed-order",
          "broadcast"
        ],
        "financial-admin": [
          "all-applications",
          "all-client",
          "repayment-inquiries",
          "loan-inquiries",
          "reconciliation",
          "collection-case"
        ],
        "collection-admin": [
          "all-client",
          "repayment-inquiries",
          "loan-inquiries",
          "collection-case",
          "failed-order"
        ],
        "support-agent": ["collection-case"],
        "recovery-agent": [
          "repayment-inquiries",
          "loan-inquiries",
          "reconciliation",
          "collection-case"
        ]
      },
      // Map menu items to route paths for consistency
      routePaths: {
        "all-applications": "/dashboard",
        "all-client": "/all-client",
        "repayment-inquiries": "/repay",
        "loan-inquiries": "/loan-inquiry",
        "reconciliation": "/reconciliation",
        "collection-case": "/collection-case",
        "failed-order": "/failed-order",
        "admin": "/admin",
        "broadcast": "/broadcast"
      }
    };
  },
  created() {
    this.getUserRole();
    this.checkInitialAccess();
  },
  methods: {
    getUserRole() {
      try {
        const userProfileStr = localStorage.getItem("UserProfile");
        if (userProfileStr) {
          const userProfile = JSON.parse(userProfileStr);
          this.userRole = userProfile.role || null;
          console.log("UserProfile from localStorage:", userProfile);
          console.log("Current user role:", this.userRole);
        } else {
          this.userRole = null;
          console.warn("No UserProfile found in localStorage");
        }
      } catch (error) {
        this.userRole = null;
        console.error("Error parsing UserProfile:", error);
      }
    },
    
    checkInitialAccess() {
      // Skip if no user role found
      if (!this.userRole) {
        console.log("No role found, redirecting to /collection-case");
        this.$router.push("/collection-case");
        return;
      }

      // Super admin and admin can access all pages
      if (this.userRole === "super-admin" || this.userRole === "admin") {
        console.log(`${this.userRole} detected, all pages accessible`);
        return;
      }
      
      // Skip redirection for financial-admin
      if (this.userRole === "financial-admin") {
        console.log("Financial admin detected, skipping redirection");
        return;
      }

      // Handle root path redirect for other roles
      if (this.$route.path === "/" && this.userRole !== "financial-admin") {
        const defaultRedirect = this.getDefaultPageForRole();
        console.log(`Root path detected for non-financial admin, redirecting to ${defaultRedirect}`);
        this.$router.push(defaultRedirect);
        return;
      }

      // Check if current path is allowed (only for non-financial-admin roles)
      if (this.userRole !== "financial-admin") {
        const currentPath = this.$route.path;
        const allowedPaths = this.getAllowedPaths();
        
        if (!allowedPaths.includes(currentPath)) {
          const defaultRedirect = this.getDefaultPageForRole();
          console.log(
            `Unauthorized access by ${this.userRole} to ${currentPath}, redirecting to ${defaultRedirect}`
          );
          this.$router.push(defaultRedirect);
        } else {
          console.log(`${this.userRole} accessing allowed page: ${currentPath}`);
        }
      }
    },
    
    getAllowedPaths() {
      // For super-admin and admin, all paths are allowed
      if (this.userRole === "super-admin" || this.userRole === "admin") {
        return Object.values(this.routePaths);
      }
      
      // For other roles, get allowed paths from role permissions
      const permissions = this.rolePermissions[this.userRole] || [];
      return permissions.map(item => this.routePaths[item] || `/unknown-${item}`);
    },
    
    getDefaultPageForRole() {
      const allowedPaths = this.getAllowedPaths();
      
      // Special case for financial-admin to redirect to dashboard
      if (this.userRole === "financial-admin" && allowedPaths.includes("/dashboard")) {
        return "/dashboard";
      }
      
      // For others, use first allowed path or collection-case as fallback
      return allowedPaths[0] || "/collection-case";
    },
    
    hasFinancialAccess() {
      return (
        this.hasAccess("repayment-inquiries") ||
        this.hasAccess("loan-inquiries") ||
        this.hasAccess("reconciliation")
      );
    },
    
    hasOperationAccess() {
      return this.hasAccess("failed-order");
    },
    
    hasAccess(menuItem) {
      if (this.userRole === "super-admin" || this.userRole === "admin") {
        return true;
      }
      return this.rolePermissions[this.userRole]?.includes(menuItem) || false;
    },
    
    toggleDropdown(dropdown) {
      this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
    },
    
    isActivePage(path) {
      return this.$route.path === path;
    },
    
    isActiveSection(section) {
      const sectionPaths = {
        financial: ["/repay", "/loan-inquiry", "/reconciliation"],
        operation: ["/failed-order"]
      };
      return sectionPaths[section]?.includes(this.$route.path) || false;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.nav-list li.active > a {
  background-color: #fff;
  color: #004759;
  border-radius: 8px;
  width: 160px;
  padding: 25px 8px;
}

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
  color: #fff;
  font-size: 16px;
  font-weight: 350;
  display: flex;
  font-family: "Fira Sans", sans-serif;
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

.nav-list li:hover .nav-icon {
  filter: invert(22%) sepia(88%) saturate(592%) hue-rotate(157deg) brightness(94%) contrast(88%);
}
</style>