export const state = () => ({
  halfscreen: false,
  fullscreen: false,
});

export const mutations = {
  setHalfscreen (state, payload) {
    state.halfscreen = payload;
  },
  setFullscreen (state, payload) {
    state.fullscreen = payload;
  }
}