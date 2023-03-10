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
    path: '/carousel',
    name: 'system',
    redirect: 'index',
    //从定向
    meta: {
      name: '公告管理',
      icon: 'Stopwatch'
    },
    //控制台
    component: Layout,
    children: [
      {
        path: '/notice',
        name: 'Notice',
        meta: {
          name: '医院公告'
        },
        component: () => import('../views/Carousel/notice.vue')
      },
      {
        path: '/carousel',
        name: 'Carousel',
        meta: {
          name: '轮播图管理'
        },
        component: () => import('../views/Carousel/index.vue')
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
        component: () => import('../views/Department/index.vue')
      },
      {
        path: '/room',
        name: 'Room',
        meta: {
          name: '科室位置'
        },
        component: () => import('../views/Department/room.vue')
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
          name: '医生管理'
        },
        component: () => import('../views/Doctor/index.vue')
      },
      {
        path: '/doctorFee',
        name: 'DoctorFee',
        meta: {
          name: '费用管理'
        },
        component: () => import('../views/Doctor/fee.vue')
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
  },
  //医生端
  {
    path: '/doctorLogin',
    name: 'doctorLogin',
    hidden: true,
    meta: {
      name: '后端主页'
    },
    component: () => import('../components/Doctor/Layout/index.vue'),
    children: [
      {
        path: '/paiban',
        name: 'paiban',
        meta: {
          name: '查看排班'
        },
        component: () => import('../components/Doctor/workforce/Working.vue')
      },
      {
        path: '/huanze',
        name: 'huanze',
        meta: {
          name: '患者信息'
        },
        component: () => import('../components/Doctor/patient/Patient.vue')
      },
      {
        path: '/xinxi',
        name: 'xinxi',
        meta: {
          name: '个人信息'
        },
        component: () => import('../components/Doctor/personage/Personage.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
