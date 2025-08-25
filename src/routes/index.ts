import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home";
import Default from "../components/layouts/Default";

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
      ],
    },
  ],
  history: createWebHistory(),
});

export default router;
