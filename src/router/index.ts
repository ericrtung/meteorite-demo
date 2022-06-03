import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'meteorite',
      component: () => import('../views/MeteoriteView.vue'),
      meta: { title: 'Meteorite Viewer' }
    },
  ]
});

router.afterEach((to, from) => {
  nextTick(() => {
      document.title = (to.meta?.title as string) || "Meteorite Demo Application";
  });
});

export default router
