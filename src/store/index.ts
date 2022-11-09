import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const persistedState = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['keyword']
})

const store = createStore({
  plugins: [persistedState.plugin],
  modules: {}
})

export default store
