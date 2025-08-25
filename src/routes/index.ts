import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home";
import Default from "../components/layouts/Default";
import Tasks from "../components/pages/Tasks/Tasks.vue";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: Default,
      children: [
        {
          path: "",
          component: Home,
        },
        {
          path: "/tasks",
          component: Tasks,
        },
      ],
    },
  ],
  history: createWebHistory(),
});

export default router;
