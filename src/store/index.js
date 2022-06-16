import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  favorites: [],
};
const getters = {
  getFavoriteMovies() {
    return state.favorites;
  },
};
const mutations = {
  addFavoriteMovie(state, movie) {
    state.favorites.push(movie);
  },
  deleteFavoriteMovie(state, movie) {
    state.favorites= state.favorites.filter((element) => {
      element.id !== movie.id;
    });
    // state.favorites.filter((element) => {
    //   return element.id !== movie.id;
    // });
  },
};
const actions = {
  updateFavoriteMovies({ commit }, movie) {
    commit("addFavoriteMovie", movie);
  },
  updateDeletedFavoriteMovie({ commit }, movie) {
    commit("deleteFavoriteMovie", movie);
  },
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
