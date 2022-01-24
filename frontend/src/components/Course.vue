<template lang="pug">
div
  .row
    .col.col-4
      span.font-weight-bold.pr-2 {{ course.subject }} {{ course.number }} - {{ course.section }}
      br.d-md-none
      span.text-muted {{ course.crn }}
      p(style="margin-bottom: 0px") 
        span {{ course.title }}
        span.ml-1.text-secondary(v-if="course.subtitle") {{ course.subtitle }}
    .col.col-4
      Days(:days="course.days")
      p.mb-0(v-if="course.start && course.end")
        CourseTime(v-if="course.delivery != 'online'", :time="course.start")
        span.d-none.d-md-inline -
        CourseTime(v-if="course.delivery != 'online'", :time="course.end")
    .col.col-4
      Instructor(:instructor="course.instructor")
</template>


<script>
import Days from "@/components/Days";
import CourseTime from "@/components/CourseTime";
import Instructor from "@/components/Instructor";
export default {
  name: "Course",
  components: { Days, CourseTime, Instructor },
  props: ["course"],
};
</script>