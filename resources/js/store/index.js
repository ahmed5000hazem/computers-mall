import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
  state(){
    return {
      user: null,
    }
  },
  mutations:{
    initUser (state, data) {
      state.user = data
    }
  },
  getters:{
    auth(state) {
      return (state.user) ? true : false
    },
    user(state){
      return state.user
    }
  }
})