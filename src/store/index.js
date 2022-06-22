import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  favorites: [],
  username: "mahirdeneme1@gmail.com",
  password: 12345678,
};
const getters = {
  getFavoriteMovies() {
    return state.favorites;
  },
  getPasswordInfo(){
    return state.password
  }
};
const mutations = {
  addFavoriteMovie(state, movie) {
    state.favorites.push(movie);
  },
  deleteFavoriteMovie(state, movie) {
    state.favorites = state.favorites.filter((element) => {
      element.id !== movie.id;
    });
  },
  updatePassword(state,inputPassword){
    state.password = inputPassword;
  }
};
const actions = {
  updateFavoriteMovies({ commit }, movie) {
    commit("addFavoriteMovie", movie);
  },
  updateDeletedFavoriteMovie({ commit }, movie) {
    commit("deleteFavoriteMovie", movie);
  },
  updatePasswordAction({commit},password){
    commit('updatePassword',password);
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
