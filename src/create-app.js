import Vue from 'vue'
import uiView from './components/ui-view'
import createRouter from './create-router'
// import { sync } from 'vuex-router-sync'

export default () => {
  const router = createRouter()
  // sync(router)

  const app = new Vue({
    router,
    render: h => h(uiView)
  })
  return { app, router }
}
