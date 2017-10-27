import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'

Vue.use(Router)

export default () => {
  return new Router({
    mode: 'history',
    routes: routers,
    scrollBehavior: (to, from, savedPosition) => {
      // if (savedPosition) {
      //   return savedPosition
      // } else {
      //   const position = {
      //     x: 0,
      //     y: 0
      //   }
      //   if (to.hash) {
      //     position.selector = to.hash
      //   }
      //   if (to.matched.some(m => m.meta.scrollToTop)) {
      //     position.x = 0
      //     position.y = 0
      //   }
      //   return position
      // }
      return {x: 0, y: 0}
    }
  })
}
