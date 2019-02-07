export const state = () => ({
  result: ''
})

export const getters = {
  result: (state) => state.result,
}

export const mutations = {
  setResult(state, { result } ) {
    state.result = result
  }
}

export const actions = {
  async search({commit}, {keywords}) {
    commit('setIsLoading', { flag: true }, { root: true });
    const response = await this.$axios.$get('/code?q=' + keywords)
    commit('setResult', { result: response} )
    commit('setIsLoading', { flag: false }, { root: true });
  }
}