<template>
  <div>
    <v-app-bar app dense color="#052c80" id="navbar">
      <!-- <v-app-bar-nav-icon @click="switchMiniSidebar"></v-app-bar-nav-icon> -->

      <!-- End of Navbar left actions -->
      <v-spacer></v-spacer>

      <!-- Navbar right actions -->
      <template v-if="loggedIn">
        <v-avatar :size="35">
          <img src="@/images/sicat.png" alt="John" />
        </v-avatar>
      </template>
      <template v-else>
        <v-btn
          depressed
          flat
          color="#052c80"
          dark
          @click="$router.push({ name: 'auth.login' })"
        >
          Login
        </v-btn>
        <v-btn
          depressed
          flat
          color="#052c80"
          dark
          style="margin-left: 10px"
          @click="$router.push({ name: 'auth.register' })"
        >
          Register
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("auth");

export default {
  data: () => ({
    selected: null,
    notification: true,
    version: "4.4.0",
    switch: false,
  }),
  computed: {
    ...mapGetters(["loggedIn"]),
  },
  methods: {
    ...mapActions(["logOutUser"]),
    logout() {
      this.logOutUser();
    },
  },
};
</script>
<style lang="postcss" scoped>
/deep/ .v-text-field {
  max-width: 450px;
}
</style>
