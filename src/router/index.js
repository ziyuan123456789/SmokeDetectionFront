import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    cnName: '404',
    hidden: true,
    meta: {
      name: '404页面'
    },
    component: () => import('../views/404/404.vue')
  },
  {
    path: '/Reg',
    name: 'Reg',
    cnName: '用户注册',
    hidden: true,
    meta: {
      name: '用户注册'
    },
    component: () => import('../views/Pages/RegPage.vue')
  },
  {
    path: '/',
    name: 'MainPage',
    cnName: '实时监看',
    component: Layout,
    children: [
      {
        path: '',
        name: 'MainPage',
        meta: {
          name: '详情'
        },
        props: true,
        component: () => import('../views/main.vue')
      }
    ]
  },
  {
    path: '/Territory',
    name: 'Territory',
    cnName: '辖区管理',
    component: Layout,
    needRole:"1",
    children: [
      {
        path: 'TerritoryContro',
        name: 'TerritoryContro',
        cnName:'辖区管理',
        meta: {
          name: '辖区管理'
        },
        component: () => import('../views/Pages/Territory/TerritoryContro.vue')
      },
      {
        path: 'HardwareContro',
        name: 'HardwareContro',
        cnName:'硬件管理',
        meta: {
          name: '硬件管理'
        },
        component: () => import('../views/Pages/Territory/HardwareContro.vue')
      },
      {
        path: 'ActionContro',
        name: 'ActionContro',
        cnName:'行为管理',
        meta: {
          name: '行为管理'
        },
        component: () => import('../views/Pages/Territory/ActionContro.vue')
      },

    ]
  },
  {
    path: '/Statistics',
    name: 'Statistics',
    cnName: '统计信息',
    component: Layout,
    needRole:'1',
    children: [
      {
        path: '',
        name: 'Statistics',
        cnName: '统计信息',
        meta: {
          name: '统计信息'
        },
        component: () => import('../views/main.vue')
      }
    ]
  },
  {
    path: '/AlarmManagement',
    name: 'AlarmManagement',
    cnName: '警报管理',
    component: Layout,
    needRole:'1',
    children: [
      {
        path: 'ActionConfiguration',
        name: 'ActionConfiguration',
        cnName: '预警后行为配置',
        meta: {
          name: '预警后行为配置'
        },
        component: () => import('../views/main.vue')
      },
      {
        path: 'ThresholdManagement',
        name: 'ThresholdManagement',
        cnName: '配置预警阈值',
        meta: {
          name: '预警后行为配置'
        },
        component: () => import('../views/main.vue')
      },
    ]
  },
  {
    path: '/ScreenshotManagement',
    name: 'ScreenshotManagement',
    cnName: '截图管理',
    component: Layout,
    children: [
      {
        path: 'PushScreenshots',
        name: 'PushScreenshots',
        cnName:'截图推送',
        meta: {
          name: '推送截图'
        },
        component: () => import('../views/main.vue')
      },
      {
        path: 'FilterScreenshots',
        name: 'FilterScreenshots',
        cnName:'截图过滤',
        meta: {
          name: '截图过滤'
        },
        component: () => import('../views/main.vue')
      }
    ]
  },
  {
    path: '/doexperiment',
    name: 'doexperiment',
    cnName: '做实验',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'doexperiment',
        cnName: '做实验',
        meta: {
          name: '做实验'
        },
        component: () => import('../views/main.vue')
      }
    ]
  },
  {
    path: '/UserManagement',
    name: 'UserManagement',
    cnName: '用户管理',
    needRole: '1',
    component: Layout,
    children: [
      {
        path: 'TerritoryAllocation',
        name: 'TerritoryAllocation',
        cnName: '辖区分配',
        meta: {
          name: '辖区分配'
        },
        component: () => import('../views/main.vue')
      },
      {
        path: 'CourseMaintenance',
        name: 'CourseMaintenance',
        cnName: '用户筛查',
        meta: {
          name: '用户筛查'
        },
        component: () => import('../views/main.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    cnName: '登陆页面',
    hidden: true,
    component: () => import('../views/Pages/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const notNeedLogin = ['LoginPage']

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('loginData')
  if (to.name === 'NotFound') {
    next()
    return
  }
  if (!notNeedLogin.includes(to.name) && !isLoggedIn) {
    ElMessage({
      message: '请先登录',
      type: 'warning'
    })
    next({ name: 'LoginPage' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = to.meta.name
})

export default router
