
<template>
  <v-card class="elevation-0">
    <h2 class="mt-2 grey--text">Popular Movies</h2>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="2" v-for="movie in movies" :key="movie.id">
          <MovieCardVue :genres="genres" :movie="movie" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import MovieCardVue from "./MovieCard.vue";
export default {
  name: "PopularMovies",

  // eslint-disable-next-line vue/no-unused-components
  components: { MovieCardVue },
  data: () => ({
    genres: [],
    movies: [],
  }),
  methods: {
    getPopularMovies() {
      // eslint-disable-next-line no-unused-vars
      axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        url: `https://api.themoviedb.org/3/movie/popular?api_key=a0e694efd62c667db2d68c2cb7a8e299&language=en-US&page=1`,
        method: "get",
      }).then((response) => {
        this.movies = response.data.results;
      });
      // eslint-disable-next-line no-unused-vars
    },
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
  mounted() {
    this.getPopularMovies();
    this.getGenres();
  },
};
</script>

<style scoped>
</style>