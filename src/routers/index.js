// vue-router配置
import view from './components/ui-view'
import app from './views/app.vue'
import page1 from './views/page1'
import page2 from './views/page2'
export default [
  {
    path: '/',
    component: view,
    children: [{
      name: 'home',
      path: '',
      component: app
    }]
  }, {
    path: '/page1',
    component: view,
    children: [{
      name: 'page1',
      path: '',
      component: page1
    }]
  }, {
    path: '/page2',
    component: view,
    children: [{
      path: '',
      component: page2
    }]
  }
]
