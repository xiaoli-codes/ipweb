import { createStore } from "vuex";

export const store = createStore({
  state: {
    Global_loading: false,
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.Global_loading = loading;
    },
  },
  actions: {
    setLoading({ commit }, loading) {
      commit("SET_LOADING", loading);
    },
  },
  getters: {
    Global_loading: (state) => state.Global_loading,
  },
});
