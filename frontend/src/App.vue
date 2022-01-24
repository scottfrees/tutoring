<template lang="pug">
#app
  nav.navbar.navbar-expand-md.navbar-dark.bg-dark(v-if="user")
    a.navbar-brand(href="#")
      img(src="./assets/logo.png", height="50px")
    button.navbar-toggler(
      type="button",
      data-toggle="collapse",
      data-target="#navbarSupportedContent",
      aria-controls="navbarSupportedContent",
      aria-expanded="false",
      aria-label="Toggle navigation"
    )
      span.navbar-toggler-icon

    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.mr-auto
        li.nav-item(v-if="is_admin || is_staff")
          router-link.nav-link(to="/users") Users
        li.nav-item(v-if="is_admin || is_staff")
          router-link.nav-link(to="/rooms") Rooms
        li.nav-item(v-if="is_admin || is_staff")
          router-link.nav-link(to="/tutoring") Tutoring Setup
        li.nav-item
          router-link.nav-link(to="/search") Find Tutoring

      ul.navbar-nav.float-right
        li.nav-item
          .navbar-text.mr-3(v-if="user && user.name") {{ user.name.first }} {{ user.name.last }}
        li.nav-item
          a.nav-link(href="#", @click="logout") Logout
  router-view
</template>

<script>
// @ is an alias to /src
import AuthService from "@/api/auth";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {},
  computed: {
    ...mapState(["user", "is_admin", "is_staff", "is_tutor"]),
  },
  methods: {
    async logout() {
      this.$store.commit("login", undefined);
      await AuthService.logout();
      this.$router.push("/login");
    },
  },
  created() {
    this.$store.dispatch("init");
  },
  mounted: async function () {
    if (!this.user) {
      const user = await AuthService.user();
      if (user) {
        this.$store.commit("login", user);
      } else {
        this.$router.push("/login");
      }
    }
  },
  watch: {
    $route: {
      handler(to) {
        if (to.name == "Login") {
          document.documentElement.classList.add("login");
        } else {
          document.documentElement.classList.remove("login");
        }
      },
      immediate: true,
    },
  },
};
</script>






<style lang="scss">
html.login {
  background-image: url("./assets/login-large.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  border-radius: 0px !important;
}
.router-link-exact-active {
  color: white !important;
  font-weight: bold !important;
}
.todo {
  display: none !important;
}

/*
a {
  color: rgb(2, 154, 207) !important;
}
*/
</style>
