const initial = () => ({
  data: null
})

export const state = initial

export const mutations = {
  setData (state, data) {
    state.data = data
  },
  reset (state) {
    Object.assign(state, initial())
  }
}
