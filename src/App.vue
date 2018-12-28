<template>
  <div id="app">
    <div class="top-bar">
      <div class="img-boxes">
        <img src="./assets/logo-news.png" />
        <div style="flex:1;"></div>
        <button class="min-shopw" @click="showLeftbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div style="flex:1"></div>
      <div class="top-right">
        <div class="top-icon">
          <span>
            <i class="el-icon-search"></i>
          </span>
          <span>
            <i class="el-icon-message"></i>
          </span>
        </div>
        <div class="top-useinfo">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              admin@datamesh.com<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="left-bar" :class="!show?'active':''">
      <div class="space-box"></div>
      <div class="left-content">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu :index="item.index" v-for="(item,i) in navList" :key="i">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-submenu :index="item.index" v-if="item.submenu" v-for="(item,i) in item.submenu" :key="i">
              <!-- <template slot="title">{{item.name}}</template> -->
              <el-menu-item index="">{{item.name}}</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      show: true,
      navList: [
        {
          name: 'Application',
          index: '1',
          icon: 'el-icon-location',
          path: '',
          submenu: [
            {
              name: 'Remote Expert',
              index: '1-1'
            },
            {
              name: 'Digital Assistant',
              index: '1-2',
              threemenu: []
            }
          ]
        }, {
          name: 'Management',
          index: '2',
          icon: 'el-icon-setting',
          path: '',
          submenu: [
            {
              name: 'Application',
              index: '2-1'
            },
            {
              name: 'Application',
              index: '2-2',
              threemenu: []
            }
          ]
        }
      ]
    }
  },
  mounted () {
    let that = this
    if (document.body.clientWidth < 768) {
      that.show = false
    }
    window.addEventListener('resize', function () {
      if (document.body.clientWidth < 768) {
        that.show = false
      } else {
        that.show = true
      }
    })
  },
  methods: {
    showLeftbar () {
      this.show = !this.show
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  outline: none;
}
body, html{
  height:100%;
  font-family: "微软雅黑";
  background: #d9e0e7;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
}
.top-bar{
  position:fixed;
  left:0;
  top:0;
  background: #fff;
  min-height:50px;
  width:100%;
  z-index:40;
  display: flex;
  flex-direction: row;
}
.space-box{
  height:50px;
}
.icon-bar{
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
  background:#2d353c;
}
.icon-bar:nth-child(2){
  margin-top:4px;
}
.icon-bar:nth-child(3){
  margin-top:4px;
}
.img-boxes{
  height:50px;
  padding:9px 15px 9px 15px;
  display: flex;
  flex-direction: row;
}
.img-boxes img{
  height:100%;
}
.top-icon{
  margin-right:25px;
}
.min-shopw{
  padding:9px 5px;
  display: none;
  background: none;
  outline: none;
  border: none;
}
.top-icon span{
  display: inline-block;
  cursor: pointer;
}
.top-icon span i {
  font-weight:600;
}
.top-icon span:first-child{
  margin-right:8px;
}
.top-useinfo{
  display: flex;
  flex-direction: row;
}
.top-right{
  height:50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right:15px;
}
.left-bar{
  width: 220px;
  position:fixed;
  left:0;
  top:0;
  height:100%;
  z-index:50;
  transition: all .3s linear;
}
.left-bar .el-menu {
  background: #2d353c!important;
  border-right:none!important;
}
.left-bar .el-menu-item, .left-bar .el-submenu__title{
  color:#a8acb1!important;
}
.left-content{
  background: #2d353c;
  height:calc(100% - 50px);
}
.main-content{
  padding:50px 0 0 220px;
  /* height:calc(100% - 50px); */
  height:100%;
}
.active{
  left:-220px;
}
.left-bar .el-submenu__title:focus i, .left-bar .el-submenu__title:hover i ,.left-bar .el-submenu__title:focus, .left-bar .el-submenu__title:hover,.left-bar .el-menu-item:focus, .left-bar .el-menu-item:hover {
  color:#fff!important;
  background: #2d353c!important;
}
.el-menu-item-group__title{
  padding:0!important
}
em {
  color:red;
  font-style: normal;
}
@media (max-width: 767px) {
  .main-content{
    padding:100px 0 0 0;
  }
  .top-bar{
    flex-direction: column;
  }
  .img-boxes{
    border-bottom: 1px solid #eee;
  }
  .top-right{
    justify-content: flex-end;
  }
  .min-shopw{
    display: block;
  }
  .min-shopw:focus{
    background: 0 0!important;
    opacity:0.6;
  }
  .space-box{
    height:0;
  }
  .left-content{
    height:100%;
  }
}
</style>
