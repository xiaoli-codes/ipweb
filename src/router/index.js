import { createRouter, createWebHashHistory } from "vue-router";
import { Session } from "@/utils/common.js";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("views/main/index.vue"), // 懒加载
    },
    {
      path: "/login",
      name: "login",
      component: () => import("views/login/index.vue"), // 懒加载
      meta: { needAuth: false },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("views/register/index.vue"), // 懒加载
      meta: { needAuth: false },
    },
    {
      path: "/dynamic-residence",
      name: "dynamic-residence",
      component: () => import("views/dynamic-residence/index.vue"), // 懒加载
    },
    {
      path: "/static-residence",
      name: "static-residence",
      component: () => import("views/static-residence/index.vue"), // 懒加载
    },
    {
      path: "/unlimited-agency",
      name: "unlimited-agency",
      component: () => import("views/unlimited-agency/index.vue"), // 懒加载
    },
    {
      path: "/test",
      name: "test",
      component: () => import("views/test.vue"),
    },
  ],
});

function checkLogin(route) {
  if (route.meta == null || route.meta.needAuth == null) {
    return true;
  }
  return route.meta.needAuth;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => checkLogin(record))) {
    if (Session.isExpired()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
      return;
    }
  }
  next();
});

export default router;
