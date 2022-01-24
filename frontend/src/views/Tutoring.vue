<template  lang="pug">
.container
  #delete.modal(tabindex="-1", role="dialog")
    .modal-dialog(role="document")
      .modal-content
        .modal-header
          h5.modal-title Delete Tutoring Record?
          button.close(type="button", data-dismiss="modal", aria-label="Close")
            span(aria-hidden="true") &times;
        .modal-body(v-if="tutoring_delete")
          p Are you sure you want to delete the following tutoring session?
          h4 {{ tutoring_delete.title }}
          p.text-warning This action cannot be undone.

        .modal-footer
          button.btn.btn-primary.btn.btn-primary(
            type="button",
            data-dismiss="modal",
            @click="delete_tutoring()"
          ) Delete
          button.btn.btn-secondary.btn.btn-secondary(
            type="button",
            data-dismiss="modal"
          ) Cancel
  .card.my-3
    .card-header
      h4 Tutoring Setup
    .card-body
      section.row
        .col.col-3: button.btn.btn-success(@click="new_session") + Create
        .col.col-9: p.text-muted Please make sure the tutor who you plan to assign is already added to the system, along with the room. These lists can be managed using the tabs at the top of the screen.

  .card.my-3
    .card-header
      h4 Manage Tutoring Sessions
    .card-body
      .row
        .col.col-8
          .form-group
            input.form-control(
              type="search",
              v-model="search",
              placeholder="Search for tutoring session"
            )
        .col.col-4
          .form-group
            input.form-control(type="date", v-model="date")
      ul.list-group.list-group-flush
        li.list-group-item(v-for="tutoring in tutorings")
          .row
            .col.col-10
              Tutoring(:tutoring="tutoring")
            .col.col-2.pt-3
              button.btn.btn-info.btn-block(@click="edit(tutoring)") Edit
              button.btn.btn-primary.btn-block(
                @click="tutoring_delete = tutoring",
                data-toggle="modal",
                data-target="#delete"
              ) Delete
</template>

<script>
// @ is an alias to /src

//import UserService from "@/api/users";
import AuthService from "@/api/auth";
import TutoringService from "@/api/tutoring";
import Schedule from "@/components/Schedule";
import Course from "@/components/Course";
import Tutoring from "@/components/Tutoring";
export default {
  name: "Search",
  components: { Schedule, Course, Tutoring },
  data: function () {
    return {
      users: [],
      tutorings: [],
      search: "",
      date: new Date().toISOString().split("T")[0],
      tutoring_delete: null,
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

    this.tutorings = await TutoringService.fetch(this.date, this.search);
  },
  watch: {
    async search() {
      this.tutorings = await TutoringService.fetch(this.date, this.search);
    },
    async date() {
      this.tutorings = await TutoringService.fetch(this.date, this.search);
    },
  },
  methods: {
    async delete_tutoring() {
      await TutoringService.delete(this.tutoring_delete);
      this.tutoring_delete = null;
      this.tutorings = await TutoringService.fetch(this.date, this.search);
    },
    edit(tutoring) {
      this.$store.commit("tutoring_session", tutoring);
      this.$router.push("/tutoring/setup");
    },
    new_session() {
      const ts = {
        new: true,
        supervisor: null,
        schedules: [],
        courses: [],
        notes: "",
        title: "",
      };
      this.$store.commit("tutoring_session", ts);
      this.$router.push("/tutoring/setup");
    },
  },
};
</script>


<style scoped>
</style>