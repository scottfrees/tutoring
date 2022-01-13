<template  lang="pug">
.container
  .card.my-3
    .card-header
      h4 Tutoring Setup
    .card-body
      section
        button.btn.btn-success.float-right Create
        p Create a tutoring session.
        p.text-muted Please make sure the tutor who you plan to assign is already added to the system.

  .card.my-3
    .card-header
      h4 Manage Tutoring Session
    .card-body
      p Search for tutoring sessions, and edit/delete.
</template>

<script>
// @ is an alias to /src

//import UserService from "@/api/users";
import AuthService from "@/api/auth";
export default {
  name: "Search",
  components: {},
  data: function () {
    return {
      users: [],
    };
  },
  computed: {},
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
  methods: {},
};
</script>


<style scoped>
</style>