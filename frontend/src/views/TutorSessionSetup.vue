<template  lang="pug">
.container
  .card.my-3
    .card-header
      button.btn.btn-light.float-right.ml-2(@click="$router.push('/tutoring')") Back
      button.btn.btn-danger.float-right(@click="save", v-if="dirty") Save Changes
      h4(v-if="ts && ts.new") New Tutoring
      h4(v-else) Edit Tutoring
    .card-body
      p.text-muted Name the tutoring session. This name will be displayed in search listings. You do not need to include all courses the tutoring supports, each course will be listed (and searchable) on listings as well.
      .form-group
        label.form-label(for="title") Title
        input#title.form-control(
          placeholder="Title of tutoring session",
          v-model="ts.title"
        ) 
  .card.my-3(v-if="ts")
    .card-header
      h4 Courses
    .card-body
      p.text-muted Each tutoring entry may support any number of courses. Start by click "Add course" and selecting a subject, and then a specific course. Section times will be shown to assist in developing a schedule for tutoring.

      .row.mb-4(v-if="!adding_course")
        .col.col-12
          button.btn.btn-info(@click="adding_course = true") + Add Course
      section(v-else)
        .row.mb-4
          .col.col-3
            .form-group
              label.form-label Subjects {{ selected_subject }}
              select.form-control(v-model="selected_subject") 
                option(v-for="subject in subjects", :value="subject") {{ subject }}
          .col.col-8
            .form-group(v-if="selected_subject")
              label.form-label Courses
              select.form-control(v-model="selected_number")
                option(v-for="number in numbers", :value="number") {{ number }}
        .row(v-if="selected_number")
          .col.col-12
            h4 Sections
            ul.list-group
              li.list-group-item(v-for="section in sections")
                Course(:course="section")
        .row.mt-2
          .col.col-12
            button.btn.btn-success.mr-2(
              v-if="selected_number",
              @click="add_course(selected_number); selected_number = 0; adding_course = false"
            ) + Course
            button.btn.btn-light.mr-2(@click="adding_course = false") Cancel
    .card-body
      .badge.badge-dark.p-2.m-1(
        v-for="(course, index) in ts.courses",
        style="font-size: 10pt"
      ) 
        span.mr-2 {{ course }}
        a(href="#", @click="remove_course(index)") x
  .card.my-3(v-if="ts")
    .card-header
      h4 Tutoring Supervisor
    .card-body
      p.text-muted Add a tutoring supervisor, who can serve as the primary contact for administrative support. This is optional, all administrators and staff within this application can manage tutoring sessions.
      .form-group
        label.form-label(for="supervisor") Supervisor
        select#supervisor.form-control(v-model="ts.supervisor")
          option(v-for="s in staff", :value="s") {{ s.name.last }}, {{ s.name.first }}
  .card.my-3(v-if="ts")
    .card-header
      h4 Schedule
    .card-body
      p.text-muted A schedule is a fixed set of days (each week) with the same time on each day, with the same start and end date (typically the semester). If tutoring will take place at different times for each day, create additional schedules to define this. Each schedule is associated with a specific peer tutor.
      ul.list-group.list-group-flush.mb-4
        li.list-group-item(v-for="(s, index) in ts.schedules")
          button.btn.btn-primary.float-right.font-weight-bold(
            @click="remove_schedule(index)"
          ) x
          button.btn.btn-info.float-right.font-weight-bold.mr-2(
            @click="edit_schedule(index)"
          ) ...
          Schedule(:schedule="s")
      hr
      .row.mb-4(v-if="!schedule")
        .col.col-12
          button.btn.btn-info(@click="start_schedule_add") + Add Schedule

      section(v-if="schedule")
        .row.mb-2
          .col.col-12
            section.form-group
              label.form-label.font-weight-bold Tutor
              select.form-control(v-model="schedule.tutor")
                option(v-for="tutor in tutors", :value="tutor") {{ tutor.name.last }}, {{ tutor.name.first }} - {{ tutor.email }}
        .row.mb-2
          .col.col-6
            section.form-group
              label.form-label.font-weight-bold Start date
              input.form-control(type="date", v-model="schedule.start")
          .col.col-6
            section.form-group
              label.form-label.font-weight-bold End date
              input.form-control(type="date", v-model="schedule.end")
        .row.mb-2
          .col.col-12
            section.form-group
              label.form-label.font-weight-bold Days of the week
              br
              .form-check.form-check-inline(
                v-for="d in [ { id: 'M', label: 'Monday' }, { id: 'T', label: 'Tuesday' }, { id: 'W', label: 'Wednesday' }, { id: 'R', label: 'Thursday' }, { id: 'F', label: 'Friday' }, { id: 'S', label: 'Saturday' }, { id: 'U', label: 'Sunday' }, ]"
              )
                input.form-check-input(
                  :id="d.id",
                  type="checkbox",
                  v-model="schedule[d.id]"
                )
                label.form-check-label(:for="d.id") {{ d.label }}
        .row.mb-2
          .col.col-6
            section.form-group
              label.form-label.font-weight-bold Start time
              input.form-control(type="time", v-model="schedule.start_time")
          .col.col-6
            section.form-group
              label.form-label.font-weight-bold End time
              input.form-control(type="time", v-model="schedule.end_time")
        .row.mb-2
          .col.col-6
            section.form-group
              label.form-label.font-weight-bold Add exception (tutoring not held)
              input.form-control(type="date", v-model="exception")
            section.form-group.text-right
              button.btn.btn-block.btn-danger(
                @click="schedule.exceptions.push(exception); exception = null; dirty = true"
              ) + Add Exception

          .col.col-6
            .row
              .col-4(v-for="(exception, index) in schedule.exceptions")
                .alert.alert-danger.text-small
                  small.mr-3: ShortDate(:date="exception")
                  a(href="#", @click="remove_exception(index)") x
        .row.mb-2
          .col.col-6.pt-4
            section.form-check
              input#virtual.form-check-input(
                type="checkbox",
                v-model="schedule.virtual"
              )
              label.form-check-label(for="virtual") Virtual / Video Conference (no room)
            section.form-check
              input#appointment.form-check-input(
                type="checkbox",
                v-model="schedule.appointment"
              )
              label.form-check-label(for="appointment") Schedule by appointment
            section.form-check
              input#connect.form-check-input(
                type="checkbox",
                v-model="schedule.connect"
              )
              label.form-check-label(for="connect") Schedule appointments using Connect

          .col.col-6
            section.form-group(v-if="schedule.virtual")
              label.form-label.font-weight-bold Video Conference Link
              input.form-control(v-model="schedule.virtual_link")
            section.form-group(v-else)
              label.form-label.font-weight-bold Room
              select.form-control(v-model="schedule.room")
                option(v-for="room in rooms") {{ room }}
        .row
          .col.col-12
            button.mr-2.btn.btn-success(@click="add_schedule")
              span(v-if="editing_schedule") Save Change
              span(v-else) + Add
            button.btn.btn-light(@click="cancel_schedule_edit") Cancel
  //.card.my-3(v-if="ts")
    .card-body
      pre {{ JSON.stringify(ts, null, 2444) }}
  .card.my-3(v-if="ts")
    .card-header
      h4 Additional Information
    .card-body
      p.text-muted This information will be visible to students. Enter appropriate information or instructions about the tutoring that students should know. Note the students will already be able to see which courses the tutoring is associated with, the peer tutor's contact information, room/link, and schedule.
      textarea.form-control(v-model="ts.notes")
  .card.my-3
    .card-body
      button.btn.btn-danger(@click="save", v-if="dirty") Save Changes
      button.btn.btn-light.ml-2(@click="$router.push('/tutoring')") Back
</template>

<script>
// @ is an alias to /src

//import UserService from "@/api/users";
import AuthService from "@/api/auth";
import SubjectService from "@/api/subjects";
import TutoringService from "@/api/tutoring";
import User from "@/components/User";
import Schedule from "@/components/Schedule";
import Course from "@/components/Course";
import ShortDate from "@/components/ShortDate";
import { mapState } from "vuex";
export default {
  name: "TutorSessionStartup",
  components: { User, Schedule, Course, ShortDate },
  data: function () {
    return {
      schedule: null,
      users: [],
      dirty: false,
      subjects: [],
      numbers: [],
      sections: [],
      selected_subject: null,
      selected_number: null,
      adding_course: false,
      exception: null,
      editing_schedule: false,
      before_edit: null,
      editing_index: undefined,
    };
  },
  computed: {
    ...mapState(["user", "rooms", "admins", "staff", "tutors", "ts"]),
  },
  watch: {
    ts: {
      deep: true,
      handler() {
        this.dirty = true;
      },
    },
    async selected_subject() {
      if (this.selected_subject) {
        this.numbers = await SubjectService.numbers(
          "202220",
          this.selected_subject
        );
        this.selected_number = null;
        this.sections = [];
      }
    },
    async selected_number() {
      if (this.selected_number) {
        this.sections = await SubjectService.sections(
          "202220",
          this.selected_subject,
          this.selected_number
        );
      }
    },
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
    if (!this.ts) {
      this.$router.push("/tutoring");
    }

    this.subjects = await SubjectService.subjects("202220");
  },
  created() {
    window.addEventListener("beforeunload", this.beforeWindowUnload);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },
  beforeRouteLeave(to, from, next) {
    if (this.dirty) {
      if (this.confirmStayInDirtyForm()) {
        next(false);
      } else {
        // Navigate to next view
        next();
      }
    } else {
      next();
    }
  },
  methods: {
    confirmLeave() {
      return window.confirm(
        "Do you really want to leave? You have unsaved changes!"
      );
    },

    confirmStayInDirtyForm() {
      return this.dirty && !this.confirmLeave();
    },

    beforeWindowUnload(e) {
      if (this.confirmStayInDirtyForm()) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = "";
      }
    },
    async save() {
      if (this.ts.new) {
        const created = await TutoringService.add(this.ts);
        this.$store.commit("tutoring_session", created);
      } else {
        const edited = await TutoringService.update(this.ts);
        this.$store.commit("tutoring_session", edited);
      }
      this.dirty = false;
      this.$router.push("/tutoring");
    },
    add_tutor(tutor) {
      this.ts.tutors.push(tutor);
      this.dirty = true;
    },
    remove_tutor(tutor) {
      const index = this.ts.tutors.map((t) => t._id).indexOf(tutor._id);
      this.ts.tutors.splice(index, 1);
      this.dirty = true;
    },
    add_schedule() {
      if (!this.editing_schedule) {
        this.ts.schedules.push(this.schedule);
      }
      this.schedule = null;
      this.dirty = true;
      this.editing_schedule = false;
      this.before_edit = null;
      this.editing_index = undefined;
    },
    cancel_schedule_edit() {
      if (this.editing_schedule) {
        this.ts.schedules[this.editing_index] = this.before_edit;
      }
      this.before_edit = undefined;
      this.editing_index = undefined;
      this.schedule = null;
      this.editing_schedule = false;
    },
    remove_schedule(index) {
      this.ts.schedules.splice(index, 1);
      this.dirty = true;
    },
    edit_schedule(index) {
      this.schedule = this.ts.schedules[index];
      this.before_edit = JSON.parse(JSON.stringify(this.schedule));
      this.editing_schedule = true;
      this.editing_index = index;
    },
    remove_exception(index) {
      this.schedule.exceptions.splice(index, 1);
      this.dirty = true;
    },
    add_course(searchable) {
      this.ts.courses.push(searchable);
      this.dirty = true;
    },
    remove_course(index) {
      this.ts.courses.splice(index, 1);
      this.dirty = true;
    },
    start_schedule_add() {
      this.editing_schedule = false;
      this.schedule = {
        M: false,
        T: false,
        W: false,
        R: false,
        F: false,
        S: false,
        U: false,
        virtual: false,
        virtual_link: null,
        room: null,
        start: new Date().toISOString().split("T")[0],
        end: new Date().toISOString().split("T")[0],
        start_time: "09:00",
        end_time: "10:00",
        tutor: null,
        notes: null,
        exceptions: [],
      };
    },
  },
};
</script>


<style scoped>
</style>