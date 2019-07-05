// import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'

class User {
  constructor (id) {
    this.id = id
  }
}
export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user (state, getters) {
      return state.user
    },
    isUserLoggedIn (state, getters) {
      return getters.user !== null
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser (store, {email, password}) {
      store.dispatch('shared/clearError', {}, {root: true})
      store.dispatch('shared/setLoading', true, {root: true})
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        // console.log(user)
        // console.log(user['user'].uid)
        store.commit('setUser', new User(user['user'].uid))
        store.dispatch('shared/setLoading', false, {root: true})
      } catch (error) {
        store.dispatch('shared/setLoading', false, {root: true})
        store.dispatch('shared/setError', error.message, {root: true})
        throw error
      }

      // .then((user) => {
      //   store.commit('setUser', new User(user.uid))
      //   store.dispatch('shared/setLoading', false, {root: true})
      // }).catch(error => {
      //   store.dispatch('shared/setLoading', false, {root: true})
      //   store.dispatch('shared/setError', error.message, {root: true})
      // })
    },
    async loginUser (store, {email, password}) {
      store.dispatch('shared/clearError', null, {root: true})
      store.dispatch('shared/setLoading', true, {root: true})
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        store.commit('setUser', new User(user['user'].uid))
        store.dispatch('shared/setLoading', false, {root: true})
      } catch (error) {
        store.dispatch('shared/setLoading', false, {root: true})
        store.dispatch('shared/setError', error.message, {root: true})
        throw error
      }
    },
    autoLoginUser (store, payload) {
      store.commit('setUser', new User(payload.uid))
    },
    logoutUser (store) {
      firebase.auth().signOut()
      store.commit('setUser', null)
    }
  }

}
