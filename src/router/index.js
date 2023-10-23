import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/registro",
      name: "registro",
      component: () => import("../views/RegistroView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/metas",
      name: "metas",
      component: () => import("../views/MetasView.vue"),
    },
    {
      path: "/tarefas",
      name: "tarefas",
      component: () => import("../views/TarefasView.vue"),
    },
  ],
});

export default router;
