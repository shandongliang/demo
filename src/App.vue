<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
body, html{
  min-height:100%;
  font-family: "微软雅黑";
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
  padding: 30px 60px;
}
em {
  color:red;
  font-style: normal;
}
@media (max-width: 767px) {
  #app {
    padding: 20px 10px;
  }
}
</style>
