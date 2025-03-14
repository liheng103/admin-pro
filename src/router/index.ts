import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import login from './modules/login';
// const routes:Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     component: () => import('../views/home/index.vue'),
//     meta:{},
//     children:[]
//  },
// ]

export const aboutRouter = {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {},
    children: []
} as RouteRecordRaw;

// 组合路由信息
// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
    eager: true
});
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
    const module = modules[key].default;
    console.log('modules[key]', modules[key]);
    console.log('modules[key].default', modules[key].default);
    routes.push(module);
});
routes.push(aboutRouter);

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    next();
});

router.afterEach((_to) => {
    NProgress.done();
});
export default router;
