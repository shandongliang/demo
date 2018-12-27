import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import graph from '@/components/dashboard/graph'
import processview from '@/components/dashboard/dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/graph',
      name: 'graph',
      component: graph
    },
    {
      path: '/process',
      name: 'process',
      component: processview
    }
  ]
})
