<template  lang="pug">
.container
  section
    .row.p-3.pb-0(style="padding-bottom: 0px; font-size: 2rem")
      .col.col-8.pb-0
        .form-group
          input.form-control(
            style="font-size: 1rem",
            type="search",
            v-model="search",
            placeholder="Search for tutoring session"
          )
      .col.col-4
        .form-group
          input.form-control(
            style="font-size: 1rem",
            type="date",
            v-model="date"
          )
    p.text-primary.pl-3(style="padding-top: 0px") 
      span.mr-1 For questions regarding tutoring contact
      a(href="mailto:tutoring@ramapo.edu") tutoring@ramapo.edu

  ul.list-group.list-group-flush(v-if="tutorings.length > 0")
    li.list-group-item(
      v-for="tutoring in tutorings",
      :class="{ active_tutoring: tutoring.details === true }"
    )
      Tutoring(:tutoring="tutoring")
      br
      section(
        v-if="tutoring.supervisor || (tutoring.notes && tutoring.courses.length > 0)"
      )
        button.btn.btn-info.btn-block(
          v-if="!tutoring.details",
          @click="tutoring.details = true"
        ) More ...
        .row(v-else)
          .col.col-6
            section(v-if="tutoring.supervisor")
              span.font-weight-bold.mr-2 Supervisor:
              User(:user="tutoring.supervisor")
          .col.col-6(v-if="tutoring.notes && tutoring.courses.length > 0")
            section(v-if="tutoring.notes")
              span.font-weight-bold.mr-2 Notes:
              span {{ tutoring.notes }}

          button.mt-2.btn.btn-light.btn-block(
            v-if="tutoring.details",
            @click="tutoring.details = false"
          ) Close ...
  section.p-5.text-center(v-else)
    h3.text-muted No results
</template>

<script>
// @ is an alias to /src

//import UserService from "@/api/users";
import AuthService from "@/api/auth";
import TutoringService from "@/api/tutoring";
import Schedule from "@/components/Schedule";
import Course from "@/components/Course";
import User from "@/components/User";
import Tutoring from "@/components/Tutoring";
export default {
  name: "Search",
  components: { Schedule, Course, Tutoring, User },
  data: function () {
    return {
      users: [],
      tutorings: [],
      search: "",
      date: new Date().toISOString().split("T")[0],
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

    await this.pull_listings();
  },
  watch: {
    async search() {
      await this.pull_listings();
    },
    async date() {
      await this.pull_listings();
    },
  },
  methods: {
    async pull_listings() {
      this.tutorings = await TutoringService.fetch(this.date, this.search);
      for (const t of this.tutorings) {
        this.$set(t, "details", false);
      }
    },
  },
};
</script>


<style scoped>
.active_tutoring {
  border: solid 2px #ddd;
}
</style>