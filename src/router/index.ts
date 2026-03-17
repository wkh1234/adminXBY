import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '数据看板', icon: 'DataAnalysis' }
      },
      // 系统管理
      {
        path: '/system',
        name: 'System',
        redirect: '/system/organization',
        meta: { title: '系统管理', icon: 'Setting' },
        children: [
          {
            path: '/system/organization',
            name: 'Organization',
            component: () => import('@/views/system/organization/index.vue'),
            meta: { title: '组织机构', icon: 'OfficeBuilding' }
          },
          {
            path: '/system/user',
            name: 'User',
            component: () => import('@/views/system/user/index.vue'),
            meta: { title: '用户管理', icon: 'User' }
          },
          {
            path: '/system/role',
            name: 'Role',
            component: () => import('@/views/system/role/index.vue'),
            meta: { title: '角色管理', icon: 'UserFilled' }
          },
          {
            path: '/system/menu',
            name: 'Menu',
            component: () => import('@/views/system/menu/index.vue'),
            meta: { title: '菜单管理', icon: 'Menu' }
          }
        ]
      },
      // 客户与商机管理
      {
        path: '/customer',
        name: 'Customer',
        redirect: '/customer/list',
        meta: { title: '客户与商机', icon: 'ShoppingCart' },
        children: [
          {
            path: '/customer/list',
            name: 'CustomerList',
            component: () => import('@/views/customer/list/index.vue'),
            meta: { title: '客户列表', icon: 'List' }
          },
          {
            path: '/customer/business',
            name: 'Business',
            component: () => import('@/views/customer/business/index.vue'),
            meta: { title: '商机管理', icon: 'TrendCharts' }
          }
        ]
      },
      // 勘察与签约管理
      {
        path: '/project',
        name: 'Project',
        redirect: '/project/survey',
        meta: { title: '勘察签约', icon: 'FolderOpened' },
        children: [
          {
            path: '/project/survey',
            name: 'Survey',
            component: () => import('@/views/project/survey/index.vue'),
            meta: { title: '勘察管理', icon: 'View' }
          },
          {
            path: '/project/sign',
            name: 'Sign',
            component: () => import('@/views/project/sign/index.vue'),
            meta: { title: '签约管理', icon: 'EditPen' }
          }
        ]
      },
      // 数据分析
      {
        path: '/analysis',
        name: 'Analysis',
        redirect: '/analysis/overview',
        meta: { title: '数据分析', icon: 'DataLine' },
        children: [
          {
            path: '/analysis/overview',
            name: 'AnalysisOverview',
            component: () => import('@/views/analysis/overview/index.vue'),
            meta: { title: '数据概览', icon: 'PieChart' }
          },
          {
            path: '/analysis/performance',
            name: 'Performance',
            component: () => import('@/views/analysis/performance/index.vue'),
            meta: { title: '绩效分析', icon: 'Histogram' }
          }
        ]
      },
      // 考核管理
      {
        path: '/assessment',
        name: 'Assessment',
        redirect: '/assessment/task',
        meta: { title: '考核管理', icon: 'DocumentChecked' },
        children: [
          {
            path: '/assessment/task',
            name: 'AssessmentTask',
            component: () => import('@/views/assessment/task/index.vue'),
            meta: { title: '考核任务', icon: 'Calendar' }
          },
          {
            path: '/assessment/result',
            name: 'AssessmentResult',
            component: () => import('@/views/assessment/result/index.vue'),
            meta: { title: '考核结果', icon: 'Finished' }
          }
        ]
      },
      // 公告管理
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('@/views/notice/index.vue'),
        meta: { title: '公告管理', icon: 'Bell' }
      },
      // 个人中心
      {
        path: '/system/profile',
        name: 'Profile',
        component: () => import('@/views/system/profile/index.vue'),
        meta: { title: '个人中心', icon: 'User' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { routes }
export default router
