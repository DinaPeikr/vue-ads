import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

// import * as firebase from 'firebase'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

import 'vuetify/dist/vuetify.min.css'
import './assets/styles.css'

import appBuyModal from '@/components/shared/BuyModal'

Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan, // #00BCD4
    blue: colors.cyan, // #00BCD4
    success: colors.green.accent3, // #00E676
    info: colors.cyan.accent4, // #00B8D4
    warning: colors.deepOrange // #FF5722
  }
})
Vue.component('app-buy-modal', appBuyModal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBPHMbQM2MSVuoHl3oid3oUgqTGNGtszO4',
      authDomain: 'vue-ads-project-4e495.firebaseapp.com',
      databaseURL: 'https://vue-ads-project-4e495.firebaseio.com',
      projectId: 'vue-ads-project-4e495',
      storageBucket: 'vue-ads-project-4e495.appspot.com',
      messagingSenderId: '364408901160',
      appId: '1:364408901160:web:3c70dc5d59fa2eec'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch('user/autoLoginUser', user)
      }
    })
    store.dispatch('ads/loadAds')
  }
})
