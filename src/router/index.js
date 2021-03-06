import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MovieDetail from "../components/MovieDetail.vue";
import FavoriteMovies from "../components/FavoriteMovies.vue";
import Login from "../components/LoginPage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie/:id",
    name: "movieDetail",
    component: MovieDetail,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoriteMovies,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
