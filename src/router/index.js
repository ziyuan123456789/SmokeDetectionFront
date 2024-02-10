import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'
import { ElMessage } from 'element-plus';
const routes = [
  {
    path: '/:catchAll(.*)',
    name: '404',
    hidden: true,
    meta: {
      name: '404页面'
    },
    component: () => import('../views/404/404.vue')
  },
  {
    path: "/",
    name: "LoginPage",
    component: () => import('../views/Pages/LoginPage.vue')
  },

  {
    path: '/main',
    name: '主页面',
    redirect: 'index',
    meta: {
      name: '监控画面',
      icon: 'Suitcase'
    },
    component: Layout,
    children: [
      {
        path: '/main',
        name: 'main4534',
        meta: {
          name: '详情',
        },
        component: () => import('../views/main.vue')
      },
    ],
  },
  {
    path: '/test1001',
    name: 'system2001',
    redirect: 'index',
    meta: {
      name: '截图推送',
      icon: 'Suitcase'
    },
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Notice811',
        meta: {
          name: '查看全部截图'
        },
        component: () => import('../views/main.vue')
      },
      {
        path: '/1',
        name: 'Notice811',
        meta: {
          name: '重要事件'
        },
        component: () => import('../views/main.vue')
      },
      {
        path: '/2',
        name: 'Notice811',
        meta: {
          name: '收藏夹'
        },
        component: () => import('../views/main.vue')
      },
    ],
  },
  {
    path: '/test10011',
    name: 'system20011',
    redirect: 'index',
    meta: {
      name: '统计信息',
    
      icon: 'MessageBox'
    },
    component: Layout,
    children: [
      {
        path: '/car1data',
        name: 'Notice8121111',
        meta: {
          name: '统计信息(一号机位)'
        },
        component: () => import('../views/Pages/data.vue')
      },

      {
        path: '/car1data2',
        name: 'Notice8',
        meta: {
          name: '统计信息(二号机位)'
        },
        component: () => import('../views/Pages/data2.vue')
      },
      {
        path: '/car1data3',
        name: 'Notice811211',
        meta: {
          name: '统计信息(三号机位)'
        },
        component: () => import('../views/Pages/data3.vue')
      },
      {
        path: '/car1data4',
        name: 'Notice81112121',
        meta: {
          name: '统计信息(四号机位)'
        },
        component: () => import('../views/Pages/data4.vue')
      },
        {
          path: '/portmain',
          name: 'Firste',
          meta: {
            name: '主界面'
          },
          component: () => import('../views/Pages/Port/Main.vue')
        },
    ],
  },
  {
    path: '/tes',
    name: 'system200112',
    redirect: 'index',
    meta: {
      name: '辖区管理',
      icon: 'Setting'
    },
    component: Layout,
    children: [
      {
        path: '/212',
        name: 'Notice81112',
        meta: {
          name: '申请变更'
        },
        component: () => import('../views/Pages/data.vue')
      },

    ],
  },
  {
    path: '/test100121',
    name: 'system200112',
    redirect: 'index',
    meta: {
      name: '相关设置',
      icon: 'Setting'
    },
    component: Layout,
    children: [
      {
        path: '/212',
        name: 'Notice81112',
        meta: {
          name: '设置'
        },
        component: () => import('../views/Pages/data.vue')
      },

    ],
    
  },
  {
    path: '/test10012',
    name: 'system20012',
    redirect: 'index',
    hidden: true,
    meta: {
      name: '数据',
      icon: 'Suitcase'
    },
    component: Layout,
    children: [
      {
        path: '/FirstPage',
        name: 'FirstPage',
        hidden: true,
        meta: {
          name: '第一详情页页面'
        },
        component: () => import('../views/Pages/Page1.vue')
      },
    ],
  },

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const notNeedLogin = ["/","/Res"] 
router.beforeEach((to,from,next)=>{
    if (notNeedLogin.indexOf(to.path) == -1){
        if(localStorage.getItem("token") == null){
          ElMessage({
            message: '请先登录',
            type: 'warning',
          })
            next("/")
        }
    }
    next()
})
router.afterEach((to) => {
  document.title = to.meta.title
})
export default router