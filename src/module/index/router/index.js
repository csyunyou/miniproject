import Vue from 'vue'
import Router from 'vue-router'
import indexRecommendation from '../components/IndexRecommendation.vue'
import share from '../components/Share.vue'
import wallet from '../components/Wallet.vue'
import vodList from '../components/VodList.vue'
import livebroadcastList from '../components/LivebroadcastList.vue'
import supplementaryInfo from '../components/SupplementaryInfo.vue'
import videoPlayer from '../components/VideoPlayer.vue'
import test from '../components/Test.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: indexRecommendation
    },
    {
      path: '/share',
      component: share
    },{
      path: '/index',
      redirect:'/'
    },{
      path: '/wallet',
      component:wallet
    },{
      path: '/vodList',
      component:vodList
    },{
      path: '/livebroadcastList',
      component:livebroadcastList
    },{
      path: '/test',
      component:test
    },{
      path: '/supplementaryInfo',
      component:supplementaryInfo
    },{
      path: '/videoPlayer',
      component:videoPlayer
    }
  ]
})
