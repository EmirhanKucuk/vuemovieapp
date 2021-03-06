<template>
  <v-container fluid class="container">
    <v-row>
      <v-col cols="12" sm="4">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
            <router-link :to="`/movie/${movie.id}`">
              <v-img :src="posterPath" alt="" class="" />
            </router-link>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="7">
        <h1 class="grey--text text-darken-3 mt-5">{{ this.movie.title }}</h1>
        <v-row>
          <v-col cols="12" sm="3">
            <VueStarRating
              :rating="movie.vote_average / 2"
              :star-size="20"
              :read-only="true"
              :increment="0.01"
            ></VueStarRating>
          </v-col>
          <v-col cols="12" sm="3">
            <span class="gray--text ml-n7">
              {{ movie.vote_average * 10 }}% | {{ movie.release_date }}
            </span>
          </v-col>
          <v-col cols="12" sm="5">
            <div class="subtitle-2 grey--text ml-n16">
              <span
                v-for="(item, index) in movie.genres"
                :key="index"
                class="ml-1"
              >
                {{ item.name }}
                <span v-if="movie.genres.length - 1 != index">,</span>
              </span>
            </div>
          </v-col>
          <v-col>
            <p class="mt-5 grey--text text--darken-3 subheader">
              {{ this.movie.overview }}
            </p>
            <v-dialog v-model="dialog.show" persistent max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="elevation-0"
                  tile
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click.prevent="youtubeModal"
                >
                  <v-icon left>mdi-youtube</v-icon>Play
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ this.movie.title }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="">
                        <div v-if="this.dialog.show" class="iframe-container">
                          <img :src="mediaURL" v-if="!isVideo" />
                          <iframe
                            allowfullscreen
                            v-if="isVideo"
                            :src="mediaURL"
                          ></iframe>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="dialog.show = false"
                    >Close</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              @click="openModal"
              tile
              color="error"
              class="elevation-0 ml-2"
            >
              <v-icon left>mdi-heart</v-icon>Favorite
            </v-btn>
            <v-btn
              v-if="clicked"
              @click="removefromlist"
              tile
              color="error"
              class="elevation-0 ml-2"
            >
              <v-icon left>mdi-delete-empty</v-icon>Remove from favorites
            </v-btn>
            <Images :images="movie.images.backdrops" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="mt-2"></v-divider>

    <v-dialog width="400" v-model="favoriteDialog.show">
      <v-card class="mx-auto" max-width="400">
        <v-img class="white--text align-end" height="200px" :src="posterPath">
        </v-img>

        <v-card-title>{{ movie.title }}</v-card-title>
        <v-card-actions>
          <div v-if="!mouseEntered">
            <v-btn
              @mouseenter="mouseHoverEffect"
              class="text-lowercase elevation-0"
              color="white"
            >
              <v-icon color="red"> mdi-heart </v-icon>
            </v-btn>
          </div>
          <div v-else-if="mouseEntered">
            <v-btn
              :disabled="clicked"
              @mouseleave="mouseLeaveEvent"
              @click="addToFavorites"
              class="text-lowercase elevation-0"
              color="red"
              text
            >
              Add to my list
            </v-btn>
          </div>
          <v-spacer></v-spacer>
          <v-btn depressed outlined @click="favoriteDialog.show = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Images from "../components/Images.vue";
import VueStarRating from "vue-star-rating";
import { mapState, mapGetters, mapActions } from "vuex";
import store from "../store/index.js";
export default {
  name: "MovieDetail",
  components: {
    VueStarRating,
    Images,
  },
  data: () => ({
    name: "mahirkucuk",
    clicked: false,
    movie: {
      credits: {
        crew: {},
      },
      images: {
        backdrops: {},
      },
    },
    mouseEntered: false,
    isVideo: false,
    mediaURL: "",
    dialog: { show: false },
    favoriteMovieIDs: [],
    favoriteDialog: { show: false },
  }),
  watch: {
    "$route.params.id": {
      handler() {
        this.fetchMovie(this.$route.params.id);
      },
      immediate: true,
    },
  },
  //burada computed içeriisinde kullanmam gerekti diğer türlü kullandıklarımda yapamadım nedenini bulacağım
  computed: {
    ...mapState(["favorites"]),
    ...mapGetters(["getFavoriteMovies"]),
    posterPath() {
      return "https://image.tmdb.org/t/p/original/" + this.movie.poster_path;
    },
  },
  methods: {
    ...mapActions(["updateFavoriteMovies", "updateDeletedFavoriteMovie"]),
    openModal() {
      this.favoriteDialog.show = true;
    },
    checkIfMovieIsFavorite() {
      store.state.favorites.forEach((movie) => {
        this.favoriteMovieIDs.push(movie.id);
      });
      if (this.favoriteMovieIDs.includes(this.movie.id)) {
        this.clicked = true;
      }
    },
    async fetchMovie(movieId) {
      const response = await this.$http.get(
        "/movie/" + movieId + "?append_to_response=credits,videos,images"
      );
      this.movie = response.data;
    },
    removefromlist() {
      this.updateDeletedFavoriteMovie(this.movie);
    },
    youtubeModal() {
      this.mediaURL = this.youtubeVideo();
      this.isVideo = true;
    },
    youtubeVideo() {
      if (!this.movie.videos) return;
      return (
        "https://www.youtube.com/embed/" + this.movie.videos.results[0].key
      );
    },
    mouseHoverEffect() {
      this.mouseEntered = true;
    },
    mouseLeaveEvent() {
      this.mouseEntered = false;
    },
    addToFavorites() {
      this.updateFavoriteMovies(this.movie);
      this.clicked = true;
      this.favoriteDialog.show = false;
    },
  },
  mounted() {
    this.fetchMovie(this.$route.params.id);
  },
  updated() {
    this.checkIfMovieIsFavorite();
  },
};
</script>
<style scoped>
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
}
.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.container {
  background-color: white;
}
/* .vue-star-rating-rating-text{
  display:none;
} */
</style>