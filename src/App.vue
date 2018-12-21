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
  height:100%;
  min-width: 1200px;
  font-family: "微软雅黑";
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
  padding: 0 60px;
}
em {
  color:red;
  font-style: normal;
}
</style>
