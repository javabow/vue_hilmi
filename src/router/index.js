import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Form from '../components/Form.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

import Inventory from '../views/Inventory.vue';
import Service from '../views/Service.vue';

import DashboardMain from '../layout/DashboardMain.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/form",
    name: "Form",
    component: Form,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  // {
  //   path: "/inventory",
  //   name: "Inventory",
  //   component: Inventory,
  // },
  {
    path: "/member",
    redirect: "/inventory",
    component: DashboardMain,
    children: [
      {
        path: "inventory",
        name: "inventory",
        components: { default: Inventory },
      },
      {
        path: "service",
        name: "service",
        components: { default: Service },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;