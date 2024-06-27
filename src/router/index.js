import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'
import { ElMessage } from 'element-plus'
// 路由配合侧边栏可以实现自动配置
// component:套用指定布局
// 父层级meta:needrole指定路由权限,结合路由护卫可以防止界面越权访问,但是f12改本地存储是可以绕过的,不过后台加了拦截器
// 如果你们想让侧边栏只有一层而不展开,那么也需要写一个child,如果写了两个及以上的child侧边栏会处理成展开显示
// cnName:阅览器标签页显示的名字
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
    component: () => import('../views/Pages/CommonPages/RegPage.vue')
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
    meta: {
      needRole: '1'
    },
    children: [
      {
        path: 'TerritoryContro',
        name: 'TerritoryContro',
        cnName: '辖区管理',
        meta: {
          name: '辖区管理'
        },
        component: () => import('../views/Pages/AdminPages/TerritoryContro.vue')
      },
      {
        path: 'HardwareContro',
        name: 'HardwareContro',
        cnName: '硬件管理',
        meta: {
          name: '硬件管理'
        },
        component: () => import('../views/Pages/AdminPages/HardwareContro.vue')
      },
      {
        path: 'ActionConfiguration',
        name: 'ActionConfiguration',
        cnName: '预警后行为配置',
        meta: {
          name: '预警后行为配置'
        },
        component: () => import('../views/Pages/AdminPages/ActionContro.vue')
      },
    ]
  },
  // {
  //   path: '/Statistics',
  //   name: 'Statistics',
  //   cnName: '统计信息',
  //   component: Layout,
  //   meta: {
  //     needRole: '1'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'Statistics',
  //       cnName: '统计信息',
  //       meta: {
  //         name: '统计信息'
  //       },
  //       component: () => import('../views/Pages/UserPages/DataAnalysisUser.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/AlarmManagement',
  //   name: 'AlarmManagement',
  //   cnName: '警报管理',
  //   component: Layout,
  //   meta: {
  //     needRole: '1'
  //   },
  //   children: [
  //
  //     {
  //       path: 'ThresholdManagement',
  //       name: 'ThresholdManagement',
  //       cnName: '配置预警阈值',
  //       meta: {
  //         name: '预警后行为配置'
  //       },
  //       component: () => import('../views/main.vue')
  //     }
  //   ]
  // },
  {
    path: '/ScreenshotManagement',
    name: 'ScreenshotManagement',
    cnName: '截图管理',
    meta: {
      needRole: '1'
    },
    component: Layout,
    children: [
      {
        path: 'PushScreenshots',
        name: 'PushScreenshots',
        cnName: '截图推送',
        meta: {
          name: '推送截图'
        },
        component: () => import('../views/Pages/AdminPages/AdminPushScreenshots.vue')
      },
      // {
      //   path: 'FilterScreenshots',
      //   name: 'FilterScreenshots',
      //   cnName: '截图过滤',
      //   meta: {
      //     name: '截图过滤'
      //   },
      //   component: () => import('../views/main.vue')
      // }
    ]
  },
  {
    path: '/UserManagement',
    name: 'UserManagement',
    cnName: '用户管理',
    meta: {
      needRole: '1'
    },
    component: Layout,
    children: [
      {
        path: 'AdminActionAllocation',
        name: 'AdminActionAllocation',
        cnName: '辖区分配',
        meta: {
          name: '辖区分配'
        },
        component: () => import('../views/Pages/AdminPages/AdminActionAllocation.vue')
      },
      {
        path: 'UserControl',
        name: 'UserControl',
        cnName: '用户筛查',
        meta: {
          name: '用户筛查'
        },
        component: () => import('../views/Pages/AdminPages/UserContro.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    cnName: '登陆页面',
    hidden: true,
    meta: {
      name: '用户登录'
    },
    component: () => import('../views/Pages/CommonPages/LoginPage.vue')
  },
  {
    path: '/UserScreenshot',
    name: 'UserScreenshot',
    cnName: '截图管理',
    meta: {
      needRole: '0'
    },
    component: Layout,
    children: [
      {
        path: 'allPic',
        name: 'allPic',
        cnName: '全部图片',
        meta: {
          name: '全部图片'
        },
        component: () => import('../views/Pages/UserPages/GetScreenShots.vue')
      },
      {
        path: 'adminPush',
        name: 'adminPush',
        cnName: '管理员推送',
        meta: {
          name: '管理员推送'
        },
        component: () => import('../views/Pages/UserPages/importPic.vue')
      },
      // {
      //   path: 'myFavourite',
      //   name: 'myFavourite',
      //   cnName: '我的收藏',
      //   meta: {
      //     name: '我的收藏'
      //   },
      //   component: () => import('../views/Pages/UserPages/GetScreenShots.vue')
      // },
    ]
  },
  {
    path: '/MyTerritory',
    name: 'MyTerritory',
    cnName: '辖区配置',
    meta: {
      needRole: '0'
    },
    component: Layout,
    children: [
      {
        path: 'applyTerritory',
        name: 'applyTerritory',
        cnName: '申请辖区',
        meta: {
          name: '我的辖区'
        },
        component: () => import('../views/Pages/UserPages/ApplyTerritory.vue')
      },
      {
        path: 'applyTerritoryState',
        name: 'applyTerritoryState',
        cnName: '申请状态',
        meta: {
          name: '申请状态'
        },
        component: () =>
          import('../views/Pages/UserPages/applyTerritoryState.vue')
      },
      {
        path: 'mineTerritory',
        name: 'mineTerritory',
        cnName: '我的辖区',
        meta: {
          name: '我的辖区'
        },
        component: () => import('../views/Pages/UserPages/MyTerritory.vue')
      }
    ]
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    cnName: '个人中心',
    meta: {
      needRole: '0'
    },
    component: Layout,
    children: [
      {
        path: '',
        name: 'UserInfo',
        cnName: '个人中心',
        meta: {
          name: '个人中心'
        },
        component: () => import('../views/Pages/UserInfo/UserInfo.vue')
      }
    ]
  },


  {
    path: '/DataAnalysis',
    name: 'DataAnalysis',
    cnName: '数据统计',
    component: Layout,
    children: [
      {
        path: '',
        name: 'DataAnalysis',
        cnName: '数据统计',
        meta: {
          name: '数据统计'
        },
        component: () => import('../views/Pages/UserPages/DataAnalysisUser.vue')
      }
    ]
  },



  {
    path: '/territoryDetailPage',
    name: 'territoryDetailPage',
    cnName: '辖区监控详情',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'territoryDetailPage',
        cnName: '辖区监控详情',
        meta: {
          name: '辖区监控详情'
        },
        component: () => import('../views/Pages/CommonPages/TerritoryDetailPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const notNeedLogin = ['LoginPage','Reg']

router.beforeEach((to, from, next) => {
  const loginData = localStorage.getItem('loginData')
  const isLoggedIn = !!loginData
  const userData = loginData ? JSON.parse(loginData) : {}
  const userRole = userData.role

  if (to.name === 'NotFound') {
    next()
    return
  }
  if (notNeedLogin.includes(to.name)) {
    next()
    return
  }
  if (!isLoggedIn) {
    ElMessage({
      message: '请先登录',
      type: 'warning'
    })
    next({ name: 'LoginPage' })
    return
  }
  if (to.matched.some((record) => record.meta.needRole)) {
    console.log('==')
    const routeRole = to.matched.find((record) => record.meta.needRole).meta
      .needRole
    if (userRole === routeRole) {
      next()
    } else {
      ElMessage({
        message: '没有权限访问',
        type: 'error'
      })
      next(false)
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = to.meta.name
})

export default router
