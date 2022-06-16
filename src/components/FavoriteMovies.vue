<template>
  <v-container>
    <h2 class="mt-2 grey--text">Favorite Movies</h2>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="2"
          v-for="movie in getFavoriteMovies"
          :key="movie.id"
        >
          <MovieCardVue :genres="genres" :movie="movie" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MovieCardVue from "./MovieCard.vue";
import axios from 'axios';
export default {
  name: "FavoriteMovies",
  data: () => ({ genres: [] }),
  components: {
    MovieCardVue,
  },
  computed: {
    ...mapState(["favorites"]),
    ...mapGetters(["getFavoriteMovies"]),
  },
  methods: {
    getGenres() {
      // eslint-disable-next-line no-unused-vars
      axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=a0e694efd62c667db2d68c2cb7a8e299&language=en-US`,
        method: "get",
      }).then((response) => {
        this.genres = response.data.results;
      });
    },
  },
  mounted(){
    this.getGenres();
  },
};
</script>