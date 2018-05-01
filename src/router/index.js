
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/MainPage'
import EditComponent from '@/components/EditPage'
import TestComponent from '@/components/TestPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: HelloWorld
    },
    {
      path:'/edit',
      name:"EditPage",
      component:EditComponent
    },
    {
      path:"/test",
      name:"TestPage",
      component:TestComponent
    }
  ]
})
