import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Auth from "../views/Auth.vue"
import signIn from "../components/SignIn.vue"
import signUp from "../components/signUp.vue"
import account from "../components/Account.vue"
import transferAccount from "../components/TransferComponent.vue"

const routes = [
  {
    path: '/auth',
    component: Auth,
    children: [
      { path: "login", component: signIn },
      { path: "sign-up", component: signUp}
    ],
  },
  {
    path: "/accounts", component: account,
  },
  {
    path: "/transfers", component: transferAccount,
  },
  {
    path: "/", component: Home,
    
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
