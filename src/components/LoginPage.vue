<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card elevation="0">
          <div class="text-center">
            <h1 class="mb-2">Login</h1>
          </div>
          <a
            href="#"
            name="Fedorae Education"
            title="Fedorae Education"
            target="_blank"
          >
          </a>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Enter your email"
                name="email"
                v-model="email"
                autocomplete="off"
                prepend-inner-icon="mdi-email"
                type="email"
                class="rounded-0"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="InputPassword"
                label="Enter your password"
                name="password"
                prepend-inner-icon="mdi-lock"
                autocomplete="off"
                type="password"
                suffix="| Forgot?"
                class="rounded-0"
                outlined
              ></v-text-field>
              <v-btn
                @click="loginCheck"
                class="rounded-0"
                color="#000000"
                x-large
                block
                dark
                >Login</v-btn
              >
              <v-card-actions class="text--secondary">
                <v-spacer></v-spacer>
                <!-- <router-link :to="{ name: 'SignUp' }">Sign Up</router-link> -->
                No account?
                <a href="#" class="pl-2" style="color: #000000">Sign Up</a>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "loginPage",
  data: () => ({
    drawer: false,
    InputPassword: "",
    email: "",
  }),
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    this.$http.get(id);
    next();
  },
  computed: {
    ...mapState(["username", "password"]),
    ...mapGetters(["getPasswordInfo", "getEmailInfo"]),
  },
  methods: {
    loginCheck() {
      if (this.username == this.email) {
        if (this.password == this.InputPassword) {
          this.$router.push({ path: "/home" });
        }
      }
    },
    goToMain() {
      this.$router.push({ name: "home" });
      window.location.reload();
    },
    doLogin() {
      if (this.emailLogin === "" || this.passwordLogin === "") {
        this.emptyFields = true;
      } else {
        alert("You are now logged in");
      }
    },
  },
  mounted() {
  },
};
</script>
