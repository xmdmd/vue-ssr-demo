<template>
  <transition :name="transitionName">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    name: 'ui-view',
    props: {
      root: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        transitionName: 'fade'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
