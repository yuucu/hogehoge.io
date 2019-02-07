export const state = () => ({
  isLoggedIn: false,
  isLoading: false,
})

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  isLoading: (state) => state.isLoading,
}

export const mutations = {
  setIsLoading(state, { flag } ) {
    state.isLoading = flag
  }
}