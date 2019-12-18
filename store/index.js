export const state = () => ({
  user: {
    name: '周晓',
    token: 'Zhou_Xiao',
    level: 5
  },
  fetchSource: ''
});

export const mutations = {
  setUser (state, payload) {
    state.user.name = payload.name;
    state.user.token = payload.token;
    state.user.level = payload.level;
  },
  setFetchSource (state, payload) {
    state.fetchSource = payload;
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
  }
}