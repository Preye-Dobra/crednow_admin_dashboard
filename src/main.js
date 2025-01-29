import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router"; 
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
import CollectionPage from "./views/CollectionCase.vue"
import Reconcilliation from "./views/reconcilliation.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Main",
    component: Main,
  },
  {
    path: "/all-client",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/repay",
    name: "RepaymentPage",
    component: RepaymentPage,
  },
  {
    path: "/collection-case",
    name: "CollectionPage",
    component: CollectionPage,
  },
  {
    path: "/reconcilliation",
    name: "Reconcilliation",
    component: Reconcilliation,
  },
  {
    path: "/loan-inquiry",
    name: "LoanInquiry",
    component: LoanInquiry,
  },
  {
    path: "/user",
    name: "UserInfo",
    component: UserInfo,
  },
  {
    path: "/auth/signin",
    name: "Signin",
    component: Signin,
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

const app = createApp(App);

app.use(router);

app.mount("#app");
