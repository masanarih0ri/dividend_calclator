import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Router from 'vue-router'
import AssetManagementCalculate from '@/components/AssetManagementCalculate'
import ApplicationDescription from '@/components/ApplicationDescription'

Vue.use(Router)

Vue.use(Vuetify);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AssetManagementCalculate',
      components:{
        default: AssetManagementCalculate,
        applicationDescription: ApplicationDescription  
      }
    }
  ]
})
