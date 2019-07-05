import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

class Ad {
  constructor (
    date = '',
    title,
    description,
    ownerId = '',
    imageSrc = '',
    promo = false,
    id = null) {
    this.date = date
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}
export default {
  namespaced: true,
  state: {
    ads: []
  },
  getters: {
    ads (state, getters) {
      return state.ads
    },
    // adsMap (state, getters) {
    //   let map = {}
    //   for (let i = 0; i < state.ads.length; i++) {
    //     let ad = state.ads[i]
    //     map[ad.id] = ad
    //   }
    //   return map
    // },
    adsMap (state, getters) {
      let map = {}
      state.ads.forEach((item, i) => {
        map[item.id] = item
      })
      return map
    },
    ad: (state, getters) => (id) => {
      // console.log( id);
      // console.log( getters.products[id] );
      return getters.adsMap[id]
    },
    adById: (state, getters) => (id) => {
      return state.ads.find(ad => ad.id === id)
    },
    promoAds (state, getters) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state, getters, rootState, rootGetters) {
      if (rootGetters['user/user']) {
        // console.log(rootGetters['user/user'].id)
        return state.ads.filter(ad => {
          return ad.ownerId === rootGetters['user/user'].id
        })
      }
    }
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    setAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(item => {
        return item.id === id
      })

      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd (store, payload) {
      store.dispatch('shared/clearError', {}, {root: true})
      store.dispatch('shared/setLoading', true, {root: true})

      const image = payload.image
      try {
        const newAd = new Ad(
          new Date().toLocaleString(),
          payload.title,
          payload.description,
          store.rootGetters['user/user'].id,
          '',
          payload.promo
        )
        const ad = await firebase.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await firebase.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)
        const imageSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        // const imageSrc = fileData.metadata.downloadURLs[0]
        await firebase.database().ref('ads').child(ad.key).update({imageSrc})

        store.commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
        })
        store.dispatch('shared/setLoading', false, {root: true})
      } catch (error) {
        store.dispatch('shared/setLoading', false, {root: true})
        store.dispatch('shared/setError', error.message, {root: true})
        throw error
      }
    },
    async loadAds (store, payload) {
      store.dispatch('shared/clearError', {}, {root: true})
      store.dispatch('shared/setLoading', true, {root: true})

      const resultAds = []

      try {
        const fbVal = await firebase.database().ref('ads').once('value')
        const ads = fbVal.val()
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(new Ad(
            ad.date,
            ad.title,
            ad.description,
            ad.ownerId,
            ad.imageSrc,
            ad.promo,
            key))
        })
        store.commit('setAds', resultAds)
        store.dispatch('shared/setLoading', false, {root: true})
      } catch (error) {
        store.dispatch('shared/setLoading', false, {root: true})
        store.dispatch('shared/setError', error.message, {root: true})
        throw error
      }
    },
    async updateAd (store, {title, description, id}) {
      store.dispatch('shared/clearError', {}, {root: true})
      store.dispatch('shared/setLoading', true, {root: true})

      try {
        await firebase.database().ref('ads').child(id).update({title, description})
        store.commit('updateAd', {title, description, id})
        store.dispatch('shared/setLoading', false, {root: true})
      } catch (error) {
        store.dispatch('shared/setLoading', false, {root: true})
        store.dispatch('shared/setError', error.message, {root: true})
        throw error
      }
    }
  }

}
