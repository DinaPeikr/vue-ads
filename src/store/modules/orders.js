import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  namespaced: true,
  state: {
    orders: []
  },
  getters: {
    orders (state, getters) {
      // return state.orders
      return getters.undoneOrders.concat(getters.doneOrders)
    },
    doneOrders (state, getters) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders (state, getters) {
      return state.orders.filter(order => !order.done)
    }
  },
  mutations: {
    setOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder (store, {name, phone, adId, ownerId}) {
      const order = new Order(name, phone, adId)

      store.dispatch('shared/clearError', {}, {root: true})
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        store.dispatch('shared/setError', error.message, {root: true})
      }
    },
    async loadOrders (store, payload) {
      store.dispatch('shared/clearError', {}, {root: true})
      store.dispatch('shared/setLoading', true, {root: true})

      const resultOrders = []

      try {
        const fbVal = await firebase.database().ref(`/users/${store.rootGetters['user/user'].id}/orders`).once('value')
        const orders = fbVal.val()

        Object.keys(orders).forEach(key => {
          const order = orders[key]
          resultOrders.push(new Order(
            order.name,
            order.phone,
            order.adId,
            order.done,
            key)
          )
        })

        store.commit('setOrders', resultOrders)
        store.dispatch('shared/setLoading', false, {root: true})
      } catch (error) {
        store.dispatch('shared/setLoading', false, {root: true})
        store.dispatch('shared/setError', error.message, {root: true})
        throw error
      }
    },
    async markOrderDone (store, payload) {
      store.dispatch('shared/clearError', {}, {root: true})
      try {
        await firebase.database().ref(`/users/${store.rootGetters['user/user'].id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        store.dispatch('shared/setError', error.message, {root: true})
        throw error
      }
    }
  }
}
