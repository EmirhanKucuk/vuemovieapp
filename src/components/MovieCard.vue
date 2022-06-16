<template>
  <v-card>
    <v-hover v-slot="{ hover }" open-delay="200">
      <v-card
        @mouseover="hoverEnter"
        :elevation="hover ? 16 : 2"
        :class="{ 'on-hover': hover }"
      >
        <router-link :to="`/movie/${movie.id}`">
          <v-img :src="posterImagePath" alt=""></v-img>
        </router-link>
      </v-card>
    </v-hover>
    <!-- <v-dialog v-model="hoveredMovie.show" width="600">
      <v-card class="mx-auto" max-width="600">
        <v-img
          class="white--text align-end"
          height="200px"
          contain
          :src="posterImagePath"
        >
          <v-card-title>{{movie.title}}</v-card-title>
        </v-img>

        <v-card-text> some content </v-card-text>
      </v-card>
    </v-dialog> -->
  </v-card>
</template>

<script>
export default {
  data: () => ({
    posterImagePath: "",
    hoveredMovie: {
      show: false,
    },
  }),
  props: {
    movie: {
      required: true,
    },
    genres: {
      required: true,
    },
  },
  mounted() {
    this.posterPath();
  },
  methods: {
    hoverEnter() {
      setTimeout(() => {
        this.hoveredMovie.show = true;
      }, 1000);
    },
    
    posterPath() {
      this.posterImagePath =
        //tmdb databesedan filmlerin posterlrini çekiyoruz
        "https://image.tmdb.org/t/p/original" + this.movie.poster_path;
    },
  },
};
</script>