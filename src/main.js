import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { reactive } from "vue";
import Home from "./views/Home.vue";
import Signin from "./views/Signin.vue";
import Clients from "./views/allClient.vue";
import "../assets/styles.css";
import Main from "./views/main.vue";
import EmailVerification from "./views/VerifyEmail.vue";
import PasswordReset from "./views/PasswordReset.vue";
import SetPassword from "./views/NewPassword.vue";
import UserInfo from "./views/User.vue";
import RepaymentPage from "./views/RepaymentPage.vue";
import LoanInquiry from "./views/LoanInquiry.vue";
import CollectionPage from "./views/CollectionCase.vue";
import Reconcilliation from "./views/reconcilliation.vue";
import FailedOrderPage from "./views/FailedOrder.vue";
import LoanStatus from "./views/Status.vue";
import LoanMangement from "./views/LoanManagement.vue";
import Admin from "./views/Admin.vue";
import Loading from "./components/loader.vue";
import BroadCast from "./views/BroadCast.vue";
import { isLoggedIn } from "../auth"; // Import isLoggedIn

// Function to check if the current user is a support-agent
const isSupportAgent = () => {
  try {
    const userProfileStr = localStorage.getItem("UserProfile");
    if (userProfileStr) {
      const userProfile = JSON.parse(userProfileStr);
      return userProfile.role === "support-agent";
    }
    return false;
  } catch (error) {
    console.error("Error checking user role:", error);
    return false;
  }
};

const routes = [
  {
    path: "/",
    redirect: "/auth/signin", // Redirect to Signin page on first load
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        if (isSupportAgent()) {
          next("/collection-case"); // Redirect support-agents to collection-case
        } else {
          next("/dashboard"); // Redirect other roles to dashboard if logged in
        }
      } else {
        next(); // Proceed to sign-in page if not logged in
      }
    },
  },
  {
    path: "/user/:id",
    name: "UserPage",
    component: () => import("./views/AdminDetailPage.vue"),
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/broadcast",
    name: "Broadcast",
    component: BroadCast,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/dashboard",
    name: "Main",
    component: Main,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/all-client",
    name: "Clients",
    component: Clients,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/repay",
    name: "RepaymentPage",
    component: RepaymentPage,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/loan-status",
    name: "LoanStatus",
    component: LoanStatus,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/collection-case",
    name: "CollectionPage",
    component: CollectionPage,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else {
        next(); // Allow any logged-in user to access this page
      }
    },
  },
  {
    path: "/failed-order",
    name: "FailedOrderPage",
    component: FailedOrderPage,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/loan-management",
    name: "LoanMangement",
    component: LoanMangement,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/reconcilliation",
    name: "Reconcilliation",
    component: Reconcilliation,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/loan-inquiry",
    name: "LoanInquiry",
    component: LoanInquiry,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/all-client/user/:id",
    name: "UserInfo",
    component: UserInfo,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next("/"); // redirect to sign in page if not logged in
      } else if (isSupportAgent()) {
        next("/collection-case"); // Redirect support-agents to collection-case
      } else {
        next();
      }
    },
  },
  {
    path: "/auth/signin",
    name: "Signin",
    component: Signin,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        if (isSupportAgent()) {
          next("/collection-case"); // Redirect support-agents to collection-case
        } else {
          next("/dashboard"); // Redirect other roles to dashboard if logged in
        }
      } else {
        next(); // Proceed to sign-in page if not logged in
      }
    },
  },
  {
    path: "/auth/verify-email",
    name: "EmailVerification",
    component: EmailVerification,
  },
  {
    path: "/auth/password-reset",
    name: "PasswordReset",
    component: PasswordReset,
  },
  {
    path: "/auth/set-password",
    name: "SetPassword",
    component: SetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a global navigation guard to ensure support-agent can only access collection-case
router.beforeEach((to, from, next) => {
  if (
    isLoggedIn() &&
    isSupportAgent() &&
    to.path !== "/collection-case" &&
    !to.path.startsWith("/auth/")
  ) {
    console.log("Global guard: Redirecting support-agent to collection-case");
    next("/collection-case");
  } else {
    next();
  }
});

// Create a global reactive loading state
const globalState = reactive({
  isLoading: false,
});

// Add navigation guards to control the loading state
router.beforeEach((to, from, next) => {
  globalState.isLoading = true; // Show loading state
  next();
});

router.afterEach(() => {
  globalState.isLoading = false; // Hide loading state
});

const app = createApp(App);

// Provide the global state to the app
app.provide("globalState", globalState);

// Add the Loading component globally
app.component("Loading", Loading);

app.use(router);

app.mount("#app");
