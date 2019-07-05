import store from '@/store'

export default function (to, from, next) {
  // console.log(store.getters)
  // console.log(store.getters[`user/user`])

  if (store.getters['user/user']) {
    next()
  } else {
    next('/login?loginError=true')
  }
}
