<template>
  <div>
    <p>Giriş Sayfası</p>
    <v-btn @click="goToMain"> ana ekrana gidiver </v-btn>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data: () => ({}),
  methods: {
    goToMain() {
      this.$router.push({ name: "/" });
      window.location.reload();
    },
  },
  mounted() {},
};
</script>