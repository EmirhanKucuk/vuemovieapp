<template>
  <v-card>
    <nav>
      <v-app-bar app dark color="gray">
        <v-btn icon class="ma-2 elevation-0" color="gray">
          <v-icon class="mr-2">mdi-video</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-medium mr-10 red--text"
          >Mahirflix</v-toolbar-title
        >
        <v-btn to="/" class="font-weight-regular ml-2 elevation-0"
          >Movies</v-btn
        >
        <v-btn to="/favorites" class="font-weight-regular ml-2 elevation-0"
          >Favorites</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          icon
          v-if="!clicked"
          @click="searchButtonClick"
          color="gray"
          class="ml-2 elevation-0"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-autocomplete
          class="mt-4"
          @click="btnClickEvent"
          v-if="clicked"
          hide-no-data
          hide-selected
          append-icon=""
          color="white"
          label="search"
          v-model="movieSearchText"
          prepend-inner-icon="mdi-magnify"
          flat
          :items="movie"
          item-text="title"
          item-value="id"
          id="search"
        >
          <template v-slot:item="{ item }">
            <v-btn text :to="`/movie/${item.id}`">{{ item.title }}</v-btn>
          </template>
        </v-autocomplete>
        <v-btn icon color="gray" class="ml-2 elevation-0">
          <v-badge bordered dot color="pink">
            <v-icon> mdi-bell </v-icon>
          </v-badge>
        </v-btn>
        <v-btn to="/favorites" icon color="gray" class="elevation-0 ml-2 mr-2">
          <v-icon color="red">mdi-heart</v-icon>
        </v-btn>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              v-on="on"
              v-bind="attrs"
              color="primary"
              size="32"
            >
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
            /></v-avatar>
          </template>

          <v-list>
            <v-list-item @click="logOut">
              <v-list-item-title >logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </nav>
    <v-dialog v-model="cardDialog.show" width="300">
      <v-card></v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    clicked: false,
    movieText: "",
    outsideclick: false,
    movieSearchText: "",
    search: null,
    cardDialog: { show: false },
    searchText: "",
    movie: [],
  }),
  mounted() {
    this.getMovies();
  },
  methods: {
    logOut(){
      //window.location.reload();
      this.$router.push({name:'login'})
      
    },
    btnClickEvent() {
      this.movieSearchText = "";
    },
    async getMovies() {
      const response = await this.$http.get("/movie/popular");
      this.movie = response.data.results;
    },
    searchButtonClick() {
      this.clicked = true;
    },
  },
};
</script>

<style>
.search {
  width: 10px;
}
</style>
