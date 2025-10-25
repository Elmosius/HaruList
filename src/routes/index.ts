import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../components/layouts/Default'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../components/pages/Home'),
        meta: { title: 'Home' },
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('../components/pages/Tasks'),
        meta: { title: 'Tasks' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../components/pages/NotFound'),
    meta: { title: 'Not Found' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
