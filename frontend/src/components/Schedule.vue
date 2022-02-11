<template lang="pug">
div
  .row(v-if="schedule", style="margin-bottom: 0px") 
    .col.col-12.col-md-6(style="font-size: 1rem; white-space: normal")
      p.font-weight-bold(
        v-if="schedule.M || schedule.T || schedule.W || schedule.R || schedule.F || schedule.S || schedule.U"
      )
        span.pr-2(v-if="schedule.M", style="display: inline-block") Mon
        span.pr-2(v-if="schedule.T", style="display: inline-block") Tue
        span.pr-2(v-if="schedule.W", style="display: inline-block") Wed
        span.pr-2(v-if="schedule.R", style="display: inline-block") Thu
        span.pr-2(v-if="schedule.F", style="display: inline-block") Fri
        span.pr-2(v-if="schedule.S", style="display: inline-block") Sat
        span.pr-2(v-if="schedule.U", style="display: inline-block") Sun

      span(v-if="schedule.start_time && schedule.end_time") 
        Time(:time="schedule.start_time") 
        span -
        Time(:time="schedule.end_time")

    .col.col-12.col-md-6
      span.text-muted.mr-2
        ShortDate(:date="schedule.start")
        span.mr-2.ml-2 -
        ShortDate(:date="schedule.end")
      br
      p(v-if="schedule.virtual") Virtual: {{ schedule.virtual_link }}
      p(v-else-if="schedule.room") Room: {{ schedule.room }}
      p.text-info(v-if="schedule.appointment") Contact tutor for scheduling by appointment
      p.text-success(v-if="schedule.connect") Schedule appointments using connect
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
