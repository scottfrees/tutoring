<template lang="pug">
div
  .row(v-if="schedule", style="margin-bottom: 0px") 
    .col.col-6(style="font-size: 1rem")
      span.mr-2(v-if="schedule.M") Monday
      span.mr-2(v-if="schedule.T") Tuesday
      span.mr-2(v-if="schedule.W") Wednesday
      span.mr-2(v-if="schedule.R") Thursday
      span.mr-2(v-if="schedule.F") Friday
      span.mr-2(v-if="schedule.S") Saturday
      span.mr-2(v-if="schedule.U") Sunday
      br
      span 
        Time(:time="schedule.start_time") 
        span -
        Time(:time="schedule.end_time")

    .col.col-6
      span.text-muted.mr-2
        ShortDate(:date="schedule.start")
        span.mr-2.ml-2 -
        ShortDate(:date="schedule.end")
      br
      span(v-if="schedule.virtual") Virtual: {{ schedule.virtual_link }}
      span(v-else-if="schedule.room") Room: {{ schedule.room }}
      span.text-info(v-if="schedule.appointment") Contact tutor for scheduling by appointment
      p.mt-2
        User(:user="schedule.tutor")
  .row
    .col-12
      p(v-if="schedule.exceptions.length")
        span.mr-2 Not held on:
        span.mr-1(v-for="e of schedule.exceptions")
          .badge.badge-danger.text-small: ShortDate(:date="e")
</template>


<script>
import User from "@/components/User";
import ShortDate from "@/components/ShortDate";
import Time from "@/components/CourseTime";
export default {
  name: "Schedule",
  props: ["schedule"],
  components: { User, ShortDate, Time },
};
</script>
