// vue-router配置
import view from './components/ui-view'
export default [
  {
    path: '/',
    component: view,
    children: [{
      name: 'home',
      path: '',
      component: () => import('./views/app.vue')
    }]
  }, {
    path: '/page1',
    component: view,
    children: [{
      name: 'page1',
      path: '',
      component: () => import('./views/page1')
    }]
  }, {
    path: '/page2',
    component: view,
    children: [{
      path: '',
      component: () => import('./views/page2')
    }]
  },
  {
    path: '/404',
    component: view,
    children: [{
      path: '',
      component: () => import('./errors/404')
    }]
  },
  {
    path: '/500',
    component: view,
    children: [{
      path: '',
      component: () => import('./errors/500')
    }]
  }
]
