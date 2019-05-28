import Vue from 'vue'
import Router from 'vue-router'
import AssetManagementCalculate from '@/components/AssetManagementCalculate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AssetManagementCalculate',
      component: AssetManagementCalculate
    }
  ]
})
