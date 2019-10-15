import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/project',
    component: Layout,
    name: 'Project',
    meta: { title: 'Project', icon: 'example' },
    children: [
      {
        path: 'new',
        name: 'New',
        component: () => import('@/views/project/new'),
        meta: { title: '新建项目', icon: 'table' }
      },
      {
        path: 'manage',
        name: 'Manage',
        component: () => import('@/views/project/index'),
        meta: { title: '项目列表', icon: 'table' }
      },
      {
        path: ':projectName/images',
        component: () => import('@/views/project/images'),
        name: 'images',
        meta: { title: 'images' },
        hidden: true
      }
    ]
  },
  {
    path: '/detection',
    component: Layout,
    name: 'Detection',
    meta: { title: 'Detection', icon: 'example' },
    children: [
      {
        path: 'project',
        name: 'Project',
        component: () => import('@/views/worker/index'),
        meta: { title: '项目选择', icon: 'table' }
      },
      // {
      //   path: 'annotation',
      //   name: 'Annotation',
      //   component: () => import('@/views/detection/index'),
      //   meta: { title: 'Annotation', icon: 'table' }
      //   // hidden: true
      // },
      {
        path: 'annotation/:projectName',
        name: 'annotation',
        component: () => import('@/views/detection/annotation_future'),
        meta: { title: 'Annotation', icon: 'table' },
        hidden: true
      }
    ]
  }
]

export const requesterRouterMap = [
  {
    path: '/project',
    component: Layout,
    name: 'Project',
    meta: { title: 'Project', icon: 'example' },
    children: [
      {
        path: 'new',
        name: 'New',
        component: () => import('@/views/project/new'),
        meta: { title: 'New', icon: 'table' }
      },
      {
        path: 'manage',
        name: 'Manage',
        component: () => import('@/views/project/index'),
        meta: { title: 'Manage', icon: 'table' }
      },
      {
        path: 'images/:projectName',
        component: () => import('@/views/project/images'),
        name: 'images',
        meta: { title: 'images' },
        hidden: true
      }
    ]
  },
  {
    path: '/detection',
    component: Layout,
    redirect: '/example/table',
    name: 'Detection',
    meta: { title: 'Detection', icon: 'example' },
    children: [
      {
        path: 'annotation',
        name: 'Annotation',
        component: () => import('@/views/detection/index'),
        meta: { title: 'Annotation', icon: 'table' }
        // hidden: true
      },
      {
        path: 'annotation/:projectName',
        name: 'annotation',
        component: () => import('@/views/detection/annotation_future'),
        meta: { title: 'Annotation', icon: 'table' },
        hidden: true
      }
    ]
  }
]

export const workerRouterMap = [
  {
    path: '/project',
    component: Layout,
    name: 'Project',
    meta: { title: 'Project', icon: 'example' },
    children: [
      {
        path: 'manage',
        name: 'Manage',
        component: () => import('@/views/project/index'),
        meta: { title: 'Manage', icon: 'table' }
      },
      {
        path: 'images/:projectName',
        component: () => import('@/views/project/images'),
        name: 'images',
        meta: { title: 'images' },
        hidden: true
      }
    ]
  },
  {
    path: '/detection',
    component: Layout,
    redirect: '/example/table',
    name: 'Detection',
    meta: { title: 'Detection', icon: 'example' },
    children: [
      {
        path: 'annotation',
        name: 'Annotation',
        component: () => import('@/views/detection/index'),
        meta: { title: 'Annotation', icon: 'table' }
        // hidden: true
      },
      {
        path: 'annotation/:projectName',
        name: 'annotation',
        component: () => import('@/views/detection/annotation_future'),
        meta: { title: 'Annotation', icon: 'table' },
        hidden: true
      }
    ]
  }
]

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

// const createWorkerRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: workerRouterMap
// })

const createRequesterRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRequesterRouter()

export function resetRouter(type) {
  // const newRouter = createRequesterRouter()
  // router.matcher = newRouter.matcher
  // if (type === 'requester') {
  //   alert(1111)
  //   this.$router.addRoutes(requesterRouterMap)
  // } else {
  //   alert(222)
  //   this.$router.addRoutes(workerRouterMap)
  // }
}

export default router
