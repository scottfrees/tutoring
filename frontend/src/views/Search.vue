<template  lang="pug">
.container
  .card.my-3
    .card-header
      h4 Search for Tutoring
    .card-body
      section
        p Searching
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