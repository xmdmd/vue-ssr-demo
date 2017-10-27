import createApp from './create-app'

const { app, router } = createApp()

if (window) {
  window.AppRuntimeContext = {
    app, router
  }
}

router.onReady(() => {
  app.$mount('#app')
})
