<template>
  <v-card>
    <PopularMovies />
  </v-card>
</template>

<script>
import PopularMovies from "../components/PopularMovies.vue";
export default {
  name: "Home",
  components: {
    PopularMovies,
  },
  
};
</script>
