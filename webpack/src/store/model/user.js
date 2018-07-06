import { make } from 'vuex-pathify'

// setup store
const state = {
  name: 'RRHH',
}
const mutations = make.mutations(state)

// create store
export default {
  state,
  mutations
}