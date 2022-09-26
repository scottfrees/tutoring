<template  lang="pug">
.container
  #active_user.modal(
    tabindex="-1",
    role="dialog",
    aria-labelledby="active_user_label",
    aria-hidden="true"
  )
    section.modal-dialog(role="document")
      .modal-content
        .modal-header
          h5#active_user_label.modal-title(v-if="active_user._id") Edit User
          h5#active_user_label.modal-title(v-else) Add User
          button.close(type="button", data-dismiss="modal", aria-label="Close")
            span(aria-hidden="true") &times;
        .modal-body
          .form
            .form-group
              label.form-label First Name
              input.form-control(v-model="active_user.name.first")
            .form-group
              label.form-label Last Name
              input.form-control(v-model="active_user.name.last")
            .form-group
              label.form-label Ramapo email
              input.form-control(v-model="active_user.email")
            .form-check
              input#admin_role.form-check-input(
                type="checkbox",
                v-model="active_user_admin"
              ) 
              label.form-check-label(for="admin_role") Administrator
            .form-check
              input#staff_role.form-check-input(
                type="checkbox",
                v-model="active_user_staff"
              ) 
              label.form-check-label(for="staff_role") Staff
            .form-check
              input#tutor_role.form-check-input(
                type="checkbox",
                v-model="active_user_tutor"
              ) 
              label.form-check-label(for="tutor_role") Tutor
        .modal-footer
          .alert.alert-danger(
            v-if="active_user._id && !active_user_admin && !active_user_staff && !active_user_tutor"
          ) Saving a user without any roles selected will remove the user from the system. You can always add them back later.

          button.btn.btn-primary.btn.btn-info(
            v-if="!active_user._id && active_user.email && (active_user_admin || active_user_staff || active_user_tutor)",
            type="button",
            data-dismiss="modal",
            @click="save()"
          ) Add User
          button.btn.btn-primary.btn.btn-info(
            v-else-if="active_user._id && active_user.email && (active_user_admin || active_user_staff || active_user_tutor)",
            type="button",
            data-dismiss="modal",
            @click="save()"
          ) Edit User
          button.btn.btn-primary.btn.btn-info(
            v-else-if="active_user._id && !active_user_admin && !active_user_staff && !active_user_tutor",
            type="button",
            data-dismiss="modal",
            @click="save()"
          ) Delete User

          button.btn.btn-secondary.btn.btn-secondary(
            type="button",
            data-dismiss="modal"
          ) Cancel
  section.mt-4
    button.btn.btn-success(
      @click="prepare_add()",
      data-toggle="modal",
      data-target="#active_user"
    ) Add User
  .card.my-3(v-if="is_admin")
    .card-header
      h4 Administrators
      p.text-muted Administrators can manage staff, tutors, configure tutoring schedules, and view all analytics.
    .card-body
      section
        ul.list-group.list-group-flush
          li.list-group-item(v-for="user in admins")
            .row
              .col-6
                p {{ user.name.first }} {{ user.name.last }}
              .col-4.text-right
                p {{ user.email }}
              .col-2.text-right
                div(v-if="is_admin")
                  button.btn.btn-info.btn-sm(
                    data-toggle="modal",
                    data-target="#active_user",
                    @click="prepare_edit(user)"
                  ) Edit
  .card.my-3(v-if="is_admin || is_staff")
    .card-header
      h4 Staff
      p.text-muted Staff members may create tutoring schedules and manage peer tutors.
    .card-body
      section
        ul.list-group.list-group-flush
          li.list-group-item(v-for="user in staff")
            .row
              .col-6
                p {{ user.name.first }} {{ user.name.last }}
              .col-4.text-right
                p {{ user.email }}
              .col-2.text-right
                div(v-if="is_admin")
                  button.btn.btn-info.btn-sm(
                    data-toggle="modal",
                    data-target="#active_user",
                    @click="prepare_edit(user)"
                  ) Edit
  .card.my-3(v-if="is_admin || is_staff")
    .card-header
      h4 Peer Tutors
      p.text-muted Peer Tutors can be assigned tutoring schedules and view/manage attendance records for their sessions.
    .card-body
      section
        ul.list-group.list-group-flush
          li.list-group-item(v-for="user in tutors")
            .row
              .col-6
                p {{ user.name.first }} {{ user.name.last }}
              .col-4.text-right
                p {{ user.email }}
              .col-2.text-right
                div(v-if="is_staff")
                  button.btn.btn-info.btn-sm(
                    data-toggle="modal",
                    data-target="#active_user",
                    @click="prepare_edit(user)"
                  ) Edit
</template>

<script>
// @ is an alias to /src

import UserService from "@/api/users";
import AuthService from "@/api/auth";
import { mapState } from "vuex";
export default {
  name: "Users",
  components: {},
  data: function () {
    return {
      users: [],
      active_user: { name: { first: "", last: "" } },
      active_user_admin: false,
      active_user_staff: false,
      active_user_tutor: false,
    };
  },
  computed: {
    ...mapState([
      "user",
      "admins",
      "staff",
      "tutors",
      "is_admin",
      "is_staff",
      "is_tutor",
    ]),
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
    this.user_list();
  },
  methods: {
    async save() {
      const user_to_send = {
        _id: this.active_user._id,
        name: this.active_user.name,
        email: this.active_user.email,
        roles: [],
      };
      if (this.active_user_admin) user_to_send.roles.push("admin");
      if (this.active_user_staff) user_to_send.roles.push("staff");
      if (this.active_user_tutor) user_to_send.roles.push("tutor");
      if (this.active_user._id === undefined) {
        await UserService.add(user_to_send);
      } else if (user_to_send.roles.length > 0) {
        await UserService.edit(user_to_send);
      } else {
        await UserService.drop(user_to_send);
      }

      const users = await UserService.fetch();
      this.$store.commit("users", users);
    },
    prepare_add() {
      this.active_user = {
        name: {
          first: "",
          last: "",
        },
        email: null,
      };
      this.active_user_admin = false;
      this.active_user_staff = false;
      this.active_user_tutor = false;
    },
    prepare_edit(user) {
      this.active_user = user;
      this.active_user_admin = user.roles.indexOf("admin") >= 0;
      this.active_user_staff = user.roles.indexOf("staff") >= 0;
      this.active_user_tutor = user.roles.indexOf("tutor") >= 0;
    },
    user_list: async function () {
      this.users = [];
      /*
      try {
        const data = await UserService.get();
        this.users = data;
      } catch (ex) {
        this.users = [];
      }*/
    },
  },
};
</script>


<style scoped>
</style>