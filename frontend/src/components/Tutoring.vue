<template lang="pug">
div
  .row
    .col.col-md-5.col-sm-12
      h3 {{ tutoring.title }}
      .badge.badge-dark.p-2.m-1(
        v-for="course in sorted_courses",
        style="font-size: 8pt"
      ) 
        span.mr-2 {{ course }}
    .col.col-md-7.col-sm-12
      ul.list-group.list-group-flush
        li.list-group-item(v-for="s in tutoring.schedules")
          Schedule(:schedule="s")
</template>


<script>
import Schedule from "@/components/Schedule";
import Course from "@/components/Course";
import User from "@/components/User";
export default {
  name: "Tutoring",
  props: ["tutoring"],
  components: { Schedule, Course, User },
  computed: {
    sorted_courses() {
      if (this.tutoring) {
        return [...this.tutoring.courses].sort();
      } else {
        return [];
      }
    },
  },
};
</script>
