<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

require("./assets/css/reset.css");

export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.turn-on-enter {
  transform: translate3d(100%, 0, 0);
}
.turn-on-leave-to {
  /* transform: translate3d(-20%, 0, 0); */
   transform: translate3d(-100%, 0, 0);
}
.turn-on-enter-active,
.turn-on-leave-active {
  transition: transform 0.3s ease;
  z-index: 11;
}
.turn-off-enter {
  /* transform: translate3d(-20%, 0, 0); */
   transform: translate3d(-100%, 0, 0);
}
.turn-off-leave-to {
  transform: translate3d(100%, 0, 0);
  z-index: 11;
}
.turn-off-enter-active,
.turn-off-leave-active {
  transition: transform 0.3s ease;
  
}
.turn-off-leave-active {
  z-index: 2;
}
</style>
