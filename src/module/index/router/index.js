import Vue from 'vue'
import Router from 'vue-router'
import indexRecommendation from '../components/IndexRecommendation.vue'
import share from '../components/Share.vue'
import wallet from '../components/Wallet.vue'
import vodList from '../components/VodList.vue'
import livebroadcastList from '../components/LivebroadcastList.vue'
import supplementaryInfo from '../components/SupplementaryInfo.vue'
import videoPlayer from '../components/VideoPlayer.vue'
import footprint from '../components/Footprint.vue'
import loginHint from '../components/LoginHint.vue'
import test from '../components/Test.vue'
import axios from '../../../utils/http.js'
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      component: indexRecommendation
    },
    {
      path: '/share',
      component: share
    }, {
      path: '/index',
      redirect: '/'
    }, {
      path: '/wallet',
      component: wallet
    }, {
      path: '/vodList',
      component: vodList
    }, {
      path: '/livebroadcastList',
      component: livebroadcastList
    }, {
      path: '/test',
      component: test
    }, {
      path: '/supplementaryInfo',
      component: supplementaryInfo
    }, {
      path: '/videoPlayer',
      component: videoPlayer
    }, {
      path: '/footprint',
      component: footprint
    }, {
      path: '/loginhint',
      component: loginHint
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log('beforeHook')
  if (to.path !== '/loginhint')
    axios.post('User/islogin').then(function({data}) {
      if (data.code === "1000"){
        next()
      }
      else
        next({ path: '/loginhint' })
    })
  else
    next()
})
export default router
