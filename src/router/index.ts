import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress';

const routes:Array<RouteRecordRaw> = [
  { 
    path: '/', 
    component: () => import('../views/Home/index.vue'),
    meta:{},
    children:[]
 },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async(_to,_from,next) => {
  NProgress.start();
  next();
})

router.afterEach((_to) => {
  NProgress.done();
})
export default router