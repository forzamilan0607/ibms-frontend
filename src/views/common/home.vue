<template>
  <div class="mod-home">
    <div class="main_bg"></div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
  .main_bg {
      top:0;
      left:0;
      position:fixed;
      width:100%;
      height:100%;
      /*background-image: url('../static/img/main2.jpg');*/
      background-image: url(~@/assets/img/main2.jpg);
      background-size: 100% 100%;
      -moz-background-size: 100% 100%
  }
</style>

