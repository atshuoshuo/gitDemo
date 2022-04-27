import { createRouter, createWebHistory } from 'vue-router'

//引入布局组件
import Layout from '../views/Layout/index.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    hidden: true,
    meta: {
      name: '登录'
    },
    //按需加载
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    hidden: true,
    meta: {
      name: '404页面'
    },
    //按需加载
    component: () => import('../views/404/404.vue')
  },

  {
    path: '/console',
    name: 'Console',
    redirect: 'index',
   //从定向
    meta: {
      name: '控制台',
      icon: 'Stopwatch'
    },
    //控制台
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          name: '首页'
        },
        component: () => import('../views/Console/index.vue')
      }
    ]
  },

  //  科室管理

  {
    path: '/info', //药品
    name: 'Info',
    meta: {
      name: '科室管理',
      icon: 'SetUp'
    },
    component: Layout,
    children: [
      {
        path: '/infoIndex',
        name: 'InfoIndex',
        meta: {
          name: '查看科室'
        },
        component: () => import('../views/Info/index.vue')
      },
      {
        path: '/infozb',
        name: 'Infozb',
        meta: {
          name: '科室位置'
        },
        component: () => import('../views/Info/indexzb.vue')
      }
    ]
  },

  //医生管理

  {
    path: '/doctor',
    name: 'doctor', 
    meta: {
      name: '医生管理',
      icon: 'Link'
    },
    //控制台
    component: Layout,
    children: [
      {
        path: '/doctorIndex',
        name: 'DoctorIndex',
        meta: {
          name: '查看医生'
        },
        component: () => import('../views/Doctor/index.vue')
      }
    ]
  },
  //排班
  {
    path: '/workplan',
    name: 'Workplan', //排班
    meta: {
      name: '排班管理',
      icon: 'Notebook'
    },
    component: Layout,
    children: [
      {
        path: '/workplanIndex',
        name: 'WorkplanIndex',
        meta: {
          name: '排班'
        },
        component: () => import('../views/Workplan/index.vue')
      },
      {
        path: '/workplanView',
        name: 'WorkplanView',
        meta: {
          name: '排班预览'
        },
        component: () => import('../views/Workplan/view.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user', 
    meta: {
      name: '用户管理',
      icon: 'User'
    },
    component: Layout,
    children: [
      {
        path: '/userIndex',
        name: 'UserIndex',
        meta: {
          name: '查看用户'
        },
        component: () => import('../views/User/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
