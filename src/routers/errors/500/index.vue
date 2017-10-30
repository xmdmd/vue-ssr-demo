<template>
  <div class="error-500">
    <img src="./images/500.png"/>
    <div class="text">服务器出错了，请稍后再试</div>
  </div>
</template>
<style lang="scss" scoped>
  .error-500 {
    background: #ffffff;
    img {
      display: block;
      width: 150px;
      height: 150px;
      margin: 60px auto 0;
    }
  }

  .text {
    text-align: center;
    font-size: 15px;
    margin-top: 20px;
    color: #212121;
  }
</style>
