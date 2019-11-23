import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Lab from '../views/Lab.vue';
import Lost from '../views/Lost.vue';
import { hasToken } from '../authentication/authTokenTools';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lab',
    name: 'lab',
    component: Lab,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/lab',
    name: 'signin',
    component: Home
    //component: () =>
    //  import(/* webpackChunkName: "about" */ '../views/Signin.vue')
  },
  {
    path: '*',
    name: 'lost',
    component: Lost
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !hasToken()) {
    next({
      name: 'signin',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

export default router;
